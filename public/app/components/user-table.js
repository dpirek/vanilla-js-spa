import BaseComponent from './base-component.js';

class UserTable extends BaseComponent {
  constructor({ users }) {
    super();
    this.users = users;
  }

  connectedCallback() {
    const userTable = this.createElement('table', {
      class: 'table table-striped',
      children: [
        this.createElement('thead', {
          children: [
            this.createElement('tr', {
              children: [
                this.createElement('th', { innerText: 'ID' }),
                this.createElement('th', { innerText: 'First Name' }),
                this.createElement('th', { innerText: 'Last Name' }),
                this.createElement('th', { innerText: 'Email' }),
                this.createElement('th', { innerText: 'Phone' })
              ]
            })
          ]
        }),
        this.createElement('tbody', {
          children: this.users.map(user => 
            this.createElement('tr', {
              children: [
                this.createElement('td', { innerText: user.id }),
                this.createElement('td', { innerText: user.firstName }),
                this.createElement('td', { innerText: user.lastName }),
                this.createElement('td', { innerText: user.email }),
                this.createElement('td', { innerText: user.phone })
              ]
            })
          )
        })
      ]
    });

    this.appendChild(userTable);
  }
}

const register = () => customElements.define('user-table', UserTable);
window.WebComponents ? window.WebComponents.waitFor(register) : register();

export default UserTable;