# VouliWatch CY — Design Brainstorm

## Chosen Design Philosophy: **Civic Editorial + Modern Minimalism**

After exploring multiple approaches, I'm committing to a design that combines **civic-tech credibility** with **modern editorial clarity**. This approach positions VouliWatch as a trustworthy, accessible platform for understanding parliamentary activity—not a government website, not a political platform, but a **public-interest journalism hub**.

---

## Core Design Principles

1. **Clarity Over Decoration** — Every visual element serves information hierarchy. No unnecessary ornament.
2. **Civic Gravitas** — Navy and gold evoke institutional trust without sterility. The sun emblem anchors the brand.
3. **Editorial Flow** — Content is organized like a well-designed news publication: hero, archive, explainers, disclaimers.
4. **Accessible Depth** — Subtle shadows, generous whitespace, and smooth transitions create polish without distraction.

---

## Color Philosophy

The prompt provides a precise palette; I'm interpreting it with intention:

- **Navy (#1B2A4A)** — Primary background for headers and hero sections. Conveys institutional authority and calm focus.
- **Gold (#C9A84C)** — Accent for CTAs, status badges, left-border highlights, and the emblem. Represents civic importance and warmth.
- **Cream (#F8F6F1)** — Soft, readable background for content blocks. Reduces eye strain compared to pure white.
- **Text (#1A1A2E)** — Deep charcoal for body text. Ensures readability on light backgrounds.

**Emotional Intent:** Trustworthy, editorial, modern. Not cold, not corporate.

---

## Layout Paradigm

- **Hero Section:** Horizontal scroll-snap card deck (the swipe deck) — a unique, interactive entry point that immediately shows the latest session's topics.
- **Archive Section:** Responsive grid (1 column mobile, 3 columns desktop) for session history.
- **Detail Pages:** Full-width editorial layout with navy header block, vertical topic cards, and clear navigation.
- **Asymmetric Spacing:** Use generous padding and breathing room; avoid centered, cramped layouts.

---

## Signature Elements

1. **Sun Emblem (Logo)** — Placed in navbar and footer. Reinforces the civic, optimistic brand identity.
2. **Gold Left-Border Accent** — Applied to key content blocks (topic cards, disclaimer banner). Creates visual rhythm.
3. **Status Badges** — Color-coded pills (green/amber/red/gray) for decision outcomes. Instantly scannable.

---

## Interaction Philosophy

- **Smooth Scroll-Snap Deck** — No heavy JavaScript carousel library. CSS scroll-snap provides native, performant swiping.
- **Hover Transitions (150ms ease)** — Subtle, responsive feedback on interactive elements.
- **Language Toggle** — Simple, persistent toggle in navbar (no flags, just text: "EL / EN").
- **Topic Counter** — Updates as user scrolls through the hero deck (IntersectionObserver).

---

## Animation Guidelines

- **Entrance Animations:** Fade-in on page load (200ms ease-out). Staggered for list items.
- **Scroll Interactions:** Subtle parallax or opacity shifts for hero images (if used). Keep it minimal.
- **Hover States:** 150ms ease transitions on buttons, links, and cards. Scale slightly (1.02x) or add shadow depth.
- **Transitions:** All motion uses `ease` or `ease-out` timing functions. No bouncy easing.

---

## Typography System

- **Headlines (Syne)** — Bold, distinctive, civic. Used for page titles, section headers, topic titles.
  - H1: 2.5rem (40px) weight 700
  - H2: 2rem (32px) weight 700
  - H3: 1.5rem (24px) weight 600
  
- **Body (Source Serif 4)** — Readable, editorial, trustworthy. Used for all body text, session summaries, explanations.
  - Body: 1rem (16px) weight 400
  - Small: 0.875rem (14px) weight 400
  
- **Monospace (JetBrains Mono)** — Used for timestamps, vote counts, evidence timestamps.
  - Evidence: 0.875rem (14px) weight 400

---

## Visual Assets

- **Hero Background:** A subtle, abstract pattern or gradient that suggests parliamentary/civic themes (e.g., soft geometric shapes, light texture). Kept minimal to avoid distraction.
- **Session Card Backgrounds:** Cream or white with subtle shadows (0 2px 8px rgba(0,0,0,0.08)).
- **No images in topic cards** — Text-only, lightweight, as specified.

---

## Responsive Behavior

- **Mobile:** Full-width, single-column layouts. Hero deck shows ~1.5 cards with swipe hint. Navbar collapses if needed.
- **Tablet:** 2-column grids for session archives. Hero deck shows ~2 cards.
- **Desktop:** 3-column grids. Hero deck shows ~1.5 cards (encouraging swipe interaction).

---

## Design Consistency Checklist

- [ ] All buttons use gold background with navy text or navy background with gold text.
- [ ] All section headers use Syne font, navy color.
- [ ] All body text uses Source Serif 4, dark text color.
- [ ] All timestamps/votes use JetBrains Mono.
- [ ] All cards have 12px border-radius and subtle shadow.
- [ ] All transitions are 150ms ease.
- [ ] Whitespace is generous (min 2rem between sections).
- [ ] Status badges follow the color scheme (green/amber/red/gray).
- [ ] Gold left-border applied to key blocks (topic cards, disclaimer).
