import React from 'react';


export default function Toast(props) {
	return (
		<div className='ToastOuter'
				 style={props.vis ? {opacity: '1', visibility: 'visible'} : {opacity: '0', visibility: 'hidden'}}>
			<div className='Toast'>
				<span>{props.message}</span>
			</div>
		</div>
	);
};