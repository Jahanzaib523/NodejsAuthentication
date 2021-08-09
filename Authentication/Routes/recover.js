const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../Models/user');
const bcrypt = require('bcrypt');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/recover.html'));
});


router.post('/', (req, res, next) => {
   User.findOne({email: req.body.email})
   .exec()
   .then(user => {
       if(user.length <1)
       {
           return res.status(401).json({
               message: 'Incorrect User Email'
           });
       }
       else
       {
            res.status(200).json({
                User: {
                    email: user.email,
                    password: user.password
                }
            });
       }
   })
   .catch(err=> {
       console.log(err);
       res.status(500).json({
           error: err
       });
   });
});

module.exports = router;