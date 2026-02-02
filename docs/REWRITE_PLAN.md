# King Brewing Website Rewrite Plan
## Rebuilding https://kingbrewing.info from Scratch

## Executive Summary

**Decision**: Rewrite from scratch instead of modernizing legacy iWeb code

**Rationale**:
- 6 simple static pages don't justify 4-6 weeks of modernization effort
- Starting fresh = clean, maintainable code from day 1
- Faster: 2-3 weeks vs 4-6 weeks
- Less effort: 60-80 hours vs 120-160 hours
- No legacy baggage (no CoinHive, no 294 duplicate navbar files, no inline styles)
- Modern, responsive design built in from the start

**Timeline**: 2-3 weeks
**Effort**: 60-80 hours
**Build Tool**: Vite (fast, simple, perfect for static sites)

## Quick Facts

| Aspect | Current (Legacy) | New (Rewrite) |
|--------|------------------|---------------|
| Pages | 6 HTML pages | 6 HTML pages (same content) |
| Framework | iWeb 1.1.2 (2009) | Vite + HTML5 |
| Layout | Fixed 700px, absolute positioning | Responsive Grid/Flexbox |
| Assets | 294 navbar PNGs (duplicated) | 15 navbar PNGs (shared) |
| Size | ~4 MB (duplicated assets) | ~1 MB (optimized) |
| Mobile | Not responsive | Mobile-first responsive |
| Security | CoinHive malware | Clean, secure |
| Maintainability | Very difficult | Easy |

## Phase 1: Content Extraction (Week 1, Days 1-2)

### Goal
Extract all text content, images, and information from existing 6 pages.

### Step 1.1: Create Content Inventory

For each page, document:
- Page title
- All text content (headings, paragraphs, lists)
- All images with current file paths
- Navigation structure
- Meta descriptions

**Pages to Extract**:
1. Main.html → Homepage content
2. Beers.html → Beer list and descriptions
3. Menu.html → Restaurant menu items
4. Daily Specials.html → Current specials
5. Blog/Blog.html → Blog posts
6. Podcast/Podcast.html → Podcast episodes

### Step 1.2: Create Content Document

Create `content-inventory.md`:

```markdown
# Homepage (Main.html)
## Title: King Brewing Company
## Tagline: [extract tagline]
## Main Content:
[Copy all text content here]

## Images:
- Logo: Main_files/King Logo DS3.jpg
- Hero image: [path]
- Beer photos: [list paths]

# Beers Page
[repeat for each page]
```

### Step 1.3: Collect Unique Assets

```bash
# Create asset staging directory
mkdir -p /Users/kevinboyse/backup/KingBrewing/assets-to-migrate

# Copy unique navbar images (only need 15, not 294)
# Pick one _files directory as source (e.g., Main_files/)
cp Main_files/navbar_*.png assets-to-migrate/navigation/

# Copy logo (only need 1, not 13+)
cp "Main_files/King Logo DS3.jpg" assets-to-migrate/branding/

# Copy content images
cp Images/*.jpg assets-to-migrate/content/
cp Images/*.png assets-to-migrate/content/

# Copy fonts
cp css/Gabrielle.ttf assets-to-migrate/fonts/
```

**Deliverables**:
- ✅ content-inventory.md with all text content
- ✅ assets-to-migrate/ directory with unique images
- ✅ List of 15 unique navbar PNGs
- ✅ Single logo file
- ✅ All content images
- ✅ Fonts

## Phase 2: Project Setup (Week 1, Days 3-4)

### Step 2.1: Initialize New Project

```bash
# Create new project directory
cd /Users/kevinboyse/backup/
mkdir kingbrewing-new
cd kingbrewing-new

# Initialize npm project
npm init -y

# Install Vite
npm install --save-dev vite

# Create directory structure
mkdir -p src/{assets/{images/{branding,navigation,content},styles,scripts},public}
```

### Step 2.2: Create Directory Structure

