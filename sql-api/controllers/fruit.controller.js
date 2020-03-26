const Fruit = require("../models/fruit.model");

// Retrieve all fruits from database
exports.getAll = (req, res) => {
	Fruit.getAll((err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "getAll error."
			});
		} else {
			res.send(data);
		}
	});
};

// Add new fruit to database
exports.addNew = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content of POST is empty"
		});
	} else {
		console.log("Received: ", { ...req.body })
	}

	const fruit = new Fruit({
		weight: req.body.weight,
		name: req.body.name
	})

	Fruit.addNew(fruit, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "addNew error."
			});
		res.send(data);
		}
	});
};

exports.delete = (req, res) => {
	Fruit.delete(req.params.id, (err, data) => {
		if (err) {
			if (err.kind == "not_found") {
				res.status(404).send({
					message: "Did not find fruit with id " + req.params.id
				});
			} else {
				res.status(500).send({
					message: "Could not delete fruit with id " + req.params.id
				});
			}
		} else {
			res.send({ message: "Deleted fruit" });
		}
	});
};