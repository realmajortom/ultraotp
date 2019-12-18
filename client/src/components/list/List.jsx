import React, {useState, useEffect, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import EntryBtn from '../create/EntryBtn';
import Alert from '../generic/Alert';
import Toast from '../generic/Toast';
import Token from './Token';
import JwtContext from '../../App';

const API = axios.create({
	baseURL: 'http://192.168.1.111:8080/api/doc',
	headers: {'Authorization': `JWT ${localStorage.getItem('JWT')}`}
});


function List() {
	const Jwt = useContext(JwtContext);

	const [tokens, setTokens] = useState([]);
	const [redirect, setRedirect] = useState(null);
	const [message, setMessage] = useState('');
	const [toastVis, setToastVis] = useState(false);


	const logout = () => {
		localStorage.removeItem('JWT');
		setRedirect('/');
	};


	useEffect(() => {
		if (!Jwt !== null) {
			API.get('/tokens').then(res => {
				if (res.data.success) {
					setTokens(res.data.tokens);
				} else {
					setMessage(res.data.message);
				}
			});
		}
	}, [Jwt]);


	const toastControl = () => {
		setToastVis(true);
		setTimeout(() => {
			setToastVis(false);
		}, 2000);
	};


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
					{tokens.map(t => <li key={t._id}><Token token={t} complete={() => toastControl()}/></li>)}
				</ul>

				<EntryBtn/>
			</div>
		);

	}
}

export default List;