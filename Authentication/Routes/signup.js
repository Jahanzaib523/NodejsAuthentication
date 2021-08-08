const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');
const User = require('../Models/user');
const bcrypt =require('bcrypt');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/signup.html'));
});


router.post('/', (req, res, next) =>
{
    User.find({email: req.body.email})
    .exec()
    .then(user=>{
        if(user.length >=1)
        {
           res.status(409).json({
               message: 'User Already exists with this email'
           });
        }
        else
        {
            bcrypt.hash(req.body.pass, 10, (err, hash) =>{
                if(err)
                {
                    return res.status(500).json({
                       error: err
                    });
                }
                else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        userName: req.body.name,
                        email: req.body.email,
                        password: hash
                       });
                    
                    user.save().then(result =>{
                        res.status(200).json({
                            message: 'User Created!'
                        });
                    })
                    .catch(err=> {
                        res.status(500).json({
                          error: err
                        });
                    });   
                }
           });
        }
    })
});

module.exports = router;