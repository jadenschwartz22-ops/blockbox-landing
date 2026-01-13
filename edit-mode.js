// Admin Edit Mode - Press Ctrl+Shift+E to toggle
let editModeActive = false;
const EDIT_MODE_KEY = 'blockbox_edit_mode';
const CHANGES_KEY = 'blockbox_content_changes';

// Load saved changes on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSavedChanges();
    setupEditMode();
});

function setupEditMode() {
    // Listen for Ctrl+Shift+E to toggle edit mode
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'E') {
            e.preventDefault();
            toggleEditMode();
        }
    });

    // Create edit mode indicator and controls
    createEditModeUI();
}

function toggleEditMode() {
    editModeActive = !editModeActive;
    localStorage.setItem(EDIT_MODE_KEY, editModeActive);

    const indicator = document.getElementById('edit-mode-indicator');
    const controls = document.getElementById('edit-mode-controls');

    if (editModeActive) {
        indicator.style.display = 'block';
        controls.style.display = 'flex';
        enableEditing();
        console.log('✅ Edit mode ENABLED - Click any text to edit');
    } else {
        indicator.style.display = 'none';
        controls.style.display = 'none';
        disableEditing();
        console.log('❌ Edit mode DISABLED');
    }
}

function enableEditing() {
    // Make text elements editable (but not buttons, links, etc.)
    const editableSelectors = `
        p, h1, h2, h3, h4, h5, h6,
        .stat-number, .stat-label, .stat-description,
        .impact-text, .impact-number,
        .problem-title, .problem-text,
        .step-title, .step-description,
        .section-intro,
        .hero-title, .hero-subtitle-direct,
        div:not(.source):not(.cta-button):not(button):not(a)
    `;

    const elements = document.querySelectorAll(editableSelectors);

    elements.forEach(el => {
        // Skip if it's a container with other elements
        if (el.children.length > 0 && !el.classList.contains('stat-number') && !el.classList.contains('impact-number')) {
            return;
        }

        // Skip source links and buttons
        if (el.closest('.source') || el.closest('button') || el.closest('a') || el.tagName === 'A') {
            return;
        }

        el.style.cursor = 'pointer';
        el.style.transition = 'background-color 0.2s';

        // Hover effect
        el.addEventListener('mouseenter', highlightOnHover);
        el.addEventListener('mouseleave', removeHighlight);

        // Click to edit
        el.addEventListener('click', makeEditable);
    });
}

function disableEditing() {
    const elements = document.querySelectorAll('[contenteditable="true"]');
    elements.forEach(el => {
        el.contentEditable = 'false';
        el.style.cursor = '';
        el.style.outline = '';
        el.removeEventListener('blur', saveEdit);
    });
}

function highlightOnHover(e) {
    if (editModeActive && e.target.contentEditable !== 'true') {
        e.target.style.backgroundColor = 'rgba(0, 255, 255, 0.1)';
        e.target.style.outline = '1px dashed rgba(0, 255, 255, 0.5)';
    }
}

function removeHighlight(e) {
    if (e.target.contentEditable !== 'true') {
        e.target.style.backgroundColor = '';
        e.target.style.outline = '';
    }
}

function makeEditable(e) {
    if (!editModeActive) return;

    const el = e.target;

    // Don't edit if clicking inside an already editable element
    if (el.contentEditable === 'true') return;

    // Store original content
    el.dataset.originalContent = el.innerHTML;

    // Make editable
    el.contentEditable = 'true';
    el.style.backgroundColor = 'rgba(0, 255, 255, 0.2)';
    el.style.outline = '2px solid rgba(0, 255, 255, 0.8)';
    el.focus();

    // Select all text
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    // Save on blur
    el.addEventListener('blur', saveEdit);

    // Save on Enter key (for single-line edits)
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            el.blur();
        }
        if (e.key === 'Escape') {
            el.innerHTML = el.dataset.originalContent;
            el.blur();
        }
    });
}

