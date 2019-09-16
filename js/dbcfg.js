//This file is full of special constants the website needs to 
//Work don't modify unless you know what you're doing.


//Database connection
//For obvious reason you're gonna have to fill this out
var mysql = require('mysql2');
var session = mysql.createConnection({
    host : "98.117.196.205",
    user : "cosc484",
    password : "delta",
    database : 'graveyard'
});

//Intialize MySQL session. If you end the connection
//you're gonna have to call it again to open the 
//database connection back up.
function InitializeMySQLSession(){
    session.connect(function(err) {
        if (err){
            console.log("Connection to GRAVEYARD database server failed!! Please check dbcfg.js or contact database admin.");
            console.log("The application will not behave properly without the database connection. Quitting now....");
            process.exit();
        return;
        }
        console.log("Connection to GRAVEYARD database server successfully created! \n");
    });
};

module.exports = {session,  InitializeMySQLSession};