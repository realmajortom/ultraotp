require('@google-cloud/trace-agent').start();
require('@google-cloud/debug-agent').start();

require('dotenv').config();
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const winston = require('winston');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const {LoggingWinston} = require('@google-cloud/logging-winston');

const doc = require('./routes/doc');
const user = require('./routes/user');


const app = express();
const PORT = process.env.PORT;


const loggingWinston = new LoggingWinston();
const logger = winston.createLogger({
	level: 'info',
	transports: [
		new winston.transports.Console(),
		loggingWinston
	],
});


mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}).catch(err => logger.error(`Database connection error: ${{err}}`));

const db = mongoose.connection;
db.once('open', () => logger.info('Successfully connected to database'));
db.on('error', err => logger.error(`Database runtime error: ${err}`));


app.set('trust proxy', true);
app.use((req, res, next) => {
	if (req.secure) {
		next();
	} else {
		res.redirect('https://' + req.headers.host + req.url);
	}
});


app.use(express.static(path.join(__dirname, 'build')));


app.use(cors());
app.use(helmet());
app.use(bodyParser.json());


const userLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60m
	max: 60,
	onLimitReached: function (req) {
		logger.warn('User limiter reached.', {ip: req.ip, limiter: 'user'});
	}
});

const docLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60m
	max: 120,
	onLimitReached: function (req) {
		logger.warn('Doc limiter reached.', {ip: req.ip, limiter: 'doc'});
	}
});

const homeLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60m
	max: 60,
	onLimitReached: function (req) {
		logger.warn('Home limiter reached.', {ip: req.ip, limiter: 'home'});
	}
});


app.use('/api/user', userLimiter);
app.use('/api/doc', docLimiter);
app.use('/', homeLimiter);


app.use('/api/user', user);
app.use('/api/doc', doc);


app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));