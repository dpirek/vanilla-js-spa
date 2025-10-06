const fs = require('fs');
const url = require('url');
const path = require('path');
const { contentType } = require('./string');
const STATIC_ROOT = path.join(__dirname, '..', 'public');

function redirect(res, url) {
  res.writeHead(302, { 'Location': url });
  res.end();
}

function respondJson(res, data) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function static(res, url, type = 'text/plain') {
  res.statusCode = 200;
  res.writeHead(200, {'Content-Type': contentType(url)});
  try {
    fs.accessSync(__dirname + url, fs.constants.R_OK);
  } catch(err) {
    res.statusCode = 404;
    return res.end('404 Not Found');
  }
  res.end(fs.readFileSync(__dirname + url));
}

function serverStatic(req, res) {
  try {
    let { pathname } = url.parse(req.url);
    console.log('Static request for', pathname);
    res.writeHead(200, {'Content-Type': contentType(pathname)});

    if(pathname === '/') pathname = '/index.html';
    if(pathname === '/favicon.ico') return res.end();

    const fileContent = fs.readFileSync(STATIC_ROOT + pathname);
    
    if(fileContent === null) return res.end('not found');
    return res.end(fileContent);
  } catch (exception) {
    console.log('exception found..', exception);
  }
}

function isStaticRequest(req) {
  const { pathname } = url.parse(req.url);
  if (pathname === '/' || pathname === '/favicon.ico') return true;
  const staticFiles = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.woff', '.map', '.wasm', '.json', '.svg', '.ico', '.html'];
  return staticFiles.some(ext => pathname.endsWith(ext));
}

function notFound(res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>');
}

async function parseBody(req) {
  return new Promise((resolve, reject) => {
    const requestBody = [];
    req.on('data', (chunk) => {
      requestBody.push(chunk);
    }).on('end', () => {
      const body = Buffer.concat(requestBody).toString();
      if (req.headers['content-type'] === 'application/json') {
        try {
          return resolve(JSON.parse(body));
        } catch (e) {
          return reject(new Error('Invalid JSON'));
        }
      }
      resolve(body);
    });
  });
}

module.exports = {
  redirect,
  static,
  notFound,
  contentType,
  isStaticRequest,
  serverStatic,
  respondJson,
  parseBody
};