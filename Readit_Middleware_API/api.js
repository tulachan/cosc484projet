// Import database session authentication information
// and initializaiton functions.
//Main Driver JS file
var fs = require('fs');
var database = require('./apisupport/dbcfg.js');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
// make sure edit proxy in react's package.json file if you change this!
// otherwise you will disconnect the frontend from the backend!
// also do not set to port 3000 or else react will not start!
var port = 8080;
var URL = "127.0.0.1";

//Express crap
app.use(session({
    secret: 'dongle',
    resave: true,
    saveUninitialized: true
}));

console.log("API running on " +  URL + ":" + port);

//Express uses the bodyparser to create JSON
//Bodyparsing arguements for the login page.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
console.log('\nServer spooling up. \n');
//Tests ability to create MySQL session.
//Please do not delete this function
database.InitializeMySQLSession();

// Fetch your endpoints in react and handle the frontend there
// These endpoints here should only do things like returning json to the frontend
// or handle requests to the database, create files/directories, etc.

 

// create a GET route
app.get('/start', (req, res) => {
	res.send( {express: "This is sent from the backend"});
});

                                             
// Create sub-readit using a post request.
app.post('/api/newpost', function(req, res) {
	postauthor = req.session.username;
	postbody = req.session.postbody;
	posttitle = req.session.posttitle;
	postsubreadit = req.session.postsubreadit;
	//If not logged in can't create subreddit.
	if (req.session.loggedin) {
		database.cfg.query('SELECT * FROM subreadits WHERE subreadit_name = ?', [postsubreadit], function(err, results, fields){
			if(results[0] == null){
			database.cfg.query('INSERT INTO posts (post_body, post_title, post_subreadit, post_author) VALUES (? ,?,?,?)'
				,[postbody, posttitle, postsubreadit, postauthor], function(err, results, fields) {
					if (!err){
						res.send({ message: 'Post successfuly created!'});
					} else {
						res.send({ message: 'Failed to post'});
					}
				});
			}	
			
			else {
					res.send({ message: 'Failed to post'});
				}
		});
	}
	});

//Displays top posts on whole site with a start at 1000 likes.
app.get('/api/topposts', function(req, res) {
	let likerange = 1000;
	database.cfg.query('SELECT * FROM posts WHERE post_likes >= ?', [likerange], function(err, results, fields){
		if(err){
			res.send({ message: 'Failed to get top posts'});
		} else {
			res.send(results);
		}
	});
});


//Displays the subreadit
app.get('/api/displaysubreadit', function(req, res) {    
	let subreadit = req.param('subreadit');
	database.cfg.query('SELECT * FROM posts WHERE post_subreadit = ?', [subreadit], function(err, results, fields){
		if(results[0] == null){
			res.send({message: 'Failed to get subreadit posts'});
		} else {
			res.send(results);
		}
	});
});


//Creates new subreadit and makes the creator a moderator on said subreadit.
app.post('/api/newsubreadit', function(req, res) {
	subreaditmod = req.session.username;
	subreaditname = req.session.subreaditname;
	//If not logged in can't create subreddit.
	if (req.session.loggedin) {
			database.cfg.query('INSERT INTO subreadits (subreadit_name, subreadit_moderatorname) VALUES (? ,?)'
				,[subreaditname, subreaditmod], function(err, results, fields) {
					if (!err){
						res.send({ message: 'Post successfuly created!'});
					} else {
						res.send({ message: 'Failed to post'});
					}
				});
			}
});

//Displays subreadit info
app.get('/api/displaysubreaditinfo', function(req, res) {    
	let subreadit = req.param('subreadit');
	database.cfg.query('SELECT * FROM subreadits WHERE subreadit_name = ?', [subreadit], function(err, results, fields){
		if(results[0] == null){
			res.send({message: 'Failed to get subreadit info'});
		} else {
			res.send(results);
		}
	});
});

//Is the user logged in?
app.get('/api/isloggedin', function(req, res) {
    if (req.session.loggedin) {
		res.send({ loggedin: true});
	} else {
		res.send({ loggedin: false});
	} 	
});

//Who am I?
app.get('/api/whoami', function(req, res) {
	
	if (req.session.loggedin) {
		res.send({ username: req.session.username});
	} else {
		res.send({ username: ''});
	}	
});

