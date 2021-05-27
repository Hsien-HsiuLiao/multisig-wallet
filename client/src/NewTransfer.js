import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'


function NewTransfer({createTransfer}) {
    const [transfer, setTransfer] = useState(undefined);

    const submit = e => {
        e.preventDefault();
        //should check to see if amount or to field is empty
        // var ammountIsEmpty , toIsEmpty
        createTransfer(transfer);
        handleClick();
    }

    const updateTransfer = (e, field) => {
        const value = e.target.value;
        setTransfer({...transfer, [field]: value});
    }

    const [isLoading, setLoading] = useState(false);
      
        useEffect(() => {
          if (isLoading) {
            simulateNetworkRequest().then(() => {
              setLoading(false);
            });
          }
        }, [isLoading]);

    const handleClick = () => setLoading(true);

    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 5000));
    }  


    return (
        <div style ={newTrasferStyle}>
            <h2>Create Transfer</h2>
            <form onSubmit={(e) => submit(e)}>
                <label htmlFor="amount"> Amount (in Wei): </label>
                <input
                    id="amount"
                    type="text"
                    onChange={e => updateTransfer(e, 'amount')}
                />
                <label htmlFor="to">{' '} To: {' '}</label>
                <input
                    id="to"
                    type="text"
                    size="45"
                    onChange={e => updateTransfer(e, 'to')}
                />
                {' '}             
                {  /* <Button variant="primary" type="submit">Submit</Button> */}
                <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                /*  onClick={!isLoading ? handleClick : null} */
                >
                {isLoading ? 'Submitting…' : 'Submit'}
                </Button>
            </form>
        </div>
    )
};

const newTrasferStyle = {
    background: '#333',
    color: '#fff',
    padding: '10px'
}

export default NewTransfer;