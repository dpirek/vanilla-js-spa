//const { decryptCookie, getCookie } = require('./utils/auth');

async function userApi(req) {
  return {
    arg: req.params,
    url: req.url,
    method: req.method
  };
}

module.exports = userApi;