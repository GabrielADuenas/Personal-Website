const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  // Strip query string and decode URL
  const pathname = (req.url || '/').split('?')[0];
  const decoded = decodeURIComponent(pathname);

  // If requesting a pretty project URL like /project/project-a, serve project.html
  let filePath;
  if (decoded.startsWith('/project/')) {
    filePath = path.join(PUBLIC_DIR, 'project.html');
  } else {
    // Normalize and prevent directory traversal
    const safePath = path.normalize(decoded).replace(/^([\.\\/])+/, '');
    filePath = path.join(PUBLIC_DIR, safePath === '/' ? 'index.html' : safePath);
  }

  // Resolve and ensure the file is inside PUBLIC_DIR
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(PUBLIC_DIR)) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    return res.end('Bad request');
  }

  fs.stat(resolved, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Not found');
    }

    if (stats.isDirectory()) filePath = path.join(resolved, 'index.html');
    else filePath = resolved;

    const ext = path.extname(filePath) || '.html';
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Server error');
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Engineering portfolio server running: http://localhost:${PORT}`);
});
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  // Strip query string and decode URL
  const pathname = (req.url || '/').split('?')[0];
  const decoded = decodeURIComponent(pathname);

  // If requesting a pretty project URL like /project/project-a, serve project.html
  let filePath;
  if (decoded.startsWith('/project/')) {
    filePath = path.join(PUBLIC_DIR, 'project.html');
  } else {
    // Normalize and prevent directory traversal
    const safePath = path.normalize(decoded).replace(/^(\.[\\/])+/, '');
    filePath = path.join(PUBLIC_DIR, safePath === '/' ? 'index.html' : safePath);
  }

  // Resolve and ensure the file is inside PUBLIC_DIR
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(PUBLIC_DIR)) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    return res.end('Bad request');
  }

  fs.stat(resolved, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Not found');
    }

    if (stats.isDirectory()) filePath = path.join(resolved, 'index.html');
    else filePath = resolved;

    const ext = path.extname(filePath) || '.html';
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Server error');
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Engineering portfolio server running: http://localhost:${PORT}`);
});
