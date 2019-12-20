import React from 'react';
import {Line} from "rc-progress";

export default function LineContainer(props) {
	const num = props.num;

	return (
		<div className='lineContainer'>
			<Line
				percent={num >= 1 ? ((props.num / props.den) * 100) : 1}
				strokeWidth={1}
				strokeColor='rgba(50, 232, 117, 0.4)'
				trailWidth={1}
				trailColor='#eeeeee'
			/>
		</div>
	)
}