import React from 'react';
import Table from 'react-bootstrap/Table';

function TransferList({transfers, approveTransfer}) {
    return (
        <div>
            <div style={transferListStyle}>
            <h2>Transfers</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Amount</th>
                        <th>To</th>
                        <th>approvals</th>
                        <th>sent</th>
                    </tr>
                </thead>
                <tbody>
                    {transfers.map(transfer => (
                        <tr key={transfer.id}>
                            <td>{transfer.id}</td>
                            <td>{transfer.amount}</td>
                            <td>{transfer.to}</td>
                            <td>
                                <span style={{padding: '5px'}}>({transfer.approvals})</span>  
                                <button disabled={transfer.approvals == 2} onClick={() => approveTransfer(transfer.id, transfer.approvals)}>
                                Approve
                                </button>
                            </td>
                            <td>{transfer.sent ? 'yes' : 'no'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
      </div>
    );
}
const transferListStyle = {
    background: '#333',
    color: '#fff',
    padding: '10px'
}

export default TransferList;