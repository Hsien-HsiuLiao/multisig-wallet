import React from 'react';

function TransferList({transfers, approveTransfer}) {
    return (
        <div style={transferListStyle}>
            <h2>Transfers</h2>
            <table>
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
                                {transfer.approvals}
                                <button disabled={transfer.approvals === 2} onClick={() => approveTransfer(transfer.id, transfer.approvals)}>
                                Approve
                                </button>
                            </td>
                            <td>{transfer.sent ? 'yes' : 'no'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
const transferListStyle = {
    background: '#333',
    color: '#fff',
    padding: '10px'
}

export default TransferList;