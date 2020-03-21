
module.exports = function(app, connection) {
	app.get('/', function(req, res) {
		var sql = "SELECT * FROM fruitlist";
			connection.query(sql, function(err, result, fields) {
				if (err) throw err;
				console.log("Retrieved everything")
				console.log(fields)
				console.log(result);
		});
		res.send("Starting point here");
	});
};