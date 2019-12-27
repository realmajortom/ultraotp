require('dotenv').config();
const passport = require('backend/helpers/passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const users = require('./firestore').users;


const opts = {
	secretOrKey: process.env.JWT_SECRET,
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
	jsonWebTokenOptions: {
		maxAge: '30d'
	}
};


passport.use('jwt', new JwtStrategy(opts, (jwt_payload, done) => {
	users.doc(jwt_payload.sub).get().then(doc => {
		if (!doc.exists) {
			return done(null, false);
		} else {
			return done(null, doc.id);
		}
	}).catch(err => {
		return done(err, false);
	});
}));