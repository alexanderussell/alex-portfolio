# Alex Russell Portfolio — Project Summary

## Overview

Minimal, grayscale portfolio for Alex Russell (Product Designer turned AI technologist). The site uses a 5-way theme cycle (daylight → dusk → nighttime → morning) with a Sunlit.place-inspired gradient background. A liquid-glass toggle at the top shows and cycles the current theme. Content is intentionally sparse: name, bio, "Projects" heading, and a projects list—using only two font sizes.

## Main Features

- **5-way theme cycle**: Daylight, dusk, nighttime, morning (no binary light/dark)
- **Sunlit.place-inspired background**: Warm gradients that fade to dusk in darker themes
- **Liquid-glass toggle**: Top-of-page control showing current theme; click cycles
- **Simple content block**: Name, bio, "Projects", projects list
- **Typography**: Exactly 2 font sizes (display + body)
- **Design**: Grayscale, minimalist, mobile-friendly

## Key User Flows

1. Land on page → see name, bio, projects; background reflects theme
2. Click toggle → theme cycles; background and colors update
3. Click project link → navigate to project

## Key Requirements

- TailwindCSS + shadcn/ui
- Runs locally via `npm run dev` in `lib`
- Deployment deferred; interview for hosting when ready
