/* Tiny local preview server — for looking at the site before pushing.
   Not part of the published site. Run: node serve.js  →  localhost:4173 */

var http = require('http');
var fs   = require('fs');
var path = require('path');

var PORT  = 4173;
var TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.jpg':  'image/jpeg',
  '.png':  'image/png',
  '.webmanifest': 'application/manifest+json'
};

http.createServer(function (req, res) {
  var rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/') { rel = '/index.html'; }

  var file = path.join(__dirname, path.normalize(rel).replace(/^([\\/])+/, ''));

  if (file.indexOf(__dirname) !== 0 || rel.indexOf('/_source') === 0) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  fs.readFile(file, function (err, body) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found: ' + rel);
      return;
    }
    res.writeHead(200, {
      'Content-Type':  TYPES[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    res.end(body);
  });
}).listen(PORT, function () {
  console.log('AV guide preview: http://localhost:' + PORT);
});
