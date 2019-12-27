require('dotenv').config();
const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
	projectId: 'ultraotp',
	keyFilename: 'firestore_credentials.json'
});

const users = db.collection('users');

const tokens = db.collection('tokens');


exports.users = users;
exports.tokens = tokens;