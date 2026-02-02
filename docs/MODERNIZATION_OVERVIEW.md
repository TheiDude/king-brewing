# King Brewing Website Modernization Overview

## Purpose

This document provides an executive summary of the King Brewing website modernization project, outlining goals, timeline, and key deliverables for transforming the legacy iWeb-generated site into a modern, responsive, and maintainable web presence.

## Executive Summary

The King Brewing website was originally created using Apple's iWeb 1.1.2 in the 2009-2013 timeframe. While the site has served its purpose, it now suffers from significant technical debt, security vulnerabilities, performance issues, and maintainability challenges. This modernization project will transform the site using current web standards and modern build tools while preserving all existing content and the brewery's visual identity.

### Quick Facts

- **Current State**: iWeb 1.1.2 generated static site (XHTML 1.0 Transitional)
- **Pages**: 6 main pages (Home, Beers, Menu, Daily Specials, Blog, Podcast)
- **Build Tool**: Vite (recommended)
- **Timeline**: 4-6 weeks
- **Estimated Effort**: ~120-160 hours
- **Critical Issue**: CoinHive cryptocurrency miner (SECURITY RISK)

## Project Goals

### Primary Objectives

1. **Security**: Remove CoinHive malware and implement modern security practices
2. **Performance**: Achieve Lighthouse score of 90+ in all categories
3. **Responsiveness**: Create mobile-first, responsive design for all viewports
4. **Maintainability**: Eliminate asset duplication and establish modern code architecture
5. **Accessibility**: Meet WCAG 2.1 Level AA compliance standards

### Secondary Objectives

1. Update deprecated Google Analytics to GA4
2. Reduce asset size by 50-70% through consolidation and optimization
3. Replace fixed 700px layout with fluid, responsive Grid/Flexbox
4. Remove legacy browser support (IE6-8)
5. Implement Content Security Policy (CSP) headers

## Current State Assessment

### Technology Stack (Legacy)

- **HTML**: XHTML 1.0 Transitional with heavy absolute positioning
- **CSS**: Inline styles + external stylesheets, IE6-8 specific files
- **JavaScript**: iWeb-generated scripts (~21KB per page) for font sizing and mouseovers
- **Analytics**: Deprecated urchin.js (Google Analytics circa 2009)
- **Layout**: Fixed 700px width, not responsive
- **Navigation**: Image-based with JavaScript rollover effects

### Critical Issues Identified

#### 1. SECURITY (Critical Priority)
- **CoinHive Cryptocurrency Miner** embedded in Main.html (lines 110-115)
  - Hijacks visitor CPU for mining
  - Major security and ethical violation
  - Must be removed immediately

#### 2. Asset Duplication (High Priority)
- **294 navbar PNG files** scattered across _files directories
  - Only 15 unique images needed
  - ~600-800KB of wasted space
- **13+ duplicated logo files** (King Logo DS3.jpg)
  - Should be 1 master file
  - ~100-150KB wasted

#### 3. Performance (Medium Priority)
- Large page sizes despite static content
- Unoptimized images
- Render-blocking inline styles
- No modern compression or caching

#### 4. Maintainability (Medium Priority)
- Each page has separate _files directory with duplicated assets
- Inline styles make design changes difficult
- iWeb-generated code is verbose and hard to modify
- No version control or build process

#### 5. Accessibility (Medium Priority)
- Image-based navigation lacks proper alt text
- Fixed font sizes
- Poor semantic HTML structure
- No ARIA labels

## Target State Vision

### Modern Technology Stack

- **HTML**: Semantic HTML5 with external styles
- **CSS**: Modular CSS with Grid/Flexbox, mobile-first responsive design
- **JavaScript**: Modern ES6+ modules (minimal, focused)
- **Build Tool**: Vite with zero-config multi-page support
- **Analytics**: Google Analytics 4 (GA4)
- **Layout**: Fluid, responsive design (320px to 1920px+)
- **Navigation**: CSS-based hover effects, accessible markup

### Proposed File Structure

