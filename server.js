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

// make sure edit proxy in react's package.json file if you change this!
// otherwise you will disconnect the frontend from the backend!
var port = 8080;
var URL = "127.0.0.1";


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






//Loads initial login page, REACT IGNORES THIS
 app.get('/', (request, response) => {
 	response.send( {express: 'login.ejs'});
 });

// create a GET route
app.get('/start', (req, res) => {
	res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
  });

//Loads sign-up page
app.get('/sign-up', function(request, response) {
	response.render('sign-up.ejs');
});

// Create sub-readit at /new?sub=name
app.get('/new', function(request, response) {
	let q = request.query;
    if ("sub" in q)
    {
		let dir = q.sub;
		let sub = dir;
		console.log("Someone attempting to make sub-readit: " + dir);
		dir = "./sub/" + dir;
		if (!fs.existsSync(dir))
		{
			fs.mkdirSync(dir);
			//response.send("Created!");
		}
		else
		{
			//response.send("That sub-readit already exists. . .");
		}
		// send the client to the sub-readit here
		let rd = URL+":"+port+ '/sub/' + sub;
		console.log(rd);
		//response.redirect(rd);
		response.writeHead(302, {Location: rd} );
		response.end();		
		console.log("Done\n");
    }
    else
    {
        response.status(401).send("Invalid argument, format is /new?sub=NAME");
        console.log("Invalid format presented. . . not sent\n");
    }
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











app.listen(port, URL);
