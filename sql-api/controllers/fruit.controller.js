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