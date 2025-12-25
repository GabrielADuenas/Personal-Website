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
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
  const pathname = (req.url || '/').split('?')[0];
  let decoded = pathname;
  try { decoded = decodeURIComponent(pathname); } catch (e) { /* leave as-is */ }

  let filePath;
  if (decoded === '/' || decoded === '') {
    filePath = path.join(PUBLIC_DIR, 'index.html');
  } else if (decoded.startsWith('/project/')) {
    filePath = path.join(PUBLIC_DIR, 'project.html');
  } else {
    const safePath = path.normalize(decoded).replace(/^([\.\\\/])+/, '');
    filePath = path.join(PUBLIC_DIR, safePath);
  }

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

    const finalPath = stats.isDirectory() ? path.join(resolved, 'index.html') : resolved;
    const ext = (path.extname(finalPath) || '.html').toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(finalPath, (readErr, content) => {
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
