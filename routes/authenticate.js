const express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');

const secret = 'THIS_IS_A_VERY_SIMPLE_SECRET';

router.post('/', async function(req, res) {
	let authBody = req.body;
	let findUser = await userModel.findOne({ username: authBody.username }, (err, res) => res);

	let comparePassword = await bcrypt.compareSync(authBody.password, findUser.password, (err, res) => res);

	if (comparePassword) {
		return res.status(200).json({
			token: jwt.sign({ id: findUser._id }, secret, { expiresIn: '1d' })
		});
	} else {
		return res.status(400).json({
			error: { message: 'Password is invalid' }
		});
	}

	res.json({});
});

module.exports = router;
