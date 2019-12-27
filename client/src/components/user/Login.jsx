import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Alert from '../generic/Alert';
import getDerivedKey from '../../crypto/get-derived-key';


function Login(props) {
	const Jwt = localStorage.getItem('Jwt');
	const storedKey = localStorage.getItem('cryptoKey');

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState('');


	function submit(e) {
		e.preventDefault();

		axios.post('https://ultraotp.com/api/user/login', {username: username, password: password}).then(async (res) => {
			if (res.data.success) {
				const cryptoKey = await getDerivedKey(password, Uint8Array.from([...res.data.salt].map(ch => ch.charCodeAt())));
				localStorage.setItem('cryptoKey', JSON.stringify(cryptoKey));
				localStorage.setItem('JWT', res.data.JWT);
				setSuccess(true);
			} else {
				setMessage(res.data.message);
			}
		});
	}


	if (success || (Jwt && storedKey)) {
		return <Redirect push to='/list'/>;
	} else {
		return (
			<div>

				<Alert message={message} close={() => setMessage('')}/>

				<h1>Login</h1>

				<form className='entryForm'>

					<div className='formGroup'>
						<label htmlFor='username'>Username</label>
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
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							value={password}
							autoComplete='current-password'
							spellCheck={false}
							required
							className='primaryInput'
							onChange={e => setPassword(e.target.value)}
						/>
					</div>

					<input type='submit' className='primaryBtn userBtn' onClick={e => submit(e)} value='Sign In'/>

				</form>
			</div>
		);
	}
}

export default Login;
