import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import axios from 'axios'

const AlertBox = (props) => {
    const [visibility, setVisibility] = useState(true)
    
    //const [text, setText] = useState('Do you want to delete this event ? ')



    async function deleteItem() {

        const headers = {
            'Access-Control-Allow-Origin': '*'
        };
        const eventId = props.eventId;
        console.log(eventId)
        axios({
            method: 'delete',
            url: `http://localhost:5000/admin/deleteevent?idCompany=${eventId}`,
            headers: headers,
        }).then((response) => {
            setVisibility(false)
        })
        
    }

    if (visibility) {
        return (
            <>
                <div className="alert_holder">
                    <Alert show={visibility} variant="success" className='alert'>
                        <Alert.Heading>Warning?!</Alert.Heading>
                        <p>
                            Do you want to delete this event ?
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => {
                                deleteItem().then(() => props.changeVisibility())
                            }} variant="outline-dark">
                                Apply
                            </Button>
                            <Button onClick={() => {
                                props.changeVisibility();
                                setVisibility(false);
                            }} variant="outline-dark">
                                Close
                            </Button>
                        </div>
                    </Alert>
                </div>
            </>
        );
    } else {
        console.log('not accessed')
        return null;
    }

}



export default AlertBox;