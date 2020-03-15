const express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');

router.post('/', async function(req, res) {
	let authBody = req.body;
	let findUser = await userModel.findOne({ username: authBody.username }, (err, res) => res);

	let comparePassword = await bcrypt.compareSync(authBody.password, findUser.password, (err, res) => res);

	console.log('COMPARISON', comparePassword);

	res.json({
		message: 'AUTH TOKEN'
	});
});

module.exports = router;
