const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'signin.html'));
});


router.post('/', (req, res, next) =>
{
   res.status(200).json({
       message: 'SignIn POST'
   });
});

module.exports = router;