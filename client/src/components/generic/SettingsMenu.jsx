import React from 'react';
import {Link} from 'react-router-dom';

export default function SettingsMenu(props) {
    return (
        <div className='SettingsMenu' style={props.vis ? {display: 'block'} : {display: 'none'}}>
            <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
                <li>
                    <Link to={'/sort'} className='menuItem'>Sort Tokens</Link>
                </li>
            </ul>
        </div>
    )
}