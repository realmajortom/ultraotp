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

				<header className='homeHeader'>

					<div className='homeTitles'>
						<h1>Ultra OTP</h1>
					</div>

					<nav className='homeLinksWrapper'>
						<Link to='/register' className='primaryBtn alertBtn cancelBtn btnFlex'>Register</Link>
						<Link to='/login' className='primaryBtn alertBtn'>Sign In</Link>
					</nav>

				</header>

				<main>

					<section className='introSection'>
						<h2>Open-Source Two-Factor Authenticator</h2>
						<p><strong>Conveniently and securely access one-time password tokens from any device.</strong></p>
					</section>


					<section>
						<h2>Ultra Flexible</h2>
						<p>Ultra OTP is capable of generating both HMAC-based (HOTP) and time-based (TOTP) one-time passwords and includes advanced configuration options.</p>
						<ul className='postHList'>
							<li>Access from any mobile or desktop browser</li>
							<li>Install on your smartphone as a standalone Progressive Web App</li>
							<li><a href='https://addons.mozilla.org/en-US/firefox/addon/ultra-otp/'
										 target='_blank'
										 rel='noopener noreferrer'>Firefox</a> and <a href='https://chrome.google.com/webstore/detail/ultra-otp/hckclmddjnfcbcmoebpmlhhjafdgjnbe'
																																	target='_blank'
																																	rel='noopener noreferrer'>Chrome</a> extensions available
							</li>
						</ul>
					</section>


					<section>
						<h2>Ultra Secure</h2>
						<p><strong>Zero sensitive information ever leaves your device before being encrypted.</strong><br/>The <a
							href='https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto'
							target='_blank'
							rel='noopener noreferrer'>Web Crypto API</a> is utilized by your computer/phone to encrypt your data before it is sent to the server.
						</p>

						<h3>Saving Tokens</h3>
						<p>When you store a new OTP token, Ultra OTP derives a 256-bit AES encryption key from your master password using the PBKDF2 key derivation function. This key is used to encrypt OTP token data (issuer, account, secret); the encrypted data is finally sent from your device over a secure TLS connection to a cloud database for storage.</p>

						<h3>Accessing Tokens</h3>
						<p>When you log in to Ultra OTP your tokens are transmitted from the database to your device, then decrypted with your master password.</p>

						<h3>Logging In</h3>
						<p>You may notice that your master password is used for both logging in and encryption. In theory I, or an attacker, could secretly log your password when it is sent to the server and use it to decrypt your data.</p>
						<p>To prevent again such an attack, Ultra OTP salts and hashes your master password with your username on your device before it is transmitted to the server. Once the server receives the hashed password, it is salted again with a cryptographically secure random value, hashed again, and stored in a secure database. This process is repeated and hashes are compared every time you log in.
							 The hashing functions that are used are one way hashes--they cannot be reverse engineered to reveal your true master password.</p>

						<h3>Is anything <em>not</em> encrypted?</h3>
						<p className='preListP'>Yes. A handful of fields are not encrypted for functionality and/or performance purposes:</p>
						<ul className='postPList'>
							<li>Username</li>
							<li>
								The following OTP token fields (with potential values listed):
								<ul>
									<li>Algorithm: SHA1, SHA256, SHA512</li>
									<li>Digits: 6, 8</li>
									<li>Time period: 30, 60</li>
									<li>Type: HOTP, TOTP</li>
								</ul>
							</li>
						</ul>
					</section>


					<section>
						<h2>Ultra Private</h2>
						<p className='preListP'>Ultra OTP is built from the ground up to ensure user privacy and security.</p>
						<ul className='postPList'>
							<li>No personal information is needed to create an account</li>
							<li>Zero client-side analytics or tracking tools are in place</li>
							<li>WhO dOeSn'T lOvE CoOkIeS? Me! Zero 3rd party cookies</li>
						</ul>
					</section>

				</main>


				<footer>
					<a href='mailto:thomas@thomasg.dev'>Contact me</a>
					<a href='https://github.com/tggir1/ultraotp' target='_blank' rel='noopener noreferrer'>View code on GitHub</a>
				</footer>

			</div>
		);
	}
}

export default Home;