```
kingbrewing-new/
├── src/
│   ├── index.html              # Homepage (was Main.html)
│   ├── beers.html             # Beer list
│   ├── menu.html              # Menu
│   ├── daily-specials.html    # Specials
│   ├── blog.html              # Blog
│   ├── podcast.html           # Podcast
│   ├── assets/
│   │   ├── images/
│   │   │   ├── branding/
│   │   │   │   └── king-logo.jpg
│   │   │   ├── navigation/
│   │   │   │   └── [15 navbar PNGs]
│   │   │   └── content/
│   │   │       └── [beer images, photos]
│   │   ├── styles/
│   │   │   ├── main.css
│   │   │   ├── layout.css
│   │   │   ├── navigation.css
│   │   │   └── responsive.css
│   │   └── scripts/
│   │       └── main.js
│   └── public/
│       ├── favicon.ico
│       └── robots.txt
├── dist/                      # Build output (gitignored)
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

### Step 2.3: Configure Vite

Create `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        beers: resolve(__dirname, 'src/beers.html'),
        menu: resolve(__dirname, 'src/menu.html'),
        specials: resolve(__dirname, 'src/daily-specials.html'),
        blog: resolve(__dirname, 'src/blog.html'),
        podcast: resolve(__dirname, 'src/podcast.html'),
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
```

### Step 2.4: Update package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Step 2.5: Create .gitignore

```
node_modules/
dist/
.DS_Store
*.log
```

**Deliverables**:
- ✅ New project initialized with Vite
- ✅ Directory structure created
- ✅ vite.config.js configured
- ✅ package.json scripts ready
- ✅ Test: `npm run dev` starts dev server

## Phase 3: HTML Templates (Week 1, Days 4-5)

### Step 3.1: Create Base HTML Template

Create `src/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="King Brewing Company - Craft beers and fine dining">
  <title>King Brewing Company</title>

  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">

  <!-- Styles -->
  <link rel="stylesheet" href="/assets/styles/main.css">

  <!-- Google Analytics 4 -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
<body>
  <!-- Header -->
  <header class="site-header">
    <div class="container">
      <img src="/assets/images/branding/king-logo.jpg" alt="King Brewing Company" class="logo">
      <nav class="main-nav">
        <ul>
          <li><a href="/index.html" class="active">Home</a></li>
          <li><a href="/beers.html">Beers</a></li>
          <li><a href="/daily-specials.html">Daily Specials</a></li>
          <li><a href="/menu.html">Menu</a></li>
          <li><a href="/blog.html">Blog</a></li>
          <li><a href="/podcast.html">Podcast</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <main class="main-content">
    <div class="container">
      <h1>Welcome to King Brewing Company</h1>

      <!-- Insert extracted content from Main.html here -->
      <section class="hero">
        <p>[Brewery description from content-inventory.md]</p>
      </section>

      <section class="featured-beers">
        <h2>Our Beers</h2>
        <!-- Beer content -->
      </section>
    </div>
  </main>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="container">
      <p>&copy; 2026 King Brewing Company. All rights reserved.</p>
      <p>
        <a href="#">Privacy Policy</a> |
        <a href="#">Terms of Service</a>
      </p>
    </div>
  </footer>

  <!-- Scripts -->
  <script type="module" src="/assets/scripts/main.js"></script>
</body>
</html>
```

### Step 3.2: Create Other Page Templates

Copy `index.html` template to:
- `beers.html` (update title, meta, content, active nav state)
- `menu.html`
- `daily-specials.html`
- `blog.html`
- `podcast.html`

**Key differences per page**:
1. Update `<title>` tag
2. Update meta description
3. Update `.active` class on navigation
4. Replace `<main>` content with page-specific content from content-inventory.md

**Deliverables**:
- ✅ 6 HTML pages created with modern HTML5 structure
- ✅ Semantic HTML (header, nav, main, footer, section)
- ✅ No inline styles
- ✅ No absolute positioning
- ✅ Content populated from content-inventory.md

## Phase 4: CSS Styling (Week 2, Days 1-3)

### Step 4.1: Create main.css (Imports)

Create `src/assets/styles/main.css`:

```css
/* Import all stylesheets */
@import url('layout.css');
@import url('navigation.css');
@import url('responsive.css');