```
king-brewing-modern/
├── src/
│   ├── index.html
│   ├── beers.html
│   ├── menu.html
│   ├── daily-specials.html
│   ├── blog.html
│   ├── podcast.html
│   └── assets/
│       ├── images/
│       │   ├── branding/
│       │   ├── navigation/
│       │   └── content/
│       ├── styles/
│       │   ├── main.css
│       │   ├── layout.css
│       │   ├── navigation.css
│       │   └── responsive.css
│       └── scripts/
│           ├── main.js
│           └── navigation.js
├── dist/ (build output)
├── docs/ (all documentation)
├── package.json
├── vite.config.js
└── README.md
```

## Project Timeline

### 4-6 Week Schedule

#### Week 1: Emergency Security + Foundation
- **Day 1**: Remove CoinHive malware from Main.html (IMMEDIATE)
- **Day 2-3**: Create all 11 markdown documentation files
- **Day 4-5**: Initialize Vite project structure, set up package.json

#### Week 2: Asset Consolidation
- Identify 15 unique navbar images from 294 duplicates
- Consolidate 13 logo copies into 1 master file
- Optimize all images (PNG/JPG compression, WebP conversion)
- Create shared assets/ directory structure
- Document asset mapping

#### Week 3: Content Migration
- Convert Main.html → index.html (HTML5)
- Convert Beers.html, Menu.html, Daily Specials.html
- Convert Blog.html and Podcast.html
- Update all asset paths to new structure
- Replace deprecated analytics with GA4
- Remove all inline styles

#### Week 4: CSS/JS Modernization
- Replace fixed 700px width with responsive Grid/Flexbox
- Remove all absolute positioning
- Create mobile-first CSS architecture
- Replace iWeb JavaScript with modern ES6+ code
- Implement CSS hover effects (remove JS mouseovers)
- Add proper semantic HTML structure

#### Week 5-6: Testing & Deployment
- Visual regression testing (BackstopJS)
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile responsiveness testing (320px to 1920px)
- Performance testing (Lighthouse score 90+)
- Accessibility audit (WCAG 2.1 Level AA)
- Security audit (CSP, HTTPS, no malware)
- Deploy to production
- Monitor for issues

## Key Performance Indicators (KPIs)

### Technical Metrics

| Metric | Current | Target | How to Measure |
|--------|---------|--------|----------------|
| Lighthouse Performance | ~60-70 | 90+ | Google Lighthouse |
| Lighthouse Accessibility | ~70-80 | 90+ | Google Lighthouse |
| Lighthouse Best Practices | ~50-60 | 90+ | Google Lighthouse |
| Lighthouse SEO | ~80-90 | 95+ | Google Lighthouse |
| Page Load Time | ~3-5s | <2s | WebPageTest |
| Total Asset Size | ~2-3MB | <1MB | Browser DevTools |
| Unique Assets | 294 navbar | 15 navbar | File system audit |
| Mobile Friendly | No | Yes | Google Mobile Test |
| WCAG Compliance | Fails | AA | WAVE, axe DevTools |

### Business Metrics

- **Reduced Bounce Rate**: Better mobile experience should reduce bounce rate
- **Improved SEO Rankings**: Modern HTML5 and performance improvements
- **Lower Hosting Costs**: Smaller asset sizes = lower bandwidth
- **Faster Updates**: Maintainable code = quicker content updates
- **Brand Trust**: Removal of malware protects brewery reputation

## Stakeholder Communication Plan

### Key Stakeholders

1. **Website Owner**: Final approval on design changes
2. **Development Team**: Implementation and testing
3. **Marketing**: Content review and SEO considerations
4. **Security**: Verification of malware removal and security hardening

### Communication Schedule

- **Week 0**: Present modernization plan, get approval
- **Week 1**: Security fix completed notification (CoinHive removed)
- **Week 2**: Asset consolidation progress report
- **Week 3**: Content migration review (visual comparison)
- **Week 4**: CSS/JS modernization demo
- **Week 5**: Pre-launch testing results
- **Week 6**: Go-live notification and monitoring report

### Decision Points

