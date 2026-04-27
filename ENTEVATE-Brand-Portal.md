# ENTEVATE Brand Portal Reference

Technical and content reference for the password-gated Brand Portal page at `/brand`.

---

## 1. Overview

The Brand Portal is an internal resource hub for the ENTEVATE team and trusted partners. It consolidates brand assets, design system documentation, and go-to-market playbooks into a single, password-protected web application. The portal lives at `/brand` and is excluded from search engine indexing.

**Audience:** Internal team members, partner agencies, and collaborators who need access to brand guidelines, design tokens, and sales enablement materials.

---

## 2. Architecture

The Brand Portal is built as an Astro page wrapping a React component.

**File structure:**

- `src/pages/brand.astro` -- Astro page wrapper
- `src/components/BrandPortal.jsx` -- Full React component (all tabs, data, and logic)
- `src/brand-portal.css` -- Portal-specific styles (separate from global CSS)

**How it works:**

- The Astro page imports `BaseLayout`, `global.css`, and `brand-portal.css`.
- The React component is loaded with `client:load`, which hydrates on page load (required for the interactive password gate and tab navigation).
- A `<meta name="robots" content="noindex, nofollow" />` tag is injected into the `<head>` via Astro's `slot="head"` mechanism.
- All portal data (colors, typography, personas, battle cards, etc.) is defined as constants at the top of `BrandPortal.jsx`, not fetched from an API.

---

## 3. Authentication

The portal uses a simple client-side password gate.

**Password:** Hardcoded in the component as `PASSWORD = 'entevate2026'`.

**Session key:** `entevate_brand_auth` stored in `sessionStorage`.

**Flow:**

1. On mount, the component checks `sessionStorage.getItem('entevate_brand_auth')`.
2. If the value is `'1'`, the user is considered authenticated and the portal renders.
3. If not, the `PasswordGate` component renders a centered card with a password input.
4. On correct password, `sessionStorage.setItem('entevate_brand_auth', '1')` is called and the portal renders.
5. On incorrect password, an error message appears and a CSS shake animation (`bp-shake`) plays on the card for 0.4 seconds.
6. The session expires when the browser tab or window is closed (sessionStorage behavior).

**Sign out:** A "Sign Out" button in the sidebar footer (desktop) or header (mobile) removes the sessionStorage key and resets the `authed` state to `false`.

---

## 4. Layout

The portal uses a fixed sidebar plus scrollable content area pattern.

