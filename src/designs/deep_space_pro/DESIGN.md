---
name: Deep Space Pro
colors:
  surface: '#131319'
  surface-dim: '#131319'
  surface-bright: '#393840'
  surface-container-lowest: '#0e0e14'
  surface-container-low: '#1b1b22'
  surface-container: '#1f1f26'
  surface-container-high: '#2a2930'
  surface-container-highest: '#35343b'
  on-surface: '#e4e1eb'
  on-surface-variant: '#bbc9cd'
  inverse-surface: '#e4e1eb'
  inverse-on-surface: '#303037'
  outline: '#859397'
  outline-variant: '#3c494c'
  surface-tint: '#2fd9f4'
  primary: '#8aebff'
  on-primary: '#00363e'
  primary-container: '#22d3ee'
  on-primary-container: '#005763'
  inverse-primary: '#006877'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#68f5b8'
  on-tertiary: '#003824'
  tertiary-container: '#46d89d'
  on-tertiary-container: '#005a3d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a2eeff'
  primary-fixed-dim: '#2fd9f4'
  on-primary-fixed: '#001f25'
  on-primary-fixed-variant: '#004e5a'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#131319'
  on-background: '#e4e1eb'
  surface-variant: '#35343b'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-base:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: '0'
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: '0'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  container-max: 1280px
---

## Brand & Style

The design system embodies **Aesthetic Authority**—a high-performance, hyper-technical atmosphere designed for elite developer workflows. It leverages a "Deep Space Pro" aesthetic, characterized by infinite obsidian depths and razor-sharp technical precision. 

The visual language balances **Minimalism** with **Glassmorphism**, utilizing semi-transparent layers and backdrop blurs to create a sense of organized complexity. Every element is designed to evoke an emotional response of "instantaneous power" and "systematic focus." The UI is intentionally dark, reducing eye strain during long coding sessions while using vibrant neon accents to draw attention to critical AI-augmented insights and success states.

Key stylistic markers:
- **Obsidian Foundations:** Pure dark backgrounds that create a void-like canvas.
- **Razor-Sharp Linework:** 1px borders that define structure without adding weight.
- **Neon Accents:** Electric cyan and matrix green highlights that cut through the darkness.
- **Bento-style Modularization:** Information is compartmentalized into discrete, high-density widgets.

## Colors

The palette is rooted in the high-contrast environment of deep space. 

- **Primary (Electric Cyan):** Used for critical paths, primary actions, and active navigation indicators.
- **Secondary (Muted Violet):** Represents AI-augmented layers, logic flows, and sophisticated system intelligence.
- **Tertiary (Matrix Green):** Dedicated to "code success," completed tasks, and positive growth metrics.
- **Neutral (Obsidian & Slate):** The background is a solid, light-absorbing charcoal. Slate tones provide the hierarchy for secondary and tertiary text.

All surfaces utilize an `80%` to `60%` opacity obsidian fill combined with a `12px` to `20px` backdrop blur to maintain legibility against background glows.

## Typography

Typography is a dual-force system. **Geist Sans** handles the human side—headings and interface copy—providing a clean, technical, and modern sans-serif feel. **JetBrains Mono** is reserved for the "machine" side—code snippets, numerical data, status labels, and metadata.

- **Headings:** Use tight letter-spacing and heavy weights to create a sense of impact and authority.
- **Labels:** Monospaced elements should always have slightly increased letter-spacing (`0.05em`) to ensure maximum character definition in high-density data views.
- **Gradients:** Large display headings should occasionally employ a linear gradient from `Violet` to `Cyan` to emphasize the AI-integrated nature of the platform.

## Layout & Spacing

The system follows a strict **4px/8px modular rhythm**. The layout is primarily a **Bento Grid**—a collection of varied-size rectangular containers that fit together with mathematical precision.

- **Grid:** A 12-column desktop grid with `16px` gutters. Bento widgets typically span 3, 4, 6, or 12 columns.
- **Omni-Bar:** Navigation is centralized in a persistent, top-aligned (or bottom-centered) Command Palette bar. Avoid standard sidebar navigation; use the palette for deep-linking.
- **Margins:** Standard page margins are `32px` on desktop, collapsing to `16px` on mobile.
- **Density:** High information density is preferred. Use the `md` (16px) spacing for internal widget padding to keep the UI feeling "pro" and compact.

## Elevation & Depth

Hierarchy is established through **Backdrop Layers** and **Luminescence** rather than traditional shadows.

- **Stacking:** The background is the lowest level (`z-0`). Glassmorphic Bento cards sit at (`z-10`). Floating modals or the Omni-Bar sit at (`z-50`).
- **Surface Treatment:** Cards use a 1px `border-subtle` and a very faint `10-15%` background opacity. 
- **Glows:** Instead of drop shadows, use **Outer Glows**. Interactive elements or "Hot" widgets feature a soft radial glow (`blur: 40px`, `opacity: 6%`) using the accent color (Cyan or Violet) to simulate light emanating from the screen.
- **Borders:** Active states are indicated by increasing the border opacity from `8%` to `30%`, never by increasing border width.

## Shapes

The shape language is modern and "Soft-Technical." 

- **Containers:** Bento widgets and cards use `rounded-lg` (16px) to contrast the sharp 1px borders.
- **Interactive Elements:** Buttons and input fields use `rounded-md` (8px) for a slightly more precise, functional look.
- **Status Pills:** Small technical tags or language indicators use `rounded-full` (pill-shaped) to distinguish them from structural elements.

## Components

### Buttons
- **Primary:** Gradient fill (Violet to Indigo), white text, with a matching color outer glow.
- **Ghost:** Transparent background, `1px` border (Slate-700), Cyan text on hover.
- **Micro-interaction:** Buttons should scale slightly (`0.98`) on click to mimic physical feedback.

### Omni-Bar (Command Palette)
- A floating, glassmorphic bar positioned at the top or center. 
- Features a `Cmd+K` keyboard shortcut label in `JetBrains Mono`.
- On activation, it expands into a full-screen blurred overlay with a search-first interface.

### Bento Cards
- Obsidian glass background.
- Razor-sharp `1px` border at `8%` opacity.
- Subtle `6%` opacity radial glow positioned behind the most important data point (e.g., a "Current Streak" number).

### Inputs & Code Fields
- **Inputs:** Darker than the card surface (`#0a0a10`), with a focus state that triggers a Cyan border and a subtle Cyan outer glow.
- **Code Blocks:** JetBrains Mono font, 14px, with syntax highlighting optimized for deep dark backgrounds (high-saturation cyans, greens, and purples).

### Roadmap Nodes
- Small, 144px width glass cards connected by `2px` SVG paths.
- Active nodes have a "pulsing" Cyan glow; locked nodes are `40%` desaturated.