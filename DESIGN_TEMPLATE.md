# Dark Mode Landing Page Design Template

## Color Palette Philosophy
- **Base:** Pure black background with subtle dark gray variations for depth
- **Accents:** High-contrast gradient (blue to purple spectrum) for CTAs and highlights
- **Text Hierarchy:**
  - Primary text: Near-white for maximum readability
  - Secondary text: Muted gray for supporting content
  - Tertiary text: Even lighter gray for subtle details
- **Danger/Warning:** Bright red/pink for critical callouts
- **Success/Highlight:** Cyan/electric blue for positive elements

## Typography Approach
- **Headings:** Bold, large, commanding presence with fluid scaling (clamp for responsive sizing)
- **Body:** High line-height (1.6-1.8) for readability
- **Hierarchy:** Clear size differences between h1, h2, h3
- **Spacing:** Generous letter-spacing on uppercase elements

## Layout Structure
- **Sections:** Full-width sections with contained inner content (max-width: 1200px)
- **Cards:** Dark background with subtle borders, rounded corners (12-16px)
- **Hover Effects:** Transform lift (translateY) + border color change on interactive elements
- **Grid System:** Auto-fit responsive grids (minmax pattern) that collapse to single column on mobile

## Animation Strategy
- **Scroll Animations:** Intersection Observer triggering fade-in + slide-up on scroll
- **Threshold:** Trigger at 15% visibility with slight negative bottom margin
- **Re-trigger:** Elements can re-animate when scrolling back up
- **Timing:** Smooth CSS transitions (0.6s ease-out) for organic feel
- **Target Elements:** Cards, sections, titles, stats boxes

## Visual Hierarchy
- **Hero Section:** Minimal height (30-40vh), centered, gradient background
- **Content Blocks:** Alternating density - tight sections followed by spacious ones
- **Whitespace:** Generous margins between sections (4-5rem)
- **Focal Points:** Gradient backgrounds or borders on key CTAs

## Interactive Elements
- **Buttons:** Gradient backgrounds with hover scale + glow effects
- **Links:** Color transition on hover (cyan to purple shift)
- **Cards:** Subtle border glow on hover, slight elevation
- **Forms:** Clean inputs with focus states (accent color border)

## Mobile Responsiveness
- **Breakpoint:** Single major breakpoint at 768px
- **Grid Collapse:** Multi-column grids become single column
- **Font Scaling:** Use clamp() for fluid typography
- **Touch Targets:** Larger tap areas for mobile (min 44px)
- **Spacing Reduction:** Scale down margins/padding by ~30-40%

## Navigation Pattern
- **Fixed Top Nav:** Appears on scroll, subtle background blur
- **Minimal Chrome:** Logo + key links only
- **Mobile:** Assumes hamburger menu (not implemented but space reserved)
- **CTA in Nav:** Highlighted "Get Access" style button

## Content Strategy
- **Above Fold:** Clear value proposition + single CTA
- **Progressive Disclosure:** Simple overview → "learn more" links to detailed pages
- **Social Proof:** Minimal trust signals (stat badges, testimonials)
- **Honest Messaging:** Dedicated "limitations" or "truth" section

## Technical Foundation
- **CSS Variables:** Define color palette once, reuse everywhere
- **Semantic HTML:** Proper section/article/nav tags for accessibility
- **Performance:** Minimal JavaScript (scroll observer only)
- **Assets:** Inline critical CSS, defer non-critical scripts

## Unique Elements for This Template
- **Stat Boxes:** Large numbers with context, visual hierarchy through size
- **Comparison Cards:** Side-by-side "bad vs good" with visual indicators
- **Truth Section:** Honest limitations prominently displayed
- **Category Badges:** Small gradient pills for content categorization
- **Impact Visuals:** Large text blocks with gradient effects for shocking stats

## Do's and Don'ts
**Do:**
- Use gradients sparingly (CTAs and accents only)
- Maintain 60-30-10 color rule (60% black, 30% dark gray, 10% accent)
- Test contrast ratios for accessibility
- Add subtle animations that enhance UX

**Don't:**
- Overuse gradients (avoid gradient text everywhere)
- Make cards too dense (breathing room is key)
- Skip mobile testing (always check responsive behavior)
- Animate everything (purposeful animation only)

## File Structure
```
/
├── index.html (home page)
├── [feature-pages].html (detail pages)
├── styles.css (single global stylesheet)
├── scroll-animations.js (intersection observer)
├── script.js (form handling, modal logic)
└── [page]-specific inline <style> for unique layouts
```

## Quick Start Checklist
1. Set up CSS variables for color palette
2. Define base typography scale
3. Create card component styles
4. Implement scroll animation observer
5. Build hero section with gradient
6. Add CTA sections with prominent placement
7. Test mobile responsiveness
8. Optimize contrast ratios
9. Add hover states to interactive elements
10. Deploy and test on actual devices
