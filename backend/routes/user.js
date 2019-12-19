const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user-model');
const Doc = require('../models/doc-model');
const genErr = require('./error-messages').gen;
const validateFields = require('../security/validate-fields');


const router = express.Router();


router.post('/register', (req, res) => {

	const validate = validateFields(req.body.username, req.body.password);

	if (validate.u.valid && validate.p.valid) {

		User.findOne({username: req.body.username}, (err, user) => {

			if (err) {
				console.log(err);
				res.json(genErr);
			} else if (user) {
				res.json({success: false, message: 'Username not available.'});
			} else {

				bcrypt.hash(req.body.password, 12, (err, hash) => {

					if (err) {
						console.log(err);
						res.json(genErr);
					} else {

						User.create({username: req.body.username, password: hash, malt: req.body.malt}, (err, user) => {
							if (err) {
								console.log(err);
								res.json(genErr);
							} else {

								User.findOne({username: user.username}).then(user => {

									Doc.create({user: user._id, tokens: []});

									const newJWT = jwt.sign({
										sub: user._id
									}, process.env.JWT_SECRET, {expiresIn: '30d'});

									res.json({success: true, JWT: newJWT});

								});
							}

						});
					}
				});
			}
		});

	} else {
		res.json({success: false, info: validate});
	}
});


router.post('/login', (req, res) => {

	User.findOne({username: req.body.username}, (err, user) => {

		if (err) {
			console.log(err);
			res.json(genErr);
		} else if (!user) {
			res.json({success: false, message: 'Invalid username'});
		} else {

			bcrypt.compare(req.body.password, user.password, (err, response) => {
				if (err) {
					console.log(err);
					res.json(genErr);
				} else if (response === false) {
					res.json({success: false, message: 'Incorrect password'});
				} else {
					const newJWT = jwt.sign({
						sub: user._id
					}, process.env.JWT_SECRET, {expiresIn: '30d'});
					res.json({success: true, JWT: newJWT, malt: user.malt});
				}

			});
		}
	});
});


module.exports = router;