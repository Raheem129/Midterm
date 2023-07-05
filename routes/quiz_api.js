const express = require('express');
const router  = express.Router();

//Quiz api is for adding, attempting, deleting, and making private quizzes.
const addQuiz = require('../db/queries/post_quiz');
const postAttempt = require('../db/queries/post_attempt');
const { checkUserPermission, changePrivacy, deleteQuiz } = require('../db/queries/edit_quiz');

//This Router will add a quiz to the database using a user.
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

//This Router will show the users attempt at the quiz using the specific url and add it to the database.
router.post('/attempt',  (req, res) => {
  const userId = req.session.userId;
  const submission = req.body;

  postAttempt(submission, userId).then(url => {
      res.send(`/quizapp/attempt/${url}`);
    });
});

//This Router will allow the user to choose if he wants the quiz public or private.
router.post('/visibility/:id', (req, res) => {
  const userId = req.session.userId;
  const request = req.body.visibility;
  const quizId = req.params.id;

  checkUserPermission(userId, quizId)
  .then((permission) => {

    if (permission) {
      changePrivacy(quizId, request)
      .then(() => {
        res.send("Changed Privacy");

      });
    } else {
      res.status(401).send("Denied Access");

    }
  });
});

// This Route will be deleting the users quiz and making sure its his quiz that he has access to it.
router.post('/delete/:id', (req, res) => {
  const userId = req.session.userId;
  const quizId = req.params.id;

  checkUserPermission(userId, quizId).then((permission) => {
    if (permission) {
      deleteQuiz(quizId).then(() => {
        res.send("Deleted Quiz");

      });

    } else {
      res.status(401).send("Denied Access");
    }
  });
});

module.exports = router;