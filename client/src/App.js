import React, { useEffect, useState } from 'react';
import { getWeb3, getWallet } from './utils.js';
import Header from './Header.js';
import NewTransfer from './NewTransfer.js';
import TransferList from './TransferList.js';


function App() {

  
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState(undefined);
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
      setTransfers(transfers) 
    };
    init();
  }, []);

  const createTransfer = transfer => {
      const newtransfers = async () => {
        await wallet.methods
          .createTransfer(transfer.amount, transfer.to)
          .send({from: accounts[0]});
        const updated = await wallet.methods.getTransfers().call();
        setTransfers(updated);
      };
      newtransfers();
    
  }

  const approveTransfer = transferId => {
    const newtransfers = async () => {
      const refreshAccounts = await web3.eth.getAccounts();
      console.log('refresh:', refreshAccounts[0]);
      setAccounts(refreshAccounts);
      console.log('acounts[0]:', accounts[0]);
      console.log('selectedAddress:', window.ethereum.selectedAddress )
      await wallet.methods
              .approveTransfer(transferId)
              .send({from: refreshAccounts[0]});
      const updated = await wallet.methods.getTransfers().call();
      setTransfers(updated);
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      Multisig Dapp
      <Header approvers={approvers} quorum={quorum} />
      <NewTransfer createTransfer={createTransfer} />
      <TransferList transfers={transfers} approveTransfer={approveTransfer} />
    </div>
  );
}

export default App;