- **Sidebar:** Fixed position, 260px wide, `var(--black)` background (#181818), full viewport height. Pinned to the left edge with `position: fixed; top: 0; left: 0; bottom: 0`.
- **Content area:** `margin-left: 240px` (slightly less than sidebar width to allow overlap), `min-height: 100vh`.
- **Portal background:** `#f6f8fb` on the `.bp-portal` container.
- **Content max-width:** Tab content is capped at `max-width: 960px` with `padding: 40px 48px 80px`.
- **Header bar:** White background with bottom border, contains the active tab name and subtitle "ENTEVATE Brand Resources".

---

## 5. Navigation

### Main Tabs

The sidebar contains three top-level tabs:

1. **Brand Kit** -- Visual identity assets and brand guidelines
2. **Design System** -- Component specs, spacing tokens, and layout patterns
3. **GTM Toolkit** -- Sales enablement, personas, battle cards, and outreach templates

### Subnav Groups

Each tab has a collapsible list of subsections. Clicking a parent tab toggles its children open or closed. All three groups start expanded by default (`openSections` initialized with all three tab IDs).

**Sidebar nav structure** is defined in the `sidebarNav` object, which maps tab IDs to labels and arrays of `{ id, label }` section entries.

### Scroll-Spy

An `IntersectionObserver` watches all `.bp-section[id]` elements. When a section enters the viewport, its ID is set as `activeSection`, which highlights the corresponding subnav child button. The observer uses `rootMargin: '-80px 0px -60% 0px'` to trigger when sections are near the top of the viewport.

### Active States

- **Parent tab (active):** White text, `rgba(255, 255, 255, 0.08)` background, cyan left border (`#38c6f4`).
- **Child section (active):** `rgba(255, 255, 255, 0.9)` text, `rgba(56, 198, 244, 0.5)` left border, subtle background highlight.
- **Chevron:** Rotates 180 degrees when the group is open.

---

## 6. Tab: Brand Kit

The Brand Kit tab contains 10 sections covering visual identity:

| Section ID | Label | Content |
|---|---|---|
| `bk-logo` | Logo and Wordmark | Full lockup on dark, light, gradient, and light-blue backgrounds. Icon-only variant. Do/Don't usage guidelines with clear space rules. |
| `bk-colors` | Color Palette | Clickable swatches (copy hex on click) organized into Primary Brand (4 colors), Service Pillars (6 colors, 2 per pillar), and Neutrals (6 colors). Each swatch shows name, hex, and CSS variable. |
| `bk-gradients` | Gradients | Five gradients: Brand Gradient, Experiential, Operational Intelligence, Innovation, and CTA Overlay. Shows preview bar plus CSS value. |
| `bk-og` | OG Images | Four Open Graph images (1200x630px) for Main, Experiential, Operational Intelligence, and Innovation. Clickable to open full-size. |
| `bk-backgrounds` | Backgrounds and Textures | Six background images used across hero sections, CTA banners, and blog thumbnails. |
| `bk-pillar-imagery` | Pillar Imagery | Full-bleed illustrations for each of the three service pillar landing pages. |
| `bk-client-logos` | Client Logos | Ten client logos displayed in a grid. Shown at 28px height, grayscale at 45% opacity, with color reveal on hover. |
| `bk-favicon` | Favicon and Icons | Standalone "E" glyph favicon shown at 16, 32, 48, and 64px sizes. Includes HTML implementation snippet. |
| `bk-voice` | Brand Voice and Values | Tone guidelines (confident not arrogant, warm not casual, forward-thinking not jargon-heavy, precise not clinical). Writing style rules. Five core values: Empathy, Authenticity, Adaptability, Quality, Responsibility. |
| `bk-messaging` | Key Messaging | Tagline, positioning statement, three pillars summary, elevator pitch, and boilerplate copy. |

---

## 7. Tab: Design System

The Design System tab contains 10 sections covering component and layout specifications:

| Section ID | Label | Content |
|---|---|---|
| `ds-typography` | Typography | Archivo typeface specimen (weights 100-700). Full type scale with 10 entries from Homepage Hero (clamp 51-97px, weight 100) down to Footer Link (13.5px, weight 400). Font stack and size/weight/tracking specs per level. |
| `ds-icons` | Iconography | SVG icon specifications (24x24 viewBox, stroke 1.6, round caps/joins). Three pillar icons, six feature icons, five nav/social icons. Recommends Lucide Icons as the complementary icon set. |
| `ds-buttons` | Buttons | Five button variants: Primary, Outline, Ghost, Gradient, and Orange CTA. Each shown with live demo, label, and CSS class name. |
| `ds-tokens` | Spacing and Tokens | Nine spacing tokens including section padding (desktop/tablet/mobile), container max-width (1160px), nav height (70px), card padding, grid gap (24px), border-radius (6px), and transition (0.22s ease). |
| `ds-cards` | Card Components | Service card demos for each pillar (3px gradient top bar, pillar-colored link and icon tint). Blog card tag variants: `.card-ebm` (teal), `.card-dct` (orange), `.card-irm` (purple), `.card-gen` (blue). |
| `ds-grid` | Layout Grid | Desktop: 1160px centered container, 48px side padding, 3-column grid at 24px gap. Footer: 4-column grid (1.4fr 1fr 1fr 1.2fr). |
| `ds-elevation` | Elevation and Effects | Four shadow levels: Rest (none), Dropdown (0 8px 24px rgba(0,0,0,0.08)), Card Hover (0 10px 40px + translateY(-3px)), Mobile Drawer (-6px 0 32px rgba(0,0,0,0.16)). |
| `ds-animations` | Animations | Fade Up scroll reveal (IntersectionObserver, 0.55s ease, +0.1s stagger). Client carousel (22s linear infinite, pauses on hover). Hero SVG curves (8-12s oscillation). Micro-interactions (0.22s ease, translateY(-3px) card hover). |
| `ds-responsive` | Responsive Breakpoints | Desktop (>960px), Tablet (<=960px with hamburger menu, 2-col footer), Mobile (<=600px, 1-col everything). Fluid typography via clamp(). |
| `ds-patterns` | Page Patterns | Three page structure diagrams: Homepage, Service Pillar Page, and Article/Insight. Each shows the stacking order from header through footer. |

---

## 8. Tab: GTM Toolkit

The GTM Toolkit tab contains 13 sections covering sales strategy and enablement. Note: originally 14 sections were planned, but the current implementation has 13 (the "Target ICPs" content is integrated into "Target Roles and Personas").

| Section ID | Label | Description |
|---|---|---|
| `gtm-strategy` | Strategy Overview | Core messaging by pillar with anchor messages, proof points, offering lists, and call-to-action phrases. Covers Experiential Branding, Operational Intelligence, and Innovation pillars. |
| `gtm-journey` | Customer Journey | Three-touchpoint engagement flow: (1) Initial Intro Call with Jake, (2) Discovery + Capabilities Call with Pillar Lead + Jake, (3) Phase 0 Project SOW ($25k-$50k, 30-45 days). Includes pillar-specific discovery paths. |
| `gtm-industries` | Target Industries | Four primary verticals: Heavy Equipment, Aviation, Manufacturing, Automotive. Includes B2B buyer insights with key statistics on millennial buying influence, social media research habits, and ROI analysis trends. |
| `gtm-companies` | Target Companies | Named account lists organized by vertical. Automotive (Rivian, Polestar, Tesla, Ford, etc.), Heavy Equipment (John Deere, Carter Machinery, Caterpillar Dealer Network), Aviation (Blade, Gulfstream, Boeing, etc.), Manufacturing (Siemens, Schneider Electric, etc.). |
| `gtm-roles` | Target Roles and Personas | Five detailed buyer persona cards: Director of L&D, CMO/VP Marketing, Director of Operations, Chief Innovation Officer, Director of Customer Support/Service. Each includes demographics, reporting structure, KPIs, motivation, buying influence, key events, and ENTEVATE entry points. |
| `gtm-battlecards` | Battle Cards | Per-pillar competitive positioning cards with "We Are / We Are Not" framing, key differentiators, and objection-handling Q&A pairs. |
| `gtm-phases` | Execution Phases | Three-phase GTM plan: Phase 1 Visibility and Engagement (Weeks 1-3), Phase 2 Outreach and Conversion (Weeks 4-6), Phase 3 Conversion and Follow-Up (Ongoing). Includes LinkedIn content cadence, webinar topics, lead magnets, and email sequence structure. |
| `gtm-outreach` | Outreach Templates | Email subject lines organized by persona cluster. Five-part email sequence framework: insight drop, personal story, resource invite, testimonial, direct CTA. |
| `gtm-onepagers` | One-Pagers and Leave-Behinds | Eight downloadable PDF one-pagers: Angel Academy, Innovation Roadmapping, AIQUI Framework, Ecosystem Model, Innovation Sandbox, OI Assessment, Digital Strategy, CAD-to-CGI. Linked to `/onepagers/` directory. |
| `gtm-discovery` | Discovery and Talk Tracks | Structured discovery questions per pillar, each with the strategic "why" explaining what the question reveals and which offering it opens. |
| `gtm-proof` | Proof Points | Ten key statistics (6+ Fortune 500 clients, $24M+ capital activated, 400+ angels trained, 700+ machine variants, 92% lead increase, etc.). Three case study summaries: Trinity College AIQUI Sandbox, Fortune 500 Trade Show Activation, CAD-to-CGI Pipeline. |
| `gtm-proposals` | Proposal Framework | Phase 0 SOW structure (Executive Summary through Next Steps). Five-step delivery model: Discovery and Alignment, Customer Journey Mapping, Offering and Marketing Strategy, Ops Model and Tech Integration, Documentation and Handoff. Standard engagement terms (6-8 weeks, 50/50 billing). |
| `gtm-events` | Event Toolkit | Speaker bios for Jake Hamann (Founder) and Mike Binko (Managing Director of Innovation, Ventures, Ecosystem). Conference talking points per theme. Priority events mapped to personas. Booth/networking asset checklist with readiness status. |

---

## 9. Styling Details

### CSS Prefix

All portal-specific classes use the `bp-` prefix to avoid collisions with global site styles.

### Key Classes

| Class | Purpose |
|---|---|
| `.bp-gate` | Password gate full-screen container (centered flex, `var(--light-blue)` background) |
| `.bp-gate-card` | White card with border, shadow, centered password form |
| `.bp-shake` | Keyframe animation on wrong password (translateX oscillation, 0.4s) |
| `.bp-portal` | Main portal layout container (flex, min-height 100vh, `#f6f8fb` background) |
| `.bp-sidebar` | Fixed 260px sidebar (`var(--black)` background, white text, z-index 50) |
| `.bp-sidebar-nav` | Scrollable nav area with `overflow-y: auto` |
| `.bp-nav-parent` | Tab-level nav button (14px, weight 600, 3px transparent left border) |
| `.bp-nav-parent.active` | Active tab: white text, `rgba(255,255,255,0.08)` bg, `#38c6f4` left border |
| `.bp-nav-child` | Subnav section button (12.5px, weight 400, 28px left padding) |
| `.bp-nav-child.active` | Active section: `rgba(255,255,255,0.9)` text, `rgba(56,198,244,0.5)` left border |
| `.bp-main` | Content area (`margin-left: 240px`, `min-height: 100vh`) |
| `.bp-tab-content` | Content padding container (40px 48px 80px, max-width 960px) |
| `.bp-section` | Individual content section (margin-bottom 56px) |
| `.bp-mobile-tabs` | Horizontal tab bar (hidden on desktop, sticky at top on mobile) |

### Sidebar Colors

- Background: `var(--black)` (#181818)
- Text (default): `rgba(255, 255, 255, 0.5)` for parents, `rgba(255, 255, 255, 0.38)` for children
- Active accent: `#38c6f4` (cyan) for parent left border, `rgba(56, 198, 244, 0.5)` for child left border
- Dividers: `rgba(255, 255, 255, 0.08)`
- Badge text: `rgba(255, 255, 255, 0.35)`

### Responsive Behavior

**Breakpoint at 960px:**

- Sidebar is hidden (`display: none`)
- Content area loses left margin (`margin-left: 0`)
- Mobile tab bar appears (horizontal, sticky, scrollable)
- Mobile sign-out button appears in the header
- Multi-column grids collapse to single column
- Content padding reduces to `28px 24px 60px`

**Breakpoint at 600px:**

- Swatch, gradient, and values grids collapse to single column
- Font specimen wraps
- Additional compact layout adjustments

---

## 10. Important Notes

- **Navigation element:** The sidebar nav uses `<div role="navigation">` instead of a `<nav>` element. This avoids inheriting global nav CSS rules that would conflict with the portal's custom sidebar styling.
- **SEO exclusion:** The page includes `<meta name="robots" content="noindex, nofollow" />` in the head. It should also be excluded from the sitemap.
- **No SSR auth:** Authentication is entirely client-side via sessionStorage. There is no server-side password protection. The password is visible in the source code.
- **Data locality:** All portal content (colors, type scale, personas, battle cards, email templates, etc.) is defined as JavaScript constants within `BrandPortal.jsx`. There are no API calls or external data sources.
- **Hydration:** The component uses `client:load` (not `client:idle` or `client:visible`) because the password gate must be interactive immediately on page load.
- **Session scope:** Authentication persists for the browser session only. Closing the tab or browser requires re-entering the password.
