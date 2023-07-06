const express = require('express');
const router = express.Router();

<<<<<<< HEAD
//This will display the users account page with the quizzes and attempts.
const { getAccountQuizzes, getAccountAttempts } = require('../db/queries/account_page');
const { getUserById } = require('../db/queries/users');
=======
const { getUserById } = require('../db/queries/users');
const { getAccountQuizzes, getAccountAttempts } = require('../db/queries/account_page');
>>>>>>> 8353fe4ed58f8ecd2a1bd7eff9887487401bf53e

// User account page
router.get('/', (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.redirect('/quizapp/login');
  }
<<<<<<< HEAD
  Promise.all([getAccountAttempts(userId), getAccountQuizzes(userId), getUserById(userId),])

    .then(([quizzes, attempts, user]) => {
      const templateVars = { quizzes, attempts, userName: user.name };
=======

  Promise.all([
    getAccountAttempts(userId),
    getAccountQuizzes(userId),
    getUserById(userId),
  ])
    .then(([attempts, quizzes, user]) => {
      const templateVars = {
        attempts,
        quizzes,
        userName: user.name
      };
>>>>>>> 8353fe4ed58f8ecd2a1bd7eff9887487401bf53e
      res.render('user', templateVars);
    });
});

module.exports = router;
