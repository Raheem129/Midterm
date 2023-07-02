const express = require('express');
const router = express.Router();

// Route for rendering the create quiz page
router.get('/create', (req, res) => {
  res.render('CreateQuiz');
});

// Route for handling form submission and creating the quiz
router.post('/create', (req, res) => {
  // Process the form data and create the quiz
  const quizTitle = req.body.title;
  const quizQuestions = req.body.questions;
  const choiceA = req.body.choiceA;
  const choiceB = req.body.choiceB;
  const choiceC = req.body.choiceC;
  const choiceD = req.body.choiceD;
  const quizVisibility = req.body.visibility; // Get the selected visibility option

  // Perform any necessary operations to create the quiz

  // Determine the redirect URL based on the visibility option
  let redirectUrl = '/quizzes/create'; // Default redirect to the quizzes page

  if (quizVisibility === 'private') {
    redirectUrl = '/myquizzes'; // Redirect to the My Quizzes page for private quizzes
  }

  // Redirect the user to the appropriate page
  res.redirect(redirectUrl);
});

module.exports = router;

