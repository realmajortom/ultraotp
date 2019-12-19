const mongoose = require('mongoose');


const tokenSchema = new mongoose.Schema({
		'name': {
			text: {type: String, required: true},
			iv: {type: String, required: true}
		},
		'issuer': {
			text: {type: String, required: true},
			iv: {type: String, required: true}
		},
		'secret': {
			"text": {type: String, required: true},
			"iv": {type: String, required: true}
		},
		'type': {type: String, trim: true, required: true, default: 'totp'},
		'algo': {type: String, trim: true, required: true, default: 'SHA1'},
		'digits': {type: Number, trim: true, required: true, default: 6},
		'period': {type: Number, trim: true, required: true, default: 30}
	},
	{
		timestamps: true
	});


tokenSchema.pre('validate', function (next) {
	if (this.type === null || this.type === '') {
		this.type = 'totp';
	}
	if (this.algo === null || this.algo === '') {
		this.algo = 'SHA1';
	}
	if (this.digits === null) {
		this.digits = 6;
	}
	if (this.period === null) {
		this.period = 30;
	}
	next();
});


const docSchema = new mongoose.Schema({
		user: String,
		tokens: [tokenSchema]
	},
	{
		timestamps: true,
		collection: 'docs'
	});


module.exports = mongoose.model('Doc', docSchema);