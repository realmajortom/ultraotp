import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import EntryBtn from '../create/EntryBtn';
import Alert from '../generic/Alert';
import Toast from '../generic/Toast';
import Token from './Token';
import Gear from "../generic/Gear";
import SettingsMenu from "../generic/SettingsMenu";


function List() {
	const [tokens, setTokens] = useState([]);
	const [forceUpdate, setForceUpdate] = useState(0);
	const [lastUpdate, setLastUpdate] = useState(0);
	const [redirect, setRedirect] = useState(null);
	const [message, setMessage] = useState('');
	const [toastVis, setToastVis] = useState(false);
	const [menuVis, setMenuVis] = useState(false);
	const [seconds, setSeconds] = useState(0);


	document.addEventListener("visibilitychange", function () {
		let timeDiff = Date.now() - lastUpdate;
		if (document.visibilityState === 'visible' && timeDiff > 20000) {
			setForceUpdate(forceUpdate + 1);
		}
	});


	function getTokens() {
		axios.get('https://ultraotp.com/api/doc/tokens', {headers: {'Authorization': `JWT ${localStorage.getItem('JWT')}`}}).then(res => {
			if (res.data.success) {
				setTokens(res.data.tokens);
				setLastUpdate(Date.now());
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

				<div className={'anon ' + (menuVis ? 'anonVis' : '')} onClick={() => setMenuVis(false)}>

				</div>

				<Alert close={() => setMessage('')} message={message}/>

				<Toast message='Copied!' vis={toastVis}/>

				<div className='homeHeader'>
					<h1>Ultra OTP</h1>

					<div className='homeLinksWrapper linkFlexRight'>
						<button className='gearWrapper' onClick={() => setMenuVis(!menuVis)}><Gear/></button>
					</div>

					<SettingsMenu vis={menuVis} close={() => setMenuVis(false)} logout={() => logout()}/>
				</div>

				<ul className='tokenList'>
					{tokens.map((t, i) =>
						<li key={t.id}><Token token={t} seconds={seconds} complete={() => setToastVis(true)} index={i}
											  forceUpdate={forceUpdate}/></li>)}
				</ul>

				<EntryBtn/>
			</div>
		);

	}
}

export default List;