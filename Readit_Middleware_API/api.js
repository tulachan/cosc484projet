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
                                             
// Create sub-readit using a post request.
app.post('/api/newpost', function(req, res) {
	postauthor = req.body.username;
	//Just send theses in the body.
	postbody = req.body.postbody;
	posttitle = req.body.posttitle;
	postsubreadit = req.body.postsubreadit
	//If not logged in can't create subreddit.
	if (req.session.loggedin) {
		database.cfg.query('SELECT * FROM subreadits WHERE subreadit_name = ?', [postsubreadit], function(err, results, fields){
			if(results[0] == null){
				res.send({ message: 'Failed to post'});
			} else {		
				console.log(results);
			database.cfg.query('INSERT INTO posts (post_body, post_title, post_subreadit, post_author) VALUES (? ,?,?,?)'
			,[postbody, posttitle, postsubreadit, postauthor], function(err, results, fields) {
				if (!err){
					res.send({ message: 'Post successfuly created!'});
				} else {
					console.log(err);
					res.send({ message: 'Failed to post'});
				}
			});
			}
		});
	} else {
			res.send({ message: 'You need to be logged in to do that.'});
	}
	});

//Displays top posts on whole site with a start at 1000 likes.
app.post('/api/topposts', function(req, res) {
	let likerange = req.body.like_range
	database.cfg.query('SELECT * FROM posts WHERE post_likes >= ?', [likerange], function(err, results, fields){
		if(results.length == 0){
			res.send({ message: 'Failed to get top posts'});
		} else {
			res.send(results);
		}
	});
});

//Displays post of a specific ID.
app.post('/api/displaypostbyid', function(req, res) {
	let postid = req.body.post_id;
	database.cfg.query('SELECT * FROM posts WHERE post_id = ?', [postid], function(err, results, fields){
		if(results.length == 0){
			res.send({message: 'Failed to find post'});
		} else {
			res.send(results);
		}
	});
});

//Displays post of a specific user.
app.post('/api/displaypostbyauthor', function(req, res) {
	let postauthor = req.body.post_author;
	database.cfg.query('SELECT * FROM posts WHERE post_author = ?', [postauthor], function(err, results, fields){
		if(results.length == 0){
			res.send({message: 'Failed to find posts by this user'});
		} else {
			console.log(results.length);
			res.send(results);
		}
	});
});



//Displays the subreadit
app.post('/api/displaysubreadit', function(req, res) {    
	let subreaditname = req.body.subreadit_name
	database.cfg.query('SELECT * FROM posts WHERE post_subreadit = ?', [subreaditname], function(err, results, fields){
		if(err){
			res.send({message: 'Failed to get subreadit posts'});
		} else {
			console.log(results[0]);
			res.send(results);
		}
	});
});


//Creates new subreadit and makes the creator a moderator on said subreadit.
app.post('/api/newsubreadit', function(req, res) {
	let subreaditmod = req.body.username;
	let subreaditname = req.body.subreaditname
	//If not logged in can't create subreddit.
	if (req.session.loggedin) {
			database.cfg.query('INSERT INTO subreadits (subreadit_name, subreadit_moderatorname) VALUES (? ,?)'
				,[subreaditname, subreaditmod], function(err, results, fields) {
					if (!err){
						res.send({ message: 'Subreadit successfuly created!'});
					} else {
						res.send({ message: 'Failed to create subreadit'});
					}
				});
			}
});

