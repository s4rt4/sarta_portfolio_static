# 🎨 Sarta's Professional Graphic Design Portfolio

This repository contains a heavily customized and feature-rich portfolio website built upon the **[StartBootstrap Creative](https://startbootstrap.com/theme/creative)** theme. The project serves as a showcase for my work, demonstrating not only high-quality design but also modern front-end stability, performance, and accessibility enhancements.

All core design, structure, and underlying code have been **significantly modified and extended by me** (Sarta) to integrate advanced user features and multilingual capabilities.

---

## 🚀 Live Demo
This project is deployed via **GitHub Pages** with a custom domain.  
[View the live demo here](https://sarta.click)

---

## ✨ Key Features & Enhancements

This portfolio is equipped with custom JavaScript and CSS logic to ensure a dynamic and seamless user experience:

### 🌐 Multilingual System & Localization (i18n)
* **Dynamic Language Switch:** Seamlessly switch the entire content (text nodes, placeholders, metadata) using JSON files for translation, supporting **12 languages**.
* **Localized UI:** Flags and language labels in the navigation menu are dynamically updated using **Flag Icons CSS** for consistency and clean integration.
* **Flexible Setup:** Supports custom JSON keys for **Dark Mode** and **Light Mode** labels, ensuring theme messages are also translated correctly.

### ✍️ Hero Banner Interactivity
* **Custom Typewriter Effect:** The main headline (`header.title`) features a custom-built, lightweight typing animation for a high-impact presentation, isolated from other tagline text.
* **Optimized Rendering:** The typing logic is fully integrated with the language switching mechanism, ensuring the animation immediately begins in the correct language upon loading or language change.

### 🌓 Accessibility & Theming
* **Dark Mode Toggle:** A persistent toggle button allows users to instantly switch between Light and Dark themes, with preferences saved via `localStorage`.
* **Adaptive Styling:** Custom CSS ensures that all major sections (Navbar, Reviews, Portfolio sections, and Form Inputs) adapt visually to the active theme.

### ⚙️ Performance & UX
* **Scroll-based Counter:** The statistics section (`#stats`) features numerical counters that animate when the user scrolls them into view, providing engaging interaction.
* **Portfolio Dropdown Fix:** Custom JavaScript logic prevents the common Bootstrap bug where clicking a dropdown link inside the mobile *hamburger menu* forces the entire menu to close, ensuring a smooth mobile navigation experience.
* **Custom Typography:** The footer quote and headline tagline use the distinct **Romanesco** font, applied via CSS for unique stylistic emphasis.

---

## 🔨 Technical Implementation Details

* **Front-end Framework:** Bootstrap v5.3.
* **Language Handling:** Custom JavaScript `fetch` and DOM manipulation (Vanilla JS).
* **Core Scripts:** Clean, modular `scripts.js` managing scroll events, theme toggle logic, modal display, and all custom animations.

---

## ⚖️ License & Attribution
-   Original theme: [StartBootstrap Creative](https://startbootstrap.com/theme/creative) (MIT License).
-   Framework: [Bootstrap](https://getbootstrap.com/) (MIT License).
-   Hero Banner Photography: [By Domenico Loia](https://unsplash.com/photos/black-tablet-computer-rPkgcGHfDUo).
-   Modifications & Custom Code (JS, CSS Logic): © 2025 by **Sarta**.

This project is distributed under the **MIT License**, but **please retain attribution** to both **StartBootstrap** and myself when reusing or redistributing.

---

## 📌 Notes
-   This repository is intended for **portfolio/showcase purposes** only.
-   For production/commercial usage, please review the license terms and provide proper attribution.