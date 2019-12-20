require('@google-cloud/trace-agent').start();
require('@google-cloud/profiler').start();
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
logger.error('Winston error!');
logger.info('Winston info');


mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}).catch(error => console.log(`Initial connection error: ${{error}}`));
const db = mongoose.connection;
db.once('open', () => console.log('Successfully connected to database'));
db.on('error', err => console.error.bind(console, `Database runtime error: ${err}`));


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


const apiLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60m
	max: 180,
	message: 'Too many API requests, please try again later.'
});

const genLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60m
	max: 60,
	message: 'Too many requests, please try again later.'
});

app.use('/api/', apiLimiter);
app.use('/*', genLimiter);


app.use('/api/user', user);
app.use('/api/doc', doc);


app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));