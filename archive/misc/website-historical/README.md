# Tamz Rod - Personal Website

Official personal website for Tamz Rod, creator and founder of KDE (Knowledge Discovery Engine).

## Quick Deploy to Droplet

### Prerequisites

- Docker installed on your droplet
- Docker Compose installed

### Deployment Steps

```bash
# SSH into your droplet
ssh root@your-droplet-ip

# Clone or copy the website files
cd /opt
git clone https://github.com/tamzrod/website.git tamzrod-website
# OR copy files via scp
scp -r ./website root@your-droplet-ip:/opt/

# Navigate to the website directory
cd /opt/tamzrod-website

# Start the container
docker compose up -d --build

# Verify it's running
docker compose ps
```

### Access

After deployment, the website will be available at:
- `http://your-droplet-ip/` (or your domain)

### SSL/HTTPS

For HTTPS, use a reverse proxy like:
- **Traefik** (included in docker-compose.yml)
- **Caddy** (automatic HTTPS)
- **Nginx + Certbot**

Example with Caddy:

```yaml
services:
  caddy:
    image: caddy:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - ./data:/data
    depends_on:
      - website

  website:
    # ... existing config
```

## Docker Configuration

### Files

| File | Purpose |
|------|---------|
| `Dockerfile` | Nginx-based image |
| `nginx.conf` | Production nginx config |
| `docker-compose.yml` | Container orchestration |

### Features

- **Alpine-based** nginx image (small footprint)
- **Health checks** built-in
- **Gzip compression** enabled
- **Security headers** included
- **Static file caching** configured

## Development

### Local Development

```bash
# Serve locally without Docker
python3 -m http.server 8080
# Visit http://localhost:8080
```

### Docker Development

```bash
# Build and run
docker compose up --build

# View logs
docker compose logs -f

# Stop
docker compose down
```

---

## Design Philosophy

This website embodies the engineering principles demonstrated throughout the KDE repositories:

- **Evidence-based**: Every design decision is justified by observable principles
- **Minimal**: No decoration, pure function, content-first
- **Deterministic**: Consistent rendering across all browsers
- **Accessible**: Semantic HTML, WCAG compliant contrast, keyboard navigable
- **Fast**: No external dependencies, system fonts, minimal HTTP requests

## Technical Implementation

### Constraints

| Constraint | Implementation |
|------------|---------------|
| Black background | Background: #000000 |
| HTML5 only | Semantic elements throughout |
| CSS3 only | Modern CSS features, no preprocessors |
| No JavaScript | Zero JS in implementation |
| No frameworks | Pure CSS, no Bootstrap/Tailwind/etc. |
| No animations | Static design, no transitions |
| Fully responsive | Mobile-first, breakpoints at 768px, 1024px |
| Semantic HTML | Proper element selection |
| Accessible | ARIA labels, alt text, keyboard navigation |
| Fast loading | No external resources |

## Project Structure

```
website/
├── index.html          # Complete semantic HTML
├── styles.css          # Pure CSS with custom properties
├── Dockerfile          # Docker image definition
├── nginx.conf          # Production nginx config
├── docker-compose.yml  # Container orchestration
└── README.md           # This file
```

## Validation

The design has been validated against:

- [x] Engineering excellence
- [x] Technical credibility
- [x] Research mindset
- [x] Simplicity
- [x] Professionalism
- [x] Curiosity
- [x] Trust

See [INV-WEB-001](../investigations/INV-WEB-001.md) for complete design rationale.

## License

© 2024 Tamz Rod. All rights reserved.
