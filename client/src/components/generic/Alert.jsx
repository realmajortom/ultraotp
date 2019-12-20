import React from 'react';

const backdropStyle = {
	zIndex: 10,
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100vw',
	height: '100vh',
	backgroundColor: 'rgba(0,0,0,0.7)'
};

const messageWrapperStyle = {
	zIndex: 11,
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100vw',
	height: '100vh',
	display: 'flex',
	flexFlow: 'column',
	alignItems: 'center',
	justifyContent: 'center'
};

const messageStyle = {
	zIndex: 12,
	width: 'calc(96% - 40px)',
	maxWidth: '460px',
	padding: '10px 20px',
	borderRadius: '10px',
	boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
};

const btnWrapper = {
	width: '100%',
	display: 'flex',
	justifyContent: 'flex-end'
};

const Alert = (props) => {
	const message = props.message;

	return (
		<div className='Alert' style={message.length > 0 ? {display: 'block'} : {display: 'none'}}>

			<div style={backdropStyle}></div>

			<div style={messageWrapperStyle}>
				<div style={messageStyle} className='alertBox'>
					<h2>Message</h2>
					<p>{message}</p>
					<div style={btnWrapper}>
						<button onClick={() => props.close()} className='primaryBtn alertBtn'>Ok</button>
					</div>
				</div>
			</div>

		</div>
	);
};

export default Alert;