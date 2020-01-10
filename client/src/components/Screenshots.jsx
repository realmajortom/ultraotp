import React from 'react';
import {Link} from 'react-router-dom';

export default function Screenshots() {
	return (
		<div>

			<header className='homeHeader'>
				<div className='homeTitles'><h1>Guide</h1></div>

				<nav className='homeLinksWrapper'>
					<Link to='/' className='primaryBtn alertBtn cancelBtn'>Back</Link>
				</nav>
			</header>

			<main>

				<section className='screenshotSection'>
					<h2>Add Ultra OTP to homescreen</h2>
					<p>Ultra OTP is a Progressive Web App, which means it can function like a native app on your device! The app takes up very little space (&lt;2mb), updates automatically, and uses little data.</p>

					<div className='ssMultiWrapper'>
						<div className='ssImgWrapper'>
							<p>Android</p>
							<img src='https://ultraotp.com/nocache/media/add-to-hs_android.gif'
									 alt='Add to Homescreen on Android'
									 className='ssImg'/>
						</div>

						<div className='ssImgWrapper'>
							<p>iPhone</p>
							<img src='https://ultraotp.com/nocache/media/add-to-hs_iphone.gif'
									 alt='Add to Homescreen on iPhone'
									 className='ssImg ssImgIphone'/>
						</div>
					</div>
				</section>


				<section className='screenshotSection'>
					<h2>Add a token</h2>

					<div className='ssImgWrapper'>
						<p>If your token issuer provides a QR code for generating tokens, simply tap the <em>Scan</em> button at the bottom of the home page to open the scanner. Ultra OTP will request permission to use your device's camera. You can also manually enter the provided secret by hitting the <em>Form</em> button.
						</p>
						<img src='https://ultraotp.com/nocache/media/scanning.png' alt='QR Scanner' className='ssImg'/>
					</div>

					<div className='ssLargeMultiWrapper followUp'>
						<p>After scanning, the entry form will open, so you can confirm the details. I recommend entering the account username or email address in the <em>Label</em> field. For advanced configuration, click on <em><span
							style={{whiteSpace: 'nowrap'}}>More Options</span></em>.</p>

						<div className='ssMultiWrapper'>
							<div className='ssImgWrapper'>
								<img src='https://ultraotp.com/nocache/media/entry-form.png' alt='Entry Form' className='ssImg'/>
							</div>
							<div className='ssImgWrapper'>
								<img src='https://ultraotp.com/nocache/media/entry-form-advanced.png'
										 alt='Advanced Entry Options'
										 className='ssImg'/>
							</div>
						</div>
					</div>
				</section>


				<section className='screenshotSection'>
					<h2>Token list</h2>

					<div className='ssMultiWrapper'>
						<div className='ssImgWrapper'>
							<p>Tap token to copy code</p>
							<img src='https://ultraotp.com/nocache/media/copy-token.gif'
									 alt='Tap token to copy to clipboard'
									 className='ssImg'/>
						</div>

						<div className='ssImgWrapper'>
							<p>Drag token left to edit</p>
							<img src='https://ultraotp.com/nocache/media/edit-token.gif'
									 alt='Slide token to the left to edit'
									 className='ssImg'/>
						</div>
					</div>

				</section>


			</main>

		</div>
	);
}