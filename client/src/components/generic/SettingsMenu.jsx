import React from 'react';
import {Link} from 'react-router-dom';

export default function SettingsMenu(props) {
    return (
        <div className={'SettingsMenu ' + (props.vis ? 'SettingsMenuVis' : '')}>
            <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
                <li className='menuItem nopadding'>
                    <button onClick={() => props.logout()} className='menuBtn logoutBtn'>Log Out</button>
                </li>
                <li className='menuItem'>
                    <Link to={'/sort'} className='menuLink'>Sort Tokens</Link>
                </li>
            </ul>
        </div>
    )
}