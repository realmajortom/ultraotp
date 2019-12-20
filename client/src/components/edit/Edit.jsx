import React, {useState, useEffect} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import axios from 'axios';

import Alert from '../generic/Alert';
import Form from '../create/Form';
import decrypt from '../../crypto/decrypt';
import encrypt from '../../crypto/encrypt';


export default function Edit() {
	const {id} = useParams();

	const [cancel, setCancel] = useState(null);
	const [message, setMessage] = useState('');
	const [loaded, setLoaded] = useState(false);
	const [digits, setDigits] = useState('');
	const [issuer, setIssuer] = useState('');
	const [period, setPeriod] = useState('');
	const [secret, setSecret] = useState('');
	const [type, setType] = useState('');
	const [name, setName] = useState('');
	const [algo, setAlgo] = useState('');


	async function setEncryptedItems(key, secret, issuer, name) {
		const decSecret = await decrypt(key, secret.text, secret.iv);
		const decIssuer = await decrypt(key, issuer.text, issuer.iv);
		const decName = await decrypt(key, name.text, name.iv);
		setSecret(decSecret);
		setIssuer(decIssuer);
		setName(decName);
	}


	useEffect(() => {
		if (localStorage.getItem('JWT') && localStorage.getItem('JWT')) {
			axios.get(`https://ultraotp.com/api/doc/token/${id}`, {headers: {'Authorization': `JWT ${localStorage.getItem('JWT')}`}}).then(res => {
				if (res.data.success) {
					const t = res.data.token;
					const cryptoKey = JSON.parse(localStorage.getItem('cryptoKey'));
					setEncryptedItems(cryptoKey, t.secret, t.issuer, t.name);

					setDigits(t.digits);
					setPeriod(t.period);
					setType(t.type);
					setAlgo(t.algo);
					setLoaded(true);
				} else {
					setMessage(res.data.message);
				}
			});
		} else {
			setCancel(true);
		}
	}, [id]);


	async function submit(e) {
		e.preventDefault();

		if (!secret) {
			setMessage('No secret provided. Operation not performed.');
		} else if (!issuer) {
			setMessage('No issuer provided. Operate not performed.');
		} else if (!name) {
			setMessage('No label provided. Operation not performed.');
		} else {
			const cryptoKey = JSON.parse(localStorage.getItem('cryptoKey'));
			const encSecret = await encrypt(cryptoKey, secret);
			const encIssuer = await encrypt(cryptoKey, issuer);
			const encName = await encrypt(cryptoKey, name);

			axios.post(`https//ultraotp.com/api/doc/update/${id}`, {
				digits: digits,
				period: period,
				type: type,
				algo: algo,
				issuer: {
					text: encIssuer.text,
					iv: encIssuer.iv
				},
				name: {
					text: encName.text,
					iv: encName.iv
				},
				secret: {
					text: encSecret.text,
					iv: encSecret.iv
				}
			},{headers: {'Authorization': `JWT ${localStorage.getItem('JWT')}`}}).then(res => {
				if (res.data.success) {
					setCancel(true);
				} else {
					setMessage(res.data.message);
				}
			});
		}
	}


	const deleteToken = () => {
		if (window.confirm('Are you sure you want to delete this token?')) {
			axios.post(`https://ultraotp.com/api/doc/delete/${id}`, null, {headers: {'Authorization': `JWT ${localStorage.getItem('JWT')}`}}).then(res => {
				if (res.data.success) {
					setCancel(true);
				} else {
					setMessage(res.data.message);
				}
			});
		}
	};


	if (cancel || !id) {
		return (
			<Redirect to='/list'/>
		);
	} else {
		return (
			<div>

				<Alert message={message} close={() => setMessage('')}/>

				<div className='homeHeader'>
					<h1>Edit</h1>

					<div className='homeLinksWrapper linkFlexRight'>
						<button className='primaryBtn alertBtn cancelBtn btnFlex' onClick={() => setCancel(true)}>Cancel</button>
						<button className='primaryBtn logoutBtn' onClick={() => deleteToken()}>Delete Token</button>
					</div>
				</div>


				<div className='otpFormWrapper' style={loaded ? {display: 'block'} : {display: 'none'}}>

					<Form
						algo={algo}
						digits={digits}
						issuer={issuer}
						name={name}
						period={period}
						secret={secret}
						type={type}
						submit={submit}
						setIssuer={setIssuer}
						setName={setName}
						setSecret={setSecret}
						setType={setType}
						setPeriod={setPeriod}
						setDigits={setDigits}
						setAlgo={setAlgo}
					/>

				</div>


			</div>
		);
	}
}