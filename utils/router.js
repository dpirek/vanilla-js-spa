function route() {
  const routes = [];
  return {
    add: (path, handler) => {
      routes.push({ path, handler });
    },
    match: (url) => {
      const params = {};
      
      const route = routes.find(r => {
        const keys = r.path.match(/:\w+/g);
        if (!keys) return r.path === url;
        const regex = new RegExp('^' + r.path.replace(/:\w+/g, '(\\w+)') + '$');
        const match = url.match(regex);
        if (match) {
          keys.forEach((key, i) => {
            params[key.slice(1)] = match[i + 1];
          });
        }
        return match;
      });

      return route ? { handler: route.handler, params } : null;
    }
  };
}

module.exports = { route };