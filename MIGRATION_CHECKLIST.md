# Migration Checklist: React → Lightweight Version

## ✅ Before You Start
- [ ] You have the latest ZIP download from Manus
- [ ] You have access to your GitHub repo
- [ ] You have Cloudflare Pages access
- [ ] Your `.md` session files are backed up

## 📥 Step 1: Download & Extract
- [ ] Download ZIP from Manus Management UI
- [ ] Extract to your computer
- [ ] Navigate to the `lite/` folder

## 🗑️ Step 2: Delete Old Files (in your GitHub repo)
- [ ] Delete `client/` folder
- [ ] Delete `server/` folder
- [ ] Delete `shared/` folder
- [ ] Delete `vite.config.ts`
- [ ] Delete `tailwind.config.ts`
- [ ] Delete `tsconfig.json`
- [ ] Delete old `package.json`
- [ ] Delete `.github/workflows/convert-sessions.yml` (old one)

## 📋 Step 3: Copy New Files
- [ ] Copy `index.html` from lite/
- [ ] Copy `css/` folder from lite/
- [ ] Copy `js/` folder from lite/
- [ ] Copy `package.json` from lite/
- [ ] Copy `.github/workflows/build-deploy.yml` from lite/

## ✔️ Step 4: Verify Structure
Your repo should now have:
- [ ] `index.html` (at root)
- [ ] `css/style.css`
- [ ] `js/app.js`, `js/router.js`, `js/components.js`, `js/i18n.js`
- [ ] `package.json`
- [ ] `sessions/` folder with `.md` files
- [ ] `scripts/convert-sessions.mjs`
- [ ] `public/data/sessions.json`
- [ ] `.github/workflows/build-deploy.yml`

## 🚀 Step 5: Push to GitHub
```bash
git add .
git commit -m "Refactor: Lightweight vanilla JS version"
git push origin main
```

## ☁️ Step 6: Update Cloudflare Pages
1. Go to Cloudflare Pages dashboard
2. Select your project
3. Go to Settings → Build & Deployments
4. Update these settings:
   - **Build command:** `node scripts/convert-sessions.mjs`
   - **Build output directory:** `.` (dot)
   - **Root directory:** `/` (slash)
5. Click Save

## 🧪 Step 7: Test Deployment
- [ ] Wait for Cloudflare build to complete
- [ ] Open site in incognito mode
- [ ] Check homepage loads instantly
- [ ] Test language toggle (EN/EL)
- [ ] Click through pages (Sessions, About)
- [ ] Test on mobile device
- [ ] Check Network tab in DevTools (should be <100KB total)

## 📝 Step 8: Add New Sessions
To add a new session:
1. Create `sessions/2026-02-05.md` (use correct date format)
2. Copy format from `Example.md`
3. Push to GitHub
4. Cloudflare auto-builds and deploys ✅

## 🎉 Done!
Your site is now:
- ⚡ 84% smaller (104KB vs 636KB)
- 🚀 Instant loading on mobile
- 📱 Fully responsive
- 🔄 Auto-updating with GitHub Actions
- 🌍 Deployed on Cloudflare Pages

---

## 🆘 If Something Goes Wrong

### Build fails on Cloudflare
- Check that `scripts/convert-sessions.mjs` exists
- Verify `.md` files have correct format
- Check GitHub Actions logs

### Site doesn't load
- Clear browser cache (Ctrl+Shift+Delete)
- Check that all files were copied correctly
- Verify `index.html` is at repo root

### Sessions not showing
- Verify `.md` files are in `sessions/` folder
- Check filename format: `YYYY-MM-DD.md`
- Check `public/data/sessions.json` was generated

---

**Questions?** Check `DEPLOYMENT_GUIDE.md` for detailed instructions.
