// Choose only column counts that divide the number of images into complete rows.
const grids = document.querySelectorAll<HTMLElement>('.chapter-images, .system-gallery, .project-grid');
const observer = new ResizeObserver(entries => {
  for (const entry of entries) {
    const grid = entry.target as HTMLElement;
    const count = grid.children.length;
    if (!count) continue;
    const gap = parseFloat(getComputedStyle(grid).columnGap) || 0;
    const minimum = grid.matches('.phoenix-taiji .chapter-images') ? 300 : grid.matches('.project-grid, .paired .chapter-images') ? 560 : 400;
    const capacity = Math.max(1, Math.floor((entry.contentRect.width + gap) / (minimum + gap)));
    let columns = Math.min(count, capacity);
    while (count % columns !== 0) columns--;
    grid.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
  }
});
grids.forEach(grid => { if (!grid.matches('.render-passes .chapter-images')) observer.observe(grid); });

const collageObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    const gallery = entry.target as HTMLElement;
    const count = gallery.querySelectorAll('.collage-cell').length;
    const minimum = gallery.closest('.nuo-references') ? 220 : 320;
    const columns = Math.max(1, Math.min(count, Math.floor(entry.contentRect.width / minimum)));
    gallery.style.setProperty('--collage-columns', String(columns));
  }
});
document.querySelectorAll<HTMLElement>('.responsive-exhibition').forEach(gallery => collageObserver.observe(gallery));
