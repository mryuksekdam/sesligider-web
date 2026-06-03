if (window.lucide) {
  lucide.createIcons();
}

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden");
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Menüyü aç" : "Menüyü kapat");
  });

  document.querySelectorAll("#mobileMenu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Menüyü aç");
    });
  });
}

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    if (!item) return;

    const wasOpen = item.classList.contains("is-open");

    document.querySelectorAll(".faq-item").forEach((faq) => {
      faq.classList.remove("is-open");
    });

    if (!wasOpen) {
      item.classList.add("is-open");
    }
  });
});

const observedSections = document.querySelectorAll(".legal-content section");
const tocLinks = document.querySelectorAll(".toc-link");

if (observedSections.length && tocLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const heading = entry.target.querySelector("h2");
        if (!heading) return;

        tocLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${heading.id}`);
        });
      }
    });
  }, { rootMargin: "-20% 0px -65% 0px", threshold: 0.1 });

  observedSections.forEach((section) => sectionObserver.observe(section));
}

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".fade-up").forEach((element) => fadeObserver.observe(element));
