import React from 'react';
import LineContainer from "./LineContainer";

export default function TokenTile(props) {
    const delay = (props.index * .075);

    return (
        <div className='Token fade-in' onClick={() => props.copy(props.code)} style={{animationDelay: `${delay}s`}}>

            <div className='tokenInfo'>
                <p className='tIssuer'>{props.issuer}</p>
                <p className='tLabel'>{props.name}</p>
            </div>

            <div className='tokenCode'>
                <h2>{props.code}</h2>
                {props.timeRemaining >= 0 && <LineContainer num={props.timeRemaining} den={props.period}/>}
            </div>

        </div>
    )
}