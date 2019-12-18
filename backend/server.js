require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./routes/user');
const doc = require('./routes/doc');


const express = require('express');

const app = express();

const PORT = process.env.PORT;


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}).catch(error => console.log(`Initial connection error: ${{error}}`));

const db = mongoose.connection;
db.once('open', () => console.log('Successfully connected to database'));
db.on('error', err => console.error.bind(console, `Database runtime error: ${err}`));


app.use('/api/user', user);
app.use('/api/doc', doc);


app.get('/*', (req, res) => {
	res.json({message: 'Invalid endpoint'});
});


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));