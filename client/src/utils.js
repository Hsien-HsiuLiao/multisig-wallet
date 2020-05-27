import Web3 from 'web3';
import Wallet from './contracts/Wallet.json';

const getWeb3 = () => {
    console.log('getweb3:');
    
    return new Promise((resolve, reject) => {
        window.addEventListener('load', async () => {

        console.log('window.ethereum:', window.ethereum )
        //if Metamask is present it will inject an ethereum object onto window object
        if(window.ethereum) {
            // Web3( provider object ) , http provider like http://localhost
            const web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable(); // ask user to enable Metmask for dapp
                resolve(web3);
            } catch(error) {
                reject(error);
            }
        } else if(window.web3) { //old version Metamask installed
            resolve(window.web3);
        } else {
            reject('Must install Metamask');
        }
    });
});

    //connect to local development blockchain
    //special feature that it accepts transactions without being signed
    // return new Web3('http://localhost:9545');
};

const getWallet = async web3 => {
    const networkId = await web3.eth.net.getId();
   // console.log("Wallet:", Wallet.networks);
    const deployedNetwork = Wallet.networks[networkId];
    //console.log(deployedNetwork.address);
    return new web3.eth.Contract(
        Wallet.abi,
        deployedNetwork && deployedNetwork.address
    );
};

export { getWeb3, getWallet };