//Displays subreadit info
app.post('/api/displaysubreaditinfo', function(req, res) {    
	let subreaditname = req.body.subreadit_name
	database.cfg.query('SELECT * FROM subreadits WHERE subreadit_name = ?', [subreaditname], function(err, results, fields){
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
		if (username && password) {
			//How you send MySQL queries to the database.
			database.cfg.query('SELECT * FROM accounts WHERE account_username = ? AND account_password = ?', [username, password], function(err, results, fields){
				if (results.length != 0) {
					req.session.loggedin = true;
					req.session.username = username;
					res.send({ message: 'Login succesful, welcome ' + req.session.username});
					//Redirects us to the home path
				} else {
					res.send({ message: 'Invalid password or username' });
				}			
			});
		} else {
			//No password
			res.send({ message: 'Please enter a user name and password' });
		}
	
});

// addUser function to add the given details in database
app.post('/api/registernewuser', function(req, res) {
	let firstname = req.body.firstname;
	let lastname = req.body.lastname;
	let username = req.body.username;
	let password = req.body.password;
	let email = req.body.email;
	let securityquestion = req.body.securityquestion;
	let securityanswer = req.body.securityanswer;
	if (username && password) {
		// Insert the provided values into respective fields.
		database.cfg.query('INSERT INTO accounts (account_username, account_password, account_email, account_firstname, account_lastname, account_resetquestion, account_resetanswer) VALUES (? , ?, ?, ?, ?,?,?)'
		,[username, password, email, firstname, lastname, securityquestion, securityanswer], function(err, results, fields) {
			if (!err){
				res.send({ message: 'Account successfuly created!'});
				console.log("New user created");
				console.log("Password: " + password);
				console.log("Username: " + username);
				
			} else {
				res.send({ message: 'Something went wrong, account probably exists' });
			}
		});
	} else {
		//No password
		res.send({ message: 'Please enter Username and Password.'});
	}
});

//Upvotes a post
app.post('/api/upvotepost', function(req, res) {
	let postid = req.body.post_id;
	let postmessage = "";
	if (req.session.loggedin) {
		// Insert the provided values into respective fields.
		database.cfg.query('SELECT * FROM posts WHERE post_id = ?', [postid], function(err, results, fields){
			if (results[0] != null) {
			let postlikes = results[0].post_likes + 1;
			//if we have results and no errors we continue
			if (!err){
				//Update postlikes

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
				res.send({ message: postmessage});			
			}
		

			
		}

		});
	} else {
		res.send({ message: 'You need to be logged into to do that'});
	}
});


app.post('/api/downvotepost', function(req, res) {
		let postid = req.body.post_id;
		let postmessage = "";
		if (req.session.loggedin) {
			// Insert the provided values into respective fields.
			database.cfg.query('SELECT * FROM posts WHERE post_id = ?', [postid], function(err, results, fields){
				if (results[0] != null) {
				let postlikes = results[0].post_likes - 1;
				//if we have results and no errors we continue
				if (!err){
					//Update postlikes
					database.cfg.query('UPDATE posts SET post_likes = ? WHERE post_id = ?', [postlikes, postid], function (err, results, fields) {
						if (err) {
							postmessage = "Down post with ID " + postid + " failed.";
							res.send({ message: postmessage});
						}
					  });
					postmessage = "Down post with ID " + postid + " succeeded.";
					res.send({ message: postmessage});
				} else {
					postmessage = "Down post with ID " + postid + " failed.";
					res.send({ message: postmessage});			
				}
	}
	
	});
		} else {
			res.send({ message: 'You need to be logged into to do that'});
		}
	});

//Delete a post
app.post('/api/deletepost', function(req, res) {
	let postid = req.body.post_id;
	let username = req.session.username;
	let postmessage = "";
	if (req.session.loggedin) {
		// Insert the provided values into respective fields.
		database.cfg.query('SELECT * FROM posts WHERE post_id = ?', [postid], function(err, results, fields){
			if (results.length > 0 && username == results[0].post_author) {
			//if we have results and no errors we continue
			if (!err){
				database.cfg.query('DELETE FROM posts WHERE post_id = ?', [postid], function (err, results, fields) {
					if (err) {
						postmessage = "Deleting post with ID " + postid + " failed.";
						res.send({ message: postmessage});
					} else {
						postmessage = "Deleting post with ID " + postid + " succeeded.";
						res.send({ message: postmessage});
					}
				  });

			} else {
				postmessage = "Deleting post with ID " + postid + "failed.";
				res.send({ message: postmessage});			
			}
			
			} else {
				res.send({ message: 'You are not allowed to do that'});
			}
		});
	} else {
		res.send({ message: 'You need to be logged into to do that'});
	}
});

app.post('/api/resetpassword', function(req, res) {
	username = req.body.username;
	answer = req.body.answer;
	newpassword = req.body.newpassword;
		database.cfg.query('SELECT * FROM accounts WHERE account_username = ?', [username], function(err, results, fields){
			if(results[0] == null){
				res.send({ message: 'Failed to find account'});
			} else {		
				console.log(results);
				if(answer == results[0].account_resetanswer){
					database.cfg.query('UPDATE accounts SET account_password = ? WHERE account_id = ?', [newpassword, results[0].account_id], function (err, results, fields) {
						if (!err){
							res.send({ message: 'Password succesfully updated'});
						} else {
							res.send({ message: 'Failed to update password'});
						}
					});
				} else {
							res.send({ message: 'Incorrect answer for security question, password will not be changed'});
				}

			}
		});
	});


	app.post('/api/displaysecurityquestion', function(req, res) {
		username = req.body.username;
			database.cfg.query('SELECT * FROM accounts WHERE account_username = ?', [username], function(err, results, fields){
				if(results[0] == null){
					res.send({ message: 'Failed to find account'});
				} else {		
					res.send({ message: results[0].account_resetquestion});
				}
					
			});
		});
	




	



app.listen(port, URL);
