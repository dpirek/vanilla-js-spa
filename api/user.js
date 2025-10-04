//const { decryptCookie, getCookie } = require('./utils/auth');

async function userApi(req) {
  return {
    arg: req.params,
    url: req.url,
    method: req.method,
    //headers: req.headers,
    // Dummy user data
    // id: 1, 
    // name: 'John Doe', 
    // email: 'john.doe@example.com' 
  };
}

module.exports = userApi;