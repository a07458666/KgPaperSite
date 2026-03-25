# GitHub Deployment

## Goal

Deploy the `kg-paper-site` project through GitHub with:

- CI for every pull request and push to `main`
- automatic CD to GitHub Pages from `main`

## Included Files

- `.gitignore`
- `.github/workflows/ci.yml`
- `.github/workflows/deploy-pages.yml`
- `next.config.mjs` updated for GitHub Pages static export

## How It Works

### CI

`ci.yml` runs on:

- pull requests
- pushes to `main`

It performs:

- checkout
- Node setup
- `npm ci`
- `npm run build`

### CD

`deploy-pages.yml` runs on:

- pushes to `main`
- manual workflow dispatch

It performs:

- checkout
- Node setup
- Pages configuration
- `npm ci`
- `npm run build`
- upload `out/`
- deploy to GitHub Pages

## Important Next.js Behavior

This project uses a conditional Pages configuration:

- local development keeps normal Next.js behavior
- GitHub Actions sets `GITHUB_PAGES=true`
- when that flag is set, Next.js exports a static site to `out/`
- `basePath` and `assetPrefix` are derived from the GitHub repository name

This allows the same codebase to work both locally and on GitHub Pages.

## Required GitHub Setup

After creating the GitHub repository:

1. Push the project to `main`
2. Open `Settings -> Pages`
3. Set deployment source to `GitHub Actions`

After that, every push to `main` will trigger deployment.

## Recommended Next Step

This folder is not yet a git repository. After you are ready:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```
