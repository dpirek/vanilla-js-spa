const http = require('http');
const { respondJson, notFound, parseBody, serverStatic, isStaticRequest } = require('./utils/response');
const { route } = require('./utils/router');
const userApi = require('./api/user');
const { env } = require('process');

const PORT = env.PORT || 8080;
//const AUTH_COOKIE_NAME = 'auth-token';

const router = route();
router.add('/api/user/:id', userApi);

const server = http.createServer(async (req, res) => {
  const url = req.url.toLowerCase();
  //const authUser = decryptCookie(getCookie(req, AUTH_COOKIE_NAME));
  const route = router.match(url);

  if (isStaticRequest(req)) return serverStatic(req, res);
  if (route) {
    req.params = route.params;
    req.body = await parseBody(req);
    //req.authUser = authUser;
    return await respondJson(res, await route.handler(req));
  }
  return notFound(res);
});

server.listen(PORT, () => console.log(`Server running at PORT ${PORT}/`));
