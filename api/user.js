//const { decryptCookie, getCookie } = require('./utils/auth');
async function getUsers() {
  const url = `https://dummyjson.com/users`
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function userApi(req) {
  return await getUsers();
}

module.exports = userApi;