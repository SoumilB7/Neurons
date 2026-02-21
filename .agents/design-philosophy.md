# Design Philosophy (STRICT — do not deviate)

This project follows a rigorous monochrome minimalist aesthetic. Every design choice is intentional. Treat any deviation as a breaking change to the visual language.

## Color

**Only neutrals.** No bright colors, no saturated hues, no gradients anywhere.

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#fafafa` | Page background |
| `--fg` / neutral-900 | `#111111` | Primary text, active buttons |
| `--muted` | `#888888` | Secondary text |
| `--border` / neutral-200 | `#e5e5e5` | Borders, dividers |
| `--card` | `#ffffff` | Card surfaces |
| neutral-50 | `#f9f9f9` | Icon boxes, very light bg |
| neutral-100 | `#f3f3f3` | Hover backgrounds, tags |
| neutral-400 | `#a3a3a3` | Muted labels, info panel labels |
| neutral-500 | `#737373` | Descriptions, secondary content |
| neutral-600 | `#525252` | Toolbar icon default |
| neutral-700 | `#404040` | Info panel values |

Optional accent colors may be introduced only when they encode core educational meaning (e.g., role/type distinctions), not decoration.

## Typography

- **Inter** for all text. **JetBrains Mono** exclusively for numeric values and units.
- Labels: `text-[10px]` or `text-[11px]`, `font-medium`, `uppercase tracking-widest`, `text-neutral-400`
- Values: `font-mono text-xs font-medium text-neutral-700`, use `tabular-nums` for changing numbers
- Headings: `font-semibold tracking-tight text-neutral-900`
- Descriptions: `text-sm leading-relaxed text-neutral-500`

## Border Radius Hierarchy

| Size | Usage |
|------|-------|
| `rounded-2xl` (16px) | Cards, main containers, canvas wrapper |
| `rounded-xl` (12px) | Toolbars, info panels, icon boxes |
| `rounded-lg` (8px) | Buttons, dropdown items |
| `rounded-full` | Category pills, toggle switches |

## Glass Morphism (floating UI)

All floating elements (toolbar, info panel, dropdown) use the same formula:
```
bg-white/80 backdrop-blur-xl border border-neutral-200 shadow-sm
```

## Shadows

- **Default state**: No shadow on cards or static elements
- **Hover only**: `shadow-lg shadow-neutral-200/50` on cards
- **Floating UI**: `shadow-sm` on toolbars/panels, `shadow-lg` on dropdowns
- Slider thumb: `box-shadow: 0 1px 3px rgba(0,0,0,0.15)`

## Animations (Framer Motion)

Single easing curve everywhere: `[0.25, 0.46, 0.45, 0.94]`

| Pattern | Values |
|---------|--------|
| Enter from below | `initial={{ opacity: 0, y: 8 }}` → duration 0.4s |
| Enter from above | `initial={{ opacity: 0, y: -8 }}` → duration 0.4s |
| Card stagger | delay `index * 0.06s` |
| Button tap | `whileTap={{ scale: 0.92 }}` |
| Color transitions | `transition-colors duration-200` |
| Dropdown | `initial={{ opacity: 0, scale: 0.95, y: -4 }}` → duration 0.15s |
| Info panel while playing | `opacity: 0.35` (faded) |

**Never**: duration > 0.6s, spring physics, bounce easing, looping animations.

## Toolbar Buttons

```
h-8 w-8 rounded-lg bg-neutral-100 text-neutral-600
hover:bg-neutral-900 hover:text-white
transition-colors duration-200
```
Active state: `bg-neutral-900 text-white`. Tap: `whileTap={{ scale: 0.92 }}`.

## Info Panel Items

```
label: text-[10px] font-medium uppercase tracking-widest text-neutral-400
value: font-mono text-xs font-medium tabular-nums text-neutral-700
unit:  font-mono text-[10px] text-neutral-300
divider: h-3 w-px bg-neutral-200
```

## Slider Style

`.slider-input` in globals.css: 4px gray track (`#e5e5e5`), 14px black circle thumb with 2px white border. Hover scales thumb to 1.15x.

## Icons

- Experiment icons: 20x20 SVG, `stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"`
- Secondary fills: `fill="currentColor" opacity={0.15}` for background elements
- Toolbar icons: 14x14, `strokeWidth={2}`
- Play/pause: solid fill. All other toolbar icons: stroke only.

## Spacing

- Content container: `max-w-6xl mx-auto px-6`
- Card grid: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`
- Toolbar button gap: `gap-1.5`
- Info panel item gap: `gap-5`
- Toolbar divider: `mx-0.5 h-4 w-px bg-neutral-200`
- Info panel divider: `h-3 w-px bg-neutral-200`

## Things That Are NEVER Used

1. Bright or saturated colors
2. Color gradients
3. Border widths > 1px
4. Text shadows or text strokes
5. Shadows on default (non-hover) card state
6. Animations longer than 0.6s
7. Fonts other than Inter and JetBrains Mono
8. `display: none` (use opacity transitions instead)
9. Custom scrollbar wider than 6px
10. Hover effects on disabled/coming-soon elements
11. Spring physics or bounce easing
12. Animated backgrounds or looping animations
13. Multiple border styles or layered box-shadows
14. Rotated text or skewed elements
15. Negative margins
