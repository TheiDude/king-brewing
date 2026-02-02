# King Brewing Website Security Fixes

## Purpose

This document outlines critical security vulnerabilities discovered in the King Brewing website and provides step-by-step remediation procedures. **This is a HIGH PRIORITY document** - some issues pose immediate risk to visitors and must be addressed before proceeding with other modernization work.

## Critical Security Issues

### Issue #1: CoinHive Cryptocurrency Miner (CRITICAL - IMMEDIATE ACTION REQUIRED)

**Severity**: CRITICAL
**Priority**: P0 - FIX IMMEDIATELY
**Impact**: High - Affects all visitors to homepage

#### What is CoinHive?

CoinHive was a cryptocurrency mining service that allowed website owners to mine Monero cryptocurrency using visitors' CPU power. While the service shut down in 2019, the embedded code may still attempt to load and execute.

#### Why This is Critical

1. **Unethical**: Hijacks visitor CPU without consent
2. **Performance**: Causes browsers to slow down, devices to overheat
3. **Reputation**: If discovered, severely damages brewery's reputation
4. **Legal**: May violate computer fraud laws in some jurisdictions
5. **Security**: External script execution, potential XSS vector

#### Location

**File**: `/Users/kevinboyse/backup/KingBrewing/Main.html`
**Lines**: Approximately 110-115 (may vary slightly)

#### Code to Remove

Search for and remove this code block (or similar):

```html
<!-- CoinHive Miner Script -->
<script src="https://coinhive.com/lib/coinhive.min.js"></script>
<script>
var miner = new CoinHive.Anonymous('YOUR_SITE_KEY');
miner.start();
</script>
```

Alternative formats to look for:
```html
<!-- May also appear as -->
<script src="https://coin-hive.com/lib/coinhive.min.js"></script>
<script src="https://authedmine.com/lib/authedmine.min.js"></script>
<script>
var miner = new CoinHive.User('YOUR_SITE_KEY', 'username');
miner.start();
</script>
```

#### Removal Procedure

**Step 1: Locate the Code**

```bash
# Search for CoinHive references
cd /Users/kevinboyse/backup/KingBrewing
grep -rn "coinhive" .
grep -rn "coin-hive" .
grep -rn "authedmine" .
grep -rn "miner" Main.html
```

**Step 2: Create Backup**

```bash
# Backup Main.html before editing
cp Main.html Main.html.backup-$(date +%Y%m%d-%H%M%S)
```

**Step 3: Remove the Code**

Option A - Manual removal:
1. Open Main.html in text editor
2. Search for "coinhive" or "miner"
3. Delete the entire script block (including <script> tags)
4. Save the file

Option B - Command line removal (if exact line numbers known):
```bash
# If code is on lines 110-115
sed -i.bak '110,115d' Main.html
```

**Step 4: Verify Removal**

```bash
# Verify CoinHive code is gone
grep -i "coinhive" Main.html
grep -i "miner" Main.html

# Should return no results
```

**Step 5: Test**

1. Open Main.html in browser
2. Open Developer Tools → Network tab
3. Refresh page
4. Verify no requests to coinhive.com or related domains
5. Check Console for no miner-related errors

**Step 6: Deploy Immediately**

Do NOT wait for full modernization - deploy this fix to production immediately.

#### Verification Checklist

- [ ] Code located in Main.html
- [ ] Backup created
- [ ] CoinHive script block removed
- [ ] File saved
- [ ] grep confirms no "coinhive" references
- [ ] Browser test shows no miner loading
- [ ] Deployed to production
- [ ] Monitored for 24 hours (no issues)

---

### Issue #2: Deprecated Google Analytics (urchin.js)

**Severity**: Medium
**Priority**: P1 - Address during modernization
**Impact**: Medium - Analytics not working, privacy compliance issues

#### Problem

The site uses `urchin.js`, Google's original analytics library from ~2005-2012:

```html
<script src="http://www.google-analytics.com/urchin.js" type="text/javascript"></script>
<script type="text/javascript">
_uacct = "UA-XXXXXX-X";
urchinTracker();
</script>
```

#### Issues

1. **Not Functional**: Google discontinued urchin.js support in 2012
2. **No Data**: Site is not tracking visitors
3. **Privacy**: Doesn't comply with GDPR/CCPA requirements
4. **HTTP**: Loading over insecure connection (mixed content)
5. **Outdated**: Missing modern analytics features

#### Solution: Upgrade to Google Analytics 4 (GA4)

**Step 1: Create GA4 Property**

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create new GA4 property for kingbrewing.com
3. Get Measurement ID (format: G-XXXXXXXXXX)

**Step 2: Remove Old Analytics**

Search and remove:
```html
<script src="http://www.google-analytics.com/urchin.js" type="text/javascript"></script>
<script type="text/javascript">
_uacct = "UA-XXXXXX-X";
urchinTracker();
</script>
```

Also look for and remove:
- ga.js references (Universal Analytics)
- dc.js references (old DoubleClick)
- analytics.js references

**Step 3: Add GA4 Code**

