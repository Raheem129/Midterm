const express = require('express');
const router  = express.Router();

const addQuiz = require('../db/queries/post_quiz');
const postAttempt = require('../db/queries/post_attempt');

router.post('/', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.status(401).send('Need to login to create quiz');
  }
  const quiz = JSON.parse(Object.keys(req.body)[0]);

  addQuiz(quiz, userId).then(urls => {
      res.json(urls);
    });
});

router.post('/attempt',  (req, res) => {
  const userId = req.session.userId;
  const submission = req.body;

  postAttempt(submission, userId).then(url => {
      res.send(`/quizapp/attempt/${url}`);
    });
});



module.exports = router;