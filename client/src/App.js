import React, { useEffect, useState } from 'react';
import { getWeb3, getWallet } from './utils.js';
import Header from './Header.js';
import NewTransfer from './NewTransfer.js';
import TransferList from './TransferList.js';
import ProgressBar from 'react-bootstrap/ProgressBar';



function App() {

  
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState([]);
  const [quorum, setQuorum] = useState(undefined);
  const [transfers, setTransfers] = useState([]);
  

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3(); //getWeb3() has become async function
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);
      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      const transfers = await wallet.methods.getTransfers().call();
      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      setApprovers(approvers);
      setQuorum(quorum);
      setTransfers(transfers);
      window.ethereum.on('accountsChanged', function(accounts) {
        setAccounts(accounts);
        });
        
    };
    init();
    
  }, []);

    const createTransfer = async (transfer) => {
        await wallet.methods
          .createTransfer(transfer.amount, transfer.to)
          .send({from: accounts[0]});
        setTransfers(await wallet.methods.getTransfers().call());    
  }

  const approveTransfer = (transferId, transferApprovals) => {
    const newtransfers = async () => {
      const refreshAccounts = await web3.eth.getAccounts();
      setAccounts(refreshAccounts);
     
     
      await wallet.methods
              .approveTransfer(transferId)
              .send({from: refreshAccounts[0]});
      const updatedTransfer = await wallet.methods.getTransfers().call();
      setTransfers(updatedTransfer);
    };
    newtransfers();
  }

  if(
    typeof web3 === 'undefined'
    || typeof accounts === 'undefined'
    || typeof wallet === 'undefined'
    || approvers.length === 0
    || typeof quorum === 'undefined'
  ) {
    return (
      <div>
            Loading...
            <ProgressBar animated now={45} />
      </div>
      );
  }

  return (
    <div style={appStyle}>
      <Header approvers={approvers} quorum={quorum} currentAccount={accounts}/>
      <NewTransfer createTransfer={createTransfer} />
      <TransferList transfers={transfers} approveTransfer={approveTransfer} />
    </div>
  );
}

const appStyle = {
  background: '#0f9',
  color: '#fff',
  textAlign: 'left',
  padding: '10px'
}

export default App;