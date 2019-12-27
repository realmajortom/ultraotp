const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const users = require('../helpers/firestore').users;
const validateFields = require('../helpers/validate-fields');
const logger = require('../helpers/gcloud-winston-logger');


const router = express.Router();

router.post('/register', (req, res) => {

	const validate = validateFields(req.body.username, req.body.password);

	if (validate.u.valid && validate.p.valid) {

		users.where('username', '==', req.body.username).get().then(snapshot => {

			if (snapshot.empty) {

				bcrypt.hash(req.body.password, 12).then(hash => {

					users.add({
						username: req.body.username,
						password: hash,
						salt: req.body.salt,
						timestamps: {
							login: FieldValue.serverTimestamp(),
							registration: FieldValue.serverTimestamp()
						}
					}).then(ref => {
						const newJWT = jwt.sign({sub: ref.id}, process.env.JWT_SECRET, {expiresIn: '30d'});
						res.json({success: true, JWT: newJWT});
					}).catch(err => {
						logger.error(err, {ip: req.ip});
						res.json({success: false, message: 'An error occurred, please try again.', code: 'u-1'});
					});

				}).catch(err => {
					logger.error(err, {ip: req.ip});
					res.json({success: false, message: 'An error occurred, please try again.', code: 'u-2'});
				});

			} else {
				res.json({success: false, message: 'Username taken, please try again.', code: 'u-3'});
			}
		}).catch(err => {
			logger.error(err, {ip: req.ip});
			res.json({success: false, message: 'An error occurred, please try again.', code: 'u-4'});
		});
	} else {
		res.json({success: false, info: validate});
	}
});


router.post('/login', (req, res) => {

	users.where('username', '==', req.body.username).limit(1).get().then(snapshot => {

		if (snapshot.empty) {
			res.json({success: false, message: 'Invalid username', code: 'u-5'});

		} else {
			snapshot.forEach(doc => {

				bcrypt.compare(req.body.password, doc.data().password).then((result) => {
					if (result) {
						users.doc(doc.id).update({'timestamps.login': FieldValue.serverTimestamp()});
						const newJWT = jwt.sign({sub: doc.id}, process.env.JWT_SECRET, {expiresIn: '30d'});
						res.json({success: true, JWT: newJWT, salt: doc.data().salt});
					} else {
						res.json({success: false, message: 'Incorrect password', code: 'u-6'});
					}
				}).catch(err => {
					logger.error(err, {ip: req.ip});
					res.json({success: false, message: 'An error occurred, please try again.', code: 'u-7'});
				});

			});
		}
	}).catch(err => {
		logger.error(err, {ip: req.ip});
		res.json({success: false, message: 'An error occurred, please try again.', code: 'u-8'});
	});
});


module.exports = router;