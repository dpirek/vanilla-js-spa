import Container from './components/container.js';

const appContainer = document.getElementById('app');

function render(users) {
  const container = new Container({
    users: users
  });
  appContainer.appendChild(container);
}

fetch('/api/user/dave')
  .then(response => response.json())
  .then(res => render(res.users || []))
  .catch(error => console.error('Error fetching user data:', error));