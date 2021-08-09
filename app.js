const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const SignUpRoute = require('./Authentication/Routes/signup');
const SignInRoute = require('./Authentication/Routes/signin');
const RecoverRoute = require('./Authentication/Routes/recover');


//Connection with MongoDB. The password is given too.
//mongoose.connect('mongodb+srv://nodejsrestapi:' + process.env.MONGO_ATLAS_PW +'@cluster0.gjkln.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
//mongoose.connect("mongodb+srv://nodejsrestapi:nodejsrestapi@cluster0.gjkln.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", );
mongoose.connect("mongodb://nodejsrestapi:nodejsrestapi@cluster0-shard-00-00.gjkln.mongodb.net:27017,cluster0-shard-00-01.gjkln.mongodb.net:27017,cluster0-shard-00-02.gjkln.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-akx8mo-shard-0&authSource=admin&retryWrites=true&w=majority")
mongoose.Promise = global.Promise;


//Morgan shows the log content in the console.
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Handling the CORS errors
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '192.168.1.37');
   res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Authroization, Content-Type, Accept, ');
   res.header('Access-Control-Allow-Origin', '*');
   
   if(req.method === 'OPTIONS')
   {
     res.header('Access-Control-Allow-Origin', 'PUT, POST, PATCH, DELETE, GET');
     return res.status(200).json({});
   } 
   next();
});

//Routes which are handling requests.
app.use('/signup', SignUpRoute);
app.use('/signin', SignInRoute);
app.use('/recover', RecoverRoute);

//Error Handling
app.use((req, res, next) => {
    const error = new Error('Error Occured!');
    error.status = 404;
    next(error);
}); 

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
     error: {
       message: error.message
     }
  });
});

module.exports = app;
