// Import database session authentication information
// and initializaiton functions.
const database = require('./js/dbcfg.js');
//Main Driver JS file
const mysql = require('mysql2');
let sequelize = require('sequelize');
let http = require('http');
//Utilize a special fork of the normal MySQL NPM library
//Didn't feel like reconfiguring the whole SQL server to make this
//work
console.log(" ");
database.InitializeMySQLSession();
console.log('Server spool up succesful, running at http://127.0.0.1:3000/ \n');



//Tests ability to create MySQL session.


http.createServer(function (req, res) {
var html = buildHtml(req);
res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': html.length, 
    'Expires': new Date().toUTCString()
    });
res.end(html);
}).listen(3000, "127.0.0.1");




function buildHtml(req) {
var header = 'Hello World';
var body = 'Something';
var title = 'Something';

// concatenate header string
// concatenate body string

return '<!DOCTYPE html>'
    + '<title>' + title + '</title>' + '<html><head>' 
    + header + '</head><body><h1>' + body + '</h1></body></html>';

};


