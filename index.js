//import mysqlConfig from "./config/config.js"

var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password here',
	database: 'fruits'
});


connection.connect(function(err) {
	if (err) throw err;
	console.log("Connected");
	
	// CRUD - Create, read, update, delete
	
	// Create table element
	/*
	var sql = "INSERT INTO fruitlist (name, weight) VALUES ('Banana', 160)";
	connection.query(sql, function(err, result) {
		if (err) throw err;
		console.log("Added record")
		console.log(result)
	});
	*/

	// Read all elements from table
	/*
	var sql = "SELECT * FROM fruitlist";
	connection.query(sql, function(err, result, fields) {
		if (err) throw err;
		console.log("Retrieved everything")
		console.log(fields)
		console.log(result);
	});
	*/

	// Update and element with a specific name
	/*
	var sql = "UPDATE fruitlist SET weight = 200 WHERE name = 'Banana'";
	connection.query(sql, function(err, result) {
		if (err) throw err;
		console.log(result.affectedRows + " items were updated");
	});
	*/

	// Delete an element with a specific name
	/*
	var sql = "DELETE FROM fruitlist WHERE name = 'Banana'";
	connection.query(sql, function(err, result) {
		if (err) throw err;
		console.log("Removed " + result.affectedRows + " rows");
	});
	*/


});