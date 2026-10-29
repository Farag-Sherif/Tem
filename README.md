# TAM — Booths & more 🏛️✨
### Exhibition Architecture, Turnkey Fabrication & Modular Systems

[![React 19](https://img.shields.io/badge/React-19.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-14.7.1-F08?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![Lenis Scroll](https://img.shields.io/badge/Lenis-Smooth_Scroll-DFFF00?style=for-the-badge&logoColor=black)](https://lenis.darkroom.engineering/)
[![i18n](https://img.shields.io/badge/i18n-English_%7C_العربية-white?style=for-the-badge)](src/i18n/)

> **"Your booth, from first 3D sketch to the show floor — one accountable partner for the entire journey."**  
> **"رحلة جناحك من أول سكتش 3D لأرض المعرض — جهة واحدة مسؤولة عن الرحلة كلها."**

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [Interactive 6-Step Booth Configurator (Modal Popup)](#1-interactive-6-step-booth-configurator-modal-popup)
  - [Dynamic Exhibition Season Hero](#2-dynamic-exhibition-season-hero)
  - [End-to-End Stages Rail (Journey)](#3-end-to-end-stages-rail-journey)
  - [Horizontal Showcase Rail (Work)](#4-horizontal-showcase-rail-work)
  - [Architectural Services Grid](#5-architectural-services-grid)
  - [Continuous Hardware-Accelerated Marquee](#6-continuous-hardware-accelerated-marquee)
  - [Bilingual Localization Engine (EN / AR)](#7-bilingual-localization-engine-en--ar)
  - [Inertial Smooth Momentum Scroll](#8-inertial-smooth-momentum-scroll)
- [Design System & Visual Language](#-design-system--visual-language)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Brand Guidelines & Attribution](#-brand-guidelines--attribution)

---

## 🌟 Overview

**TAM — Booths & more** is a next-generation web application built for a premier exhibition booth design and fabrication studio based in Cairo, Egypt. 

Unlike traditional contractors who fragment projects between third-party suppliers, TAM operates with **100% in-house manufacturing**: joinery, metalwork, custom CNC carving, paint finishes, graphics, and architectural lighting all take place under one roof.

The web platform is engineered with a **dark luxury architectural aesthetic** (inspired by TAM Brand Guidelines v1.0), featuring ultra-smooth animations, bilingual support (English LTR by default, Arabic RTL on demand), and an advanced **interactive 6-step booth configuration engine** that allows exhibitors to specify their booth requirements in detail.

---

## 🚀 Key Features

### 1. Interactive 6-Step Booth Configurator (Modal Popup)
*Component: [`src/components/BoothConfigModal.tsx`](src/components/BoothConfigModal.tsx)*

Exhibitors can launch an engineered 3D specification tool directly from the contact section via the **`+ Add Booth Specifications` / `+ إضافة بيانات ومواصفات الجناح`** action button.

- **Zero Redundant Data Entry (Pre-fill Sync):** If a user types their Full Name, Email/Phone, or Project Details into the main Contact form, these details automatically populate Step 5 inside the modal.
- **Strict Step Validation Gate:** Users cannot skip ahead or jump to any step until all required fields of previous and current steps are verified. Locked steps are displayed with a lock badge (`🔒`) and visual warning indicators.
- **Step 1 — Dimensions & Footprint:**
  - Interactive numeric inputs and increment/decrement buttons for Width (min 2m), Depth (min 2m), and Height (min 2m).
  - Real-time geometric calculations: Floor Area ($m^2$) and Space Volume ($m^3$).
- **Step 2 — Booth Layout & Configuration:**
  - 4 architectural configurations: **Inline** (1 open side), **Corner** (2 open sides), **Peninsula** (3 open sides), and **Island** (4 open sides / 360° pavilion).
  - Custom vector architectural blueprints illustrating visitor traffic flow and wall structures.
- **Step 3 — Design Aesthetics & Brand Identity:**
  - Architectural styling selectors (*Modern*, *Luxury*, *Minimalist*, *Technology*, *Corporate*).
  - 10-swatch brand color palette selector (select up to 3 colors).
  - Mandatory industry sector dropdown.
  - Brand logo vector/raster file upload.
- **Step 4 — Specialized Facilities & Technology:**
  - High-impact toggleable components: LED Screen displays, Luxury Reception Counter, VIP Meeting Room, Secure Storage Room, and Double Deck / Mezzanine structure.
- **Step 5 — Target Budget & Client Information:**
  - Pre-filled contact details (Full Name, Phone/WhatsApp, Company Name).
  - Interactive budget slider range from \$1,000 to \$50,000+ USD.
  - Special requirements & architectural notes field.
- **Step 6 — Review & Architectural Spec Sheet:**
  - Renders a formal **TAM Technical Specification Sheet (v1.0 — Confidential)** summarizing all selections with quick-jump edit links.
  - Interactive submission with loading feedback, success confirmation, and automated status synchronization back to the main contact form.

---

### 2. Dynamic Exhibition Season Hero
*Component: [`src/components/Hero.tsx`](src/components/Hero.tsx)*

- **Exhibition Season Live Badge:** Pulsing live indicator for the current 2026/2027 season.
- **Auto-Transitioning Showcase Card:** Highlights flagship modular pavilions on an automated 3.2-second interval, featuring smooth cross-fading, tag chips, and architectural metadata.
- **Studio Key Metrics:** Quick verification counters showcasing:
  - `01` Accountable Partner
  - `100%` In-House Fabrication
  - `06` End-to-End Stages
  - `0` Handover Delays

---

### 3. End-to-End Stages Rail (Journey)
*Component: [`src/components/Journey.tsx`](src/components/Journey.tsx)*

Documents the complete client journey from contract signing to warehouse storage:
1. **Stage 01:** Before the Show — Dates & Raw Floor Space Analysis.
2. **Stage 02:** Architectural 3D Concept & Engineering Drawings.
3. **Stage 03:** In-House Workshop Fabrication & QC Inspection.
4. **Stage 04:** On-Site Exhibition Installation & MEP Works (Handover 24h before opening).
5. **Stage 05:** Show Days Live Support & VIP Reception.
6. **Stage 06:** Careful Dismantling, Packing & Multi-Show Storage.

Features a sticky progression rail with scroll-driven parallax image scaling.

---

### 4. Horizontal Showcase Rail (Work)
*Component: [`src/components/Work.tsx`](src/components/Work.tsx)*

- High-impact horizontal scrolling gallery presenting real-world projects.
- Engineered with directional normalization to prevent translation vanishing in both LTR and RTL orientations.
- Rich project cards showing execution year, surface area, and high-resolution photography.

---

### 5. Architectural Services Grid
*Component: [`src/components/Services.tsx`](src/components/Services.tsx)*

Displays the studio's 6 foundational capabilities:
- Custom Booths (Tailored 3D architecture)
- Modular Systems (Reusable aluminum & timber systems)
- Double Deck Structures (Engineered mezzanines & VIP lounges)
- Reception Desks & Point of Contact Furniture
- Brand Environments & Lighting Scenography
- Secure Multi-Show Dismantle & Storage Facility

---

### 6. Continuous Hardware-Accelerated Marquee
*Component: [`src/components/ui/Marquee.tsx`](src/components/ui/Marquee.tsx)*

- Fully infinite, CSS-accelerated ticker ribbons.
- Renders dual synchronized tracks to guarantee zero gaps, zero stutters, and continuous movement across screen sizes and RTL/LTR switches.

---

### 7. Bilingual Localization Engine (EN / AR)
*Module: [`src/i18n/`](src/i18n/)*

- Complete two-way localization between **English (default)** and **Arabic**.
- Instant runtime toggle without full page reloads via `LangContext.tsx`.
- Dynamic document metadata updates (`dir="ltr"` / `dir="rtl"`, `lang="en"` / `lang="ar"`, dynamic `document.title`).
- Font family auto-switching:
  - English: `Syncopate` (Display) & `Poppins` (Body).
  - Arabic: `IBM Plex Sans Arabic` (Display & Body).

---

### 8. Inertial Smooth Momentum Scroll
*Hook: [`src/lib/useLenis.ts`](src/lib/useLenis.ts)*

- Integrated with [Lenis](https://lenis.darkroom.engineering/) for smooth, luxury inertial scrolling.
- Automatically disabled during modal display to prevent background scroll interference.

---

## 🎨 Design System & Visual Language

Guided by **TAM Brand Guidelines v1.0 — Built Piece by Piece**:

| Token | Value | Description |
| :--- | :--- | :--- |
| **Dark Ink** | `#0F1103` | Primary deep atmospheric background |
| **TAM Indigo** | `#0F0566` | Secondary accent & volumetric radial glow |
| **Electric Lime** | `#DFFF00` | Signature brand neon accent, active indicators & CTA glow |
| **Pure White** | `#FFFFFF` | Primary typography & high-contrast elements |
| **Muted White** | `rgba(255,255,255,0.65)` | Body copy & secondary descriptions |
| **Border Glass** | `rgba(255,255,255,0.12)` | Subtle architectural wireframe divider borders |
| **Film Grain** | SVG turbulence | Subtle analog overlay texture (`mix-blend-mode: overlay`) |

---

## 🛠️ Tech Stack

- **Framework:** [React 19.3](https://react.dev/) + [React DOM 19.3](https://react.dev/)
- **Language:** [TypeScript 7.0](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 8.3](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4.3](https://tailwindcss.com/)
- **Animation & Transitions:** [Motion 14.7 (Framer Motion)](https://motion.dev/)
- **Smooth Scrolling:** [Lenis 1.3](https://lenis.darkroom.engineering/)
- **Linter & Code Quality:** [Oxlint 1.89](https://oxc.rs/)

---

## 📂 Project Architecture

```
tam-site/
├── public/                     # Static brand assets, photography, and web fonts
│   ├── brand/                  # Vector logos & symbol marks
│   ├── fonts/                  # Syncopate, Poppins, IBM Plex Sans Arabic
│   └── media/work/             # High-res exhibition booth photographs
├── src/
│   ├── components/             # React feature sections & configurator
│   │   ├── ui/                 # Reusable atomic UI components
│   │   │   ├── Marquee.tsx     # Hardware-accelerated infinite ticker
│   │   │   ├── Reveal.tsx      # Viewport scroll entrance wrapper
│   │   │   ├── SectionHead.tsx # Consistent section kicker/title/lead
│   │   │   └── Symbol.tsx      # TAM geometric 4-square brand symbol
│   │   ├── BoothConfigModal.tsx# 6-step interactive modal configurator
│   │   ├── BoothConfigurator.tsx# Standalone configurator engine
│   │   ├── Clients.tsx         # Partner network & brand slots
│   │   ├── Contact.tsx         # Contact section with spec modal trigger
│   │   ├── Glance.tsx          # Key value propositions
│   │   ├── Hero.tsx            # Cinematic hero with auto-rotating showcase
│   │   ├── Journey.tsx         # 6-stage end-to-end execution rail
│   │   ├── Loader.tsx          # Initial luxury brand entrance loader
│   │   ├── Nav.tsx             # Responsive glassmorphic navigation bar
│   │   ├── Services.tsx        # 6 core architectural services
│   │   ├── Standards.tsx       # Brand geometry & manufacturing rules
│   │   └── Work.tsx            # Horizontal portfolio showcase rail
│   ├── i18n/                   # Internationalization engine
│   │   ├── copy.ts             # Complete English & Arabic translation dictionaries
│   │   └── LangContext.tsx     # Language state provider & HTML dir synchronization
│   ├── lib/
│   │   └── useLenis.ts         # Smooth momentum scroll hook
│   ├── App.tsx                 # Main application structure & section orchestration
│   ├── index.css               # Tailwind v4 configuration, font faces, & custom utilities
│   └── main.tsx                # React root mount
├── package.json                # Project dependencies & build scripts
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite bundler configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version **18.0.0** or higher recommended).

### 1. Clone the repository

```bash
git clone https://github.com/Farag-Sherif/Tem.git
cd Tem
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start local development server

```bash
npm run dev
```

The application will start on `http://localhost:5173/` (or the next available port).

### 4. Create production build

```bash
npm run build
```

This compiles TypeScript definitions (`tsc -b`) and bundles production assets via Vite into the `dist/` directory.

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Launches the local Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Runs TypeScript type checking and generates an optimized production bundle. |
| `npm run lint` | Runs the high-speed Rust-based [Oxlint](https://oxc.rs/) linter across all `.ts` and `.tsx` files. |
| `npm run preview` | Locally serves the generated production build from `dist/` for verification. |

---

## 📐 Brand Guidelines & Attribution

- **Brand:** TAM — Booths & more
- **Identity System:** TAM Brand Guidelines v1.0
- **Architectural Workshop:** Central TAM Workshop, Cairo, Egypt
- **Symbol Rules:** The TAM 4-square geometric symbol must always preserve square angles and proportional alignment.

---

<div align="center">
  <sub>Built piece by piece with precision engineering & craftsmanship. © 2026 TAM. All rights reserved.</sub>
</div>
