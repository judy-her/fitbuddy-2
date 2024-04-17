// server/services/wgerService.js

const axios = require('axios');

const API_KEY = 'add3b7db2e6113263ded3526eea40539947bf18f';

// Function to make authenticated requests to wger API with API key
async function makeRequest(endpoint) {
  try {
    const response = await axios.get(`https://wger.de/api/v2/${endpoint}/`, {
      headers: { Authorization: `Token ${API_KEY}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error making request to wger API:', error);
    throw error;
  }
}

module.exports = {
  makeRequest,
};
