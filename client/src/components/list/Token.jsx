import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import EditIcon from './EditIcon';
import LineContainer from './LineContainer';
import decrypt from '../../crypto/decrypt';
import genOtp from '../../helpers/gen-otp';
import '../../styles/swipeable.css';

function getTimeRemaining(epoch, step) {
	return step - (Math.floor(epoch / 1000) % step);
}

function Token(props) {
	const t = props.token;
	const [id, setId] = useState(null);
	const [code, setCode] = useState(null);
	const [secret, setSecret] = useState(null);
	const [issuer, setIssuer] = useState(null);
	const [name, setName] = useState(null);
	const [timeRemaining, setTimeRemaining] = useState('');


	useEffect(() => {
		const cryptoKey = JSON.parse(localStorage.getItem('cryptoKey'));

		async function setEncryptedItems() {
			const decSecret = await decrypt(cryptoKey, t.secret.text, t.secret.iv);
			const decIssuer = await decrypt(cryptoKey, t.issuer.text, t.issuer.iv);
			const decName = await decrypt(cryptoKey, t.name.text, t.name.iv);
			setSecret(decSecret);
			setIssuer(decIssuer);
			setName(decName);
		}

		setEncryptedItems();
	},[t]);


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


	const copy = (code) => {
		navigator.clipboard.writeText(code).then(() => props.complete());
	};

	const handleSwipe = () => {
		window.navigator.vibrate([10, 80, 10]);
		setTimeout(() => {
			setId(t._id)
		}, 120);
	};

	if (id) {
		return (<Redirect push to={`/edit/${id}`}/>);
	} else if (secret && issuer && name) {
		return (
			<SwipeableList swipeStartThreshold={10} threshold={0.3}>
				<SwipeableListItem
					swipeLeft={{
						content: <EditIcon />,
						action: () => handleSwipe()
					}}
				>
				<div className='Token' onClick={() => copy(code)}>

					<div className='tokenInfo'>
						<p className='tIssuer'>{issuer}</p>
						<p className='tLabel'>{name}</p>
					</div>

					<div className='tokenCode'>
						<h2>{code}</h2>
						{timeRemaining && <LineContainer timeRemaining={timeRemaining} period={t.period} />}
					</div>

				</div>
				</SwipeableListItem>
			</SwipeableList>
		);
	} else {
		return <div></div>
	}
}

export default Token;
