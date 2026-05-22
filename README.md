# Sabin Shrestha Real Estate Portfolio

This is a static real estate portfolio website for Sabin Shrestha.

## Deployment

To deploy on GitHub Pages:

1. Create a GitHub repository, for example `sabin-shrestha-portfolio`.
2. Add the repo as a remote:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
```

3. Push the local repository:

```bash
git branch -M main
git push -u origin main
```

4. Enable GitHub Pages from the repo settings, choosing the `gh-pages` branch or the `main` branch root.

If using the GitHub Actions workflow in `.github/workflows/pages.yml`, the site will publish automatically after pushing.
