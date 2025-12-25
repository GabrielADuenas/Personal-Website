# Engineering Portfolio (Node static server)

This is a minimal engineering portfolio served by a small Node static file server on port 5000.

Run locally:

```powershell
node server.js
```

Then open http://localhost:5001 in your browser.

Files added:

- `server.js` — Node static server that serves the `public` folder on port 5001
- `public/index.html` — portfolio HTML
- `public/style.css` — styles
- `package.json` — start script (`npm start` runs `node server.js`)

Deploying to Vercel (recommended static deploy)

1. Install the Vercel CLI (optional):

```bash
npm i -g vercel
```

2. From the project root run:

```bash
vercel
```

Vercel will detect the static `public/` folder. A `vercel.json` is included to rewrite `/project/:id` to the template `project.html?id=:id` so links like `/project/project-a` will work.

If you prefer to deploy via GitHub/GitLab/Bitbucket, connect the repo in the Vercel dashboard — Vercel will use the same static configuration automatically.
