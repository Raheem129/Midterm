const express = require('express');
const router = express.Router();
const { db, getJoinedData } = require('../db/connection');

// Route for rendering the create quiz page
router.get('/create', (req, res) => {
  res.render('createquiz');
});

// Route for displaying the quizzes
router.get('/', (req, res) => {
  // Fetch the quizzes from the database
  db.query('SELECT * FROM quizzes')
    .then((result) => {
      const quizzes = result.rows;
      console.log('Quizzes:', JSON.stringify(quizzes)); // Add this line to check the quizzes data in the console
      res.render('quizzes', { quizzes });
    })
    .catch((err) => {
      console.error('Error fetching quizzes from the database:', err);
      res.render('quizzes', { quizzes: [] });
    });
});

// Route for displaying the joined data
router.get('/joined', (req, res) => {
  // Fetch the joined data from the database
  getJoinedData()
    .then((result) => {
      const joinedData = result;
      console.log('Joined Data:', JSON.stringify(joinedData)); // Add this line to check the joined data in the console
      res.render('joined', { joinedData });
    })
    .catch((err) => {
      console.error('Error fetching joined data from the database:', err);
      res.render('joined', { joinedData: [] });
    });
});

// Route for handling form submission and creating the quiz
router.post('/create', (req, res) => {
  // Process the form data and create the quiz
  const quizTitle = req.body.title;
  const quizQuestions = req.body.questions;
  console.log('Quiz Title:', quizTitle);
  console.log('Quiz Questions:', quizQuestions);
  const choices = ['A', 'B', 'C', 'D'];

  const quizData = {
    title: quizTitle,
    questions: [],
  };

  for (let i = 0; i < quizQuestions.length; i++) {
    const questionText = quizQuestions[i];
    const questionChoices = [];

    for (const choice of choices) {
      const choiceText = req.body[`choice${choice}[${i}]`];
      questionChoices.push(choiceText);
    }

    quizData.questions.push({
      questionText,
      choices: questionChoices,
    });
  }

  const quizVisibility = req.body.visibility; // Get the selected visibility option

  // Save the quiz data to the database
  db.query('INSERT INTO quizzes (title, questions, visibility) VALUES ($1, $2, $3) RETURNING *', [
    quizData.title,
    JSON.stringify(quizData.questions),
    quizVisibility,
  ])
    .then((result) => {
      const savedQuiz = result.rows[0]; // Retrieve the saved quiz from the query result
      // Redirect to the "/quizzes" page
      res.redirect('/quizzes');
    })
    .catch((err) => {
      console.error('Error saving quiz to the database:', err);
      res.redirect('/quizzes/create');
    });
});

// Route for deleting a quiz
router.post('/delete/:id', (req, res) => {
  const quizId = req.params.id;

  // Delete the quiz from the database
  db.query('DELETE FROM quizzes WHERE id = $1', [quizId])
    .then(() => {
      console.log('Quiz deleted successfully');
      res.redirect('/quizzes');
    })
    .catch((err) => {
      console.error('Error deleting quiz from the database:', err);
      res.redirect('/quizzes');
    });
});

module.exports = router;