function saveEdit(e) {
    const el = e.target;
    el.contentEditable = 'false';
    el.style.backgroundColor = '';
    el.style.outline = '';
    el.style.cursor = 'pointer';

    const newContent = el.innerHTML.trim();
    const originalContent = el.dataset.originalContent;

    if (newContent !== originalContent) {
        // Save change
        saveChange(el, originalContent, newContent);
        console.log('✅ Saved change:', { original: originalContent, new: newContent });
    }
}

function saveChange(element, originalContent, newContent) {
    // Get existing changes
    const changes = JSON.parse(localStorage.getItem(CHANGES_KEY) || '[]');

    // Create unique identifier for this element
    const identifier = getElementIdentifier(element);

    // Check if we already have a change for this element
    const existingIndex = changes.findIndex(c => c.identifier === identifier);

    if (existingIndex >= 0) {
        // Update existing change
        changes[existingIndex] = {
            identifier,
            originalContent,
            newContent,
            timestamp: new Date().toISOString()
        };
    } else {
        // Add new change
        changes.push({
            identifier,
            originalContent,
            newContent,
            timestamp: new Date().toISOString()
        });
    }

    localStorage.setItem(CHANGES_KEY, JSON.stringify(changes));
    updateChangeCounter();
}

function getElementIdentifier(element) {
    // Create a unique identifier based on element's position and content
    const tagName = element.tagName;
    const className = element.className;
    const textContent = element.dataset.originalContent || element.textContent;
    const parentClass = element.parentElement?.className || '';

    return `${tagName}.${className}::${parentClass}::${textContent.substring(0, 50)}`;
}

function loadSavedChanges() {
    const changes = JSON.parse(localStorage.getItem(CHANGES_KEY) || '[]');

    if (changes.length === 0) return;

    console.log(`Loading ${changes.length} saved changes...`);

    // Wait for DOM to be ready
    setTimeout(() => {
        changes.forEach(change => {
            applyChange(change);
        });
    }, 500);
}

function applyChange(change) {
    // Find element by identifier
    const elements = document.querySelectorAll('*');

    for (const el of elements) {
        const identifier = getElementIdentifier(el);
        if (identifier === change.identifier) {
            el.innerHTML = change.newContent;
            console.log('✅ Applied saved change:', change.newContent);
            break;
        }
    }
}

