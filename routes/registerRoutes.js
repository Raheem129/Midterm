const { Template } = require('ejs');
const express = require('express');
const router = express.Router();

router.get('/Register', (req, res) => {
  res.render('register');
});

router.post('/Register',(req, res) => {
  
})

module.exports = router;