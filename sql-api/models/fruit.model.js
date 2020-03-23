var connection = require("./connection");

// Constructor
const Fruit = function(fruit) {
	this.weight = fruit.weight;
	this.name = fruit.name;
	this.id = fruit.id;
};


Fruit.getAll = result => {
	connection.query("SELECT * FROM fruitlist", (err, res) => {
		if (err) {
			console.error("Error: ", err);
			result(null, err);
			return;
		}
		console.log("GetAll results: ", res);
		result(null, res);
	});
};

module.exports = Fruit;