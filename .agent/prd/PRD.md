# Product Requirements Document: Alex Russell Portfolio

## Executive Summary

A minimal, grayscale portfolio site for Alex Russell (Product Designer turned AI technologist). The site features a distinctive 5-way theme cycle (daylight → dusk → nighttime → morning → loop) with a Sunlit.place-inspired gradient background that shifts from warm daylight to dusk tones. A liquid-glass toggle at the top indicates the current theme. Content is intentionally sparse: name, bio, "Projects" heading, and a projects list—using only two font sizes. Built with TailwindCSS and shadcn/ui, scaffolded for local development; deployment will be configured later via interview.

---

## 1. App Overview, Objectives & Success Criteria

| ID | Requirement |
|----|-------------|
| TASK-1 | Portfolio showcases Alex Russell as Product Designer turned AI technologist |
| TASK-2 | Site is mobile-friendly and responsive |
| TASK-3 | Design is grayscale and minimalist |
| TASK-4 | Background uses Sunlit.place-inspired gradients (warm daylight → dusk in darker themes) |
| TASK-5 | 5-way theme cycle: daylight → dusk → nighttime → morning → loop |
| TASK-6 | Liquid-glass toggle at top shows current theme mode |
| TASK-7 | Content block: name, bio, "Projects", projects list |
| TASK-8 | Typography uses exactly 2 font sizes |
| TASK-9 | Tech stack: TailwindCSS, shadcn/ui |
| TASK-10 | Runs locally via `npm run dev` in `lib`; deployment deferred |

---

## 2. Target Audience

- Recruiters and hiring managers
- Design and AI/tech peers
- Anyone seeking Alex Russell's background and project work

---

## 3. Core Features & Functionality

### 3.1 Theme System (TASK-11 to TASK-18)

- **5 themes**: `daylight`, `dusk`, `nighttime`, `morning` (cycle order)
- **Cycle behavior**: Single control cycles through themes; no binary light/dark toggle
- **Persistence**: Theme choice stored in `localStorage`; survives refresh
- **Background**: Each theme has distinct gradient/atmosphere inspired by [Sunlit.place](https://www.sunlit.place/):
  - **Daylight**: Warm, bright gradients (cream, soft gold)
  - **Dusk**: Sunset tones (amber, soft purple)
  - **Nighttime**: Dark, minimal (near-black, subtle blue)
  - **Morning**: Cool, soft dawn (pale blue, soft gray)

### 3.2 Liquid Glass Toggle (TASK-19 to TASK-22)

- Position: Top of page (fixed or in header)
- Appearance: Faint glassmorphism (backdrop-blur, semi-transparent)
- Shows current theme label (e.g., "Daylight", "Dusk", "Nighttime", "Morning")
- Click/tap cycles to next theme in sequence
- Accessible: keyboard focusable, ARIA labels

### 3.3 Content Block (TASK-23 to TASK-28)

- **Name**: Alex Russell (large font size)
- **Bio**: Short paragraph (smaller font size)
- **"Projects"**: Section heading (large font size)
- **Projects list**: Simple list of project links (smaller font size)
- Exactly 2 font sizes used across the page
- Grayscale palette only

### 3.4 Layout & Responsiveness (TASK-29 to TASK-31)

- Mobile-first; works on 320px+ viewports
- Content centered, readable line lengths
- No horizontal scroll

---

## 4. Key User Flows

1. **View portfolio**: User lands → sees name, bio, projects; background reflects current theme
2. **Change theme**: User clicks liquid-glass toggle → theme cycles → background and colors update
3. **Navigate projects**: User clicks project link → navigates to project detail or external URL

---

## 5. Technical Stack

| Layer | Choice |
|------|--------|
| Framework | TanStack Start (React + Vite) |
| Styling | TailwindCSS v4 |
| Components | shadcn/ui (Radix primitives) |
| Theme | Custom 5-theme system (extends/replaces next-themes usage) |
| Hosting | TBD (scaffold for local; deploy later) |

---

## 6. Conceptual Data Model

### Projects (static for now)

```ts
interface Project {
  id: string
  title: string
  href: string
  description?: string
}
```

- Stored in code or content file (e.g., `lib/content/projects.ts` or MD/MDX)
- No backend; static data

### Theme State

```ts
type ThemeId = 'daylight' | 'dusk' | 'nighttime' | 'morning'
```

- Stored in `localStorage` key `theme`
- Applied via `data-theme` or `class` on `<html>`

---

## 7. UI Design Principles

- **Minimalism**: Few elements; generous whitespace
- **Grayscale**: No accent colors; black/white/gray only
- **Typography**: 2 sizes—display (name, "Projects") and body (bio, list items)
- **Background**: Sunlit.place-inspired—warm gradients in daylight, fading to dusk in darker themes
- **Liquid glass**: Subtle blur, low opacity; does not compete with content

---

## 8. Development Phases

| Phase | Scope |
|-------|-------|
| 1 | Theme system + background gradients |
| 2 | Liquid-glass toggle |
| 3 | Content block (name, bio, projects) |
| 4 | Responsive polish |
| 5 | Deploy prep (when ready—interview for hosting) |

---

## 9. Assumptions & Dependencies

- Project lives in `lib/`; `npm run dev` runs from `lib`
- Existing TanStack Start, Tailwind, shadcn setup is retained
- No auth, no CMS; content is static
- Deployment: deferred; will interview user for hosting choice and provide keys/settings when ready

---

## 10. Deployment (Deferred)

- **Scaffold**: App runs locally via `npm run dev` in `lib/` directory
- **When ready**: Interview user for hosting choice (Vercel, Netlify, etc.)
- **Deliverables**: Provide all necessary details, env vars, keys, and settings for implementation

---

## 11. Non-Goals

- Blog or CMS integration (unless later requested)
- Multi-language
- Analytics (unless later requested)
- Complex animations beyond theme transitions
