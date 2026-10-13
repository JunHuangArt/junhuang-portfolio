// Choose only column counts that divide the number of images into complete rows.
const grids = document.querySelectorAll<HTMLElement>('.chapter-images, .system-gallery, .project-grid');
const observer = new ResizeObserver(entries => {
  for (const entry of entries) {
    const grid = entry.target as HTMLElement;
    const count = grid.children.length;
    if (!count) continue;
    const gap = parseFloat(getComputedStyle(grid).columnGap) || 0;
    const minimum = grid.matches('.project-grid') ? 480 : grid.matches('.phoenix-taiji .chapter-images') ? 300 : grid.matches('.paired .chapter-images') ? 560 : 400;
    const capacity = Math.max(1, Math.floor((entry.contentRect.width + gap) / (minimum + gap)));
    let columns = Math.min(count, capacity);
    if (grid.matches('.phoenix-narrative .chapter-images')) columns = Math.min(columns, Math.max(1, Math.floor(count / 2)));
    while (count % columns !== 0) columns--;
    grid.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
  }
});
grids.forEach(grid => { if (!grid.matches('.render-passes .chapter-images')) observer.observe(grid); });

const collageObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    const gallery = entry.target as HTMLElement;
    if (gallery.closest('.nuo-references') || gallery.matches('.impression-collage')) {
      const impression = gallery.matches('.impression-collage');
      const allCells = [...gallery.querySelectorAll<HTMLElement>('.collage-cell')];
      const ratioOf = (cell: HTMLElement) => parseFloat(cell.style.getPropertyValue('--image-ratio')) || 1;
      const separateWideImages = impression && entry.contentRect.width < 1200;
      const cells = separateWideImages ? allCells.filter(cell => ratioOf(cell) < 2) : allCells;
      const ratios = cells.map(cell => parseFloat(cell.style.getPropertyValue('--image-ratio')) || 1);
      const width = entry.contentRect.width;
      if (!width || !cells.length) continue;
      const gap = impression ? 0 : 12;
      const targetHeight = impression ? 480 : 240;
      const minimumRows = impression && !separateWideImages && cells.length > 1 ? 2 : 1;
      const rowCount = Math.max(minimumRows, Math.min(cells.length, Math.round(ratios.reduce((sum, ratio) => sum + ratio, 0) * targetHeight / width)));
      let start = 0;
      for (let row = 0; row < rowCount; row++) {
        const length = Math.ceil((cells.length - start) / (rowCount - row));
        const rowRatios = ratios.slice(start, start + length);
        const height = (width - gap * (length - 1)) / rowRatios.reduce((sum, ratio) => sum + ratio, 0);
        for (let index = start; index < start + length; index++) {
          cells[index].style.height = `${height}px`;
          cells[index].style.width = `${height * ratios[index]}px`;
        }
        start += length;
      }
      if (separateWideImages) {
        for (const cell of allCells.filter(cell => ratioOf(cell) >= 2)) {
          cell.style.width = `${width}px`;
          cell.style.height = `${width / ratioOf(cell)}px`;
        }
      }
      continue;
    }
    const count = gallery.querySelectorAll('.collage-cell').length;
    const minimum = gallery.closest('.nuo-references') ? 220 : 320;
    const columns = Math.max(1, Math.min(count, Math.floor(entry.contentRect.width / minimum)));
    gallery.style.setProperty('--collage-columns', String(columns));
  }
});
document.querySelectorAll<HTMLElement>('.responsive-exhibition').forEach(gallery => collageObserver.observe(gallery));
