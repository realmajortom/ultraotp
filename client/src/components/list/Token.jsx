import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import EditIcon from './EditIcon';
import LineContainer from './LineContainer';
import decrypt from '../../crypto/decrypt';
import genOtp from '../../helpers/gen-otp';
import '../../swipeable.css';


function getTimeRemaining(epoch, step) {
	return step - (Math.floor(epoch / 1000) % step);
}

function Token(props) {
	const t = props.token;
	const seconds = t.type === 'totp' ? props.seconds : null;
	const [id, setId] = useState(null);
	const [name, setName] = useState(null);
	const [code, setCode] = useState(null);
	const [secret, setSecret] = useState(null);
	const [issuer, setIssuer] = useState(null);
	const [timeRemaining, setTimeRemaining] = useState(null);


	useEffect(() => {
		const cryptoKey = JSON.parse(localStorage.getItem('cryptoKey'));

		async function setEncryptedItems() {
			const decSecret = await decrypt(cryptoKey, t.secret.text, t.secret.iv);
			const decIssuer = await decrypt(cryptoKey, t.issuer.text, t.issuer.iv);
			const decName = await decrypt(cryptoKey, t.name.text, t.name.iv);
			setCode(genOtp(t, decSecret));
			setSecret(decSecret);
			setIssuer(decIssuer);
			setName(decName);
		}

		if (t.type === 'totp') {
			setTimeRemaining(getTimeRemaining(Date.now(), t.period));
		}

		setEncryptedItems();
	},[t]);


	useEffect(() => {
		if (seconds) {
			setTimeRemaining(c => c - 1);
		}
	}, [seconds]);


	useEffect(() => {
		if (secret && timeRemaining <= 1) {
			let newCode = genOtp(t, secret);

			if (newCode !== code) {
				setCode(newCode);
				setTimeRemaining(t.period);
			}

		}
	}, [timeRemaining, t, secret, code]);


	const copy = (code) => {
		navigator.vibrate(3);
		navigator.clipboard.writeText(code).then(() => props.complete());
	};


	const handleSwipe = () => {
		navigator.vibrate([5, 60, 5]);
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
						{timeRemaining >= 0 && <LineContainer num={timeRemaining} den={t.period} />}
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
