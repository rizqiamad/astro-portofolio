# Personal Portfolio

A minimal, typography-first personal portfolio and blog built with [Astro](https://astro.build) and Tailwind CSS.

## Stack

- **[Astro](https://astro.build)** — Static site framework, zero JS by default
- **[Tailwind CSS v4](https://tailwindcss.com)** — Utility-first CSS
- **[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)** — Prose styling for blog posts
- **[Shiki](https://shiki.matsu.io)** — Syntax highlighting (built into Astro's markdown pipeline)
- **TypeScript** — Strict mode throughout
- **[Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)** — Type-safe blog post management

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Nav.astro          # Site navigation
│   ├── Footer.astro       # Site footer
│   ├── PostCard.astro     # Blog post list item
│   ├── ProjectCard.astro  # Project list item
│   └── ThemeToggle.astro  # Dark/light mode button
├── content/
│   ├── config.ts          # Content Collections schema
│   └── blog/              # Blog post markdown files
│       └── *.md
├── data/
│   └── projects.ts        # Project data array
├── layouts/
│   ├── BaseLayout.astro   # HTML shell, meta, nav/footer
│   └── PostLayout.astro   # Blog post layout with title/date/readtime
├── pages/
│   ├── index.astro        # Home page
│   ├── projects.astro     # Projects page
│   └── blog/
│       ├── index.astro    # Blog listing
│       └── [slug].astro   # Individual post
└── styles/
    └── global.css         # CSS variables, fonts, base styles
```

## How to Add a Blog Post

1. Create a new `.md` file in `src/content/blog/`:

```bash
touch src/content/blog/my-new-post.md
```

2. Add the required frontmatter at the top:

```markdown
---
title: "Your Post Title"
date: 2026-03-15
description: "A one or two sentence description shown in post lists."
tags: ["optional", "tags"]
---

Your content goes here. Supports full Markdown and MDX.
```

**Frontmatter fields:**

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | ✅ | Post title |
| `date` | YYYY-MM-DD | ✅ | Publication date |
| `description` | string | ✅ | Excerpt shown in post lists |
| `tags` | string[] | ❌ | Topic tags |
| `draft` | boolean | ❌ | Set `true` to hide from listing |

The URL slug is derived from the filename: `my-new-post.md` → `/blog/my-new-post`.

Code blocks get syntax highlighting automatically via [Shiki](https://github.com/shikijs/shiki):

````markdown
```typescript
const greeting = (name: string) => `Hello, ${name}!`;
```
````

## How to Add a Project

Edit `src/data/projects.ts` and add an object to the `projects` array:

```typescript
{
  name: 'My Project',
  description: 'A short description of what it does and why it exists.',
  tech: ['Go', 'PostgreSQL', 'Docker'],
  url: 'https://github.com/you/my-project',
  featured: true,  // true = shows on home page, false = projects page only
},
```

**Project fields:**

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | ✅ | Project name |
| `description` | string | ✅ | Short description (2-3 sentences max) |
| `tech` | string[] | ✅ | Tech stack tags |
| `url` | string | ✅ | Link to repo or project page |
| `featured` | boolean | ❌ | Show on home page (default: false) |

## Customization

### Personal Info
- Update your name in `src/components/Nav.astro` (site title)
- Update bio copy in `src/pages/index.astro`
- Update social links in `src/components/Footer.astro`
- Update the `site` URL in `astro.config.mjs`

### Colors and Fonts
All design tokens live in `src/styles/global.css` as CSS custom properties under `:root` (light) and `[data-theme="dark"]`. Fonts are loaded from Google Fonts in the same file.

### Favicon
Replace `public/favicon.svg` with your own.

## Deployment

This is a static site. After `npm run build`, the `dist/` directory contains everything you need.

**Cloudflare Pages:**
```
Build command: npm run build
Build output: dist/
```

**Netlify / Vercel:** Connect the repo — they auto-detect Astro and configure the build correctly.


