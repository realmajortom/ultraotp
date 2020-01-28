import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import QrReader from 'react-qr-reader';
import OTPAuth from 'otpauth';
import axios from 'axios';

import encrypt from '../../crypto/encrypt';
import Alert from '../generic/Alert';
import Form from './Form';


function EntryPage() {
	const [type, setType] = useState('totp');
	const [name, setName] = useState('');
	const [issuer, setIssuer] = useState('');
	const [algo, setAlgo] = useState('SHA1');
	const [digits, setDigits] = useState(6);
	const [period, setPeriod] = useState(30);
	const [secret, setSecret] = useState('');

	const [camSubtitle, setCamSubtitle] = useState('Scanning...');
	const [redirect, setRedirect] = useState(null);
	const [camVis, setCamVis] = useState(null);
	const [message, setMessage] = useState('');


	useEffect(() => {
		const Jwt = localStorage.getItem('JWT');
		const cryptoKey = localStorage.getItem('cryptoKey');

		if (Jwt && cryptoKey) {
			navigator.mediaDevices.getUserMedia({video: true}).then(() => setCamVis(true)).catch(() => {
				setCamVis(false);
			});
		} else {
			localStorage.removeItem('JWT');
			localStorage.removeItem('cryptoKey');
			setRedirect('/');
		}

	}, []);


	async function submit(e) {
		e.preventDefault();
		if (!secret) {
			setMessage('No secret provided. Operation not performed.');
		} else if (!issuer) {
			setMessage('No issuer provided. Operate not performed.');
		} else if (!name) {
			setMessage('No label provided. Operation not performed.');
		} else {
			const key = JSON.parse(localStorage.getItem('cryptoKey'));
			const encSecret = await encrypt(key, secret);
			const encIssuer = await encrypt(key, issuer);
			const encName = await encrypt(key, name);

			axios.post('https://ultraotp.com/api/doc/new', {
					'issuer': {
						'text': encIssuer.text,
						'iv': encIssuer.iv
					},
					'name': {
						'text': encName.text,
						'iv': encName.iv
					},
					'secret': {
						'text': encSecret.text,
						'iv': encSecret.iv
					},
					'type': type,
					'algo': algo,
					'digits': digits,
					'period': period
				},
				{headers: {'Authorization': `JWT ${localStorage.getItem('JWT')}`}}).then(res => {
				if (res.data.success) {
					setRedirect('/list');
				} else {
					setMessage(res.data.message);
				}
			});
		}
	}


	const scanError = () => {
		setCamSubtitle('Camera access must be enabled to scan QR codes.');
	};


	const scanSuccess = data => {
		if (data !== null && data.length > 14) {
			let otpType = data.slice(10, 14);

			if (otpType === 'totp' || otpType === 'hotp') {
				let otpSecret = data.match(/(secret=).+?(?=&)|(secret=)(.+)/i)[0].slice(7);

				if (otpSecret === null) {
					setMessage('Could not parse the OTP secret. Please try manually entering the information.');

				} else {
					let otp = OTPAuth.URI.parse(data);
					setName(otp.label || '');
					setIssuer(otp.issuer || '');
					setSecret(otpSecret);
					setType(otpType || 'totp');
					setAlgo(otp.algorithm || 'SHA1');
					setDigits(otp.digits || 6);
					setPeriod(otp.period || otp.counter || 30);
					setCamVis(false);
				}
			} else {
				setMessage('OTP data not provided. Please try manually entering the information.');
			}
		}
	};


	if (redirect) {
		return <Redirect push to={`${redirect}`}/>;
	} else {

		return (
			<div>

				<Alert close={() => setMessage('')} message={message}/>


				<div className='homeHeader'>
					<h1>New Token</h1>
					<button className='primaryBtn redirectBtn alertBtn cancelBtn'
							onClick={() => setRedirect('list')} style={{marginTop: '10px'}}>Cancel
					</button>
				</div>


				{camVis &&
				<div className='camWrapper'>

					<QrReader
						delay={500}
						facingMode='environment'
						showViewFinder={true}
						onError={() => scanError()}
						onScan={(data) => scanSuccess(data)}
						className='camSection'
						id='camSection'
					/>

					<p>{camSubtitle}</p>

				</div>
				}


				<div className='otpFormWrapper' style={camVis === false ? {display: 'block'} : {display: 'none'}}>

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


				<div className='EntryBtn btnExt'>
					<button className='CircleLink linkExt' onClick={() => setCamVis(!camVis)}>
						{camVis === false
							? <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='#ffffff'>
								<circle cx='12' cy='12' r='3.2'/>
								<path d='M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z'/>
								<path d='M0 0h24v24H0z' fill='none'/>
							</svg>
							: <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='#ffffff'>
								<path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'/>
								<path d='M0 0h24v24H0z' fill='none'/>
							</svg>
						}
						<span className='CircleSpan spanExt spanSmall'>{camVis === false ? ' SCAN' : ' FORM'}</span>
					</button>
				</div>

			</div>
		);
	}
}

export default EntryPage;