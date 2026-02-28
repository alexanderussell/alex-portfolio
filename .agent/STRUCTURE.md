# Project Structure

```
lib/
├── src/
│   ├── components/       # Shared UI components
│   ├── hooks/            # Custom React hooks
│   ├── providers/        # React context providers (ThemeProvider)
│   ├── integrations/     # Third-party integrations (TanStack Query)
│   ├── lib/              # Utilities and shared logic
│   │   ├── site.ts       # Site config
│   │   ├── theme.ts      # Theme types, cycle, helpers
│   │   └── utils.ts      # General utilities
│   ├── routes/           # TanStack Router file-based routes
│   ├── router.tsx        # Router config
│   ├── routeTree.gen.ts  # Auto-generated route tree
│   └── styles.css        # Global styles (Tailwind)
├── content/              # Content collections (markdown)
├── public/               # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── playwright.config.ts
```
