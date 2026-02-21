# Neurons Lab — Project Guide

Neurons Lab is a focused workspace for neuroscience and deep learning concepts.

## Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS + tokens in `src/app/globals.css`
- Framer Motion for minimal UI transitions

## Commands

- `npm run dev`
- `npm run build`
- `npm run lint`

## Layout

- `src/app/`: pages and metadata
- `src/components/`: shared UI primitives
- `src/lib/`: logic helpers and domain utilities

## Direction

- Keep the home route intentionally blank until design direction is finalized
- Build content only after layout language is defined
- Preserve the monochrome system from `/.agents/design-philosophy.md`

## Engineering Rules

- Prefer clear, direct copy
- Keep logic deterministic and side-effect free where possible
- Avoid introducing structures that imply card grids or catalog flows
