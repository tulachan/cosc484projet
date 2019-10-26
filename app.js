// Import database session authentication information
// and initializaiton functions.
//Main Driver JS file
var http = require('http');
var fs = require('fs');
var database = require('./js/dbcfg.js');
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var react = require('react');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.set('view engine','ejs');



//Utilize a special fork of the normal MySQL NPM library
//Didn't feel like reconfiguring the whole SQL server to make this
//work

//Express crap
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Express uses the bodyparser to create JSON
//Bodyparsing arguements for the login page.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());





console.log(" ");
console.log('Server spooling up. \n');
//Tests ability to create MySQL session.
//Please do not delete this function
database.InitializeMySQLSession();






//Loads initial login page
app.get('/', function(request, response) {
	response.render('login.ejs');
});

//Loads sign-up page
app.get('/sign-up', function(request, response) {
	response.render('sign-up.ejs');
});

//Will not return the user's homepage if they're not logged in.
app.get('/home', function(request, response) {
    if (request.session.loggedin) {
		//If the user succesfully logs in then they are allowed to view this page.
		response.render('home.ejs',{usernameplaceholder : request.session.username});
		//We use EJS to replace our place holder tags inside the HTML
		//They take the form of <%= usernameplaceholder %> 
	} else {
		response.send('You need to be logged into to do that!');
	}
});


	
			//Use this when creating new users.
			//INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');


// Auth function
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	//Login stuff
	if (username && password) {
		//How you send MySQL queries to the database.
		database.cfg.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(err, results, fields){
			

				
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
				//Redirects us to the home path
			} else {
				response.send('Incorrect Username and/or Password!');
				//Bad password.

			}			
			response.end();
		});
	} else {
		//No password
		response.send('Please enter Username and Password!');
		response.end();
	}
});


// addUser function to add the given details in database
app.post('/addUser', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	var emailId = request.body.email;
	
	if (username && password) {
		// Insert the provided values into respective fields.
		database.cfg.query('INSERT INTO accounts (username, password, email) VALUES (? , ?, ?)',[username, password, emailId], function(err, results, fields) {

			if (!err){
				// if successful, render successfulSignUp page
				response.render('successfulSignUp.ejs');
				response.end();
			} else {
				response.send('Please enter valid user name and password');
				response.end();
			}
		});
	} else {
		//No password
		response.send('Please enter Username and Password!');
		response.end();
	}
});











app.listen(3000, "127.0.0.1");
