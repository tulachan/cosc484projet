//This file is full of special constants the website needs to 
//Work don't modify unless you know what you're doing.


//Database connection
//For obvious reason you're gonna have to fill this out
var mysql = require('mysql');
var cfg = mysql.createConnection({
    host : "192.168.1.219",
    user : "cosc484",
    password : "delta",
    database : "graveyard"
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
        console.log("Connection to GRAVEYARD database server successfully created!");
        console.log('Server spool up succesful, running at http://127.0.0.1:3000/ \n');
    });
};

module.exports = {cfg,  InitializeMySQLSession};