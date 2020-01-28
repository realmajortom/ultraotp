import React, {useEffect, useState} from 'react';
import {Draggable} from 'react-beautiful-dnd';
import decrypt from '../../crypto/decrypt';

export default function SortingToken(props) {
    const t = props.data;
    const [issuer, setIssuer] = useState('');
    const [label, setLabel] = useState('');


    useEffect(() => {
        const cryptoKey = JSON.parse(localStorage.getItem('cryptoKey'));

        async function setEncryptedItems() {
            const decIssuer = await decrypt(cryptoKey, t.issuer.text, t.issuer.iv);
            const decLabel = await decrypt(cryptoKey, t.name.text, t.name.iv);
            setIssuer(decIssuer);
            setLabel(decLabel);
        }

        setEncryptedItems();
    }, [t]);


    const dragStyle = {
        boxShadow: '0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.20)'
    };


    return (
        <Draggable draggableId={t.id} index={props.index}>
            {(provided, snapshot) => (
                <div
                    className='collBubbleOuter'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >

                    <div className='SortingToken DragTokenOuter'>
                        {issuer && label && (
                            <div className='Token DragTokenInner no-fade' style={snapshot.isDragging ? dragStyle : {}}>
                                <div className='tokenInfo'>
                                    <p className='tIssuer'>{issuer}</p>
                                    <p className='tLabel'>{label}</p>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            )}
        </Draggable>


    )
}