# BlockBox Landing Page - Quick Setup Checklist

## ✅ COMPLETED

1. ✅ Landing page created with 8 struggle categories
2. ✅ "Who is this for?" section added (myself/kids/family)
3. ✅ SEO optimized for: porn addiction, social media addiction, gaming addiction, doomscrolling, dopamine detox, phone addiction, etc.
4. ✅ GitHub repository created
5. ✅ GitHub Pages enabled
6. ✅ Comprehensive analytics tracking built in
7. ✅ Google Sheets integration ready

## 🚀 YOUR SITE IS LIVE AT:

**https://jadenschwartz22-ops.github.io/blockbox-landing/**

(May take 1-5 minutes to finish deploying - refresh if you see 404)

---

## ⚠️ NEXT STEPS (5 minutes total)

### Step 1: Set Up Google Analytics (2 minutes)

1. Go to https://analytics.google.com/
2. Create account: "BlockBox"
3. Create property: "BlockBox Landing Page"
4. Get your Measurement ID (looks like `G-XXXXXXXXXX`)
5. Open `index.html` in VS Code or any text editor
6. Find line 30: `<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>`
7. Replace `G-XXXXXXXXXX` with your actual ID (in 2 places: line 30 and line 31)
8. Save and commit:

```bash
cd ~/Desktop/blockbox-landing
git add index.html
git commit -m "Add Google Analytics ID"
git push
```

### Step 2: Set Up Google Sheets (3 minutes)

1. Go to https://sheets.google.com/
2. Create new sheet: "BlockBox Waitlist"
3. Extensions > Apps Script
4. Delete existing code
5. Copy/paste contents of `google-apps-script.js` from this folder
6. Click Deploy > New deployment > Web app
7. Execute as: Me
8. Who has access: Anyone
9. Click Deploy and copy the Web App URL
10. Open `script.js` in text editor
11. Find line 106: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE';`
12. Replace with your actual URL
13. Save and commit:

```bash
cd ~/Desktop/blockbox-landing
git add script.js
git commit -m "Add Google Sheets integration"
git push
```

### Step 3: Test Everything

1. Wait 2 minutes for GitHub Pages to update
2. Visit your live site: https://jadenschwartz22-ops.github.io/blockbox-landing/
3. Open browser console (F12) to see tracking events
4. Check some struggle boxes - should see events in console
5. Submit a test email
6. Check your Google Sheet - should see new row
7. Check Google Analytics Realtime - should see yourself

---

## 📊 What Gets Tracked

**Automatic:**
- Every page view
- Scroll depth (25%, 50%, 75%, 100%)
- Time on page (30s, 60s, 2min)

**User Actions:**
- Which struggles selected (porn, social, gaming, etc.)
- Who is this for (myself, kids, family)
- Which devices (phone, laptop, gaming, TV)
- Form submissions with full context
- UTM parameters (traffic sources)

**In Google Sheets:**
- Email address
- All selected options
- Timestamp
- UTM parameters
- Referrer
- User agent

---

## 🎯 Validation Metrics

**Strong validation = Build it:**
- 100+ waitlist signups in first month
- 10%+ conversion rate
- Clear dominant struggle (this tells you what to lead with)

**Weak validation = Rethink or pivot:**
- Under 50 signups in first month
- Under 3% conversion rate
- No clear pattern

---

## 📣 Where to Share (Use UTM Parameters!)

### Reddit
- r/NoFap: `?utm_source=reddit&utm_medium=post&utm_campaign=nofap`
- r/pornfree: `?utm_source=reddit&utm_medium=post&utm_campaign=pornfree`
- r/StopGaming: `?utm_source=reddit&utm_medium=post&utm_campaign=stopgaming`
- r/nosurf: `?utm_source=reddit&utm_medium=post&utm_campaign=nosurf`

### Hacker News
- Show HN: `?utm_source=hackernews&utm_medium=showhn&utm_campaign=launch`

### Twitter/X
- `?utm_source=twitter&utm_medium=tweet&utm_campaign=announcement`

### Product Hunt
- `?utm_source=producthunt&utm_medium=listing&utm_campaign=comingsoon`

**Full example URL:**
```
https://jadenschwartz22-ops.github.io/blockbox-landing/?utm_source=reddit&utm_medium=post&utm_campaign=nofap
```

---

## 🔥 Quick Marketing Tips

1. **Lead with the dominant struggle**: After 50-100 signups, check which struggle checkbox gets selected most. Update your headline to lead with that pain point.

2. **Test different subreddits**: Some will convert 10x better than others. Focus on what works.

3. **Be authentic**: Your audience values honesty. Share your own struggle if you have one.

4. **Don't oversell**: This is validation, not a finished product. Be upfront that you're testing demand.

5. **Engage respondents**: Email people who sign up and ask follow-up questions. This is gold for product development.

---

## 🛠 Troubleshooting

**Site shows 404:**
- Wait 5 minutes, GitHub Pages is still building
- Hard refresh (Cmd+Shift+R on Mac)

**Analytics not working:**
- Make sure you replaced BOTH instances of G-XXXXXXXXXX
- Check browser console for errors
- Disable ad blocker when testing

**Form not submitting to Sheets:**
- Verify Web App URL ends with `/exec`
- Make sure script is deployed as "Anyone can access"
- Check browser console for errors

---

## 📞 Files in This Folder

- `index.html` - Main landing page (this is what visitors see)
- `styles.css` - Styling (responsive + dark mode)
- `script.js` - Analytics tracking and form handling
- `google-apps-script.js` - Google Sheets integration (paste this into Google Apps Script)
- `README.md` - Full documentation
- `SETUP-CHECKLIST.md` - This file

---

## 🎉 You're Ready!

Once you complete Steps 1 & 2 above, you're fully set up to validate your idea.

**Remember:** The goal isn't perfection. The goal is data. You need to know if people actually want this BEFORE you spend months building it.

100+ signups = strong validation = build it
Under 50 signups = weak validation = rethink it

Good luck! 🚀

---

**Your live site:** https://jadenschwartz22-ops.github.io/blockbox-landing/
