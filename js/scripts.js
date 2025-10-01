// scripts.js - KODE FINAL YANG SUDAH DIPERBAIKI (MEMPERBAIKI BENDERA UTAMA)

// -----------------------------
// Global Variables
// -----------------------------
let typingInterval;

// -----------------------------
// Typed Effect Logic (Single String - No Deleting/Looping)
// -----------------------------
function startTypingEffect(el, text) {
  if (!el || !text) return;

  let charIndex = 0;

  clearInterval(typingInterval); // Hentikan efek lama

  function tick() {
    if (charIndex < text.length) {
      // Tambah karakter
      el.textContent = text.substring(0, ++charIndex);
      // Panggil tick() lagi
      typingInterval = setTimeout(tick, 120); // Kecepatan ketik: 120ms
    } else {
      // Selesai mengetik
      clearInterval(typingInterval); 
    }
  }

  tick(); // Mulai!
}

// -----------------------------
// Language Switch & Theme Label Handler
// -----------------------------
const langOptions = {
  // Hanya simpan kode negara (sesuai Flag Icons)
  "en-us": { flag: "us", label: "English (US)" }, 
  "en-gb": { flag: "gb", label: "English (UK)" },
  "id":    { flag: "id", label: "Bahasa Indonesia" },
  "fr":    { flag: "fr", label: "Français" },
  "it":    { flag: "it", label: "Italiano" },
  "pt":    { flag: "pt", label: "Português" },
  "nl":    { flag: "nl", label: "Nederlands" },
  "de":    { flag: "de", label: "Deutsch" },
  "ar":    { flag: "sa", label: "العربية" }, // Menggunakan Arab Saudi
  "zh":    { flag: "cn", label: "中文" },
  "ja":    { flag: "jp", label: "日本語" },
  "ko":    { flag: "kr", label: "한국어" } // Menggunakan Korea Selatan
};

/**
 * Memperbarui label tema berdasarkan status mode saat ini.
 * @param {boolean} isDark - Status mode gelap saat ini.
 * @param {Object} data - Data terjemahan JSON yang sedang aktif.
 */
function updateThemeLabel(isDark, data) {
    const label = document.getElementById("themeLabel");
    if (!label || !data) return;
    
    const darkModeText = data["darkmode.label"] || "Dark Mode";
    const lightModeText = data["lightmode.label"] || "Light Mode";

    if (isDark) {
        label.textContent = lightModeText;
    } else {
        label.textContent = darkModeText;
    }
}


function changeLang(lang) {
  if (!langOptions[lang]) return;

  const currentFlagEl = document.getElementById("currentFlag");
  
  // 1. Update Bendera Utama (Memastikan Flag Icons Bekerja)
  if (currentFlagEl) {
    // Hapus kelas flag-icon-xxx yang lama
    currentFlagEl.classList.forEach(className => {
      if (className.startsWith('flag-icon-')) {
        currentFlagEl.classList.remove(className);
      }
    });
    // Tambahkan kelas flag-icon-yyy yang baru
    const countryCode = langOptions[lang].flag;
    currentFlagEl.classList.add(`flag-icon-${countryCode}`);
  }

  // 2. Update Label Bahasa Utama
  document.getElementById("currentLang").textContent = langOptions[lang].label;

  // 3. Panggil setLanguage untuk memuat terjemahan
  if (typeof setLanguage === "function") setLanguage(lang);

  localStorage.setItem("lang", lang);
}

function setLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      // 1. Update text nodes, placeholders, and alts 
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (data[key]) el.textContent = data[key];
      });
      document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (data[key]) el.setAttribute("placeholder", data[key]);
      });
      document.querySelectorAll("[data-i18n-alt]").forEach(el => {
        const key = el.getAttribute("data-i18n-alt");
        if (data[key]) el.setAttribute("alt", data[key]);
      });
      
      // Update metadata
      const titleTag = document.querySelector("title[data-i18n]");
      if (titleTag && data[titleTag.getAttribute("data-i18n")]) titleTag.textContent = data[titleTag.getAttribute("data-i18n")];
      const metaDesc = document.querySelector("meta[name='description'][data-i18n]");
      if (metaDesc && data[metaDesc.getAttribute("data-i18n")]) metaDesc.setAttribute("content", data[metaDesc.getAttribute("data-i18n")]);


      // 2. Start Typed Effect (Hanya untuk header.title)
      const typedEl = document.getElementById("typed-text");
      if (typedEl) {
        const titleText = data["header.title"] || ""; 
        
        if (titleText) { 
            startTypingEffect(typedEl, titleText);
        }
      }

      // 3. Update Theme Toggle Label saat memuat bahasa baru
      const isDark = localStorage.getItem("theme") === "dark";
      updateThemeLabel(isDark, data); 

      localStorage.setItem("lang", lang);
    })
    .catch(err => console.error("Translation load error:", err));
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "en-us";
    changeLang(savedLang); 
});


