import React, {useState, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import JwtContext from '../../App';
import API from '../../helpers/user-api';
import Alert from '../generic/Alert';

import exportKey from '../../crypto/export-key';


function Login(props) {
	const Jwt = useContext(JwtContext);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState('');


	function submit(e) {
		e.preventDefault();

		API.post('/login', {username: username, password: password}).then(async (res) => {
			if (res.data.success) {

				const key = await exportKey(password);
				localStorage.setItem('cryptoKey', key);

				localStorage.setItem('JWT', res.data.JWT);
				props.setJwt(res.data.JWT);
				setSuccess(true);

			} else {
				setMessage(res.data.message);
			}
		});
	};


	if (success || Jwt) {
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
							autoComplete='new-password'
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
