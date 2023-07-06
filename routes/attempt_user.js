const express = require('express');
const router  = express.Router();

const { getUserById } = require('../db/queries/users');
const { getAttempt } = require('../db/queries/get_attempts');

// Single attempt page
router.get('/:url',  (req, res) => {
  const userId = req.session.userId;
  const url = req.params.url;

  Promise.all([
    getUserById(userId), // Fetch the user by their ID
    getAttempt({ url })  // Fetch the attempt by its URL
  ])
    .then(([user, attempt]) => {
      const templateVars = {
        attempt,
        userName: (!user ? '' : user.name) // Set the userName based on the user's name
      };
      res.render('attempt_quiz', templateVars); // Render the attempt_quiz template with the provided templateVars
    })
    .catch(error => console.log(error));
});

module.exports = router;
