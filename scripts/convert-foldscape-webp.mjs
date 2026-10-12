import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

// Generate web copies only; never resize, overwrite or remove source images.
const root = new URL('../public/images/', import.meta.url);
const names = (await fs.readdir(new URL('Foldscape/', root)))
  .filter(name => /\.(png|jpe?g)$/i.test(name));
const sources = [...names.map(name => `Foldscape/${name}`), 'Cover/Foldscape.png'];
const report = [];
for (const source of sources) {
  const input = new URL(source, root);
  const original = await fs.readFile(input);
  const hash = createHash('sha256').update(original).digest('hex');
  const target = `webp/${source.replace(/\.[^.]+$/, '.webp')}`;
  const output = new URL(target, root);
  await fs.mkdir(path.dirname(fileURLToPath(output)), { recursive: true });
  const lossless = /(?:Open Street Map|osm|system \([1-5]\))/.test(source);
  const encoded = await sharp(original).webp({ lossless, quality: 88, effort: 6 }).toBuffer();
  await fs.writeFile(output, encoded);
  const before = await sharp(original).metadata();
  const after = await sharp(encoded).metadata();
  if (before.width !== after.width || before.height !== after.height) throw new Error(`Dimensions changed: ${source}`);
  if (hash !== createHash('sha256').update(await fs.readFile(input)).digest('hex')) throw new Error(`Source changed: ${source}`);
  if (lossless) {
    const pixels = async buffer => sharp(buffer).toColourspace('srgb').ensureAlpha().raw().toBuffer();
    if (!(await pixels(original)).equals(await pixels(encoded))) throw new Error(`Lossless pixel mismatch: ${source}`);
  }
  report.push({ source, target, lossless, originalBytes: original.length, webpBytes: encoded.length });
}
await fs.writeFile(new URL('../public/images/webp/foldscape-report.json', import.meta.url), JSON.stringify(report, null, 2) + '\n');
const sum = key => report.reduce((total, row) => total + row[key], 0);
console.log(JSON.stringify({ images: report.length, originalBytes: sum('originalBytes'), webpBytes: sum('webpBytes'), savedPercent: ((1 - sum('webpBytes') / sum('originalBytes')) * 100).toFixed(1), sourcesUnchanged: true }, null, 2));
