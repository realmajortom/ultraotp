import React, {useEffect, useState} from 'react';
import axios from "axios";
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

import Alert from "../generic/Alert";
import SortingToken from "./SortingToken";
import {Redirect} from "react-router-dom";


export default function SortList() {
    const [tokens, setTokens] = useState([]);
    const [message, setMessage] = useState('');
    const [redirect, setRedirect] = useState(null);
    const [newOrder, setNewOrder] = useState([]);


    function getTokens() {
        axios.get('https://ultraotp.com/api/doc/tokens', {headers: {'Authorization': `JWT ${localStorage.getItem('JWT')}`}}).then(res => {
            if (res.data.success) {
                setTokens(res.data.tokens);
            } else {
                setMessage(res.data.message);
            }
        });
    }

    function save() {
        axios.post('https://ultraotp.com/api/doc/update-order', {newOrder: newOrder}, {headers: {'Authorization': `JWT ${localStorage.getItem('JWT')}`}}).then(res => {
            if (res.data.success) {
                setRedirect('/list');
            } else {
                setMessage(res.data.message);
            }
        });
        console.log(newOrder);
    }

    function handleDragEnd(result) {
        const {destination, source, draggableId} = result;

        // Item dragged outside of dialog or placed back in original position, do nothing
        if (!destination || destination.index === source.index) {
            return;
        }

        // Create an array of rearranged ids
        let mutableOrder = tokens.map(t => t.id);
        mutableOrder.splice(source.index, 1);
        mutableOrder.splice(destination.index, 0, draggableId);

        // Update the collections array
        let sortedTokens = [];

        for (let i = 0; i < mutableOrder.length; i++) {
            let index = tokens.findIndex(t => t.id === mutableOrder[i]);
            sortedTokens.push(tokens[index]);
        }

        setTokens(sortedTokens);
        setNewOrder(mutableOrder);
    }


    useEffect(() => {
        const Jwt = localStorage.getItem('JWT');
        const cryptoKey = localStorage.getItem('cryptoKey');

        if (Jwt && cryptoKey) {
            getTokens();
        } else {
            localStorage.removeItem('JWT');
            localStorage.removeItem('cryptoKey');
            setRedirect('/');
        }
    }, []);


    if (redirect) {
        return <Redirect to={redirect} push/>;
    } else {
        return (
            <div className='SortTokens'>

                <Alert close={() => setMessage('')} message={message}/>

                <div className='homeHeader'>
                    <h1>Drag to sort</h1>

                    <div className='homeLinksWrapper linkFlexRight'>
                        <button className='primaryBtn cancelBtn btnFlex redirectBtn'
                                onClick={() => setRedirect('/list')}>Cancel
                        </button>
                        <button className='primaryBtn redirectBtn' onClick={() => save()}>Save</button>
                    </div>
                </div>


                <DragDropContext onDragEnd={handleDragEnd} onDragUpdate={() => navigator.vibrate(5)}>
                    <Droppable droppableId="rearrangeArea">
                        {(provided, snapshot) => (
                            <div
                                className='tokenList'
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {tokens.map((t, i) =>
                                    <li key={t.id}><SortingToken data={t} index={i}/></li>)}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>


            </div>
        )
    }

}