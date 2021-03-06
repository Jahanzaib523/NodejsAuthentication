const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../Models/user');
const bcrypt = require('bcrypt');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/signin.html'));
});


router.post('/', (req, res, next) => {
   User.findOne({email: req.body.email})
   .exec()
   .then(user => {
       if(user.length <1)
       {
           return res.status(401).json({
               message: 'Authentication Failed'
           });
       }
       bcrypt.compare(req.body.pass, user.password, (err, result) => {
          if(err)
          {
              return res.status(401).json({
                  message: 'Authentication Failed'
              });
          }
          
          if(result)
          {
              return res.status(200).json({
                  message: 'Authentication Successfull.'
              });
          }
       });
   })
   .catch(err=> {
       console.log(err);
       res.status(500).json({
           error: err
       });
   });
});

module.exports = router;