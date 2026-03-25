# KG Paper Site

Interactive site prototype for explaining graph-related papers through an enterprise knowledge management product lens.

## Current Scope

- Next.js app router scaffold
- page content driven by `src/data/graph-paper-site.mock.ts`
- reusable section renderer for hero, text, comparison, schema, process, demo, and failure sections
- built-in SVG graph preview for the troubleshooting example graph
- project brief in `docs/project-brief.md`

## Run

Install dependencies first:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

## GitHub CI/CD

This project is configured for:

- CI on pull requests and pushes to `main`
- static deployment to GitHub Pages on pushes to `main`

### What is included

- `.github/workflows/ci.yml`
- `.github/workflows/deploy-pages.yml`
- Next.js static export config for GitHub Pages

### GitHub setup steps

1. Create a new GitHub repository.
2. Push this project to the `main` branch.
3. In GitHub repository settings:
   - go to `Settings -> Pages`
   - set `Source` to `GitHub Actions`
4. Push to `main` and GitHub Actions will build and deploy the site.

### Local commands

```bash
npm run clean
npm run build
```

For GitHub Pages builds, the workflow automatically sets the required environment variable.

## Key Files

- `docs/project-brief.md`
- `src/data/graph-paper-site.mock.ts`
- `src/components/section-renderer.tsx`
- `src/components/graph-preview.tsx`
- `src/components/page-view.tsx`
- `src/app/page.tsx`
- `src/app/[pageId]/page.tsx`
