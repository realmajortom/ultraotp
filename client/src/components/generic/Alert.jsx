import React from 'react';

function Alert(props) {
	const message = props.message;

	return (
		<div className={'Alert ' + (message.length > 0 ? 'AlertVis' : 'AlertHidden')} onClick={() => props.close()}>

			<h3 style={{margin: 0, padding: 0, textDecoration: 'underline', color: '#ffffff'}}>Error</h3>
			<p style={{margin: '5px 0', padding: 0, color: '#ffffff', fontWeight: '600'}}>{message}</p>

		</div>
	);
}

export default Alert;