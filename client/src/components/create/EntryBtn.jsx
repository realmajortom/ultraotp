import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {useScrollPosition} from '@n8tb1t/use-scroll-position';


function EntryBtn(props) {
	const [ext, setExt] = useState(true);

	useScrollPosition(
		({prevPos, currPos}) => {
			const show = (currPos.y > prevPos.y) && (currPos.y > -40);
			if (show !== ext) {
				setExt(show);
			}
		}, [ext], null, false, 300);

	return (
		<div className={'EntryBtn ' + (ext ? 'btnExt' : '')}>

			<Link className={'CircleLink ' + (ext ? 'linkExt' : '')} to='/new'>
				<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
					<path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' fill='#ffffff'/>
					<path d='M0 0h24v24H0z' fill='none'/>
				</svg>
				<span className={'CircleSpan ' + (ext ? 'spanExt' : '')}> CREATE</span> </Link>

		</div>
	);
}

export default EntryBtn;
