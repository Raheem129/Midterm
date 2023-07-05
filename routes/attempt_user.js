const express = require('express');
const router  = express.Router();

//Attempt page will be displayed with user attempt
const getAttempt = require ("../db/queries/get_attempts");
const getUserByID = require ("../db/queries/users");

router.get("/:url",(req, res) => {
const userId = req.session.userId
const url = req.params.url


promise.all([getUserByID(userId), getAttempt({url}),])

.then(([user, attempt]) => {
  const templateVars = { attempt, userName: (!user ? '' : user.name) };
  res.render('quiz_attempt', templateVars);
})

.catch(error => console.log(error));

});

module.exports = router;