import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import OTPAuth from 'otpauth';
import {Line} from 'rc-progress';


const genOtp = (t) => {
	let token;

	if (t.type === 'totp') {
		token = new OTPAuth.TOTP({
			algorithm: t.algo,
			digits: t.digits,
			period: t.period,
			secret: t.secret
		});
	} else {
		token = new OTPAuth.HOTP({
			algorithm: t.algo,
			digits: t.digits,
			counter: t.period,
			secret: t.secret
		});
	}

	let otp = token.generate();

	return otp;
};


const totpTimeUsed = (epoch, step) => {
	return Math.floor(epoch / 1000) % step;
};


const timeRemaining = (epoch, step) => {
	return step - totpTimeUsed(epoch, step);
};



function Token(props) {
	const t = props.token;
	const [code, setCode] = useState(genOtp(t));
	const [expiration, setExpiration] = useState('');
	const [id, setId] = useState(null);


	useEffect(() => {
		if (t.type === 'totp') {
			let expSecs = timeRemaining(Date.now(), t.period);
			setExpiration(expSecs);

			let newCode;

			var updateInterval = setInterval(() => {
				if (expSecs === 1) {
					expSecs = t.period;
					newCode = genOtp(t);
					setCode(newCode);
				} else {
					expSecs -= 1;
				}
				setExpiration(expSecs);
			}, 1000);
		} else {
			setExpiration(null);
		}

		return function cleanup() {
			clearInterval(updateInterval);
		};
	}, [t]);


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

					{expiration &&
					<div className='lineContainer'>
						<Line
							percent={(expiration / t.period) * 100}
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
