import React from 'react';
import {Link, Redirect} from 'react-router-dom';


function Home() {
	const Jwt = localStorage.getItem('JWT');

	if (Jwt) {
		return (<Redirect to='/list'/>);
	} else {
		return (
			<div>

				<div className='homeHeader'>

					<div className='homeTitles'>
						<h1>CrossFA</h1>
						<h2>Multi-device 2FA tool</h2>
					</div>

					<nav className='homeLinksWrapper'>
						<Link to='/register' className='primaryBtn' id='registerBtn'>Register</Link>
						<Link to='/login' className='primaryBtn'>Sign In</Link>
					</nav>

				</div>

			</div>
		);
	}
}

export default Home;