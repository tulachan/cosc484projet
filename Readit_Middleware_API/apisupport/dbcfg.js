//This file is full of special constants the website needs to 
//Work don't modify unless you know what you're doing.


//Database connection
//For obvious reason you're gonna have to fill this out
var mysql = require('mysql');
var cfg = mysql.createConnection({
    host : "98.117.196.205",
    user : "coscnonrootuser",
    password : "delta",
    database : "cosc484"
});

//Intialize MySQL session. If you end the connection
//you're gonna have to call it again to open the 
//database connection back up.
function InitializeMySQLSession(){
    cfg.connect(function(err) {
        if (err){
            console.log("Test connection to GRAVEYARD database server failed!! Please check dbcfg.js or contact database admin.");
            console.log("The application will not behave properly without the database connection. Quitting now....");
            process.exit();
        return;
        }
        console.log("Connection to COSC484 project database server successfully created!");
    });
};

module.exports = {cfg,  InitializeMySQLSession};