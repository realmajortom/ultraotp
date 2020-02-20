import React from 'react';
import {withRouter} from 'react-router-dom';
import exportTokens from "../../helpers/exportTokens";

function SettingsMenu(props) {


    function goToSort() {
        props.history.push('/sort');
    }


    return (
        <div className={'SettingsMenu ' + (props.vis ? 'SettingsMenuVis' : '')}>
            <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>

                <li className='menuItem'>
                    <button onClick={() => props.logout()} className='menuBtn logoutBtn'>Log Out</button>
                </li>

                <li className='menuItem'>
                    <button onClick={() => exportTokens()} className='menuBtn'>Export Tokens</button>
                </li>

                <li className='menuItem'>
                    <button onClick={() => goToSort()} className='menuBtn'>Sort Tokens</button>
                </li>

            </ul>
        </div>
    )
}


export default withRouter(SettingsMenu);
