# VouliWatch CY - Parliamentary Tracking in Plain Language

**VouliWatch CY** is a civic-tech platform that makes the Cypriot Parliament's legislative activities transparent and understandable to citizens. We track parliamentary sessions, explain complex decisions in plain language, and provide evidence-based documentation.

**Live Site:** [https://vouliwatch-cy-website.pages.dev](https://vouliwatch-cy-website.pages.dev)

---

## 🎯 Mission

To empower Cypriot citizens by making parliamentary proceedings transparent, accessible, and easy to understand without legal jargon or bureaucratic language.

---

## ⚡ Key Features

- **Hero Swipe Deck**: Browse the latest parliamentary session's topics with smooth horizontal scrolling
- **Session Archive**: Access all historical sessions with filtering and search
- **Plain Language Explanations**: Complex legislative decisions explained simply
- **Bilingual Support**: Full Greek and English language support with persistent preferences
- **Evidence-Based**: Every decision includes references, vote counts, and certainty levels
- **Lightning Fast**: 104KB total bundle size, loads instantly on mobile
- **Zero Dependencies**: Pure vanilla JavaScript, no frameworks or bloat

---

## 🏗️ Architecture Overview

VouliWatch CY is built as a **lightweight, static website** optimized for speed and simplicity.

### **Technology Stack**

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Frontend** | Vanilla JavaScript (ES6+) | Client-side routing, UI interactions |
| **Styling** | Pure CSS 3 | Responsive design, animations |
| **Routing** | Custom router.js | Client-side navigation without page reloads |
| **i18n** | Custom i18n.js | Greek/English language support |
| **Data** | JSON (auto-generated) | Session data loaded at runtime |
| **Deployment** | Cloudflare Pages | Global CDN, auto-deploys on push |
| **Build** | Node.js script | Converts .md files to JSON |

### **Why This Approach?**

**Before (React Version):**
- 636KB JavaScript bundle
- 3-5 second load time on mobile
- 50+ dependencies
- Complex build process

**After (Lightweight Version):**
- 104KB total (84% smaller) ✅
- <1 second load time ✅
- Zero dependencies ✅
- Simple Node.js conversion script ✅

---

## 📁 Project Structure

```
vouliwatch-cy/
├── index.html                 ← Main HTML file (entry point)
├── package.json               ← Minimal project metadata
├── README.md                  ← This file
│
├── css/
│   └── style.css             ← All styling (responsive, animations)
│
├── js/
│   ├── app.js                ← Main application logic, page handlers
│   ├── router.js             ← Client-side routing engine
│   ├── components.js         ← Reusable UI components
│   └── i18n.js              ← Language management (Greek/English)
│
├── data/
│   └── sessions.json         ← Auto-generated from .md files
│
├── sessions/
│   ├── 2025-12-16.md        ← Session markdown files
│   ├── 2026-01-29.md
│   └── 2025-10-13.md
│
├── scripts/
│   └── convert-sessions.mjs  ← Conversion script (.md → JSON)
│
└── .github/
    └── workflows/
        └── build-deploy.yml  ← GitHub Actions automation
```

---

## 🔄 How It Works: The Complete Pipeline

### **Step 1: You Create a Session File**

Create a new `.md` file in the `sessions/` folder with the correct format:

```markdown
Title: 2026/02/05 - Συνεδρία Ολομέλειας της Βουλής
Video: https://www.youtube.com/watch?v=...

# Σύνοψη συνεδρίας
Main summary of the session...

## Θέματα / αποφάσεις

### 1. Topic Title
- Κατάσταση: Εγκρίθηκε
- Με απλά λόγια: Plain language explanation
- Ψηφοφορία: 52 ✓ | 0 ✗ | 3 –
- Απόδειξη: Evidence reference
- Σχετικό PDF: Document reference
- Επίπεδο βεβαιότητας: Υψηλό
- Γιατί έχει σημασία: Why this matters
```

### **Step 2: Push to GitHub**

```bash
git add sessions/2026-02-05.md
git commit -m "Add session: 2026-02-05"
git push origin main
```

### **Step 3: GitHub Actions Triggers**

The `.github/workflows/build-deploy.yml` workflow automatically:
1. Detects the new `.md` file
2. Runs `node scripts/convert-sessions.mjs`
3. Converts all `.md` files to `data/sessions.json`
4. Deploys to Cloudflare Pages

### **Step 4: Conversion Script Processes Files**

The `scripts/convert-sessions.mjs` script:

```javascript
// 1. Reads all .md files from sessions/ folder
// 2. Parses each file:
//    - Extracts Title and Video from header
//    - Parses topics from ## Θέματα section
//    - Extracts metadata (status, votes, evidence, etc.)
// 3. Generates unique session IDs from filenames
//    - 2026-01-29.md → ID: "2026-01-29"
//    - 2026-01-29 A.md → ID: "2026-01-29-a"
//    - 2026-01-29 B.md → ID: "2026-01-29-b"
// 4. Writes to data/sessions.json
```

### **Step 5: Website Loads Data**

When you visit the site:

```javascript
// 1. app.js calls loadSessions()
// 2. Fetches ./data/sessions.json
// 3. Stores in sessionsData object
// 4. Pages render dynamically from this data
// 5. Language toggle switches between Greek/English
```

### **Step 6: User Sees Updated Site**

- Homepage shows latest session in hero swipe deck
- Sessions archive displays all sessions
- Each topic card shows status, votes, certainty
- Click "Διάβασε περισσότερα" to see full details

---

## 📄 File Format Specification

### **Filename Requirements**

Sessions must follow this naming convention:

```
YYYY-MM-DD.md              ← Single session on that date
YYYY-MM-DD A.md            ← Multiple sessions same day
YYYY-MM-DD B.md
YYYY-MM-DD morning.md      ← Alternative naming
YYYY-MM-DD afternoon.md
```

**Important:** The date must be in `YYYY-MM-DD` format for the script to parse it correctly.

### **Markdown Content Structure**

```markdown
Title: YYYY/MM/DD - Session Title
Video: https://www.youtube.com/watch?v=VIDEO_ID

# Σύνοψη συνεδρίας
[Main summary paragraph]

## Θέματα / αποφάσεις

### 1. First Topic Title
- Κατάσταση: Εγκρίθηκε | Αναβλήθηκε | Απορρίφθηκε | Αποσύρθηκε
- Με απλά λόγια: [Plain language explanation of what was decided]
- Ψηφοφορία: [For] ✓ | [Against] ✗ | [Abstain] –
- Απόδειξη: [Reference to official source or timestamp]
- Σχετικό PDF: [PDF document name or reference]
- Επίπεδο βεβαιότητας: Υψηλό | Μέτριο | Χαμηλό
- Γιατί έχει σημασία: [Why this decision matters to citizens]

### 2. Second Topic Title
[Same structure as above]

## Εκκρεμότητες / αβεβαιότητες
[Any uncertainties or pending items]
```

---

## 🌐 Frontend Architecture

### **Client-Side Routing (router.js)**

The website uses a custom client-side router that enables navigation without page reloads:

```javascript
router.register('/', pages.home);           // Homepage
router.register('/sessions', pages.sessions); // All sessions
router.register('/about', pages.about);     // About page
router.register('/sessions/:id', pages.sessionDetail); // Session detail
```

**How it works:**
1. User clicks a link with `data-link` attribute
2. Router intercepts the click
3. Updates URL via History API
4. Renders new page content dynamically
5. No server request needed (instant navigation)

### **Language Support (i18n.js)**

The website supports Greek and English with persistent storage:

```javascript
// User clicks language toggle
i18n.toggleLanguage();

// Current language stored in localStorage
localStorage.getItem('language'); // 'el' or 'en'

// All UI text comes from i18n.t() function
i18n.t('nav.home')  // Returns "Αρχική" or "Home"
```

**How to add new translations:**
1. Open `js/i18n.js`
2. Add new key to `messages.el` and `messages.en`
3. Use `i18n.t('your.key')` in components

### **Component System (components.js)**

Reusable UI components are defined as functions:

```javascript
components.navbar()           // Navigation bar
components.footer()           // Footer
components.statusBadge(status) // Status indicator
components.certaintyBadge(level) // Certainty level
components.formatDate(dateStr) // Date formatting
```

### **Main Application Logic (app.js)**

The app.js file contains:
- `loadSessions()` - Fetches and parses sessions.json
- `pages.home()` - Homepage with hero deck and previous sessions
- `pages.sessions()` - Archive of all sessions
- `pages.sessionDetail(id)` - Full session details
- `pages.about()` - About and how-it-works page

---

## 🎨 Design System

### **Color Palette**

| Color | Usage | Value |
|-------|-------|-------|
| **Navy** | Primary, backgrounds | `#1e3a5f` |
| **Gold** | Accents, highlights | `#d4af37` |
| **Cream** | Cards, light backgrounds | `#f5f1e8` |
| **Dark Gray** | Text | `#2d3e50` |
| **Light Gray** | Borders, dividers | `#e0e0e0` |

### **Typography**

- **Display Font**: Syne (bold, headlines)
- **Body Font**: Source Serif 4 (readable, content)
- **Monospace**: System font (code, data)

### **Responsive Breakpoints**

```css
Mobile:   < 640px   (full width, stacked layout)
Tablet:   640-1024px (2-column, adjusted spacing)
Desktop:  > 1024px  (3-column, full layout)
```

---

## 🚀 Deployment Guide

### **Prerequisites**

- GitHub repository
- Cloudflare Pages account
- Node.js installed locally (for testing)

### **Initial Setup**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vouliwatch-cy.git
   cd vouliwatch-cy
   ```

2. **Connect to Cloudflare Pages**
   - Go to Cloudflare Pages dashboard
   - Click "Create a project"
   - Connect your GitHub repository
   - Set build settings:
     - **Build command:** `node scripts/convert-sessions.mjs`
     - **Build output directory:** (leave blank)
     - **Root directory:** (leave blank)

3. **Deploy**
   - Cloudflare automatically deploys on every push to `main`

### **Adding New Sessions**

```bash
# 1. Create new session file
echo "Title: 2026/02/05 - Session Title
Video: https://youtube.com/watch?v=...

# Σύνοψη συνεδρίας
..." > sessions/2026-02-05.md

# 2. Commit and push
git add sessions/2026-02-05.md
git commit -m "Add session: 2026-02-05"
git push origin main

# 3. Cloudflare automatically:
#    - Runs conversion script
#    - Generates sessions.json
#    - Deploys updated site
#    - Done! ✅
```

### **Testing Locally**

```bash
# 1. Convert sessions
node scripts/convert-sessions.mjs

# 2. Start local server
python3 -m http.server 8000

# 3. Open browser
# http://localhost:8000
```

---

## 📊 Performance Metrics

| Metric | Value | Notes |
|--------|-------|-------|
| **Total Bundle Size** | 104KB | HTML + CSS + JS + JSON |
| **Initial Load Time** | <1s | On 3G connection |
| **Time to Interactive** | <500ms | Page fully interactive |
| **Lighthouse Score** | 95+ | Performance, Accessibility |
| **Mobile Performance** | Excellent | Optimized for small screens |
| **Build Time** | <2s | Cloudflare deployment |
| **Dependencies** | 0 | Pure vanilla JavaScript |

---

## 🔧 Troubleshooting

### **Sessions Not Showing**

**Problem:** New sessions don't appear after pushing to GitHub

**Solutions:**
1. Check filename format: `YYYY-MM-DD.md` (must be exact)
2. Verify Cloudflare build logs for errors
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check that `data/sessions.json` was generated

### **Cloudflare Build Fails**

**Problem:** Build fails with error about missing files

**Solutions:**
1. Verify `scripts/convert-sessions.mjs` exists
2. Check `.md` file format matches specification
3. Review Cloudflare build logs for specific error
4. Ensure `data/` folder exists in repo

### **Language Toggle Not Working**

**Problem:** Language doesn't change when clicking toggle

**Solutions:**
1. Check browser console (F12) for JavaScript errors
2. Clear localStorage: `localStorage.clear()`
3. Hard refresh page: Ctrl+Shift+R
4. Check that `js/i18n.js` is loaded

### **Slow Performance**

**Problem:** Site loads slowly on mobile

**Solutions:**
1. Clear Cloudflare cache (Settings → Caching)
2. Check Network tab in DevTools for large files
3. Verify CSS and JS files are minified
4. Test on different networks (3G, 4G, WiFi)

---

## 📝 Session Metadata Reference

### **Status Values**

- `Εγκρίθηκε` - Approved/Passed
- `Αναβλήθηκε` - Postponed/Deferred
- `Απορρίφθηκε` - Rejected
- `Αποσύρθηκε` - Withdrawn

### **Certainty Levels**

- `Υψηλό` - High (green indicator 🟢)
- `Μέτριο` - Medium (yellow indicator 🟡)
- `Χαμηλό` - Low (red indicator 🔴)

### **Vote Format**

- `For ✓` - Votes in favor
- `Against ✗` - Votes against
- `Abstain –` - Abstentions

---

## 🤝 Contributing

To contribute new sessions or improvements:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/new-session`
3. Add your session file to `sessions/` folder
4. Commit: `git commit -m "Add session: YYYY-MM-DD"`
5. Push: `git push origin feature/new-session`
6. Open a Pull Request

---

## 📞 Support & Contact

- **Email:** info@vouliwatch.cy
- **Instagram:** [@vouliwatchcy](https://instagram.com/vouliwatchcy)
- **Telegram:** [@vouliwatchcy](https://t.me/vouliwatchcy)

---

## ⚖️ Legal & Disclaimer

VouliWatch CY is a civic-tech initiative designed to increase parliamentary transparency. While we strive for accuracy, this platform is not an official government resource. All information is provided for educational and informational purposes.

**Disclaimer:** VouliWatch CY uses AI-assisted analysis. While we cross-reference with official sources, errors may occur. If you find inaccurate information, please contact us immediately.

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🎯 Roadmap

**Planned Features:**
- [ ] Full-text search across all topics
- [ ] Advanced filtering by status, certainty, date range
- [ ] Topic statistics and trends dashboard
- [ ] Email newsletter subscriptions
- [ ] Social media integration (Instagram, Telegram embeds)
- [ ] Mobile app (React Native)
- [ ] API for third-party integrations
- [ ] Voting history tracking
- [ ] MP voting patterns analysis

---

**Built with ❤️ for Cypriot citizens | Last Updated: May 2026**
