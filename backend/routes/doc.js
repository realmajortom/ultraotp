const express = require('express');
const passport = require('passport');

const Doc = require('../models/doc-model');
require('../security/passport');

const errorMsg = require('./error-messages');
const authErr = errorMsg.auth;
const genErr = errorMsg.gen;

const router = express.Router();
router.use(passport.initialize());


router.get('/tokens', (req, res) => {
	passport.authenticate('jwt', {session: false}, (err, user) => {

		if (err) {
			console.log(err);
			return res.json(genErr);
		} else if (user) {

			Doc.findOne({user, user}, (err, doc) => {
				if (err) {
					console.log(err);
					return res.json(genErr);
				} else {
					return res.json({success: true, tokens: doc.tokens});
				}
			});

		} else {
			return res.json(authErr);
		}

	})(req, res);
});


router.post('/new', (req, res) => {
	passport.authenticate('jwt', {session: false}, (err, user) => {

		if (err) {
			console.log(err);
			return res.json(genErr);
		} else if (user) {

			Doc.findOne({user: user}, (err, doc) => {
				if (err) {return res.json(genErr);} else {

					doc.tokens.push(req.body);

					doc.save((err, doc) => {
						if (err) {
							console.log(err);
							return res.json(genErr);
						} else {
							return res.json({success: true, tokens: doc.tokens});
						}
					});
				}
			});

		} else {
			return res.json(authErr);
		}

	})(req, res);
});


router.post('/delete/:id', (req, res) => {
	passport.authenticate('jwt', {session: false}, (err, user) => {

		if (err) {
			console.log(err);
			return res.json(genErr);
		} else if (user) {

			Doc.findOne({user, user}, (err, doc) => {
				if (err) {
					console.log(err);
					return res.json(genErr);
				} else {
					const toDelete = doc.tokens.id(req.params.id);
					if (toDelete) {
						toDelete.remove();
						doc.save((err, doc) => {
							if (err) {
								console.log(err);
								return res.json(genErr);
							} else {
								return res.json({success: true});
							}
						});
					} else {
						return res.json({success: false, message: 'Cannot delete a non-existent token.'});
					}
				}
			});
		} else {
			return res.json(authErr);
		}
	})(req, res);
});


router.get('/token/:id', (req, res) => {
	passport.authenticate('jwt', {session: false}, (err, user) => {
		if (err) {
			console.log(err);
			return res.json(genErr);
		} else if (user) {

			Doc.findOne({user, user}, (err, doc) => {
				if (err) {
					console.log(err);
					return res.json(genErr);
				} else {
					const token = doc.tokens.id(req.params.id);
					if (token) {
						return res.json({success: true, token: token});
					} else {
						return res.json({success: false, message: 'Requested item not found.'});
					}
				}
			});

		} else {
			return res.json(authErr);
		}
	})(req, res);
});


router.post('/update/:id', (req, res) => {
	passport.authenticate('jwt', {session: false}, (err, user) => {

		if (err) {
			console.log(err);
			return res.json(genErr);
		} else if (user) {

			Doc.findOne({user, user}, (err, doc) => {

				if (err) {
					console.log(err);
					return res.json(genErr);
				} else {

					const toUpdate = doc.tokens.id(req.params.id);

					if (toUpdate) {
						toUpdate.set(req.body);
						doc.save((err, doc) => {
							if (err) {
								console.log(err);
								return res.json(genErr);
							} else {
								return res.json({success: true});
							}
						});
					} else {
						return res.json({success: false, message: 'Cannot update a non-existent token.'});
					}
				}
			});

		} else {
			return res.json(authErr);
		}

	})(req, res);
});


router.get('/timeout', (req, res) => {
	passport.authenticate('jwt', {session: false}, (err, user) => {
		if (err) {
			return res.json({success: false, timeout: true});
		} else if (user) {
			return res.json({success: true, timeout: false});
		} else {
			return res.json({success: false, timeout: true});
		}
	})(req, res);
});


module.exports = router;

