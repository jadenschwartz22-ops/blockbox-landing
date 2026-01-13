# BlockBox Edit Mode Guide

## Quick Start

### Activate Edit Mode
Press **Ctrl+Shift+E** on any page (index.html or stats.html)

You'll see a cyan indicator appear in the top-left corner: `✏️ EDIT MODE ACTIVE`

### Edit Content
1. **Hover** over any text - it highlights with a dashed border
2. **Click** to edit - text becomes editable with a solid cyan border
3. **Type** your changes
4. **Press Enter** or click away to save
5. **Press Escape** to cancel

### Publish Changes
1. Click **🚀 Publish Changes** button (top-left)
2. Confirm you want to publish
3. File downloads to your Downloads folder
4. Move the file to replace the original:
   ```bash
   mv ~/Downloads/stats.html ~/Desktop/blockbox-landing/stats.html
   # or
   mv ~/Downloads/index.html ~/Desktop/blockbox-landing/index.html
   ```
5. Run the publish script:
   ```bash
   cd ~/Desktop/blockbox-landing
   ./publish.sh
   ```
6. Changes go live on GitHub Pages in ~1 minute!

## Other Controls

- **📥 Download HTML** - Download a backup copy with "-edited" suffix
- **🗑️ Clear All Changes** - Reset all edits and reload page
- **Change counter** - Shows how many edits you've made

## What Can Be Edited?

You can edit most text elements:
- Headings (h1, h2, h3, etc.)
- Paragraphs
- Stat numbers and labels
- Problem descriptions
- Step titles
- Impact text
- Section intros

You **cannot** edit:
- Buttons
- Links (including source citations)
- Navigation elements

## Pro Tips

### Quick Edits
- For single-line text, press **Enter** to save
- For multi-line, use **Shift+Enter** for new lines, then click away to save
- Press **Escape** to cancel any edit

### Before Publishing
- The change counter shows how many edits you've made
- All changes are saved in your browser (survives page refresh)
- You can edit multiple things before publishing

### After Publishing
- The script automatically commits with a timestamp
- GitHub Pages updates in ~1 minute
- Check live site: https://jadenschwartz22-ops.github.io/blockbox-landing/

## Removing Edit Mode Later

To remove edit mode from production:

1. Remove from HTML files:
   ```bash
   # Remove from stats.html
   sed -i '' '/<script src="edit-mode.js"><\/script>/d' stats.html

   # Remove from index.html
   sed -i '' '/<script src="edit-mode.js"><\/script>/d' index.html
   ```

2. Delete files:
   ```bash
   rm edit-mode.js publish.sh EDIT_MODE_GUIDE.md save-content.php
   ```

3. Commit and push:
   ```bash
   git add -A
   git commit -m "remove: edit mode feature"
   git push
   ```

## Troubleshooting

**Edit mode won't activate?**
- Make sure you're pressing Ctrl+Shift+E (not Cmd on Mac)
- Check browser console for errors

**Can't edit certain text?**
- Some elements are protected (buttons, links)
- Try clicking the parent container

**Changes not persisting?**
- Changes are saved in localStorage
- Don't clear browser data before publishing
- Use "Publish Changes" button to download file

**Publish button not working?**
- Make sure you have changes (check counter)
- Check Downloads folder for the file
- Browser might block downloads - allow in settings

## Example Workflow

```
1. Open stats.html in browser
2. Press Ctrl+Shift+E
3. See "✏️ EDIT MODE ACTIVE"
4. Click "2007: iPhone launches"
5. Change to "In 2007, the iPhone launched..."
6. Press Enter
7. See "1 change" in counter
8. Make more edits...
9. Click "🚀 Publish Changes"
10. Move file from Downloads
11. Run ./publish.sh
12. Check live site!
```
