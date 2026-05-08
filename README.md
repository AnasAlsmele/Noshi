# Noshi Front-end Toolkit

<p align="center">
  <img src="./docs/imgs/Noshi.png" width="128" height="128" alt="Noshi Logo" />
</p>

<p align="center">
  <strong>A premium, lightweight, and modern front-end toolkit for building high-end web applications from scratch.</strong>
</p>

---

## ✨ Features

- 💎 **Premium Design System**: Centralized CSS variables for consistent, high-end aesthetics.
- 🚀 **Lightweight & Fast**: Zero dependencies, pure JavaScript and CSS.
- 🛠️ **Component Builder**: Modern API for creating complex UI elements (Cards, Forms, Modals, Tabs, Toasts, etc.) programmatically.
- 📊 **Dynamic Graphs**: Built-in SVG-based graphing system.
- 📱 **Responsive & RTL**: Out-of-the-box support for mobile devices and Right-to-Left languages.
- 📦 **Promise-based AJAX**: Modern asynchronous handling for data fetching.

---

## 🚀 Quick Start

1. **Clone the repository** to your project folder.
2. **Include the files** in your HTML:

```html
<!-- Noshi Styles -->
<link rel="stylesheet" href="path/to/noshi.css">

<!-- Noshi Core JS -->
<script src="path/to/noshi.js"></script>

<script>
    Noshi.start(() => {
        const builder = new NoshiBuilder();
        
        // Build a primary button
        const btn = builder.button({
            text: "Get Started",
            class: "active",
            click: () => alert("Welcome to Noshi!")
        });
        
        document.body.appendChild(btn);
    });
</script>
```

---

## 📘 Documentation

Explore our beautiful documentation site to see all components and functions in action:
[**View Documentation**](https://anasalsmele.github.io/Noshi/)

---

## 🏗️ Building from Scratch

Noshi is designed to be a **dependent framework**—everything is built from the ground up to give you full control over your project's architecture. Whether you are building a simple landing page or a complex dashboard, Noshi provides the foundation you need.

---

### ✍️ Author
**Anas Alsmele** - A developer who loves to create tools that speed up the building process.

*Noshi 2026 © All rights reserved.*