Add to `<head>` section of all pages:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Step 4: Add Privacy Consent (GDPR/CCPA Compliance)**

Consider adding cookie consent banner:
```html
<script>
  // Disable tracking until consent is granted
  window['ga-disable-G-XXXXXXXXXX'] = true;

  function grantConsent() {
    window['ga-disable-G-XXXXXXXXXX'] = false;
    gtag('consent', 'update', {
      analytics_storage: 'granted'
    });
  }
</script>
```

**Step 5: Configure GA4 Settings**

In Google Analytics dashboard:
1. Set up data retention (default: 14 months)
2. Configure IP anonymization
3. Set up goals/conversions
4. Create custom reports

**Step 6: Test**

1. Open site in browser
2. Open Developer Tools → Network tab
3. Verify request to `googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`
4. Check GA4 Real-Time report for activity
5. Test on multiple pages

---

### Issue #3: Missing Content Security Policy (CSP)

**Severity**: Medium
**Priority**: P2 - Implement during modernization
**Impact**: Medium - Vulnerable to XSS attacks

#### Problem

No Content Security Policy headers means:
- Vulnerable to XSS (Cross-Site Scripting) attacks
- Can load scripts from any domain
- No protection against clickjacking
- No control over resource loading

#### Solution: Add CSP Headers

**Method 1: Via .htaccess (Apache)**

Add to `.htaccess`:

```apache
# Content Security Policy
<IfModule mod_headers.c>
  Header set Content-Security-Policy "default-src 'self'; script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
</IfModule>
```

**Method 2: Via Meta Tag (Temporary)**

Add to `<head>`:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;">
```

**Note**: Header method is preferred over meta tag.

#### CSP Directive Breakdown

| Directive | Value | Purpose |
|-----------|-------|---------|
| default-src | 'self' | Only load resources from same origin by default |
| script-src | 'self' + GA domains | Only load scripts from same origin and Google Analytics |
| style-src | 'self' 'unsafe-inline' | Styles from same origin + inline styles (temporary) |
| img-src | 'self' data: https: | Images from same origin, data URIs, any HTTPS |
| font-src | 'self' data: | Fonts from same origin and data URIs |
| connect-src | 'self' + GA | AJAX/fetch only to same origin and analytics |
| frame-ancestors | 'none' | Prevent site from being embedded in iframes (clickjacking) |
| base-uri | 'self' | Prevent base tag injection |
| form-action | 'self' | Forms can only submit to same origin |

**Step-by-Step Implementation**

1. Start with Report-Only mode to test:
   ```apache
   Header set Content-Security-Policy-Report-Only "..."
   ```

2. Test thoroughly on all pages

3. Review CSP violations in browser console

4. Adjust policy as needed

5. Switch to enforcement mode (remove `-Report-Only`)

---

### Issue #4: Force HTTPS Everywhere

**Severity**: Medium
**Priority**: P1 - Implement immediately
**Impact**: Medium - Data transmission security

#### Current State

`.htaccess` has HTTPS redirect only for `kingbrewing.info` domain:

```apache
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{HTTP_HOST} ^(www.)?kingbrewing.info$
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L]
</IfModule>
```

#### Problem

- Only redirects kingbrewing.info, not other domains/IPs
- Mixed content may still load over HTTP
- Doesn't enforce HSTS (HTTP Strict Transport Security)

#### Solution: Universal HTTPS + HSTS

**Update .htaccess**:

```apache
# Force HTTPS for all domains
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} !=on
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
</IfModule>

# HTTP Strict Transport Security (HSTS)
<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
</IfModule>
```

**HSTS Explanation**:
- `max-age=31536000`: Remember HTTPS requirement for 1 year
- `includeSubDomains`: Apply to all subdomains
- `preload`: Eligible for browser HSTS preload list

**Additional HTTPS Best Practices**:

1. **Fix Mixed Content**:
   - Audit all `<img>`, `<script>`, `<link>` tags
   - Ensure all use `https://` or protocol-relative `//` URLs
   - Fix any `http://` hardcoded URLs

2. **Update Canonical URLs**:
   ```html
   <link rel="canonical" href="https://kingbrewing.com/page.html" />
   ```

3. **SSL Certificate**:
   - Ensure valid SSL certificate installed
   - Use Let's Encrypt for free certificates
   - Set up auto-renewal

