const express = require('express');
const router = express.Router();

<<<<<<< HEAD
//Quiz api is for adding, attempting, deleting, and making private quizzes.
const { addQuiz } = require('../db/queries/post_quiz');
=======
>>>>>>> 8353fe4ed58f8ecd2a1bd7eff9887487401bf53e
const { postAttempt } = require('../db/queries/post_attempt');
const { checkUserPermission, changePrivacy, deleteQuiz } = require('../db/queries/edit_quiz');
const { addQuiz} = require('../db/queries/post_quiz');

// Route for adding a new quiz to db
router.post('/', (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    res
      .status(401)
      .send('Must be logged in to create quiz');
  }
  const quiz = JSON.parse(Object.keys(req.body)[0]);

<<<<<<< HEAD
  addQuiz(quiz, userId).then(urls => {
    res.json(urls);
  });
});

//This Router will show the users attempt at the quiz using the specific url and add it to the database.
router.post('/attempt', (req, res) => {
  const userId = req.session.userId;
  const submission = req.body;

  postAttempt(submission, userId).then(url => {
    res.send(`/quizapp/attempt/${url}`);
  });
=======
  addQuiz(quiz, userId)
    .then(urls => {
      res.json(urls);
    });
});

// Route for adding a new attempt to db
router.post('/attempt',  (req, res) => {
  const userId = req.session.userId;
  const submission = req.body;

  postAttempt(submission, userId)
    .then(url => {
      res.send(`/quizapp/attempt/${url}`);
    });
>>>>>>> 8353fe4ed58f8ecd2a1bd7eff9887487401bf53e
});

//Route for editing visibility (public vs private) of a quiz
router.post('/visibility/:id', (req, res) => {
  const userId = req.session.userId;
  const request = req.body.visibility;
  const quizId = req.params.id;

  checkUserPermission(userId, quizId)
<<<<<<< HEAD
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
=======
  .then((permission) => {
    if (permission) {
      changePrivacy(quizId, request)
      .then(() => {
        res.send('privacy changed');
      });
    } else {
      res
        .status(401)
        .send('permission denied');
    }
  });
>>>>>>> 8353fe4ed58f8ecd2a1bd7eff9887487401bf53e
});

//Route for deleting a quiz
router.post('/delete/:id', (req, res) => {
  const userId = req.session.userId;
  const quizId = req.params.id;

  checkUserPermission(userId, quizId).then((permission) => {
    if (permission) {
      deleteQuiz(quizId).then(() => {
        res.send('quiz deleted');
      });
    } else {
      res
        .status(401)
        .send('permission denied');
    }
  });
});

module.exports = router;
