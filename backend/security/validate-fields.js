const short = 'must contain at least 4 characters.';
const long = 'must contain less than 120 characters.';

module.exports = function (username, password) {

	let res = {
		u: {
			valid: true,
			message: ''
		},
		p: {
			valid: true,
			message: ''
		}
	};

	if (username.length < 4) {
		res.u.valid = false;
		res.u.message = `Username ${short}`;
	} else if (username.length > 120) {
		res.u.valid = false;
		res.u.message = `Username ${long}`;
	}

	if (password.length < 4) {
		res.p.valid = false;
		res.p.message = `Password ${short}`;
	} else if (password.length > 120) {
		res.p.valid = false;
		res.p.message = `Password ${long};`;
	}

	return res;
};