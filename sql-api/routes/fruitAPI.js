var express = require('express');
var router = express.Router();
var connection = require('../models/connection');

router.get("/fruitAPI", function(req, res) {
	//res.send("API is working!");


	var sql = "SELECT * FROM fruitlist";
	var res = "";
	connection.query(sql, function(err, result, fields) {
		if (err) throw err;
		console.log("Retrieved everything")
		console.log(fields)
		console.log(result);
		res.send(result);
	});
})

module.exports = router;



// Adjust according to https://bezkoder.com/node-js-rest-api-express-mysql/