import { animate, inView } from 'motion';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const grid = document.querySelector<HTMLElement>('.project-grid')!;
const cards = [...document.querySelectorAll<HTMLElement>('.project')];
const animations: ReturnType<typeof animate>[] = [];

// Content stays visible when scripts or motion are unavailable.
const stopObserving = inView(cards, (element) => {
  if (!reducedMotion.matches) {
    animations.push(animate(element, {
      opacity: [0.3, 1], transform: ['translateY(24px)', 'translateY(0)'],
    }, { duration: 0.65, ease: [0.22, 1, 0.36, 1] }));
  }
});
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) {
    stopObserving();
    animations.forEach(animation => animation.complete());
  }
});

const progress = document.querySelector<HTMLElement>('.scroll-progress')!;
const backTop = document.querySelector<HTMLElement>('.back-top')!;
let scrollFrame = 0;
function updateScroll() {
  const distance = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0})`;
  backTop.hidden = scrollY < innerHeight;
}
function scheduleScroll() {
  cancelAnimationFrame(scrollFrame);
  scrollFrame = requestAnimationFrame(updateScroll);
}
addEventListener('scroll', scheduleScroll, { passive: true });
addEventListener('resize', scheduleScroll);
new ResizeObserver(scheduleScroll).observe(grid);
updateScroll();
import './balanced-gallery';
