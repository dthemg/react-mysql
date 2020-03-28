var connection = require("./connection");

 
const Fruit = function(fruit) {
	this.weight = fruit.weight;
	this.name = fruit.name;
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

Fruit.addNew = (newFruit, result) => {
	console.log("Attempting to insert ", {...newFruit});
	connection.query("INSERT INTO fruitlist SET ?", newFruit, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}
		console.log("Created fruit: ", {...newFruit});
		result(null, { ...newFruit }); // How does this work?
	});
};

Fruit.delete = (id, result) => {
	connection.query("DELETE FROM fruitlist WHERE id = ?", id, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			result({ kind: "not_found" }, null);
			return;
		}

		console.log("Deleted fruit with id ", id);
		result(null, res);
	});
};

Fruit.updateById = (id, fruit, result) => {
	connection.query(
		"UPDATE fruitlist SET name = ?, weight = ? WHERE id = ?",
		[fruit.name, fruit.weight, id], 
		(err, res) => {
			if (err) {
				console.log("Error: ", err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				result({ kind: "not_found" }, null)
				return;
			}

			console.log("Updated customer with id ", id);
			result(null, { id: id, ...fruit }); // This row is weird...
		}
	);
};



module.exports = Fruit;