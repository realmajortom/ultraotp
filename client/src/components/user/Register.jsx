import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Alert from '../generic/Alert';
import getDerivedKey from '../../crypto/get-derived-key';

function Register(props) {
	const Jwt = localStorage.getItem('JWT');
	const storedKey = localStorage.getItem('cryptoKey');

	const [passVis, setPassVis] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConf, setPasswordConf] = useState('');
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState('');


	async function submit(e){
		e.preventDefault();

		if (password === username) {
			setMessage('Username and password must not match. Please update and try again.');
		} else if (password !== passwordConf) {
			setMessage('Master password confirmation must match. Please update and try again.');
		} else if (password.length < 12) {
			setMessage('Master password must contain at least 12 characters.');
		} else {

			const malt = await window.crypto.getRandomValues(new Uint8Array(16));

			axios.post('https://ultraotp.com/api/user/register', {
				username: username,
				password: password,
				malt: String.fromCharCode(...new Uint8Array(malt))
			}).then(async (res) => {

				if (res.data.success) {
					const cryptoKey = await getDerivedKey(password, malt);
					localStorage.setItem('cryptoKey', JSON.stringify(cryptoKey));
					localStorage.setItem('JWT', res.data.JWT);
					setSuccess(true);

				} else if (res.data.info) {
					let newMessage = res.data.info.u.message + '\n' + res.data.info.p.message;
					setMessage(newMessage);

				} else {
					setMessage(res.data.message);
				}
			});
		}
	}


	if (success || (Jwt && storedKey)) {
		return <Redirect push to='/list'/>;
	} else {
		return (
			<div>

				<Alert message={message} close={() => setMessage('')}/>

				<h1>Register</h1>

				<form className='entryForm'>

					<div className='formGroup'>
						<label htmlFor='username'>Create a Username <span>(4 - 120 chars.)</span></label>
						<input
							type='text'
							id='username'
							name='username'
							value={username}
							autoComplete='username'
							spellCheck={false}
							required
							className='primaryInput'
							onChange={e => setUsername(e.target.value)}
						/>
					</div>

					<div className='formGroup'>
						<label htmlFor='password'>Master Password <span>(12 - 120 chars.)</span></label>
						<input
							type={passVis ? 'text' : 'password'}
							id='password'
							name='password'
							value={password}
							autoComplete='new-password'
							spellCheck={false}
							required
							className='primaryInput'
							onChange={e => setPassword(e.target.value)}
						/>
						<small>The master password is used to encrypt and access your tokens. It is critical that you do not forget your master password; there is no way to recover the password in the event that you forget it.</small>
					</div>

					<div className='formGroup'>
						<label htmlFor='passwordConf'>Re-type Master Password <span>(12 - 120 chars.)</span></label>
						<input
							type={passVis ? 'text' : 'password'}
							id='passwordConf'
							name='passwordConf'
							value={passwordConf}
							autoComplete='new-password'
							spellCheck={false}
							required
							className='primaryInput'
							onChange={e => setPasswordConf(e.target.value)}
						/>

						<div className='checkContainer'>
							<input
								type='checkbox'
								id='passCheck'
								name='passCheck'
								onChange={() => setPassVis(!passVis)}
							/>
							<label htmlFor='passCheck'>Show Password</label>
						</div>
					</div>

					<input type='submit' className='primaryBtn userBtn' onClick={e => submit(e)} value='Register'/>

				</form>
			</div>
		);
	}
}

export default Register;
