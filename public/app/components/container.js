import BaseComponent from './base-component.js';
import UserTable from './user-table.js';

class Container extends BaseComponent {
  constructor({ users }) {
    super();
    this.users = users;
  }

  connectedCallback() {
    const header = this.createElement('div', {
      class: 'mb-4',
      children: [
        this.createElement('h1', { innerText: 'Sample Users' }),
        this.createElement('hr')
      ]
    });
    
    const userTable = new UserTable({ users: this.users });

    this.appendChild(this.createElement('div', {
      class: 'container mt-4',
      children: [header, userTable]
    }));
  }
}

const register = () => customElements.define('web-container', Container);
window.WebComponents ? window.WebComponents.waitFor(register) : register();

export default Container;