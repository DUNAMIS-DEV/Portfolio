// Future animations or interactive features will go here
console.log("Portfolio site loaded!");
// Reveal sections on scroll + smooth in-page links
document.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('section'));

  // Make the hero visible immediately to avoid a "blank" first screen
  const hero = document.querySelector('.hero');
  if (hero) hero.classList.add('visible');

  // Set up IntersectionObserver to reveal sections as they enter the viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // reveal once, then stop watching
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
  });

  sections.forEach((sec) => observer.observe(sec));

  // Smooth scroll for navbar links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
// ===== Mobile menu toggle =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}
// ===== CONTACT FORM HANDLING =====
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "Sending...";

    const data = new FormData(form);
    try {
      const response = await fetch("https://formspree.io/f/mwkajnzd", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        status.textContent = "✅ Message sent successfully!";
        form.reset();
      } else {
        status.textContent = "❌ Oops! Something went wrong. Try again.";
      }
    } catch (err) {
      status.textContent = "❌ Network error. Please try later.";
    }
  });
}