/* CSS Custom Properties (Variables) */
:root {
  /* Colors (extracted from original site) */
  --primary-color: #121d8e;      /* King blue */
  --accent-color: #de2b00;       /* King red */
  --text-color: #333333;
  --bg-color: #ffffff;
  --gray-light: #f5f5f5;

  /* Typography */
  --font-primary: 'Gabrielle', Georgia, serif;
  --font-secondary: 'Helvetica Neue', Arial, sans-serif;

  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;

  /* Layout */
  --max-width: 1200px;
  --border-radius: 8px;

  /* Transitions */
  --transition: all 0.3s ease;
}

/* Global Resets */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-secondary);
  color: var(--text-color);
  line-height: 1.6;
  background-color: var(--bg-color);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition);
}

a:hover {
  color: var(--accent-color);
}

/* Container */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-primary);
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
  line-height: 1.2;
}

h1 { font-size: clamp(2rem, 5vw, 3rem); }
h2 { font-size: clamp(1.5rem, 4vw, 2.5rem); }
h3 { font-size: clamp(1.25rem, 3vw, 2rem); }

p {
  margin-bottom: var(--spacing-sm);
}
```

### Step 4.2: Create layout.css (Grid/Flexbox)

Create `src/assets/styles/layout.css`:

```css
/* Layout Components */

/* Header */
.site-header {
  background-color: var(--bg-color);
  border-bottom: 2px solid var(--primary-color);
  padding: var(--spacing-md) 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.site-header .container {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: var(--spacing-md);
}

.logo {
  max-width: 200px;
}

/* Main Content */
.main-content {
  min-height: 60vh;
  padding: var(--spacing-lg) 0;
}

/* Footer */
.site-footer {
  background-color: var(--primary-color);
  color: white;
  padding: var(--spacing-md) 0;
  text-align: center;
  margin-top: var(--spacing-lg);
}

.site-footer a {
  color: white;
}

.site-footer a:hover {
  color: var(--accent-color);
}

/* Content Sections */
.hero {
  text-align: center;
  padding: var(--spacing-lg) 0;
}

.featured-beers,
.menu-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.beer-card,
.menu-item {
  background-color: var(--gray-light);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.beer-card:hover,
.menu-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
```

### Step 4.3: Create navigation.css

Create `src/assets/styles/navigation.css`:

```css
/* Navigation Styles */

.main-nav ul {
  list-style: none;
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;
  align-items: center;
}

.main-nav a {
  display: block;
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--gray-light);
  border-radius: var(--border-radius);
  font-weight: 600;
  transition: var(--transition);
}

.main-nav a:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

.main-nav a.active {
  background-color: var(--accent-color);
  color: white;
}

/* Mobile Navigation Toggle (if needed) */
.nav-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--primary-color);
}
```

### Step 4.4: Create responsive.css

Create `src/assets/styles/responsive.css`:

```css
/* Responsive Design - Mobile First Approach */

/* Tablet (768px and up) */
@media (max-width: 768px) {
  .site-header .container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .main-nav ul {
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .main-nav a {
    width: 100%;
    text-align: center;
  }

  .featured-beers,
  .menu-section {
    grid-template-columns: 1fr;
  }

  .container {
    padding: 0 var(--spacing-sm);
  }

  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
}

/* Mobile (480px and down) */
@media (max-width: 480px) {
  .logo {
    max-width: 150px;
  }

  .site-header {
    padding: var(--spacing-sm) 0;
  }

  .main-content {
    padding: var(--spacing-md) 0;
  }

  h1 { font-size: 1.75rem; }
  h2 { font-size: 1.25rem; }
}

/* Large Desktop (1400px and up) */
@media (min-width: 1400px) {
  .container {
    max-width: 1400px;
  }
}
```

**Deliverables**:
- ✅ 4 CSS files created (main, layout, navigation, responsive)
- ✅ CSS Grid for layout (no absolute positioning)
- ✅ Flexbox for navigation
- ✅ CSS custom properties (variables) for theming
- ✅ Mobile-first responsive design
- ✅ Hover effects with CSS (no JavaScript needed)

## Phase 5: JavaScript (Week 2, Day 4)

### Step 5.1: Create main.js (Minimal)

Create `src/assets/scripts/main.js`:

```javascript
// Main JavaScript - Minimal, Modern ES6+

// Active Navigation State
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll('.main-nav a');

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage ||
        (currentPage === '/' && link.getAttribute('href') === '/index.html')) {
      link.classList.add('active');
    }
  });
});

