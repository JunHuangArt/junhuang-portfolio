import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve('public/images');
async function walk(dir) {
  const result = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await walk(file));
    else result.push(file);
  }
  return result;
}
const sources = (await walk(root)).filter(file => /\.(png|jpe?g|gif)$/i.test(file));
const groups = new Map();
for (const file of sources) {
  const stem = file.replace(/\.[^.]+$/, '').toLowerCase();
  groups.set(stem, (groups.get(stem) || 0) + 1);
}
const report = [];
for (const source of sources) {
  const relative = path.relative(root, source).replaceAll('\\', '/');
  const alreadyConverted = relative.startsWith('Foldscape/') || relative === 'Cover/Foldscape.png';
  const target = alreadyConverted ? path.join(root, 'webp', relative.replace(/\.[^.]+$/, '.webp'))
    : groups.get(source.replace(/\.[^.]+$/, '').toLowerCase()) > 1 ? source + '.webp'
    : source.replace(/\.[^.]+$/, '.webp');
  const animated = /\.gif$/i.test(source);
  const input = await fs.readFile(source);
  const before = await sharp(input, { animated, limitInputPixels: false }).metadata();
  const lossless = !animated && /(?:breakdown|system|Open Street Map|osm|UV Layout|Texel Density|Channel Packing|Guide|Segmentation|Surface Reconstruction)/i.test(relative);
  if (!alreadyConverted) {
    let exists = false;
    try { await fs.access(target); exists = true; }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (!exists) {
      const output = await sharp(input, { animated, limitInputPixels: false }).webp({ quality: 90, alphaQuality: 100, lossless, effort: 6 }).toBuffer();
      await fs.writeFile(target, output, { flag: 'wx' });
    }
  }
  const output = await fs.readFile(target);
  const after = await sharp(output, { animated, limitInputPixels: false }).metadata();
  if (before.width !== after.width || (before.pageHeight || before.height) !== (after.pageHeight || after.height)) throw new Error(`Size mismatch: ${source}`);
  const duration = metadata => (metadata.delay || []).reduce((total, delay) => total + delay, 0);
  if (animated && (duration(before) !== duration(after) || before.loop !== after.loop || !(after.pages > 1))) throw new Error(`Animation timing mismatch: ${source}`);
  if (before.hasAlpha && !after.hasAlpha && !(await sharp(input).stats()).isOpaque) throw new Error(`Transparency lost: ${source}`);
  report.push({ source: relative, target: path.relative(root, target).replaceAll('\\', '/'), before: input.length, after: output.length, lossless });
  if (report.length % 20 === 0) console.log(`Converted ${report.length}/${sources.length}`);
}
// Update structured project data and quoted image references, excluding software icons.
const dataFile = 'src/data/projects.json';
const projects = JSON.parse(await fs.readFile(dataFile, 'utf8'));
const mapping = new Map(report.map(row => [row.source, row.target]));
for (const project of projects) {
  for (const image of [project.hero, ...project.chapters.flatMap(chapter => chapter.images)]) {
    if (mapping.has(image.file)) image.file = mapping.get(image.file);
  }
}
await fs.writeFile(dataFile, JSON.stringify(projects, null, 2) + '\n');
for (const file of (await walk('src')).filter(file => file.endsWith('.astro'))) {
  let content = await fs.readFile(file, 'utf8');
  for (const row of report) content = content.replaceAll(row.source, row.target);
  if (file === path.join('src', 'pages', 'index.astro')) {
    content = content.replace(/cover: (["'])([^"']+)\1/g, (match, quote, name) => {
      const target = mapping.get('Cover/' + name);
      return target ? `cover: ${quote}${path.posix.basename(target)}${quote}` : match;
    });
  }
  await fs.writeFile(file, content);
}
const foldFile = 'src/pages/projects/foldscape.astro';
let fold = await fs.readFile(foldFile, 'utf8');
for (const row of report.filter(row => row.source.startsWith('Foldscape/'))) {
  fold = fold.replaceAll(path.posix.basename(row.source), path.posix.basename(row.target));
}
await fs.writeFile(foldFile, fold);
await fs.mkdir('.tmp', { recursive: true });
await fs.writeFile('.tmp/project-webp-report.json', JSON.stringify(report, null, 2));
// Delete originals only after all conversions and reference updates succeed.
for (const row of report) {
  const file = path.resolve(root, row.source);
  if (!file.startsWith(root + path.sep)) throw new Error('Outside image directory');
  await fs.unlink(file);
}
console.log(JSON.stringify({ count: report.length, beforeMB: report.reduce((s, r) => s + r.before, 0) / 1e6, afterMB: report.reduce((s, r) => s + r.after, 0) / 1e6 }));
