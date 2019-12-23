import React from 'react';
import {makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';


const ColorLinearProgress = withStyles({
	colorPrimary: {
		backgroundColor: '#eeeeee',
	},
	barColorPrimary: {
		backgroundColor: 'rgba(50, 232, 117, 0.5)',
	},
	root: {
		borderRadius: '10px'
	},
	bar: {
		borderRadius: '10px'
	}
})(LinearProgress);

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: '2px',
		height: '2px',
		borderRadius: '10px'
	}
}));


export default function LineContainer(props) {
	const num = props.num;
	const classes = useStyles();

	return (
		<div className='lineContainer' >
			{/*<Line*/}
			{/*	style={{width: '50px'}}*/}
			{/*	percent={num >= 1 ? ((props.num / props.den) * 100) : 1}*/}
			{/*	strokeWidth={1}*/}
			{/*	strokeColor='rgba(50, 232, 117, 0.4)'*/}
			{/*	trailWidth={1}*/}
			{/*	trailColor='#eeeeee'*/}
			{/*/>*/}
			<ColorLinearProgress variant="determinate" className={classes.root} value={num >= 1 ? ((props.num / props.den) * 100) : 1} />
		</div>
	)
}