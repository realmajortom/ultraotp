const express = require('express');
const passport = require('passport');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const tokens = require('../helpers/firestore').tokens;
require('../helpers/passport');
const logger = require('../helpers/gcloud-winston-logger');

const router = express.Router();
router.use(passport.initialize());


router.get('/tokens', (req, res) => {
	passport.authenticate('jwt', {session: false}, (err, user) => {

		if (err) {
			logger.error(err, {ip: req.ip});
			return res.json({success: false, message: 'An error occurred, please try again.', code: 't-1'});

		} else if (user) {

			tokens.where('owner', '==', user).get().then(snapshot => {
				if (snapshot.empty) {
					return res.json({success: true, tokens: []});
				} else {
					let userTokenArray = [];
					snapshot.forEach(doc => {
						const data = doc.data();
						userTokenArray.push({
							id: doc.id,
							name: data.name,
							issuer: data.issuer,
							secret: data.secret,
							type: data.type,
							algo: data.algo,
							digits: data.digits,
							period: data.period
						});
					});
					return res.json({success: true, tokens: userTokenArray});
				}
			}).catch(err => {
				logger.error(err, {ip: req.ip});
				return res.json({success: false, message: 'An error occurred, please try again.', code: 't-2'});
			});

		} else {
			return res.json({success: false, message: 'An authorization error occurred, please try again.', code: 't-3'});
		}

	})(req, res);
});


router.post('/new', (req, res) => {
	passport.authenticate('jwt', {session: false}, (err, user) => {

		if (err) {
			logger.error(err, {ip: req.ip});
			return res.json({success: false, message: 'An error occurred, please try again.', code: 't-4'});

		} else if (user) {

			let data = req.body;
			tokens.add({
				owner: user,
				name: {text: data.name.text, iv: data.name.iv},
				issuer: {text: data.issuer.text, iv: data.issuer.iv},
				secret: {text: data.secret.text, iv: data.secret.iv},
				type: data.type ? data.type : 'totp',
				algo: data.algo ? data.algo : 'SHA1',
				digits: data.digits ? data.digits : 6,
				period: data.period ? data.period : data.type === 'htop' ? 0 : 30,
				timestamps: {
					updated: null,
					created: FieldValue.serverTimestamp()
				}
			}).then(ref => {
				return res.json({success: true});
			}).catch(err => {
				logger.error(err, {ip: req.ip});
				return res.json({success: false, message: 'An error occurred, please try again.', code: 't-5'});
			});

		} else {
			return res.json({success: false, message: 'An authorization error occurred, please try again.', code: 't-6'});
		}

	})(req, res);
});


router.post('/delete/:id', (req, res) => {
	passport.authenticate('jwt', {session: false}, (err, user) => {

		if (err) {
			logger.error(err, {ip: req.ip});
			return res.json({success: false, message: 'An error occurred, please try again.', code: 't-7'});

		} else if (user) {

			tokens.doc(req.params.id).get().then(doc => {
				if (!doc.exists) {
					return res.json({success: false, message: 'Token not found in database. Operation failed.', code: 't-8a'});
				} else {
					const token = doc.data();
					if (token.owner === user) {
						tokens.doc(req.params.id).delete().then(() => {
							return res.json({success: true});
						}).catch(err => {
							logger.error(err, {ip: req.ip});
							return res.json({success: false, message: 'Error deleting token, please try again.', code: 't-8b'});
						});
					} else {
						logger.warn('Unauthorized operation attempted', {
							userId: user,
							operation: 'Delete token',
							tokenId: req.params.id,
							ip: req.ip
						});
						return res.json({success: false, message: 'Unauthorized operation.', code: 't-8c'});
					}
				}
			}).catch(err => {
				logger.error(err, {ip: req.ip});
				return res.json({success: false, message: 'Error deleting token, please try again.', code: 't-9a'});
			});

		} else {
			return res.json({success: false, message: 'An authorization error occurred, please try again.', code: 't-9'});
		}
	})(req, res);
});


router.get('/token/:id', (req, res) => {
	passport.authenticate('jwt', {session: false}, (err, user) => {

		if (err) {
			logger.error(err, {ip: req.ip});
			return res.json({success: false, message: 'An error occurred, please try again.', code: 't-10'});

		} else if (user) {

			tokens.doc(req.params.id).get().then(doc => {
				if (!doc.exists) {
					return res.json({success: false, message: 'Requested token not found.', code: 't-11'});
				} else {

					const token = doc.data();

					if (token.owner === user) {
						return res.json({
							success: true,
							token: {
								id: doc.id,
								name: token.name,
								issuer: token.issuer,
								secret: token.secret,
								type: token.type,
								algo: token.algo,
								digits: token.digits,
								period: token.period
							}
						});
					} else {
						logger.warn('Unauthorized operation attempted', {
							userId: user,
							operation: 'Get token',
							tokenId: req.params.id,
							ip: req.ip
						});
						return res.json({success: false, message: 'Unauthorized operation.', code: 't-11b'});
					}

				}
			}).catch(err => {
				logger.error(err, {ip: req.ip});
				return res.json({success: false, message: 'Error getting token, please try again.', code: 't-12'});
			});

		} else {
			return res.json({success: false, message: 'An authorization error occurred, please try again.', code: 't-13'});
		}
	})(req, res);
});


router.post('/update/:id', (req, res) => {
	passport.authenticate('jwt', {session: false}, (err, user) => {

		if (err) {
			logger.error(err, {ip: req.ip});
			return res.json({success: false, message: 'An error occurred, please try again.', code: 't-14'});

		} else if (user) {

			tokens.doc(req.params.id).get().then(doc => {
				if (!doc.exists) {
					return res.json({success: false, message: 'Token not found in database. Operation failed.', code: 't-15'});
				} else {
					const token = doc.data();
					if (token.owner === user) {
						tokens.doc(req.params.id).update(req.body).then(() => {
							tokens.doc(req.params.id).update({'timestamps.updated': FieldValue.serverTimestamp()});
							return res.json({success: true});
						}).catch(err => {
							logger.error(err, {ip: req.ip});
							return res.json({success: false, message: 'Error updating token, please try again.', code: 't-16'});
						});
					} else {
						logger.warn('Unauthorized operation attempted', {
							userId: user,
							operation: 'Update token',
							tokenId: req.params.id,
							ip: req.ip
						});
						return res.json({success: false, message: 'Unauthorized operation.', code: 't-17'});
					}
				}
			}).catch(err => {
				logger.error(err, {ip: req.ip});
				return res.json({success: false, message: 'Error deleting token, please try again.', code: 't-18'});
			});

		} else {
			return res.json({success: false, message: 'An authorization error occurred, please try again.', code: 't-19'});
		}

	})(req, res);
});


module.exports = router;

