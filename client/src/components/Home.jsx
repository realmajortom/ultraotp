import React from 'react';
import {Link, Redirect} from 'react-router-dom';


function Home() {
	const Jwt = localStorage.getItem('JWT');
	const cryptoKey = localStorage.getItem('cryptoKey');

	if (Jwt && cryptoKey) {
		return (<Redirect to='/list'/>);
	} else {
		return (
			<div>

				<div className='homeHeader'>

					<div className='homeTitles'>
						<h1>Firestore OTP</h1>
					</div>

					<nav className='homeLinksWrapper'>
						<Link to='/register' className='primaryBtn alertBtn cancelBtn btnFlex'>Register</Link>
						<Link to='/login' className='primaryBtn alertBtn'>Sign In</Link>
					</nav>

				</div>

			</div>
		);
	}
}

export default Home;