1. **Week 1**: Approve removal of CoinHive (no-brainer, security risk)
2. **Week 3**: Review visual design changes (responsive vs fixed layout)
3. **Week 4**: Approve navigation changes (CSS vs image-based)
4. **Week 5**: Final approval for production deployment

## Risk Assessment

### High Risk

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| CoinHive discovered by users before removal | Medium | High | Remove immediately in Week 1 Day 1 |
| Visual differences from original | High | Medium | Visual regression testing, stakeholder review |
| Broken links after migration | Medium | High | Comprehensive link testing, 301 redirects |

### Medium Risk

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Performance regression | Low | Medium | Lighthouse testing, performance monitoring |
| Browser compatibility issues | Low | Medium | Cross-browser testing matrix |
| Content loss during migration | Low | High | Full backup, git version control |

### Low Risk

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Build tool complexity | Low | Low | Vite is simple, well-documented |
| Learning curve for maintenance | Low | Low | Documentation, training |

## Success Criteria

### Must-Have (Launch Blockers)

- ✅ CoinHive malware removed
- ✅ All 6 pages functional and visually acceptable
- ✅ Mobile responsive (320px to 1920px)
- ✅ Lighthouse Performance score 80+
- ✅ No broken links or images
- ✅ HTTPS enforced

### Should-Have (Post-Launch OK)

- ✅ Lighthouse scores 90+ in all categories
- ✅ WCAG 2.1 Level AA compliance
- ✅ Asset size reduction of 50%+
- ✅ CSP headers configured
- ✅ GA4 analytics tracking

### Nice-to-Have (Future Iterations)

- ✅ WebP image format support
- ✅ Service worker for offline support
- ✅ Automated deployment pipeline
- ✅ CMS integration for content updates

## Budget Considerations

### Time Investment

- **Planning & Documentation**: 16-20 hours (Week 0-1)
- **Security Fix**: 2-4 hours (Week 1 Day 1)
- **Asset Consolidation**: 16-20 hours (Week 2)
- **Content Migration**: 24-30 hours (Week 3)
- **CSS/JS Modernization**: 32-40 hours (Week 4)
- **Testing & Deployment**: 24-32 hours (Week 5-6)
- **Contingency**: 8-16 hours (buffer)

**Total**: 120-160 hours

### Cost Factors

- Developer time (primary cost)
- Build tool licenses (Vite is free/open source)
- Testing tools (most are free: Lighthouse, WAVE, etc.)
- Hosting (likely same as current, possibly cheaper due to smaller assets)
- No additional software purchases required

## Next Steps

1. **Get Approval**: Review this overview with stakeholders
2. **Review Documentation**: Read all 11 markdown files in docs/ directory
3. **Immediate Action**: Remove CoinHive malware (don't wait for full modernization)
4. **Begin Week 1**: Set up Vite project structure
5. **Follow Plan**: Execute migration phases systematically

## Documentation Index

This is part of a comprehensive documentation set. Please review all files:

1. **MODERNIZATION_OVERVIEW.md** (this file) - Executive summary
2. **LEGACY_AUDIT.md** - Detailed current state analysis
3. **SECURITY_FIXES.md** - Security vulnerabilities and fixes
4. **ASSET_CONSOLIDATION_STRATEGY.md** - Asset deduplication plan
5. **BUILD_TOOL_DECISION.md** - Vite vs Webpack comparison
6. **MODERN_FILE_STRUCTURE.md** - New directory layout
7. **CSS_MODERNIZATION_GUIDE.md** - CSS architecture and responsive design
8. **JAVASCRIPT_MODERNIZATION_GUIDE.md** - Modern JavaScript patterns
9. **MIGRATION_PHASES.md** - Week-by-week implementation guide
10. **TESTING_STRATEGY.md** - Testing procedures and checklists
11. **DEPLOYMENT_GUIDE.md** - Deployment and monitoring procedures

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Google Analytics 4](https://support.google.com/analytics/answer/10089681)
- [MDN Web Docs - Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

---

**Document Version**: 1.0
**Last Updated**: 2026-02-01
**Status**: Planning Phase
**Next Review**: After Week 1 completion
