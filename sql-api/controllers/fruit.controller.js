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
	// TODO: Validate new request
	if (!req.body) {
		res.status(400).send({
			message: "Content of POST is empty"
		});
	} else {
		console.log("Received: ", { ...req.body })
	}

	// What is up with this body part?
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