// -----------------------------
// Other Existing Scripts
// -----------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Navbar shrink
  const navbarShrink = () => {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    if (!navbarCollapsible) return;
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove('navbar-shrink');
    } else {
      navbarCollapsible.classList.add('navbar-shrink');
    }
  };
  navbarShrink();
  document.addEventListener('scroll', navbarShrink);

  // Scrollspy
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      rootMargin: '0px 0px -40%',
    });
  }

  // Close responsive nav (Hamburger) on link click
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  document.querySelectorAll('#navbarResponsive .nav-link:not(.dropdown-toggle)')
    .forEach(link => {
      link.addEventListener('click', () => {
        if (window.getComputedStyle(navbarToggler).display !== 'none') {
          navbarToggler.click();
        }
      });
    });
});

// Theme Toggle Logic
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  const body = document.body;
  
  // Set initial state from localStorage
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggle.checked = true;
  } else {
    body.classList.remove("dark-mode");
    toggle.checked = false;
  }
    
  // Logika toggle saat event 'change' terjadi
  toggle.addEventListener("change", () => {
    const currentLang = localStorage.getItem("lang") || "en-us";
    
    if (toggle.checked) {
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
    
    // Panggil fetch untuk mengambil data JSON yang diperlukan dan mengupdate label
    fetch(`lang/${currentLang}.json`)
        .then(res => res.json())
        .then(data => {
            updateThemeLabel(toggle.checked, data);
        })
        .catch(err => console.error("Error updating theme label via fetch:", err));
  });
});

// Ganti gambar modal sesuai thumbnail yang diklik
document.addEventListener("DOMContentLoaded", () => {
  const modalImage = document.getElementById("modalImage");
  const portfolioLinks = document.querySelectorAll('[data-bs-target="#portfolioModal"]');

  portfolioLinks.forEach(link => {
    link.addEventListener("click", function () {
      const imgSrc = this.getAttribute("data-img");
      modalImage.setAttribute("src", imgSrc);
    });
  });
});

// Fix Dropdown di Mobile agar tidak menutup Collapse
document.addEventListener("DOMContentLoaded", () => {
  const dropdownToggles = document.querySelectorAll('.navbar-nav .dropdown-toggle');
  const bsCollapse = document.getElementById('navbarResponsive');
  const navbarToggler = document.body.querySelector('.navbar-toggler');

  // Toggle dropdown di mobile
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      if (window.innerWidth < 992) {
        // ✅ 1. KUNCI: Mencegah default link action dan event bubbling.
        e.preventDefault();
        e.stopPropagation(); 
        
        let dropdownMenu = this.nextElementSibling;
        
        // Cek status dropdown yang sedang diklik
        const isCurrentlyOpen = dropdownMenu.classList.contains('show');

        // 2. Tutup SEMUA dropdown yang sedang terbuka.
        document.querySelectorAll('.navbar-nav .dropdown-menu.show').forEach(menu => {
          menu.classList.remove('show');
        });

        // 3. Jika dropdown ini sebelumnya tertutup, BUKA sekarang.
        if (!isCurrentlyOpen) {
            dropdownMenu.classList.add('show');
        }
      }
    });
  });

  // Klik submenu item → tutup hamburger collapse
  document.querySelectorAll('.navbar-nav .dropdown-menu .dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      // Pastikan hanya di mode mobile/tablet dan collapse sedang terbuka
      if (window.getComputedStyle(navbarToggler).display !== 'none' && bsCollapse.classList.contains('show')) {
        // Gunakan metode .hide() untuk menutup Bootstrap Collapse
        // Ini memastikan menu tertutup setelah navigasi submenu.
        new bootstrap.Collapse(bsCollapse).hide();
      }
    });
  });
});

// Counter animation on scroll
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  let triggered = false;

  function runCounters() {
    counters.forEach(counter => {
      counter.innerText = "0";
      const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const current = +counter.innerText;
        const increment = target / 50; 

        if (current < target) {
          counter.innerText = `${Math.ceil(current + increment)}`;
          setTimeout(updateCounter, 25);
        } else {
          counter.innerText = target;
        }
      };
      updateCounter();
    });
  }

  window.addEventListener("scroll", () => {
    const statsSection = document.getElementById("stats");
    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight * 0.8;

    if (!triggered && sectionPos < screenPos) {
      runCounters();
      triggered = true;
    }
  });
});