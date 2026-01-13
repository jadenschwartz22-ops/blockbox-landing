#!/usr/bin/env node

/**
 * BlockBox Auto-Publish Server
 *
 * This server enables one-click publishing from the browser.
 * When you click "Publish Changes", it automatically:
 * 1. Saves the HTML file
 * 2. Commits to git
 * 3. Pushes to GitHub
 * 4. Changes go live in ~1 minute!
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const url = require('url');

const PORT = 3000;
const PROJECT_DIR = __dirname;

// MIME types for serving files
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // API endpoint for publishing
    if (pathname === '/api/publish' && req.method === 'POST') {
        handlePublish(req, res);
        return;
    }

    // Serve static files
    serveStaticFile(pathname, res);
});

function handlePublish(req, res) {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            const data = JSON.parse(body);
            const { filename, content } = data;

            if (!filename || !content) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Missing filename or content' }));
                return;
            }

            // Validate filename
            const allowedFiles = ['index.html', 'stats.html'];
            if (!allowedFiles.includes(filename)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Invalid filename' }));
                return;
            }

            const filepath = path.join(PROJECT_DIR, filename);

            // Save file
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`✅ Saved: ${filename}`);

            // Git commit and push
            const timestamp = new Date().toLocaleString();
            const commitMsg = `content: update ${filename} via edit mode - ${timestamp}`;

            const commands = [
                `cd "${PROJECT_DIR}"`,
                `git add "${filename}"`,
                `git commit -m "${commitMsg}"`,
                `git push origin main`
            ].join(' && ');

            exec(commands, (error, stdout, stderr) => {
                if (error) {
                    console.error('❌ Git error:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        success: false,
                        error: 'Git operations failed',
                        details: stderr || error.message
                    }));
                    return;
                }

                console.log('🚀 Published to GitHub!');
                console.log(stdout);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    message: 'Changes published successfully!',
                    output: stdout
                }));
            });

        } catch (error) {
            console.error('❌ Error:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                error: error.message
            }));
        }
    });
}

function serveStaticFile(pathname, res) {
    // Default to index.html
    if (pathname === '/') {
        pathname = '/index.html';
    }

    const filepath = path.join(PROJECT_DIR, pathname);

    // Security check - don't serve files outside project directory
    if (!filepath.startsWith(PROJECT_DIR)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('403 Forbidden');
        return;
    }

    // Check if file exists
    fs.readFile(filepath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
            }
            return;
        }

        // Get MIME type
        const ext = path.extname(filepath);
        const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': mimeType });
        res.end(data);
    });
}

server.listen(PORT, () => {
    console.log('');
    console.log('🎨 BlockBox Auto-Publish Server');
    console.log('================================');
    console.log(`✅ Server running at http://localhost:${PORT}`);
    console.log('');
    console.log('📝 How to use:');
    console.log('1. Open http://localhost:3000 in your browser');
    console.log('2. Press Ctrl+Shift+E to enable edit mode');
    console.log('3. Click any text to edit it');
    console.log('4. Click "🚀 Publish Changes" when done');
    console.log('5. Changes automatically commit and push to GitHub!');
    console.log('');
    console.log('Press Ctrl+C to stop the server');
    console.log('');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n👋 Server stopped');
    process.exit(0);
});
