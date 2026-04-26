/* ═══════════════════════════════════════
   Jok2Go — Main JavaScript
═══════════════════════════════════════ */

// ── Mobile nav toggle ─────────────────
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('mobile-open');
      toggle.textContent = open ? '✕' : '☰';
    });
  }

  // ── Scroll fade-in (for static cards) ──
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.anim').forEach(el => observer.observe(el));
});
