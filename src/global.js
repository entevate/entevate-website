// Staggered fade-in helper
function staggerFadeIn(selector, step = 0.07) {
  document.querySelectorAll(selector).forEach((el, i) => {
    const delay = i * step;
    el.dataset.fadeStaggerDelay = String(delay);
    el.style.transitionDelay = `${delay}s`;
  });
}

if (!window?.staggerFadeIn) window.staggerFadeIn = staggerFadeIn;

// Fade-up scroll animations
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const target = e.target;
        target.classList.add("visible");

        // clear the delay after the initial fade-in so hover states aren't delayed.
        if (target.dataset.fadeStaggerDelay) {
          const delay = parseFloat(target.dataset.fadeStaggerDelay) || 0;
          const totalDurationSeconds = delay + 0.6; // base fade duration ~0.55s

          setTimeout(() => {
            target.style.transitionDelay = "";
            delete target.dataset.fadeStaggerDelay;
          }, totalDurationSeconds * 1000);
        }

        io.unobserve(target);
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".fade-up").forEach((el) => io.observe(el));
