const express = require('express');
const router  = express.Router();

//This will display the users account page with the quizzes and attempts.
const  {getAccountQuizzes, getAccountAttempts}  = require('../db/queries/account_page');
const  {getUserById}  = require('../db/queries/users');

router.get('/', (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.redirect('/quizapp/login');
  }
  Promise.all([ getAccountAttempts(userId), getAccountQuizzes(userId), getUserById(userId), ])

  .then(([quizzes, attempts, user]) => {
    const templateVars = {quizzes, attempts, userName: user.name};
    res.render('user', templateVars);
  });
});

module.exports = router;