// Smooth Scroll (if needed for anchor links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Mobile Navigation Toggle (if implementing hamburger menu)
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });
}

// Form Validation (if you have forms)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    // Add validation logic here if needed
    console.log('Form submitted');
  });
});

// Console message (optional, can remove in production)
console.log('King Brewing Company - Modern Website');
```

**Deliverables**:
- ✅ Minimal modern JavaScript (no iWeb code)
- ✅ ES6+ syntax
- ✅ Active navigation state
- ✅ Smooth scrolling
- ✅ Optional: mobile nav toggle
- ✅ ~50 lines total (vs ~21KB iWeb JavaScript per page)

## Phase 6: Asset Optimization (Week 2, Day 5)

### Step 6.1: Optimize Images

```bash
# Install image optimization tools
npm install --save-dev vite-plugin-imagemin

# Add to vite.config.js
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      svgo: {
        plugins: [{ removeViewBox: false }]
      }
    })
  ]
})
```

### Step 6.2: Create WebP Versions

```bash
# Install sharp for WebP conversion
npm install --save-dev sharp

# Create script to convert images
# create-webp.js
```

Create `scripts/create-webp.js`:

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, '../src/assets/images');

function convertToWebP(inputPath, outputPath) {
  sharp(inputPath)
    .webp({ quality: 80 })
    .toFile(outputPath)
    .then(() => console.log(`✓ ${outputPath}`))
    .catch(err => console.error(`✗ ${inputPath}:`, err));
}

// Convert all JPGs and PNGs
// [Add conversion logic]
```

### Step 6.3: Copy Optimized Assets

```bash
# Copy unique navbar images (only 15 files)
cp ../KingBrewing/Main_files/navbar_*.png src/assets/images/navigation/

# Copy logo (only 1 file)
cp "../KingBrewing/Main_files/King Logo DS3.jpg" src/assets/images/branding/king-logo.jpg

# Copy content images
cp ../KingBrewing/Images/*.jpg src/assets/images/content/

# Copy font
cp ../KingBrewing/css/Gabrielle.ttf src/assets/fonts/
```

**Deliverables**:
- ✅ All images optimized (PNG compression, JPG quality 80)
- ✅ WebP versions created for modern browsers
- ✅ Only 15 navbar PNGs (not 294)
- ✅ Only 1 logo file (not 13+)
- ✅ Font files copied

## Phase 7: Testing (Week 3, Days 1-2)

### Step 7.1: Development Testing

```bash
# Start dev server
npm run dev

# Test all 6 pages:
# http://localhost:3000/index.html
# http://localhost:3000/beers.html
# http://localhost:3000/menu.html
# http://localhost:3000/daily-specials.html
# http://localhost:3000/blog.html
# http://localhost:3000/podcast.html
```

**Manual Testing Checklist**:
- [ ] All pages load without errors
- [ ] Navigation works on all pages
- [ ] Active state shows correct page
- [ ] All images load correctly
- [ ] Responsive design works (320px to 1920px)
- [ ] No console errors
- [ ] Links work
- [ ] Fonts load correctly

### Step 7.2: Cross-Browser Testing

**Browsers to Test**:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Step 7.3: Performance Testing

**Google Lighthouse**:
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Build and preview
npm run build
npm run preview

# Run Lighthouse
lighthouse http://localhost:4173 --view
```

**Target Scores**:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 95+

### Step 7.4: Responsive Testing

**Test Viewports**:
- [ ] 320px (iPhone SE)
- [ ] 375px (iPhone 12)
- [ ] 768px (iPad)
- [ ] 1024px (iPad Pro)
- [ ] 1440px (Desktop)
- [ ] 1920px (Large Desktop)

**Tools**:
- Chrome DevTools Device Toolbar
- BrowserStack (optional)
- Real devices

### Step 7.5: Accessibility Testing

```bash
# Install axe DevTools browser extension
# Or use WAVE Web Accessibility Evaluation Tool
```

**Accessibility Checklist**:
- [ ] All images have alt text
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels where needed
- [ ] Form labels associated correctly

**Deliverables**:
- ✅ All pages tested on major browsers
- ✅ Lighthouse scores 90+ in all categories
- ✅ Responsive on all viewports
- ✅ WCAG 2.1 Level AA compliant
- ✅ No console errors

## Phase 8: Deployment (Week 3, Days 3-5)

### Step 8.1: Build for Production

```bash
# Create production build
npm run build

