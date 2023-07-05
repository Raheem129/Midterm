// Import necessary modules and dependencies
const express = require('express');
const router = express.Router();
const { getQuizzes } = require('../db/queries/get_quizzes');

// Import separate route handlers
const quizRoutes = require('./quiz_api');
const loginRoutes = require('./api_login');
const logoutRoute = require('./api_logout');

// Mount resource routes for different endpoints
router.use('/quiz', quizRoutes);
router.use('/login', loginRoutes);
router.use('/logout', logoutRoute);

// Retrieve quizzes for the home page
router.get('/', (req, res) => {
  // Get the user ID from the session
  const userId = req.session.userId;

  // Extract query parameters
  const query = req.query;

  // Fetch quizzes based on user ID and query parameters
  getQuizzes(userId, query)
    .then(data => {
      // Send the retrieved data as a JSON response
      res.json(data);
    });
});

// Export the router module
module.exports = router;
