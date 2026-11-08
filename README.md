# Portfolio - Aasish Raj

A minimal, ultra-fast personal portfolio and technical blog built with **Astro 5**, styled with the palette and typography inspired by `llm-memory-req.html`, and ready to be hosted on your VPS.

## Highlights

- **Astro 5**: Pre-rendered static pages by default with zero client JavaScript overhead for content pages.
- **Color Scheme & Theme**: Styled after `llm-memory-req.html` with:
  - Light mode: Warm eggshell `#faf9f6` background, crisp ink black `#000000` text, and slate blue `--weights: #2456a6` interactive accents.
  - Dark mode: True pitch black `#000000` background, `--weights: #6495ed` cornflower blue, amber `--cache: #ffbe55`, and teal `--runtime: #31ad91`.
  - Crisp `4px` control radii and high-contrast focus outlines.
- **Technical Blog with LaTeX**:
  - Full MDX support with Math formulas rendered at build-time via KaTeX (`remark-math` + `rehype-katex`).
  - Shiki syntax-highlighted code blocks with zero runtime client-side parser overhead.
  - Instant client-side tag filtering without framework bloat.
- **VPS Self-Hosted Visitor Counter**:
  - On-demand server route at `/api/visitor-count`.
  - Self-contained local persistence stored in `data/visitors.json` with SHA-256 privacy hashing.
  - No external cloud databases (e.g. Neon) required.

## Getting Started

### Install dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

### Build
```bash
npm run build
```

### Preview production build locally
```bash
npm run start
```

---

## Dokploy Deployment Guide

1. In Dokploy, go to your project and click **Create Application**.
2. **Repository**: Select GitHub and pick `aasishraj/portfolio` (branch: `main`).
3. **Build Type**: Select **Dockerfile**.
4. **Port**: Set application port to `4321`.
5. **Environment Variables**:
   - `DATABASE_URL`: Your existing database connection string (e.g., Neon PostgreSQL).
   - `IP_SALT` *(optional)*: Custom string for hashing visitor IPs.
6. **Domain**: Enter your domain (e.g., `aasishraj.com`) and toggle HTTPS / Let's Encrypt.
7. Click **Deploy**.

---

## Alternative Manual VPS Deployment (PM2 / Systemd)

On your VPS:
```bash
# Clone the repository
git clone <repo-url> portfolio
cd portfolio

# Install dependencies and build
npm install
npm run build

# Start with PM2
pm2 start npm --name "portfolio" -- run start
# Or direct command:
# HOST=127.0.0.1 PORT=4321 node ./dist/server/entry.mjs
```

### 2. Reverse Proxy Configuration

#### Option A: Caddy (Recommended - automatic HTTPS)
Add this to `/etc/caddy/Caddyfile`:
```caddy
yourdomain.com {
    reverse_proxy 127.0.0.1:4321
    encode gzip zstd
}
```
Reload Caddy:
```bash
sudo systemctl reload caddy
```

#### Option B: Nginx
```nginx
server {
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:4321;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```
