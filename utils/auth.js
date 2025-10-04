const crypto = require('crypto');
const { redirect } = require('./response');

const SECRET = process.env.SECRET || '3828aaf8ba32fe3006d37c7f3ac46bcb';

function encryptCookie(value) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECRET), iv);
  let encrypted = cipher.update(JSON.stringify(value));
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decryptCookie(cookie) {
  try {
    const [iv, encrypted] = cookie.split(':');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SECRET), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(Buffer.from(encrypted, 'hex'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return JSON.parse(decrypted.toString());
  } catch (e) {
    return null;
  }
}

function getCookie(req, key) {
  const cookies = {};
  req.headers.cookie && req.headers.cookie.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    cookies[parts[0].trim()] = (parts[1] || '').trim();
  });
  return cookies[key];
}

function setCookie(res, key, value, options = {}) {
  const cookieParts = [`${key}=${value}`];
  if(options.httpOnly) cookieParts.push('HttpOnly');
  if(options.maxAge) cookieParts.push(`Max-Age=${options.maxAge}`);
  if(options.path) cookieParts.push(`Path=${options.path}`);
  if(options.domain) cookieParts.push(`Domain=${options.domain}`);
  if(options.secure) cookieParts.push('Secure');
  if(options.sameSite) cookieParts.push(`SameSite=${options.sameSite}`);
  res.setHeader('Set-Cookie', cookieParts.join('; '));
}

function removeCookie(res, key) {
  res.setHeader('Set-Cookie', `${key}=; Max-Age=0`);
}

function login(req, res, userId) {
  const authData = { userId, date: new Date().toISOString() };
  const encrypted = encryptCookie(authData);
  setCookie(res, 'ks-admin-auth', encrypted, { httpOnly: true, maxAge: 3600, path: '/' });
  redirect(res, referer);
}

function logout(req, res) {
  removeCookie(res, 'ks-admin-auth');
  redirect(res, req.headers.referer || '/');
}

module.exports = {
  encryptCookie,
  decryptCookie,
  getCookie,
  setCookie,
  removeCookie,
  login,
  logout
};