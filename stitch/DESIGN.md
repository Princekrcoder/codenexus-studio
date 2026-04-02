# Design System Strategy: The Electric Noir

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Pulse"**
This design system moves away from the static, "boxy" nature of traditional dark modes. Instead, it treats the interface as a living, breathing digital canvas. We are building for **CodeNexus Studio**, which requires a balance between technical precision and creative fluidity.

The aesthetic avoids "Standard Bootstrap" layouts in favor of **Intentional Asymmetry**. By utilizing significant white space (or "dark space") and overlapping glass layers, we create a sense of depth that feels more like a high-end editorial magazine than a SaaS dashboard. We break the template by allowing typography to bleed across container boundaries and using soft, localized glows to guide the user's eye, rather than rigid lines.

## 2. Colors & Surface Philosophy
The palette is rooted in a deep, obsidian base (`#0e0e0e`) to ensure a premium feel, accented by high-energy electric blues and violets that signify innovation.

### The "No-Line" Rule
Traditional 1px borders are strictly prohibited for sectioning. We define structure through **Tonal Transitions**. To separate a section, shift the background from `surface` to `surface-container-low`. The transition should feel like a change in atmospheric density, not a physical wall.

### Surface Hierarchy & Nesting
Hierarchy is achieved through physical "stacking" of colors:
- **Base Level:** `surface` (#0e0e0e) - The infinite canvas.
- **Sectioning:** `surface-container-low` (#131313) - Subtle grouping.
- **Interactive Layers:** `surface-container` (#1a1919) - Cards and primary UI blocks.
- **Elevated Floating:** `surface-bright` (#2c2c2c) - Reserved for modals or menus that require maximum "lift."

### The "Glass & Gradient" Rule
To achieve the "High-Tech" requirement, use **Glassmorphism** for all floating components (Navigation bars, Tooltips, Popovers). 
- **Recipe:** Use `secondary_container` at 20% opacity with a `40px` backdrop-blur. 
- **Gradients:** CTAs should never be flat. Use a linear gradient from `primary` (#87adff) to `primary_dim` (#006ff0) at a 135-degree angle to create a "liquid light" effect.

## 3. Typography
We utilize a dual-font strategy to balance character with readability.

*   **Display & Headlines (Manrope):** This is our "Studio" voice. Manrope’s geometric but warm curves feel engineered yet approachable. Use `display-lg` with tight letter-spacing (-0.04em) for hero sections to create a bold, authoritative impact.
*   **Body & UI (Inter):** Inter is used for all functional text. Its high x-height ensures legibility against the high-contrast dark background.
*   **Hierarchy Tip:** Contrast `display-md` (Manrope) with `label-md` (Inter) in all caps with +0.1em tracking. This "High-Low" pairing is the hallmark of high-end digital editorial design.

## 4. Elevation & Depth
In this design system, shadows are light, and surfaces have weight.

*   **The Layering Principle:** To lift a card, place a `surface-container-highest` element on top of a `surface-dim` background. The delta in luminance creates the "lift" without a single pixel of CSS shadow.
*   **Ambient Shadows:** When a shadow is required for a floating modal, use a large, soft blur: `0px 20px 50px rgba(0, 0, 0, 0.5)`. Never use pure black shadows; tint the shadow with a hint of `primary` to make it feel like the object is casting a glow onto the surface below.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use `outline_variant` at 15% opacity. It should be felt, not seen.
*   **Soft Glows:** Use the `secondary_dim` color as a background "blob" (blurred 150px) behind key content sections to create a sense of digital atmosphere and "soul."

## 5. Components

### Buttons
*   **Primary:** Gradient of `primary` to `primary_dim`. Roundedness: `md` (0.75rem). No border. Text: `on_primary_fixed` (Black) for maximum contrast.
*   **Secondary:** Glass-effect. Background: `surface_variant` at 30% opacity. Border: "Ghost Border" (1px `outline` at 20%).
*   **States:** On hover, increase the `backdrop-blur` or the intensity of the inner glow—never just change the color.

### Input Fields
*   **Styling:** Use `surface_container_low` for the field background. Instead of a bottom border, use a subtle 2px glow of `primary` that expands from the center only when the field is focused.
*   **Labels:** Use `label-md` in `on_surface_variant`.

### Cards
*   **Forbid Dividers:** Do not use lines to separate header/body/footer in a card. Use vertical spacing (Scale `6` - 2rem) or a subtle shift to `surface_container_highest` for the footer background.
*   **Interactive State:** On hover, a card should shift from `surface_container` to `surface_bright` and scale by 1.02x.

### Chips
*   **Action Chips:** Use `secondary_container` with `secondary` text. The high saturation against the dark background makes them feel like glowing neon indicators.

## 6. Do’s and Don’ts

### Do
*   **Use Asymmetric Grids:** Align text to the left but allow imagery or decorative "glows" to bleed off the right edge of the screen.
*   **Embrace "Dark Space":** Use the `24` (8.5rem) spacing token between major sections to let the premium typography breathe.
*   **Color as Signal:** Use `tertiary` (purple) exclusively for "Creative" or "Studio" related features, and `primary` (blue) for "Technical" or "Code" features.

### Don’t
*   **Don't use pure white (#FFFFFF) for long-form body text:** Use `on_surface_variant` (#adaaaa) to reduce eye strain and maintain the "noir" vibe. Reserve pure white for headlines.
*   **Don't use hard-edged containers:** Every container should have at least the `DEFAULT` (0.5rem) or `md` (0.75rem) corner radius to soften the tech-heavy aesthetic.
*   **Don't use standard icons:** Use "Duotone" or "Thin-stroke" icons. Heavy, filled icons will feel too bulky for this refined system.