function createEditModeUI() {
    // Create indicator
    const indicator = document.createElement('div');
    indicator.id = 'edit-mode-indicator';
    indicator.innerHTML = '✏️ EDIT MODE ACTIVE';
    indicator.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: rgba(0, 255, 255, 0.9);
        color: black;
        padding: 10px 20px;
        border-radius: 5px;
        font-weight: bold;
        z-index: 10000;
        display: none;
        font-family: monospace;
        box-shadow: 0 4px 12px rgba(0, 255, 255, 0.5);
    `;

    // Create controls
    const controls = document.createElement('div');
    controls.id = 'edit-mode-controls';
    controls.style.cssText = `
        position: fixed;
        top: 60px;
        left: 20px;
        z-index: 10000;
        display: none;
        flex-direction: column;
        gap: 10px;
    `;

    // Publish button
    const publishBtn = document.createElement('button');
    publishBtn.innerHTML = '🚀 Publish Changes';
    publishBtn.style.cssText = `
        background: rgba(0, 255, 0, 0.9);
        color: black;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        font-family: monospace;
    `;
    publishBtn.onclick = publishChanges;

    // Export button (backup)
    const exportBtn = document.createElement('button');
    exportBtn.innerHTML = '📥 Download HTML';
    exportBtn.style.cssText = `
        background: rgba(0, 255, 255, 0.9);
        color: black;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        font-family: monospace;
    `;
    exportBtn.onclick = downloadHTML;

    // Clear changes button
    const clearBtn = document.createElement('button');
    clearBtn.innerHTML = '🗑️ Clear All Changes';
    clearBtn.style.cssText = `
        background: rgba(255, 100, 100, 0.9);
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        font-family: monospace;
    `;
    clearBtn.onclick = clearAllChanges;

    // Change counter
    const counter = document.createElement('div');
    counter.id = 'change-counter';
    counter.style.cssText = `
        background: rgba(0, 0, 0, 0.8);
        color: rgba(0, 255, 255, 0.9);
        padding: 8px 15px;
        border-radius: 5px;
        font-weight: bold;
        font-family: monospace;
        font-size: 12px;
    `;
    counter.innerHTML = '0 changes';

    controls.appendChild(counter);
    controls.appendChild(publishBtn);
    controls.appendChild(exportBtn);
    controls.appendChild(clearBtn);

    document.body.appendChild(indicator);
    document.body.appendChild(controls);

    updateChangeCounter();
}

function updateChangeCounter() {
    const changes = JSON.parse(localStorage.getItem(CHANGES_KEY) || '[]');
    const counter = document.getElementById('change-counter');
    if (counter) {
        counter.innerHTML = `${changes.length} change${changes.length !== 1 ? 's' : ''}`;
    }
}

async function publishChanges() {
    const changes = JSON.parse(localStorage.getItem(CHANGES_KEY) || '[]');

    if (changes.length === 0) {
        alert('No changes to publish!');
        return;
    }

    const confirmed = confirm(
        `🚀 Ready to publish ${changes.length} change${changes.length !== 1 ? 's' : ''}?\n\n` +
        `This will:\n` +
        `1. Download the updated HTML file\n` +
        `2. You move it to replace the original\n` +
        `3. Run ./publish.sh to push to GitHub\n` +
        `4. Changes go live in ~1 minute\n\n` +
        `Continue?`
    );

    if (!confirmed) return;

    const publishBtn = event.target;
    const originalText = publishBtn.innerHTML;
    publishBtn.innerHTML = '⏳ Publishing...';
    publishBtn.disabled = true;

    try {
        // Get current page filename
        const filename = window.location.pathname.split('/').pop() || 'index.html';
        const html = document.documentElement.outerHTML;

        // Download the file
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);

        publishBtn.innerHTML = '✅ Downloaded!';

        // Show next steps
        setTimeout(() => {
            const instructions =
                `✅ File downloaded: ${filename}\n\n` +
                `📋 Next steps:\n` +
                `1. Move ${filename} from Downloads to project folder\n` +
                `   (Replace the existing file)\n\n` +
                `2. Open Terminal and run:\n` +
                `   cd ~/Desktop/blockbox-landing\n` +
                `   ./publish.sh\n\n` +
                `3. Changes will be live on GitHub Pages in ~1 minute!\n\n` +
                `Clear your changes now?`;

            if (confirm(instructions)) {
                localStorage.removeItem(CHANGES_KEY);
                location.reload();
            } else {
                publishBtn.innerHTML = originalText;
                publishBtn.disabled = false;
            }
        }, 500);

    } catch (error) {
        console.error('Publish error:', error);
        publishBtn.innerHTML = '❌ Failed';
        alert('Failed to download file: ' + error.message);

        setTimeout(() => {
            publishBtn.innerHTML = originalText;
            publishBtn.disabled = false;
        }, 2000);
    }
}

function downloadHTML() {
    const html = document.documentElement.outerHTML;
    const filename = window.location.pathname.split('/').pop() || 'index.html';

    // Download as file
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.replace('.html', '-edited.html');
    a.click();
    URL.revokeObjectURL(url);

    alert('✅ HTML file downloaded!\n\nYou can use this as a backup or to manually replace the original file.');
    console.log('📥 HTML downloaded');
}

function clearAllChanges() {
    if (confirm('Are you sure you want to clear all changes? This will reload the page.')) {
        localStorage.removeItem(CHANGES_KEY);
        location.reload();
    }
}

// Help message
console.log(`
%c🎨 BlockBox Edit Mode
%cPress Ctrl+Shift+E to toggle edit mode
Click any text to edit it inline
Changes are saved automatically
`, 'font-size: 16px; font-weight: bold; color: cyan;', 'font-size: 12px; color: white;');
