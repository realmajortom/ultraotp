import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import OTPAuth from 'otpauth';
import {Line} from 'rc-progress';

import decrypt from '../../crypto/decrypt'


const genOtp = (t, secret) => {
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
};


const getTimeUsed = (epoch, step) => {
	return Math.floor(epoch / 1000) % step;
};


const getTimeRemaining = (epoch, step) => {
	return step - getTimeUsed(epoch, step);
};



function Token(props) {
	const t = props.token;
	const cryptoKey = JSON.parse(props.cryptoKey);
	const [code, setCode] = useState(null);
	const [id, setId] = useState(null);
	const [secret, setSecret] = useState(null);
	const [timeRemaining, setTimeRemaining] = useState('');


	useEffect(() => {
		async function getSecret() {
			const decSecret = await decrypt(cryptoKey, t.secret.text, t.secret.iv);
			setSecret(decSecret);
		}
		getSecret();
	},[cryptoKey, t]);


	useEffect( () => {
		if (secret) {
			setCode(genOtp(t, secret));
		}

		if (t.type === 'totp' && secret) {
			let secondsRemaining = getTimeRemaining(Date.now(), t.period);
			setTimeRemaining(secondsRemaining);

			var updateInterval = setInterval(() => {
				if (secondsRemaining === 1) {
					secondsRemaining = t.period;
					setCode(genOtp(t, secret));
				} else {
					secondsRemaining -= 1;
				}
				setTimeRemaining(secondsRemaining);
			}, 1000);
		}

		if (t.type !== 'totp' && secret) {
			setTimeRemaining(null);
		}

		return function cleanup() {
			clearInterval(updateInterval);
		};

	}, [secret, t]);


	const copy = () => {
		navigator.clipboard.writeText(code).then(() => props.complete());
	};


	if (id) {
		return (<Redirect push to={`/edit/${id}`}/>);
	} else {
		return (
			<div className='Token' onClick={() => copy()} onDoubleClick={() => setId(t._id)}>

				<div className='tokenInfo'>
					<p className='tIssuer'>{t.issuer}</p>
					<p className='tLabel'>{t.name}</p>
				</div>

				<div className='tokenCode'>
					<h2>{code}</h2>

					{timeRemaining &&
					<div className='lineContainer'>
						<Line
							percent={(timeRemaining / t.period) * 100}
							strokeWidth={1}
							strokeColor='rgba(50, 232, 117, 0.4)'
							trailWidth={1}
							trailColor='#eeeeee'
						/>
					</div>
					}
				</div>

			</div>
		);
	}
}

export default Token;
