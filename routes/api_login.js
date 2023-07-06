const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');

const { getUserByEmail, addUser } = require('../db/queries/users');

// Log in route
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Check if email or password is missing
  if (!email || !password) {
    const templateVars = {
      userName: '',
      errorMessage: 'Please provide an email and password',
    };
    return res.status(400).render('login', templateVars);
  }

  // Check if user exists and password matches
  getUserByEmail(email)
    .then(user => {
      if (!user || !bcrypt.compareSync(password, user.password)) {
        const templateVars = {
          userName: '',
          errorMessage: 'That email and password combination did not match any accounts',
        };
        return res.status(400).render('login', templateVars);
      }
      // Set user id in the session and redirect to quizapp
      req.session.userId = user.id;
      res.redirect('/quizapp');
    });
});

// Registration route
router.post('/new', (req, res) => {
  const { name, email, password } = req.body;

  // Check if name, email, or password is missing
  if (!name || !email || !password) {
    const templateVars = {
      userName: '',
      errorMessage: 'Please provide a name, email, and password',
    };
    return res.status(400).render('register', templateVars);
  }

  // Check if user already exists with the given email
  getUserByEmail(email)
    .then(user => {
      if (user) {
        const templateVars = {
          userName: '',
          errorMessage: 'There is already an account for that email address',
        };
        return res.status(400).render('register', templateVars);
      }

      // Add the new user to the database
      addUser(name, email, bcrypt.hashSync(password))
        .then(user => {
          // Set user id in the session and redirect to quizapp
          req.session.userId = user.id;
          res.redirect('/quizapp');
        });
    });
});

module.exports = router;
