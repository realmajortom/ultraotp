import React from 'react';
import {Line} from "rc-progress";

export default function LineContainer(props) {
	return (
		<div className='lineContainer'>
			<Line
				percent={(props.timeRemaining / props.period) * 100}
				strokeWidth={1}
				strokeColor='rgba(50, 232, 117, 0.4)'
				trailWidth={1}
				trailColor='#eeeeee'
			/>
		</div>
	)
}