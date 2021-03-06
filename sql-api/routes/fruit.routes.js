var express = require('express');
var router = express.Router();
var connection = require('../models/connection');
const fruit = require('../controllers/fruit.controller.js');

router.get("/getAll", fruit.getAll);

router.post("/addNew", fruit.addNew);

router.delete("/delete/:id", fruit.delete);

router.put("/update/:id", fruit.updateById);

module.exports = router;


// Adjust according to https://bezkoder.com/node-js-rest-api-express-mysql/