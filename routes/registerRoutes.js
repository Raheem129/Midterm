const express = require('express');
const router = express.Router();
const {db} = require('../db/connection');

// Router get to display the register page
router.get('/Register', (req, res) => {
  res.render('register');
});

router.post("/Register", (req, res) => {
    const user = req.body;
      db.addUser(user)
      .then((user) => {
        console.log(user);
        if (!user) {
          return res.send({ error: "error" });
        }
        req.session.userId = user.id;
        //res.redirect("/login")
      })
      .catch((e) => res.send(e));
  });

//router.post('/Register',(req, res) => {
  //const {name, email, password } = req.body;
  //if(!name || !email || !password){
   // const  templateVars = {
    //  user:'', errormessage: 'Please provide an Email and Password to Register',
    //};
    //return res.status(400).render('register', templateVars)
  //}
//})

module.exports = router, db;
