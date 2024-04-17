// server/routes/wgerRoutes.js

const express = require('express');
const router = express.Router();
const { makeRequest } = require('./services/wgerService');

// Example route handler for the workout endpoint
router.get('/workout', async (req, res) => {
  try {
    const workoutData = await makeRequest('workout');
    res.json(workoutData);
  } catch (error) {
    console.error('Error fetching workout data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
