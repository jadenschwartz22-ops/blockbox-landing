# BlockBox Landing Page - Setup & Deployment Guide

A validation landing page for BlockBox, a network device to help people break free from digital addiction.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Google Analytics Setup](#google-analytics-setup)
3. [Google Sheets Setup](#google-sheets-setup)
4. [GitHub Pages Deployment](#github-pages-deployment)
5. [Viewing Analytics](#viewing-analytics)
6. [What Gets Tracked](#what-gets-tracked)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### 🎨 Edit Content (One-Click Auto-Publishing)

**New!** You can now edit the website content directly in your browser and publish to GitHub in one click!

1. **Start the server:**
   ```bash
   cd ~/Desktop/blockbox-landing
   node server.js
   ```

2. **Open in browser:**
   ```
   http://localhost:3000
   ```

3. **Edit mode:**
   - Press `Ctrl+Shift+E` to enable edit mode
   - Click any text to edit it inline
   - Press Enter or click away to save

4. **Publish (One Click!):**
   - Click `🚀 Publish Changes` button
   - Confirm
   - **Done!** Automatically commits and pushes to GitHub
   - Live in ~1 minute on GitHub Pages

### File Structure
```
blockbox-landing/
├── index.html              # Main landing page
├── stats.html              # Statistics page
├── styles.css              # Responsive styles with dark mode
├── script.js               # Analytics & form handling
├── scroll-animations.js    # Scroll animations
├── edit-mode.js            # Inline editing system ⭐ NEW
├── server.js               # Auto-publish server ⭐ NEW
├── publish.sh              # Manual publish script (backup)
├── google-apps-script.js   # Google Sheets integration
└── README.md              # This file
```

---

## 📊 Google Analytics Setup

### Step 1: Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Start measuring** or **Admin** (gear icon)
3. Create a new **Account** (name it "BlockBox")
4. Create a new **Property** (name it "BlockBox Landing Page")
5. Select **Web** as the platform
6. Enter your website URL (you'll get this after deploying to GitHub Pages)

### Step 2: Get Your Measurement ID

1. After creating the property, you'll see a **Measurement ID** like `G-XXXXXXXXXX`
2. Copy this ID

### Step 3: Add Measurement ID to Your Site

1. Open `index.html`
2. Find this line (around line 10):
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   ```
3. Replace `G-XXXXXXXXXX` with your actual Measurement ID (in **2 places**):
   - Line 10: `src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"`
   - Line 15: `gtag('config', 'YOUR-ID')`

### Step 4: Verify It's Working

1. After deploying (see deployment section below), visit your live site
2. Open Google Analytics
3. Go to **Reports** > **Realtime**
4. You should see yourself as an active user within 30 seconds

---

## 📝 Google Sheets Setup

This captures all waitlist signups with full context (struggles, devices, UTM parameters).

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new sheet
3. Name it **"BlockBox Waitlist"**
4. Leave it blank (headers will be auto-generated)

### Step 2: Create Apps Script

1. In your sheet, go to **Extensions > Apps Script**
2. Delete any existing code
3. Open `google-apps-script.js` from this project
4. Copy the entire contents
5. Paste it into the Apps Script editor

### Step 3: Deploy as Web App

1. In Apps Script, click **Deploy > New deployment**
2. Click the gear icon ⚙️ and select **Web app**
3. Configure:
   - **Description**: "BlockBox Waitlist Submission Handler"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**
5. **Authorize** the script (click "Review permissions" if prompted)
6. Copy the **Web App URL** (looks like `https://script.google.com/macros/s/...`)

### Step 4: Add Web App URL to Your Site

1. Open `script.js`
2. Find this line (around line 50):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE';
   ```
3. Replace with your actual Web App URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```

### Step 5: Test the Integration

1. Deploy your site (see deployment section)
2. Visit your live page
3. Submit a test email with some checkboxes selected
4. Check your Google Sheet - you should see a new row with:
   - Timestamp
   - Email
   - Selected struggles
   - Selected devices
   - UTM parameters
   - Form location
   - Referrer
   - User agent

### Optional: Email Notifications

To get an email for each signup:

1. In `google-apps-script.js`, find the `sendEmailNotification` function
2. Change `YOUR_EMAIL@example.com` to your actual email
3. Uncomment line 54: `// sendEmailNotification(data);`
4. Save and redeploy the script

---

## 🚀 GitHub Pages Deployment

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com/) and sign in
2. Click the **+** icon in the top right > **New repository**
3. Name it: `blockbox-landing` (or any name you want)
4. Select **Public**
5. Click **Create repository**

### Step 2: Upload Files

**Option A: Using GitHub Website (Easiest)**

1. In your new repo, click **uploading an existing file**
2. Drag and drop these 3 files:
   - `index.html`
   - `styles.css`
   - `script.js`
3. Scroll down and click **Commit changes**

**Option B: Using Git Command Line**

```bash
cd ~/Desktop/blockbox-landing
git init
git add index.html styles.css script.js
git commit -m "Initial BlockBox landing page"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/blockbox-landing.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. In your GitHub repo, click **Settings**
2. Scroll down to **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 1-2 minutes
6. Your site will be live at: `https://YOUR-USERNAME.github.io/blockbox-landing/`

### Step 4: Update Google Analytics URL

1. Go back to Google Analytics
2. **Admin > Data Streams > Your Web Stream**
3. Update the website URL to your GitHub Pages URL
4. Save

---

## 📈 Viewing Analytics

### Google Analytics Dashboard

Go to [Google Analytics](https://analytics.google.com/) and navigate to your property.

#### Key Reports to Monitor:

**1. Realtime Overview**
- See active users right now
- Watch live events (clicks, checkboxes, form submissions)

**2. Acquisition Overview** (`Reports > Acquisition`)
- Where traffic is coming from
- UTM campaign performance
- Referral sources

**3. Engagement > Events**
- See all tracked events:
  - `struggle_selected` - Which struggles are most common
  - `device_selected` - Which devices users want to protect
  - `waitlist_signup` - Form submissions
  - `scroll_depth` - How far people scroll (25%, 50%, 75%, 100%)
  - `time_on_page` - Engagement metrics (30s, 60s, 2min)
  - `cta_click` - CTA button clicks

**4. Custom Exploration**

Create a custom report to see struggle distribution:

1. Go to **Explore** (in left sidebar)
2. Click **Blank** template
3. Drag **Event name** to Rows
4. Drag **Event count** to Values
5. Add filter: Event name contains "struggle_selected"
6. You'll see exactly which struggles users select most

### Google Sheets Dashboard

Your Google Sheet gives you raw data with full context:

- Every email collected
- Exact struggles selected per user
- Devices they want to protect
- Complete UTM attribution
- Timestamp and form location

**Pro tip**: Add a "Status" column to track:
- Contacted
- Interested
- Purchased
- Not interested

---

## 🎯 What Gets Tracked

### Automatic Tracking

**Page Views**
- Every time someone loads the page
- Tracked with referrer and UTM parameters

**Scroll Depth**
- 25% scrolled
- 50% scrolled
- 75% scrolled
- 100% scrolled (bottom of page)

**Time on Page**
- 30 seconds
- 60 seconds
- 2 minutes

**Engagement**
- Users who spend 10+ seconds on page

### User Interaction Tracking

**Struggle Checkboxes**
- Every check/uncheck
- Tracks which specific struggles (porn, social, gaming, etc.)

**Device Checkboxes**
- Every check/uncheck
- Tracks which devices (phone, laptop, gaming, TV)

**CTA Clicks**
- Hero form button
- Main form button
- Tracks which form location

**Form Submissions**
- Email collected
- Number of struggles selected
- Number of devices selected
- UTM attribution
- Complete user context

### UTM Parameter Tracking

When you share your link with UTM parameters, everything is tracked:

```
https://YOUR-USERNAME.github.io/blockbox-landing/?utm_source=reddit&utm_medium=post&utm_campaign=nofap
```

This tells you:
- Where each signup came from
- Which campaigns perform best
- Which channels drive the most interest

---

## 🔗 Example UTM Campaigns

When sharing your landing page, use these URLs to track performance:

**Reddit - NoFap**
```
?utm_source=reddit&utm_medium=post&utm_campaign=nofap
```

**Reddit - StopGaming**
```
?utm_source=reddit&utm_medium=post&utm_campaign=stopgaming
```

**Twitter/X**
```
?utm_source=twitter&utm_medium=tweet&utm_campaign=announcement
```

**Product Hunt**
```
?utm_source=producthunt&utm_medium=listing&utm_campaign=launch
```

**Hacker News**
```
?utm_source=hackernews&utm_medium=showhn&utm_campaign=launch
```

**Email Signature**
```
?utm_source=email&utm_medium=signature&utm_campaign=outreach
```

---

## 🛠 Troubleshooting

### Analytics Not Showing Up

**Problem**: No data in Google Analytics after deployment

**Solutions**:
1. Check that you replaced `G-XXXXXXXXXX` with your actual Measurement ID in **both places** in `index.html`
2. Wait 24-48 hours for data to fully populate (Realtime should show immediately though)
3. Disable ad blockers when testing
4. Open browser console (F12) and check for errors

### Form Submissions Not Reaching Google Sheets

**Problem**: Emails not appearing in your sheet

**Solutions**:
1. Verify the Web App URL in `script.js` is correct and ends with `/exec`
2. Make sure the Apps Script is deployed as "Anyone can access"
3. Check that you authorized the script (Google may have blocked it)
4. Open browser console (F12) when submitting - look for errors
5. Test the script directly in Apps Script editor using the `test()` function

### GitHub Pages Not Loading

**Problem**: 404 error on GitHub Pages URL

**Solutions**:
1. Wait 5-10 minutes after enabling Pages
2. Verify the branch is set to `main` and folder is `/ (root)`
3. Check that files are in the root of your repo (not in a subfolder)
4. Make sure the repo is public, not private

### Styles Look Broken

**Problem**: Page loads but looks unstyled

**Solutions**:
1. Verify `styles.css` is in the same directory as `index.html`
2. Check browser console (F12) for 404 errors on CSS file
3. Hard refresh the page (Cmd+Shift+R on Mac, Ctrl+F5 on Windows)

### Dark Mode Not Working

**Problem**: Dark mode doesn't activate

**Solution**: Dark mode is automatic based on system preferences. Test by:
1. On Mac: System Settings > Appearance > Dark
2. On Windows: Settings > Personalization > Colors > Dark
3. Refresh the page

---

## 📊 Analyzing Your Data

### Week 1: Traffic & Engagement

Focus on:
- **Total visitors**: How many people found your page?
- **Scroll depth**: Are people reading the whole page? (Aim for 50%+ reaching 75% scroll)
- **Time on page**: Are they engaged? (Aim for 60s+ average)
- **Bounce rate**: Do they leave immediately? (Under 70% is good)

### Week 2: User Intent

Focus on:
- **Struggle distribution**: Which pain point resonates most?
  - This tells you what to lead with in your marketing
  - This guides your product positioning
- **Device mix**: What devices do people want to protect?
  - Informs technical requirements
  - Helps with pricing strategy

### Week 3: Conversion

Focus on:
- **Conversion rate**: Visitors → Waitlist signups (Aim for 5-15%)
- **Form location**: Do people sign up in the hero or after scrolling?
- **Traffic source performance**: Which channels drive the most signups?

### Validation Benchmarks

**Strong validation signals**:
- 100+ waitlist signups in first month
- 10%+ conversion rate (visitors to signups)
- High scroll depth (75%+)
- Long time on page (90s+)
- Clear struggle pattern (one dominates)

**Weak validation signals**:
- Under 50 signups in first month
- Under 3% conversion rate
- Low scroll depth (under 50%)
- Short time on page (under 30s)
- No clear struggle pattern

---

## 🎨 Customization Tips

### Changing the Name

If you decide on a different name later:

1. Open `index.html`
2. Find and replace all instances of "BlockBox"
3. Update the `<title>` tag (line 7)
4. Update the hero headline (line 24)

### Adding Your Own Domain

When you buy a domain (e.g., blockbox.com):

1. In your GitHub repo: **Settings > Pages**
2. Under **Custom domain**, enter your domain
3. Follow GitHub's instructions to configure DNS
4. Update Google Analytics with new domain

### A/B Testing Headlines

Track which headlines convert better:

1. Create a second version of the page (`index-v2.html`)
2. Change the headline
3. Deploy both versions
4. Split traffic 50/50 (use a tool like [Split](https://www.optimizely.com/) or manually)
5. Compare conversion rates in Google Analytics

---

## 📧 Next Steps After Validation

### If validation is strong (100+ signups):

1. **Email your waitlist**: "Thanks for joining, here's what's next"
2. **Survey top users**: Ask specific questions about pricing, features
3. **Start building**: You have clear demand
4. **Pre-orders**: Consider offering early-bird pricing

### If validation is weak (under 50 signups):

1. **Test different traffic sources**: Maybe you haven't found your audience
2. **Test different messaging**: Try leading with different pain points
3. **Get feedback**: Email the people who DID sign up and ask why
4. **Pivot or persevere**: Decide if this is worth pursuing

---

## 🎯 Marketing Channels to Test

Where to share your landing page:

**Reddit** (Best for validation):
- r/NoFap
- r/pornfree
- r/StopGaming
- r/nosurf
- r/productivity

**Hacker News**:
- Show HN: post
- Ask HN: for feedback

**Product Hunt**:
- Launch as "Coming Soon"

**Twitter/X**:
- Tweet with #buildinpublic
- Tag relevant accounts

**Forums**:
- Indie Hackers
- Hacker News
- ProductHunt discussions

**Direct Outreach**:
- Email signature
- Personal network
- LinkedIn posts

---

## 💡 Tips for Maximizing Signups

1. **Don't overthink the MVP**: This landing page is enough to validate
2. **Track everything**: Data tells you if this is worth building
3. **Test traffic sources**: Some channels will massively outperform others
4. **Be authentic**: Your audience values honesty about struggling with addiction
5. **Speed matters**: Launch this week, not next month
6. **Engage your waitlist**: Email them updates as you build

---

## 📞 Support

If you run into issues:

1. Check browser console (F12) for errors
2. Verify all setup steps were completed
3. Test in incognito mode (rules out browser extensions)
4. Check GitHub Pages status: https://www.githubstatus.com/

---

## 🎉 You're Ready to Launch!

1. ✅ Complete Google Analytics setup
2. ✅ Complete Google Sheets setup
3. ✅ Deploy to GitHub Pages
4. ✅ Share your link with UTM parameters
5. ✅ Watch the data roll in

**Your landing page URL**: `https://YOUR-USERNAME.github.io/blockbox-landing/`

Now go validate your idea! 🚀

---

**Remember**: The goal isn't a perfect landing page. The goal is to learn if people actually want this before you spend months building it.

Good luck!