//Logs you out.
app.get('/api/logout', function(req, res) {
	req.session.loggedin = false;
	req.session.username = '';
	req.session.password = '';
	res.send({ message: 'You have been logged out'});	
});


app.get('/api/apitest', function(req, res) {
	req.session.loggedin = true;
	req.session.username = 'API Test';
	res.send({ message: 'Express'});	
});

// Auth function
app.post('/api/auth', function(req, res) {
	let username = req.body.username;
	let password = req.body.password;
	//Login stuff
	if (username && password) {
		//How you send MySQL queries to the database.
		database.cfg.query('SELECT * FROM accounts WHERE account_username = ? AND account_password = ?', [username, password], function(err, results, fields){
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.send({ message: 'Please enter a user name and password' });

				//Redirects us to the home path
			} else {
				res.send({ message: 'Please enter a user name and password' });
			}			
			res.send();
		});
	} else {
		//No password
		res.send({ message: 'Please enter a user name and password' });
		res.end();
	}
});

// addUser function to add the given details in database
app.post('/api/registernewuser', function(req, res) {
	let firstname = req.body.firstname
	let lastname = req.body.lastname
	let username = req.body.username;
	let password = req.body.password;
	let email = req.body.email;
	if (username && password) {
		// Insert the provided values into respective fields.
		database.cfg.query('INSERT INTO accounts (account_username, account_password, account_email, account_firstname, account_lastname) VALUES (? , ?, ?, ?, ?)'
		,[username, password, email, firstname, lastname], function(err, results, fields) {
			if (!err){
				res.send({ message: 'Account successfuly created!'});
				console.log("New user created");
				console.log("Password: " + password);
				console.log("Username: " + username);
				
			} else {
				res.send({ message: 'Please enter valid user name and password' });
			}
		});
	} else {
		//No password
		res.send({ message: 'Please enter Username and Password.'});
		res.end();
	}
});

//Upvotes a post
app.post('/api/upvotepost', function(req, res) {
	let postid = req.body.postid;
	let postlikes = req.body.postlikes;
	let postmessage = "";
	if (req.session.loggedin) {
		// Insert the provided values into respective fields.
		database.cfg.query('SELECT * FROM posts WHERE post_id = ?', [postid], function(err, results, fields){
			if (results.length > 0) {
			//if we have results and no errors we continue
			if (!err){
				//Update postlikes
				postlikes = postlikes + 1;
				database.cfg.query('UPDATE posts SET post_likes = ? WHERE post_id = ?', [postlikes, postid], function (err, results, fields) {
					if (err) {
						postmessage = "Upvoting post with ID " + postid + "failed.";
						res.send({ message: postmessage});
					}
				  });
				postmessage = "Upvoting post with ID " + postid + "succeeded.";
				res.send({ message: postmessage});
			} else {
				postmessage = "Upvoting post with ID " + postid + "failed.";
				res.send({ message: postmessage});			}
			}
		});
	} else {
		res.send({ message: 'You need to be logged into to do that'});
	}
});




app.post('/api/downvotepost', function(req, res) {
	let postid = req.body.postid;
	let postlikes = req.body.postlikes;
	let postmessage = "";
	if (req.session.loggedin) {
		// Insert the provided values into respective fields.
		database.cfg.query('SELECT * FROM posts WHERE post_id = ?', [postid], function(err, results, fields){
			if (results.length > 0) {
			//if we have results and no errors we continue
			if (!err){
				//Update postlikes
				postlikes = postlikes - 1;
				database.cfg.query('UPDATE posts SET post_likes = ? WHERE post_id = ?', [postlikes, postid], function (err, results, fields) {
					if (err) {
						postmessage = "Downvoting post with ID " + postid + "failed.";
						res.send({ message: postmessage});
					}
				  });
				postmessage = "Downvoting post with ID " + postid + "succeeded.";
				res.send({ message: postmessage});
			} else {
				postmessage = "Downvoting post with ID " + postid + "failed.";
				res.send({ message: postmessage});			}
			}
		});
	} else {
		res.send({ message: 'You need to be logged into to do that'});
	}
});



app.listen(port, URL);
