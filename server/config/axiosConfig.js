const axios = require('axios');

// Send username and password to obtain tokens
const result = await axios.post('https://wger.de/api/v2/token', {
  username: 'fit-buddy',
  password: 'UCB24ftappP',
});

// Extract access and refresh tokens
const { access, refresh } = result.data;
