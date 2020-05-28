import React from 'react';

function Header({approvers, quorum}) {
    return (
        <header style={headerstyle}>
            <ul>
                <li><h3>Approvers: </h3>{approvers.join(', ')}</li>
                <li><h3>Quorum: </h3>{quorum}</li>
            </ul>
        </header>
    );
}
const headerstyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'left',
    padding: '10px'
}

export default Header;