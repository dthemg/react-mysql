
mysql = require('mysql');

const mysqlConfig = require('./config/config');
const express = require("express");

var connection = mysql.createConnection(mysqlConfig);
connection.connect(function(err) {
	if (err) throw err;
	console.log("Connected");
});

const PORT = process.env.PORT || 3000;

const app = express();
require('./routes/html-routes')(app, connection);

/* Start express server */
app.listen(PORT, () => {
	console.log('Express running on port: ' + PORT);
})