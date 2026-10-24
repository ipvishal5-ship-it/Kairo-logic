# KAIROLOGIC TECHNOLOGY — Website Brain / Master Plan

## 1. Source Content (from 3 PDFs)

The website is built around **SARFAESI Intelligence** by ARMS NPA Technologies — a case-management & intelligence platform for Banks, NBFCs, HFCs and ARCs running SARFAESI (Securitisation Act) recovery operations in India.

Key facts:
- Case information is scattered across six sources: Excel sheets, scattered software, email threads, shared folders, phone & WhatsApp, status meetings
- One digital case record — data, documents, photos, geo-location — all in one place
- 8 case stages: Borrower & Loan → Legal Proceedings → Section 13(2)/(4) → Section 14 Order → Physical Possession → Auction & Sale → Recovery & Closure
- Auto-generated SARFAESI documents (Section 13(2) Demand Notice, 13(4) Possession Notice, Inventory, Panchnama)
- Management dashboards: total cases, order pending, possession pending, auction & sale
- Role-based access: field staff, functional team, management, admin
- Mobile field updates: field staff upload property photos and location from phone
- Omnichannel: desktop, laptop, tablet, smartphone
- India deployment, encrypted, role-based access, audit trail
- Contact: Vishal Bidawatjika / Vikas Agarwal, 9892 333340, www.sarfaesi.in

## 2. Brand Identity — Kairologic Technology

**Name:** Kairologic Technology (K and L capitalized — Kairologic, not Kairo)

**Positioning:** "One case. One record. One source of information — from data to recovery."

**Tagline:** "Spend less time collecting data. Spend more time on recovery."

**Brand personality:** International, clean, enterprise-grade, trustworthy, modern. Not a simple old-age website. Think Stripe / Linear / Vercel level of design — generous whitespace, precise typography, subtle motion, dark-mode-first, sophisticated color system.

**Wordmark:** "KAIROLOGIC" bold (display font), "TECHNOLOGY" letter-spaced light (mono font) beneath or beside.

**Logo mark:** Abstract "K" — two converging strokes (scattered → one), in a rounded square.

## 3. Design System

**Colors (dark-first):**
- Ink (background): #0a0e14
- Surface (cards): #111823
- Line (borders): #1e2a3a
- Accent (primary): #4f7cff
- Accent2 (secondary): #22d3aa
- Warn: #f5a623
- Text: #e7ecf3
- Muted: #8a97a8

**Typography:**
- Display (headings, wordmark): Space Grotesk / Inter
- Body: Inter
- Mono (code, labels, timestamps): JetBrains Mono

**Spacing:** 8px grid system. Generous padding. Sections with breathing room.

**Motion:** Framer Motion — page transitions, reveal-on-scroll, staggered children, hover springs, tap scales.

## 4. Website Structure (Single Page, Scroll-Animated)

### Header (sticky, blur)
- Logo wordmark: KAIROLOGIC TECHNOLOGY
- Nav: The Problem, The Record, Dashboards, Trust, Contact
- CTA: Request a demo

### Hero
- Eyebrow: SARFAESI Intelligence
- H1: "One case. One record. Total control." (with "Total control." accented)
- Sub: "Spend less time collecting data. Spend more time on recovery."
- Two CTAs: Request a demo (primary), See how it works (secondary)
- Right side: Live case record card (self-assembling, animated)

### The Problem
- Eyebrow: The Problem
- Title: "One case? Six sources. No single view of the case."
- Converging diagram: 6 nodes → 1 record (SVG lines animating)
- Six limitations grid (Data Limits, Documents Elsewhere, Collaboration, Location Is Manual, Limited Visibility, Time Lost)

### The Record
- Eyebrow: The Record
- Title: "One digital record. Every stage. One place."
- 8-stage case timeline (horizontal, interactive-feeling)
- Case record preview card with linked documents
- Auto-generated documents section (Section 13(2), 13(4), Inventory, Panchnama)

### Dashboards
- Eyebrow: Dashboards
- Title: "From STATUS meetings to ACTION meetings."
- KPI cards: Total cases, Order pending, Possession pending, Auction & Sale
- Pipeline bar chart
- ARC intelligence donut + vintage line
- Trust alerts

### Trust
- Eyebrow: Built for Control
- Three role cards: Role-Based Access, Data Security, Mobile Field Updates
- Three device cards: Desktop/Laptop, Smartphone, Tablet
- Rollout stepper: Pilot → Data Entry Ownership → Train the Team → Review

### Contact
- Eyebrow: The Objective
- Title: "Spend less time collecting data. Spend more time on recovery."
- Footer logo: KAIROLOGIC TECHNOLOGY
- Contact info: phone, address, website
- Copyright: © Kairologic Technology. All rights reserved.

## 5. Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion (motion/react)
- **Charts:** Recharts (for dashboard visualizations)
- **Icons:** Lucide React
- **Fonts:** next/font/google (Inter, Space Grotesk, JetBrains Mono)
- **Language:** TypeScript
- **Runtime:** Webpack (Turbopack has no win32/x64 native bindings)

## 6. Design Principles (International Brand Level)

- **Less is more:** Each section has one clear message. No clutter.
- **Whitespace:** Generous padding, sections breathe.
- **Motion purposeful:** Reveals on scroll, not gratuitous animation.
- **Dark mode first:** Deep ink background with subtle surface elevation.
- **Typography hierarchy:** Clear scale from eyebrow → H1 → body → muted.
- **Accent sparingly:** Brand blue (#4f7cff) used for CTAs and key highlights only.
- **Charts & diagrams:** SVG-based, animated, minimal.
- **No Salesforce references.** No overly detailed security/service jargon.
- **Inactive/empty states:** Thoughtful empty states where data would appear.