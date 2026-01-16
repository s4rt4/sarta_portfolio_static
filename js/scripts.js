// scripts.js - VERSI FINAL CLEAN & OPTIMIZED

// -----------------------------
// Global Variables
// -----------------------------
let typingTimeout;

// -----------------------------
// Typed Effect Logic (Single String - No Deleting/Looping)
// -----------------------------
function startTypingEffect(el, text) {
  if (!el || !text) return;

  let charIndex = 0;
  clearTimeout(typingTimeout);

  function tick() {
    if (charIndex < text.length) {
      el.textContent = text.substring(0, ++charIndex);
      typingTimeout = setTimeout(tick, 120);
    }
  }
  tick();
}

// -----------------------------
// Language Options
// -----------------------------
const langOptions = {
  "en-us": { flag: "us", label: "English (US)" },
  "en-gb": { flag: "gb", label: "English (UK)" },
  "id":    { flag: "id", label: "Bahasa Indonesia" },
  "fr":    { flag: "fr", label: "Français" },
  "it":    { flag: "it", label: "Italiano" },
  "pt":    { flag: "pt", label: "Português" },
  "nl":    { flag: "nl", label: "Nederlands" },
  "de":    { flag: "de", label: "Deutsch" },
  "ar":    { flag: "sa", label: "العربية" },
  "zh":    { flag: "cn", label: "中文" },
  "ja":    { flag: "jp", label: "日本語" },
  "ko":    { flag: "kr", label: "한국어" }
};

// -----------------------------
// Theme Label Handler
// -----------------------------
function updateThemeLabel(isDark, data) {
  const label = document.getElementById("themeLabel");
  if (!label || !data) return;

  const darkModeText = data["darkmode.label"] || "Dark Mode";
  const lightModeText = data["lightmode.label"] || "Light Mode";
  label.textContent = isDark ? lightModeText : darkModeText;
}

// -----------------------------
// Language Switch Handler
// -----------------------------
function changeLang(lang) {
  if (!langOptions[lang]) return;

  const currentFlagEl = document.getElementById("currentFlag");
  const currentLangEl = document.getElementById("currentLang");

  // Update flag
  if (currentFlagEl) {
    currentFlagEl.className = currentFlagEl.className.replace(/flag-icon-\w+/g, '');
    currentFlagEl.classList.add('flag-icon', `flag-icon-${langOptions[lang].flag}`);
  }

  // Update language label
  if (currentLangEl) {
    currentLangEl.textContent = langOptions[lang].label;
  }

  // Load translations
  setLanguage(lang);
}

function setLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      // Update text content
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (data[key] && el.id !== "typed-text") {
          el.textContent = data[key];
        }
      });

      // Update placeholders
      document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (data[key]) el.setAttribute("placeholder", data[key]);
      });

      // Update alt attributes
      document.querySelectorAll("[data-i18n-alt]").forEach(el => {
        const key = el.getAttribute("data-i18n-alt");
        if (data[key]) el.setAttribute("alt", data[key]);
      });

      // Update metadata
      const titleTag = document.querySelector("title[data-i18n]");
      if (titleTag) {
        const key = titleTag.getAttribute("data-i18n");
        if (data[key]) titleTag.textContent = data[key];
      }

      const metaDesc = document.querySelector("meta[name='description'][data-i18n]");
      if (metaDesc) {
        const key = metaDesc.getAttribute("data-i18n");
        if (data[key]) metaDesc.setAttribute("content", data[key]);
      }

      // Start typed effect
      const typedEl = document.getElementById("typed-text");
      if (typedEl && data["header.title"]) {
        startTypingEffect(typedEl, data["header.title"]);
      }

      // Update theme label
      const isDark = localStorage.getItem("theme") === "dark";
      updateThemeLabel(isDark, data);

      // Save language preference
      localStorage.setItem("lang", lang);
    })
    .catch(err => console.error("Translation load error:", err));
}

// -----------------------------
// Main Initialization
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Initialize language
  const savedLang = localStorage.getItem("lang") || "en-us";
  changeLang(savedLang);

  // Initialize theme
  initTheme();

  // Initialize navbar
  initNavbar();

  // Initialize dropdowns for mobile
  initMobileDropdowns();

  // Initialize counter animation
  initCounterAnimation();

  // Initialize back to top button
  initBackToTop();

  // Initialize portfolio modal
  initPortfolioModal();
});

