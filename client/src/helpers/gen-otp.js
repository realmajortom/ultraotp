import OTPAuth from 'otpauth';

export default function genOtp(t, secret) {
	let token;

	if (t.type === 'totp') {
		token = new OTPAuth.TOTP({
			algorithm: t.algo,
			digits: t.digits,
			period: t.period,
			secret: secret
		});
	} else {
		token = new OTPAuth.HOTP({
			algorithm: t.algo,
			digits: t.digits,
			counter: t.period,
			secret: secret
		});
	}

	return token.generate();
}