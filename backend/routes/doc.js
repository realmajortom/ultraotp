const express = require('express');
const passport = require('passport');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const logger = require('../helpers/gcloud-winston-logger');
const tokens = require('../helpers/firestore').tokens;
const users = require('../helpers/firestore').users;
require('../helpers/passport');

const router = express.Router();
router.use(passport.initialize());


router.post('/update-order', (req, res) => {
	passport.authenticate('jwt', {session: false}, (err, user) => {

		if (err) {
			logger.error(err, {ip: req.ip});
			return res.json({success: false, message: 'An error occurred, please try again.', code: 'order-01'});

		} else if (user) {

			users.doc(user)
				.update({tokenOrder: req.body.newOrder})
				.then(() => {
					return res.json({success: true});
				})
				.catch(err => {
					logger.error(err, {ip: req.ip});
					return res.json({
						success: false,
						message: 'An error occurred, please try saving again.',
						code: 'order-02'
					});
				});

		} else {
			return res.json({
				success: false,
				message: 'An authorization error occurred, please try again.',
				code: 'order-03'
			});
		}

	})(req, res);
});


router.get('/tokens', (req, res) => {
	passport.authenticate('jwt', {session: false}, (err, user) => {

		if (err) {
			logger.error(err, {ip: req.ip});
			return res.json({success: false, message: 'An error occurred, please try again.', code: 'tokens-01'});

		} else if (user) {

			let tokenOrder = [];

			users.doc(user).get().then(doc => {
				if (!doc.exists) {
					logger.error('Error finding user for token sort operation.');
				} else {
					let userDoc = doc.data();
					tokenOrder = userDoc.tokenOrder;
				}
			}).catch(err => {
				logger.error(err, {ip: req.ip});
			});

			tokens.where('owner', '==', user).get().then(snapshot => {
				if (snapshot.empty) {
					return res.json({success: true, tokens: []});
				} else {
					let unsortedTokens = [];
					let sortedTokens = [];

					snapshot.forEach(doc => {
						const data = doc.data();
						unsortedTokens.push({
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

					if (tokenOrder.length > 0) {
						for (let i = 0; i < tokenOrder.length; i++) {
							let index = unsortedTokens.findIndex(t => t.id === tokenOrder[i]);
							if (index >= 0) {
								sortedTokens.push(unsortedTokens[index]);
								unsortedTokens.splice(index, 1);
							}
						}
						sortedTokens = sortedTokens.concat(unsortedTokens);
					} else {
						sortedTokens = unsortedTokens;
					}

					return res.json({success: true, tokens: sortedTokens});
				}
			}).catch(err => {
				logger.error(err, {ip: req.ip});
				return res.json({success: false, message: 'An error occurred, please try again.', code: 'tokens-02'});
			});

		} else {
			return res.json({
				success: false,
				message: 'An authorization error occurred, please try again.',
				code: 'tokens-03'
			});
		}

	})(req, res);
});


router.post('/new', (req, res) => {
	passport.authenticate('jwt', {session: false}, (err, user) => {

		if (err) {
			logger.error(err, {ip: req.ip});
			return res.json({success: false, message: 'An error occurred, please try again.', code: 'new-01'});

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
				return res.json({success: false, message: 'An error occurred, please try again.', code: 'new-02'});
			});

		} else {
			return res.json({
				success: false,
				message: 'An authorization error occurred, please try again.',
				code: 'new-03'
			});
		}

	})(req, res);
});


router.post('/delete/:id', (req, res) => {
	passport.authenticate('jwt', {session: false}, (err, user) => {

		if (err) {
			logger.error(err, {ip: req.ip});
			return res.json({success: false, message: 'An error occurred, please try again.', code: 'delete-01'});

		} else if (user) {

			tokens.doc(req.params.id).get().then(doc => {
				if (!doc.exists) {
					return res.json({
						success: false,
						message: 'Token not found in database. Operation failed.',
						code: 'delete-02'
					});
				} else {
					const token = doc.data();

					if (token.owner === user) {
						tokens.doc(req.params.id).delete().then(() => {
							return res.json({success: true});
						}).catch(err => {
							logger.error(err, {ip: req.ip});
							return res.json({
								success: false,
								message: 'Error deleting token, please try again.',
								code: 'delete-03'
							});
						});

					} else {
						logger.warn('Unauthorized operation attempted', {
							userId: user,
							operation: 'Delete token',
							tokenId: req.params.id,
							ip: req.ip
						});
						return res.json({success: false, message: 'Unauthorized operation.', code: 'delete-04'});
					}
				}
			}).catch(err => {
				logger.error(err, {ip: req.ip});
				return res.json({
					success: false,
					message: 'Error deleting token, please try again.',
					code: 'delete-05'
				});
			});

		} else {
			return res.json({
				success: false,
				message: 'An authorization error occurred, please try again.',
				code: 'delete-06'
			});
		}
	})(req, res);
});


router.get('/token/:id', (req, res) => {
	passport.authenticate('jwt', {session: false}, (err, user) => {

		if (err) {
			logger.error(err, {ip: req.ip});
			return res.json({success: false, message: 'An error occurred, please try again.', code: 'single-01'});

		} else if (user) {

			tokens.doc(req.params.id).get().then(doc => {
				if (!doc.exists) {
					return res.json({success: false, message: 'Requested token not found.', code: 'single-02'});
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
						return res.json({success: false, message: 'Unauthorized operation.', code: 'single-03'});
					}

				}
			}).catch(err => {
				logger.error(err, {ip: req.ip});
				return res.json({success: false, message: 'Error getting token, please try again.', code: 'single-04'});
			});

		} else {
			return res.json({
				success: false,
				message: 'An authorization error occurred, please try again.',
				code: 'single-05'
			});
		}
	})(req, res);
});


router.post('/update/:id', (req, res) => {
	passport.authenticate('jwt', {session: false}, (err, user) => {

		if (err) {
			logger.error(err, {ip: req.ip});
			return res.json({success: false, message: 'An error occurred, please try again.', code: 'update-01'});

		} else if (user) {

			tokens.doc(req.params.id).get().then(doc => {
				if (!doc.exists) {
					return res.json({
						success: false,
						message: 'Token not found in database. Operation failed.',
						code: 'update-02'
					});
				} else {
					const token = doc.data();
					if (token.owner === user) {
						tokens.doc(req.params.id).update(req.body).then(() => {
							tokens.doc(req.params.id).update({'timestamps.updated': FieldValue.serverTimestamp()});
							return res.json({success: true});
						}).catch(err => {
							logger.error(err, {ip: req.ip});
							return res.json({
								success: false,
								message: 'Error updating token, please try again.',
								code: 'update-03'
							});
						});
					} else {
						logger.warn('Unauthorized operation attempted', {
							userId: user,
							operation: 'Update token',
							tokenId: req.params.id,
							ip: req.ip
						});
						return res.json({success: false, message: 'Unauthorized operation.', code: 'update-04'});
					}
				}
			}).catch(err => {
				logger.error(err, {ip: req.ip});
				return res.json({
					success: false,
					message: 'Error deleting token, please try again.',
					code: 'update-05'
				});
			});

		} else {
			return res.json({
				success: false,
				message: 'An authorization error occurred, please try again.',
				code: 'update-06'
			});
		}

	})(req, res);
});


module.exports = router;