// -----------------------------
// Theme Toggle Logic
// -----------------------------
function initTheme() {
  const toggle = document.getElementById("themeToggle");
  const body = document.body;

  if (!toggle) return;

  // Set initial state
  const isDark = localStorage.getItem("theme") === "dark";
  body.classList.toggle("dark-mode", isDark);
  toggle.checked = isDark;

  // Handle toggle change
  toggle.addEventListener("change", () => {
    const nowDark = toggle.checked;
    body.classList.toggle("dark-mode", nowDark);
    localStorage.setItem("theme", nowDark ? "dark" : "light");

    // Update theme label
    const currentLang = localStorage.getItem("lang") || "en-us";
    fetch(`lang/${currentLang}.json`)
      .then(res => res.json())
      .then(data => updateThemeLabel(nowDark, data))
      .catch(err => console.error("Error updating theme label:", err));
  });
}

// -----------------------------
// Navbar Logic
// -----------------------------
function initNavbar() {
  const navbarCollapsible = document.getElementById("mainNav");
  if (!navbarCollapsible) return;

  // Navbar shrink on scroll
  const handleScroll = () => {
    navbarCollapsible.classList.toggle("navbar-shrink", window.scrollY > 0);
  };
  handleScroll();
  document.addEventListener("scroll", handleScroll, { passive: true });

  // Initialize ScrollSpy
  if (typeof bootstrap !== "undefined" && bootstrap.ScrollSpy) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%"
    });
  }

  // Close hamburger menu on nav link click
  const navbarToggler = document.querySelector(".navbar-toggler");
  if (navbarToggler) {
    document.querySelectorAll("#navbarResponsive .nav-link:not(.dropdown-toggle)")
      .forEach(link => {
        link.addEventListener("click", () => {
          if (window.getComputedStyle(navbarToggler).display !== "none") {
            navbarToggler.click();
          }
        });
      });
  }
}

// -----------------------------
// Mobile Dropdown Fix
// -----------------------------
function initMobileDropdowns() {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const bsCollapse = document.getElementById("navbarResponsive");

  if (!navbarToggler || !bsCollapse) return;

  // Prevent collapse close when clicking dropdown toggle
  document.querySelectorAll(".navbar-nav .dropdown-toggle").forEach(toggle => {
    toggle.addEventListener("click", (e) => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        e.stopPropagation();
      }
    });
  });

  // Close hamburger when clicking dropdown item
  document.querySelectorAll(".navbar-nav .dropdown-menu .dropdown-item").forEach(item => {
    item.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none" &&
          bsCollapse.classList.contains("show")) {
        const collapse = bootstrap.Collapse.getInstance(bsCollapse);
        if (collapse) collapse.hide();
      }
    });
  });
}

// -----------------------------
// Counter Animation
// -----------------------------
function initCounterAnimation() {
  const statsSection = document.getElementById("stats");
  const counters = document.querySelectorAll(".counter");

  if (!statsSection || counters.length === 0) return;

  let triggered = false;

  const runCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute("data-target"), 10);
      if (isNaN(target)) return;

      counter.innerText = "0";
      const increment = Math.ceil(target / 50);

      const updateCounter = () => {
        const current = parseInt(counter.innerText, 10);
        if (current < target) {
          counter.innerText = Math.min(current + increment, target);
          setTimeout(updateCounter, 25);
        }
      };
      updateCounter();
    });
  };

  const handleScroll = () => {
    if (triggered) return;

    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight * 0.8;

    if (sectionPos < screenPos) {
      runCounters();
      triggered = true;
      window.removeEventListener("scroll", handleScroll);
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  // Check on load in case section is already visible
  handleScroll();
}

// -----------------------------
// Back to Top Button
// -----------------------------
function initBackToTop() {
  const btn = document.getElementById("btn-back-to-top");
  if (!btn) return;

  const toggleVisibility = () => {
    btn.style.display = window.scrollY > 200 ? "block" : "none";
  };

  toggleVisibility();
  window.addEventListener("scroll", toggleVisibility, { passive: true });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// -----------------------------
// Portfolio Modal
// -----------------------------
function initPortfolioModal() {
  const portfolioModal = document.getElementById("portfolioModal");
  const modalImage = document.getElementById("modalImage");

  if (!portfolioModal || !modalImage) return;

  portfolioModal.addEventListener("show.bs.modal", (event) => {
    const trigger = event.relatedTarget;
    if (trigger) {
      const imgSrc = trigger.getAttribute("data-img");
      if (imgSrc) modalImage.src = imgSrc;
    }
  });
}