# Output will be in dist/ directory
# Contains optimized HTML, CSS, JS, and assets
```

### Step 8.2: Configure Domain

**DNS Settings for kingbrewing.info**:
1. Point A record to hosting IP
2. Add www CNAME if needed
3. Wait for DNS propagation (up to 48 hours)

### Step 8.3: Deploy to Hosting

**Option A: Traditional Hosting (FTP/SFTP)**

```bash
# Upload dist/ directory contents to web root
# Via FTP client (FileZilla, Transmit, etc.)
# Or via SFTP:

sftp user@kingbrewing.info
put -r dist/* /public_html/
```

**Option B: Modern Static Hosting (Recommended)**

**Netlify** (Free):
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

**Vercel** (Free):
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**GitHub Pages** (Free):
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "vite build && gh-pages -d dist"

# Deploy
npm run deploy
```

### Step 8.4: Configure HTTPS & Security

**SSL Certificate**:
- If using Netlify/Vercel: Automatic HTTPS ✅
- If using traditional hosting: Get Let's Encrypt certificate

**Security Headers** (.htaccess for Apache):

Create `dist/.htaccess`:

```apache
# Force HTTPS
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} !=on
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  # HSTS
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

  # Content Security Policy
  Header set Content-Security-Policy "default-src 'self'; script-src 'self' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com;"

  # Other security headers
  Header always set X-Frame-Options "DENY"
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-XSS-Protection "1; mode=block"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>
```

### Step 8.5: Configure Google Analytics 4

1. Create GA4 property at [analytics.google.com](https://analytics.google.com/)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Replace in all HTML pages' GA4 code
4. Verify tracking in GA4 Real-Time report

### Step 8.6: Post-Deployment Verification

**Checklist**:
- [ ] Site loads at https://kingbrewing.info
- [ ] All 6 pages accessible
- [ ] Navigation works
- [ ] Images load (check for 404s)
- [ ] HTTPS padlock shows in browser
- [ ] SSL Labs score: A+ (https://www.ssllabs.com/ssltest/)
- [ ] Google Mobile-Friendly Test passes
- [ ] GA4 tracking works (Real-Time report)
- [ ] No CoinHive or malware (verify with browser DevTools → Network)
- [ ] Performance: Lighthouse score 90+

## Phase 9: Cleanup & Documentation (Week 3, Day 5)

### Step 9.1: Create README.md

```markdown
# King Brewing Company Website

Modern, responsive website for King Brewing Company.

## Tech Stack
- Vite (build tool)
- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES6+)

## Development

\`\`\`bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## Deployment

Site is deployed to: https://kingbrewing.info

To deploy updates:
1. Make changes in src/
2. Test locally with \`npm run dev\`
3. Build: \`npm run build\`
4. Upload dist/ contents to hosting

## Project Structure

\`\`\`
src/
├── index.html          # Homepage
├── beers.html          # Beer list
├── menu.html           # Menu
├── daily-specials.html # Specials
├── blog.html           # Blog
├── podcast.html        # Podcast
└── assets/
    ├── images/         # All images
    ├── styles/         # CSS files
    └── scripts/        # JavaScript
\`\`\`

## Updating Content

To update content:
1. Edit HTML files in src/
2. Save
3. Dev server hot-reloads automatically
4. Build and deploy when ready

## Performance

- Lighthouse Score: 95+
- Mobile-First Responsive
- Optimized Images (WebP + fallbacks)
- Minimal JavaScript
```

### Step 9.2: Commit to Git

```bash
cd kingbrewing-new

# Initialize git
git init

# Add remote (your GitHub repo)
git remote add origin git@github.com:TheiDude/king-brewing.git

# Create .gitignore (already done in Phase 2)

# Initial commit
git add .
git commit -m "Initial commit: Modern King Brewing website

- Rewritten from scratch with Vite
- HTML5 semantic markup
- Responsive CSS Grid/Flexbox layout
- Mobile-first responsive design
- Optimized assets (15 navbar PNGs vs 294)
- No CoinHive malware
- Google Analytics 4
- Security headers configured
- Lighthouse score 90+

Replaces legacy iWeb 1.1.2 site from 2009-2013"

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 9.3: Archive Old Site

```bash
# Rename old site directory
cd /Users/kevinboyse/backup/
mv KingBrewing KingBrewing-legacy-archive

# Create archive
tar -czf KingBrewing-legacy-$(date +%Y%m%d).tar.gz KingBrewing-legacy-archive/

# Keep archive for reference, can delete original if space needed
```

## Success Metrics

### Before (Legacy iWeb Site)

- **Assets**: 294 navbar PNGs (duplicated across 6 _files directories)
- **Size**: ~4 MB total site size
- **Performance**: Lighthouse ~60-70
- **Mobile**: Fixed 700px width (not responsive)
- **Security**: CoinHive malware present
- **Maintainability**: Very difficult (iWeb-generated code)
- **Analytics**: Broken (urchin.js deprecated)

### After (New Rewrite)

- **Assets**: 15 navbar PNGs (shared across all pages)
- **Size**: ~1 MB total site size (75% reduction)
- **Performance**: Lighthouse 90+
- **Mobile**: Fully responsive (320px to 1920px+)
- **Security**: Clean, CSP headers, HTTPS enforced
- **Maintainability**: Easy (modern, readable code)
- **Analytics**: GA4 working

## Timeline Summary

| Week | Days | Phase | Deliverable |
|------|------|-------|-------------|
| 1 | 1-2 | Content Extraction | Content inventory, assets collected |
| 1 | 3-4 | Project Setup | Vite configured, directory structure |
| 1 | 4-5 | HTML Templates | 6 modern HTML5 pages |
| 2 | 1-3 | CSS Styling | Responsive Grid/Flexbox CSS |
| 2 | 4 | JavaScript | Minimal ES6+ scripts |
| 2 | 5 | Asset Optimization | Images optimized, WebP created |
| 3 | 1-2 | Testing | Browser, performance, accessibility |
| 3 | 3-5 | Deployment | Live on kingbrewing.info |
| 3 | 5 | Documentation | README, git commit |

**Total**: 2-3 weeks (15-18 working days)

## Quick Start Checklist

Want to start right away? Here's the condensed version:

### Day 1
- [ ] Extract content from 6 pages to content-inventory.md
- [ ] Copy unique assets (15 navbar PNGs, 1 logo, content images)

### Day 2-3
- [ ] Initialize new project with Vite
- [ ] Create directory structure
- [ ] Set up vite.config.js

### Day 4-5
- [ ] Create 6 HTML pages with modern structure
- [ ] Populate with extracted content

### Day 6-8
- [ ] Write CSS (main, layout, navigation, responsive)
- [ ] Test responsive design

### Day 9
- [ ] Add minimal JavaScript
- [ ] Test all functionality

### Day 10
- [ ] Optimize all images
- [ ] Create WebP versions

### Day 11-12
- [ ] Cross-browser testing
- [ ] Lighthouse testing (target 90+)
- [ ] Accessibility testing

### Day 13-15
- [ ] Build for production
- [ ] Deploy to kingbrewing.info
- [ ] Configure HTTPS and security headers
- [ ] Verify deployment
- [ ] Commit to git

## Support & Resources

- **Vite Docs**: https://vitejs.dev/
- **CSS Grid Guide**: https://css-tricks.com/snippets/css/complete-guide-grid/
- **Flexbox Guide**: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- **Google Lighthouse**: https://developers.google.com/web/tools/lighthouse
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **Let's Encrypt**: https://letsencrypt.org/

---

**Ready to start?** Begin with Phase 1: Content Extraction!

**Questions?** Refer to the detailed steps in each phase above.

**Note**: This plan assumes basic familiarity with HTML, CSS, JavaScript, and command line. Adjust timeline if learning as you go.
