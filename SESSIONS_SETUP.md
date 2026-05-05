# VouliWatch CY - Sessions Setup Guide

This guide explains how to add new parliamentary session summaries to the website.

## File Format

Session files must be placed in the `sessions/` folder with the `.md` extension and follow this exact format:

```markdown
Title: YYYY/MM/DD - Συνεδρία Ολομέλειας της Βουλής
Video: https://www.youtube.com/watch?v=VIDEO_ID

# Σύνοψη συνεδρίας

## Κύρια αποτελέσματα

[Main summary paragraph(s) explaining what was decided]

- Bullet point 1
- Bullet point 2
- Bullet point 3

## Θέματα / αποφάσεις

### 1. Topic Title
- **Κατάσταση:** Ψηφίστηκε / Εγκρίθηκε (or Αναβλήθηκε, Απορρίφθηκε, Αποσύρθηκε)
- **Με απλά λόγια:** [Plain language explanation]
- **Ψηφοφορία:** Υπέρ X, Κατά Y, Αποχές Z.
- **Απόδειξη από τη συνεδρία:** HH:MM:SS-HH:MM:SS — «[quote from video]».
- **Σχετικό PDF:** `filename.pdf`, σελ. X or X-Y.
- **Επίπεδο βεβαιότητας:** Υψηλό or Μέτριο or Χαμηλό.
- **Γιατί έχει σημασία:** [Explanation of impact]

### 2. Next Topic
[Same format as above]

## Εκκρεμότητες / αβεβαιότητες

- [Any pending items or uncertainties]
- [Items that need follow-up in next session]
```

## Workflow

### Option 1: Manual Conversion (Local)

1. Add your `.md` file to the `sessions/` folder
2. Run the conversion script:
   ```bash
   npm run convert-sessions
   ```
3. The script generates `public/data/sessions.json`
4. Commit and push both files to GitHub

### Option 2: Automated (GitHub Actions) ⭐ Recommended

1. Add your `.md` file to the `sessions/` folder
2. Push to GitHub:
   ```bash
   git add sessions/YYYY-MM-DD.md
   git commit -m "Add session summary for YYYY-MM-DD"
   git push
   ```
3. GitHub Actions automatically:
   - Runs the conversion script
   - Generates `sessions.json`
   - Commits the changes
   - Deploys the updated website

**No manual action needed!** ✅

## Troubleshooting

### If the site doesn't show your new session:

1. **Check the markdown file format** - Ensure it matches the template exactly
   - File location: `sessions/YYYY-MM-DD.md`
   - Title format: `Title: YYYY/MM/DD - ...`
   - Section headers: `## Κύρια αποτελέσματα`, `## Θέματα / αποφάσεις`, `## Εκκρεμότητες / αβεβαιότητες`

2. **Check the conversion output** - Run locally and check for errors:
   ```bash
   npm run convert-sessions
   ```
   Look for error messages in the console.

3. **Check the generated JSON** - Verify `public/data/sessions.json` was created:
   ```bash
   cat public/data/sessions.json | head -50
   ```
   The file should contain your session data.

4. **Check GitHub Actions** - If using automated workflow:
   - Go to your GitHub repo → Actions tab
   - Look for "Convert Sessions" workflow
   - Check the logs if it failed

### Common Issues

**Issue:** "Cannot find sessions.json"
- **Fix:** Run `npm run convert-sessions` to generate it

**Issue:** Session data not parsing correctly
- **Fix:** Check that your `.md` file matches the format exactly (spacing, dashes, field names)

**Issue:** GitHub Actions workflow not triggering
- **Fix:** Ensure the `.md` file is in the `sessions/` folder and you're pushing to `main` or `master` branch

## File Structure

```
vouliwatch-cy/
├── sessions/                          ← Add your .md files here
│   ├── 2026-01-29.md
│   ├── 2026-02-05.md
│   └── [new sessions].md
├── public/data/
│   └── sessions.json                  ← Auto-generated, do NOT edit
├── scripts/
│   └── convert-sessions.mjs           ← Conversion script
├── .github/workflows/
│   └── convert-sessions.yml           ← GitHub Actions workflow
└── package.json                       ← Contains "convert-sessions" script
```

## Example Session File

See `sessions/2026-01-29.md` for a complete example with all 14 topics.

## Questions?

If parsing fails or something doesn't work:
1. Check the error message from `npm run convert-sessions`
2. Verify your `.md` file format matches the template
3. Check `public/data/sessions.json` to see what was generated
