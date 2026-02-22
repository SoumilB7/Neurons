# Neurons Lab, Implementation Notes

This project is currently in foundation mode.

## Current Constraints

- No card-grid landing flow
- No about section
- Keep home as a blank canvas until design is specified

## Working Pattern

1. Create focused route in `src/app/{topic}/`
2. Add only the minimal components needed for that topic
3. Keep shared primitives in `src/components/`
4. Keep core logic in `src/lib/`

## UI/Style Rules

- Follow `/.agents/design-philosophy.md` exactly
- Keep interactions minimal and purposeful
- Prioritize readability over visual complexity

## Content Rules

- Use neuroscience/ML terminology precisely
- Keep explanations concrete and inspectable
- Avoid placeholder product framing that implies old app structure
