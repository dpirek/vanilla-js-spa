
fetch('/api/user/dave')
  .then(response => response.json())
  .then(data => {
    console.log('User Data:', data);
  })
  .catch(error => console.error('Error fetching user data:', error));