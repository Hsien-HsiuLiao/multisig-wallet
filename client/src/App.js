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
  const [approvers, setApprovers] = useState(undefined);
  const [quorum, setQuorum] = useState(undefined);
  const [transfers, setTransfers] = useState([]);
  //let currentAccount = 0x0;
  

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
        console.log('eth.on', accounts);
        //currentAccount = accounts[0];
        //console.log('currentAccount:', currentAccount)
        setAccounts(accounts);
        });
        
    };
    init();
    
  }, []);

  //const createTransfer = transfer => {
    const createTransfer = async (transfer) => {
      //const newtransfers = async () => {
        await wallet.methods
          .createTransfer(transfer.amount, transfer.to)
          .send({from: accounts[0]});
       // const updated = await wallet.methods.getTransfers().call();
        //setTransfers(updated);
        setTransfers(await wallet.methods.getTransfers().call());
     // };
     // newtransfers();
    
  }

  const { ethereum } = window;
  ethereum.on('accountsChanged', function() {
     console.log('eth.on approveTransfer');
   });

  const approveTransfer = (transferId, transferApprovals) => {
    console.log('transferApprovals:', transferApprovals);
    const newtransfers = async () => {
      const refreshAccounts = await web3.eth.getAccounts();
      console.log('refresh:', refreshAccounts[0]);
      setAccounts(refreshAccounts);
      console.log('acounts[0]:', accounts[0]);
      console.log('selectedAddress:', window.ethereum.selectedAddress )
     
     
      await wallet.methods
              .approveTransfer(transferId)
              .send({from: refreshAccounts[0]});
      const updatedTransfer = await wallet.methods.getTransfers().call();
      setTransfers(updatedTransfer);
      /*
      if (updatedTransfer[transferId].approvals >= 2){
        console.log('updatedTransfer count:', updatedTransfer[transferId].approvals);
        document.getElementsByClassName("approveButton").disabled = true;
      }
      */
    };
    newtransfers();
  }

  if(
    typeof web3 === 'undefined'
    || typeof accounts === 'undefined'
    || typeof wallet === 'undefined'
    || typeof approvers === 'undefined'
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
    <div>
      <h1 style={{textAlign: 'center', color: '#fff', background: '#00f'}}>Multisig Dapp</h1>
      <Header approvers={approvers} quorum={quorum} currentAccount={accounts}/>
      <NewTransfer createTransfer={createTransfer} />
      <TransferList transfers={transfers} approveTransfer={approveTransfer} />
    </div>
  );
}

export default App;