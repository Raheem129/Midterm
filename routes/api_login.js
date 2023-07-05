// Import necessary modules and dependencies
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { getUserByEmail, addUser } = require('../db/queries/users');

// POST route for user login
router.post('/', (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Check if email or password is missing
  if (!email || !password) {
    const templateVars = {
      userName: '',
      errorMessage: 'Please provide an email and password',
    };
    return res.status(400).render('login', templateVars);
  }

  // Fetch user by email from the database
  getUserByEmail(email)
    .then(user => {
      // Check if user or password match is not found
      if (!user || !bcrypt.compareSync(password, user.password)) {
        const templateVars = {
          userName: '',
          errorMessage: 'That email and password combination did not match any accounts',
        };
        return res.status(400).render('login', templateVars);
      }

      // Set the user ID in the session and redirect to the quizapp route
      req.session.userId = user.id;
      res.redirect('/quizapp');
    });
});

// POST route for user registration
router.post('/new', (req, res) => {
  // Extract name, email, and password from request body
  const { name, email, password } = req.body;

  // Check if name, email, or password is missing
  if (!name || !email || !password) {
    const templateVars = {
      userName: '',
      errorMessage: 'Please provide a name, email, and password',
    };
    return res.status(400).render('register', templateVars);
  }

  // Check if user already exists with the provided email
  getUserByEmail(email)
    .then(user => {
      if (user) {
        const templateVars = {
          userName: '',
          errorMessage: 'There is already an account for that email address',
        };
        return res.status(400).render('register', templateVars);
      }

      // Add the user to the database and set the user ID in the session
      addUser(name, email, bcrypt.hashSync(password))
        .then(user => {
          req.session.userId = user.id;
          res.redirect('/quizapp');
        });
    });

});

// Export the router module
module.exports = router;
