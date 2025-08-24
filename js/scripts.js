// scripts.js - clean version with SimpleLightbox fix

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

  // Close responsive nav
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  document.querySelectorAll('#navbarResponsive .nav-link')
    .forEach(link => {
      link.addEventListener('click', () => {
        if (window.getComputedStyle(navbarToggler).display !== 'none') {
          navbarToggler.click();
        }
      });
    });


});

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  const label = document.getElementById("themeLabel");
  const body = document.body;

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggle.checked = true;
    label.textContent = "Light Mode";
  }

  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
      label.textContent = "Light Mode";
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
      label.textContent = "Dark Mode";
    }
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


document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded fired"); // 👈 test
  const modalImage = document.getElementById("modalImage");
  const portfolioLinks = document.querySelectorAll('[data-bs-target="#portfolioModal"]');

  portfolioLinks.forEach(link => {
    link.addEventListener("click", function () {
      const imgSrc = this.getAttribute("data-img");
      console.log("Setting modal image:", imgSrc); // 👈 test
      modalImage.setAttribute("src", imgSrc);
    });
  });
});

// Cegah hamburger collapse menutup saat klik dropdown toggle
document.addEventListener("DOMContentLoaded", () => {
  const dropdownToggles = document.querySelectorAll('.navbar-nav .dropdown-toggle');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      if (window.innerWidth < 992) { // hanya berlaku di mobile
        e.preventDefault(); // cegah link "#" jalan
        e.stopPropagation(); // cegah event tutup collapse

        let dropdownMenu = this.nextElementSibling;
        if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
          dropdownMenu.classList.toggle('show');
        }
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const dropdownToggles = document.querySelectorAll('.navbar-nav .dropdown-toggle');
  const dropdownItems = document.querySelectorAll('.navbar-nav .dropdown-menu .dropdown-item');
  const bsCollapse = document.getElementById('navbarResponsive');

  // Toggle dropdown di mobile
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      if (window.innerWidth < 992) { // hanya mobile
        e.preventDefault();
        let dropdownMenu = this.nextElementSibling;

        // Tutup semua dropdown lain dulu
        document.querySelectorAll('.navbar-nav .dropdown-menu.show').forEach(menu => {
          if (menu !== dropdownMenu) menu.classList.remove('show');
        });

        // Toggle submenu ini
        dropdownMenu.classList.toggle('show');
      }
    });
  });

  // Klik submenu item → tutup hamburger collapse
  dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth < 992 && bsCollapse.classList.contains('show')) {
        new bootstrap.Collapse(bsCollapse).toggle();
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // semua dropdown toggle di navbar
  const dropdownToggles = document.querySelectorAll('.navbar-nav .dropdown-toggle');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      if (window.innerWidth < 992) { // hanya berlaku di layar kecil
        e.preventDefault(); // cegah link "#" lompat
        e.stopPropagation(); // cegah event collapse auto-close

        let dropdownMenu = this.nextElementSibling;

        if (dropdownMenu) {
          dropdownMenu.classList.toggle('show');
        }
      }
    });
  });

  // kalau klik item di dalam dropdown → tutup menu collapse
  document.querySelectorAll('.navbar-nav .dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      const navbarCollapse = document.getElementById('navbarResponsive');
      if (navbarCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navbarCollapse).toggle();
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
        const increment = target / 200; // semakin besar divisor semakin lambat

        if (current < target) {
          counter.innerText = `${Math.ceil(current + increment)}`;
          setTimeout(updateCounter, 15);
        } else {
          counter.innerText = target;
        }
      };
      updateCounter();
    });
  }

  // Deteksi scroll ke section stats
  window.addEventListener("scroll", () => {
    const statsSection = document.getElementById("stats");
    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (!triggered && sectionPos < screenPos) {
      runCounters();
      triggered = true;
    }
  });
});
