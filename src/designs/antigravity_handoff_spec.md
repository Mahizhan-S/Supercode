# UI Handoff Specification: Supercode (Deep Space Pro)
**Target Tool:** Antigravity AI
**Design System:** {{DATA:DESIGN_SYSTEM:DESIGN_SYSTEM_1}}

## 1. Visual Identity & Tokens
- **Theme:** Ultra-Dark (Dark Mode)
- **Primary Color:** Cyan (#22d3ee) - Used for accents, status indicators, and primary CTAs.
- **Surface Palette:** 
  - Background: `#131319`
  - Container Low: `#1b1b22`
  - Container High: `#393840`
- **Typography:** Geist (Sans-serif/Mono blend). High-density, technical spacing.
- **Borders:** 1px "Razor" borders (`border-outline-variant/10`).
- **Layout:** Bento-box style cards with `rounded-lg` (8px) corners.

## 2. Core UI Patterns
- **Omni-Bar:** Keyboard-first Cmd+K interface for global navigation.
- **Navigation:** Persistent left-hand icon-only SideNavBar with high-contrast active states.
- **Architecture Visualization:** Interactive node-based mapping for infra-as-code relationships.
- **Live Logs:** Monospaced console output with standard log level color-coding (Info: Green, Error: Red, Debug: Cyan).

## 3. Screen References
- **Landing Page ({{DATA:SCREEN:SCREEN_4}}):** High-conversion layout with glassmorphism and tech-centric value props.
- **Dashboard ({{DATA:SCREEN:SCREEN_6}}):** Split-view YAML editor vs. Architecture Map.
- **Deployments ({{DATA:SCREEN:SCREEN_2}}):** Real-time status cards and velocity charts.
- **Settings ({{DATA:SCREEN:SCREEN_5}}):** High-density configuration tables and health metrics.

## 4. Implementation Guidance for Antigravity
- Use Tailwind CSS for rapid styling matching the provided colors.
- Maintain the fixed-shell navigation structure defined in `SideNavBar` and `TopNavBar` components.
- Ensure all interactive elements have 200ms scale/opacity transitions for a premium feel.
