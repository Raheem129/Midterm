const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// Set up the middleware to parse request bodies
router.use(bodyParser.urlencoded({ extended: false }));

// GET route for /login
router.get('/login', (req, res) => {
  res.render('login');
});

// Define the login route
router.post('/login', (req, res) => {
  // Retrieve the email and password from the request body
  const { email, password } = req.body;
  if (email === 'a@a.com' && password === 'password') {
    res.redirect('/Quizzes/Create');
  } else {
    res.send(`
      <div>
        <h3>Incorrect Email or Password</h3>
        <a href = "/Quizzes/Login" >Redirect to login page!!</a>
      </div>
    `);
  }
});

// GET route for /logout
// router.get('/logout', (req, res) => {
//   currentUser = null;
//   res.redirect('/Quizzes/Login');
// });

module.exports = router;