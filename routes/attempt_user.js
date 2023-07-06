const express = require('express');
const router = express.Router();

<<<<<<< HEAD
//Attempt page will be displayed with user attempt
const { getAttempt } = require("../db/queries/get_attempts");
const { getUserByID } = require("../db/queries/users");

router.get("/:url", (req, res) => {
  const userId = req.session.userId;
  const url = req.params.url;


  promise.all([getUserByID(userId), getAttempt({ url }),])

    .then(([user, attempt]) => {
      const templateVars = { attempt, userName: (!user ? '' : user.name) };
      res.render('attempt_quiz', templateVars);
    })

    .catch(error => console.log(error));

=======
const { getUserById } = require('../db/queries/users');
const { getAttempt } = require('../db/queries/get_attempts');

// Single attempt page
router.get('/:url',  (req, res) => {
  const userId = req.session.userId;
  const url = req.params.url;

  Promise.all([
    getUserById(userId),
    getAttempt({ url }),
  ])
    .then(([user, attempt]) => {
      const templateVars = {
        attempt,
        userName: (!user ? '' : user.name)
      };
      res.render('attempt_quiz', templateVars);
    })
    .catch(error => console.log(error));
>>>>>>> 8353fe4ed58f8ecd2a1bd7eff9887487401bf53e
});

module.exports = router;
