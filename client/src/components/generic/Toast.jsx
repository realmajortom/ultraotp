import React from 'react';


export default function Toast(props) {
	return (
		<div className='ToastOuter'
				 style={props.vis ? {opacity: '1', visibility: 'visible', zIndex: 1000} : {opacity: '0', visibility: 'hidden', zIndex: '-1'}}>
			<div className='Toast'>
				<span>{props.message}</span>
			</div>
		</div>
	);
};