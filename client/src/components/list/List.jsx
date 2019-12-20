import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import EntryBtn from '../create/EntryBtn';
import Alert from '../generic/Alert';
import Toast from '../generic/Toast';
import Token from './Token';


function List() {
	const [tokens, setTokens] = useState([]);
	const [redirect, setRedirect] = useState(null);
	const [message, setMessage] = useState('');
	const [toastVis, setToastVis] = useState(false);
	const [seconds, setSeconds] = useState(0);


	function getTokens() {
		axios.get('https://ultraotp.com/api/doc/tokens', {headers: {'Authorization': `JWT ${localStorage.getItem('JWT')}`}}).then(res => {
			if (res.data.success) {
				setTokens(res.data.tokens);
				localStorage.setItem('lastUpdate', Date.now());
			} else {
				setMessage(res.data.message);
			}
		});
	}


	useEffect(() => {
		let tickerSeconds = 0;

		var updateTicker = setInterval(() => {
				tickerSeconds++;
				setSeconds(tickerSeconds);
		}, 1000);

		return function cleanup() {
			clearInterval(updateTicker);
		}

	}, []);



	useEffect(() => {
		const Jwt = localStorage.getItem('JWT');
		const cryptoKey = localStorage.getItem('cryptoKey');

		if (Jwt && cryptoKey) {
			getTokens();
		} else {
			localStorage.removeItem('JWT');
			localStorage.removeItem('cryptoKey');
			setRedirect('/');
		}
	}, []);


	useEffect(() => {
		if (toastVis) {
			var toastTimeout = setTimeout(() => {
				setToastVis(false);
			}, 2000);
		}

		return function cleanup() {
			clearTimeout(toastTimeout);
		};
	}, [toastVis]);


	function logout() {
		localStorage.removeItem('JWT');
		localStorage.removeItem('cryptoKey');
		setRedirect('/');
	}


	if (redirect) {
		return <Redirect to={redirect}/>;
	} else {
		return (
			<div>

				<Alert close={() => setMessage('')} message={message}/>

				<Toast message='Copied!' vis={toastVis}/>

				<div className='homeHeader'>
					<h1>Ultra OTP</h1>
					<button className='primaryBtn logoutBtn redirectBtn' onClick={() => logout()}>Log Out</button>
				</div>

				<ul className='tokenList'>
					{tokens.map((t, i) =>
						<li key={t._id}><Token token={t} seconds={seconds} complete={() => setToastVis(true)} index={i}/></li>)}
				</ul>

				<EntryBtn/>
			</div>
		);

	}
}

export default List;