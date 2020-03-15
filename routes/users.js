var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');

/* GET users listing. */
router.get('/', async (req, res, next) => {
	const userList = await userModel.find();
	console.log('userList', userList);
	res.status(200).json({ data: [...userList] });
});

router.post('/', async (req, res, next) => {
	let userData = { ...req.body };
	userData.password = await bcrypt.hashSync(userData.password, 10, (err, hash) => {
		if (err) {
			return res.status(400).json(err);
		}
		return hash;
	});
	console.log('userData.password', userData.password);
	const newUser = new userModel({ ...userData });

	await newUser.save(function(err, result) {
		if (err) {
			return res.status(400).json(err);
		}
		return res.json({ message: 'User Posted', data: { ...req.body } });
	});
});

module.exports = router;
