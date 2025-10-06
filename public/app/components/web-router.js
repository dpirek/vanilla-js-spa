
class router extends HTMLElement {
  constructor() {
    super();
    this.hash = window.location.hash.replace('#', '');

    window.addEventListener('hashchange', () => {
      this.hash = window.location.hash.replace('#', '');
      this.render();
    });
  }

  connectedCallback() {
    this.routeList = Array.from(this.children).map((route) => {
      return {
        path: route.getAttribute('path'),
        content: route.innerHTML
      }
    });

    this.render();
  }

  route() {
    return this.routeList.find(route => route.path === this.hash)?.content || this.routeList.find(route => route.path === 'default')?.content || '';
  }

  render() {
    this.innerHTML = this.route();
  }
}

const register = () => customElements.define('web-router', router);
window.WebComponents ? window.WebComponents.waitFor(register) : register();

export default router;