4. **Test SSL Configuration**:
   - Use [SSL Labs Test](https://www.ssllabs.com/ssltest/)
   - Target: A+ rating

---

### Issue #5: Additional Security Headers

**Severity**: Low
**Priority**: P3 - Nice to have
**Impact**: Low - Defense in depth

#### Recommended Headers

Add to `.htaccess`:

```apache
<IfModule mod_headers.c>
  # X-Frame-Options: Prevent clickjacking
  Header always set X-Frame-Options "DENY"

  # X-Content-Type-Options: Prevent MIME sniffing
  Header always set X-Content-Type-Options "nosniff"

  # X-XSS-Protection: Enable XSS filter (legacy browsers)
  Header always set X-XSS-Protection "1; mode=block"

  # Referrer-Policy: Control referrer information
  Header always set Referrer-Policy "strict-origin-when-cross-origin"

  # Permissions-Policy: Control browser features
  Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>
```

#### Header Explanations

| Header | Purpose | Value |
|--------|---------|-------|
| X-Frame-Options | Prevent clickjacking | DENY (can't be embedded) |
| X-Content-Type-Options | Prevent MIME sniffing | nosniff |
| X-XSS-Protection | XSS filter for old browsers | 1; mode=block |
| Referrer-Policy | Control referrer info | strict-origin-when-cross-origin |
| Permissions-Policy | Disable unnecessary features | Deny geolocation, mic, camera |

---

### Issue #6: Form Handler Security

**Severity**: Low
**Priority**: P3 - Review during modernization
**Impact**: Low - Forms may not be active

#### Current Form Handlers

- `gdform.cgi`
- `gdformssl.cgi`
- `gdform.php`

#### Concerns

1. **Old CGI scripts** - may have vulnerabilities
2. **No CSRF protection** visible
3. **No input validation** visible
4. **No rate limiting**

#### Recommendations

1. **Audit existing forms**:
   - Are they still in use?
   - What data do they collect?
   - Where does it go?

2. **Modern alternatives**:
   - Use form service (Formspree, Netlify Forms)
   - Implement server-side validation
   - Add CSRF tokens
   - Add reCAPTCHA v3

3. **If keeping CGI scripts**:
   - Review code for SQL injection vulnerabilities
   - Add input sanitization
   - Implement rate limiting
   - Add CSRF protection

---

## Implementation Checklist

### Immediate Actions (Week 1, Day 1)

- [ ] **CRITICAL**: Remove CoinHive from Main.html
- [ ] Create backup of Main.html
- [ ] Test CoinHive removal
- [ ] Deploy to production
- [ ] Monitor for 24 hours

### Week 1 Actions

- [ ] Upgrade analytics to GA4
- [ ] Add HTTPS redirect for all domains
- [ ] Implement HSTS header
- [ ] Fix any mixed content warnings
- [ ] Test SSL configuration (SSL Labs)

### Week 2-3 Actions

- [ ] Add Content Security Policy (Report-Only mode first)
- [ ] Test CSP on all pages
- [ ] Adjust CSP as needed
- [ ] Switch CSP to enforcement mode
- [ ] Add additional security headers (X-Frame-Options, etc.)

### Week 4+ Actions

- [ ] Review and update form handlers
- [ ] Audit external scripts/dependencies
- [ ] Implement privacy consent banner (GDPR/CCPA)
- [ ] Document security configurations
- [ ] Set up security monitoring

## Testing & Validation

### Security Scan Tools

1. **Mozilla Observatory**: https://observatory.mozilla.org/
   - Target score: A+ or A

2. **SecurityHeaders.com**: https://securityheaders.com/
   - Target score: A

3. **SSL Labs**: https://www.ssllabs.com/ssltest/
   - Target score: A+

4. **Google Safe Browsing**: https://transparencyreport.google.com/safe-browsing/search
   - Should show: No unsafe content found

### Manual Testing

1. **CoinHive Removal**:
   ```bash
   # Check for any remaining references
   grep -ri "coinhive\|miner\|authedmine" /Users/kevinboyse/backup/KingBrewing/*.html
   ```

2. **Mixed Content**:
   - Open site in Chrome
   - Open DevTools → Console
   - Look for mixed content warnings

3. **Analytics**:
   - Open site
   - Check GA4 Real-Time report
   - Verify events are being tracked

4. **HTTPS**:
   - Try accessing site via HTTP
   - Should redirect to HTTPS
   - Check for padlock icon in browser

5. **Security Headers**:
   ```bash
   curl -I https://kingbrewing.com/ | grep -i "content-security\|x-frame\|strict-transport"
   ```

## Monitoring & Ongoing Security

### Set Up Alerts

1. **Uptime Monitoring**: Use service like UptimeRobot
2. **Security Monitoring**: Set up Google Search Console
3. **SSL Expiry**: Calendar reminder for certificate renewal
4. **Analytics**: Set up GA4 anomaly detection

### Regular Audits

- **Monthly**: Check SSL Labs score
- **Quarterly**: Run Mozilla Observatory scan
- **Yearly**: Full security audit

### Incident Response

If security issue discovered:
1. Document the issue
2. Assess impact
3. Fix immediately
4. Deploy fix
5. Notify affected users (if applicable)
6. Review how issue occurred
7. Implement preventive measures

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Mozilla Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)
- [Google Analytics 4 Setup](https://support.google.com/analytics/answer/9304153)
- [Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Let's Encrypt - Free SSL](https://letsencrypt.org/)
- [SSL Labs Best Practices](https://github.com/ssllabs/research/wiki/SSL-and-TLS-Deployment-Best-Practices)

---

**CRITICAL REMINDER**: Remove CoinHive miner immediately. Do not wait for full modernization to address this security issue.

**Document Status**: Planning Phase
**Last Updated**: 2026-02-01
**Next Review**: After Week 1 security fixes implemented
