const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// Set up the middleware to parse request bodies
router.use(bodyParser.urlencoded({ extended: false }));

// GET route for /login
router.get('/login', (req, res) => {
  res.render('login');
});

// Define the valid user credentials
const validCredentials = [
  { email: 'user1@example.com', password: 'password1' },
  { email: 'user2@example.com', password: 'password2' },
  { email: 'user3@example.com', password: 'password3' },
  { email: 'nimi@gmail.com', password: '123456' },
  // Add more valid credentials as needed
];

// Define the login route
router.post('/login', (req, res) => {
  // Retrieve the email and password from the request body
  const { email, password } = req.body;

  // Check if the provided credentials match any valid user credentials
  const isValidUser = validCredentials.some(
    (user) => user.email === email && user.password === password
  );

  if (isValidUser) {
    res.redirect('/Quizzes/Create');
  } else {
    res.send(`
      <div>
        <h3>Incorrect Email or Password</h3>
        <a href="/Quizzes/Login">Redirect to login page!!</a>
      </div>
    `);
  }
});

// // Define the login route
// router.post('/login', (req, res) => {
//   // Retrieve the email and password from the request body
//   const { email, password } = req.body;
//   if (email === 'example@example.com' && password === 'password') {
//     res.redirect('/Quizzes/Create');
//   } else {
//     res.send(`
//       <div>
//         <h3>Incorrect Email or Password</h3>
//         <a href = "/Quizzes/Login" >Redirect to login page!!</a>
//       </div>
//     `);
//   }
// });



// GET route for /logout
// router.get('/logout', (req, res) => {
//   currentUser = null;
//   res.redirect('/Quizzes/Login');
// });

module.exports = router;