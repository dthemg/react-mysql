var connection = require("./connection");

// Constructor
const Fruit = function(fruit) {
	this.weight = fruit.weight;
	this.name = fruit.name;
	this.id = fruit.id;
}

Fruit.create = (newFruit, result) => {
	connection.query("INSERT INTO fruitlist SET ?", newFruit, (err, res) => {
		if (err) throw err;
		console.log("Created new fruit");
	});
}


Fruit.getAll = result => {
	connection.query("SELECT * FROM fruitlist", (err, res) => {
		if (err) throw err;
		console.log("GetAll results: ", res);
	})
}