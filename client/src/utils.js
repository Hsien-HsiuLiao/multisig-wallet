import Web3 from 'web3';
import Wallet from './contracts/Wallet.json';

const getWeb3 = () => {
    return new Web3('http://localhost:9545');
};

const getWallet = async web3 => {
    const networkId = await web3.eth.net.getId();
    console.log("Wallet:", Wallet.networks);
    const deployedNetwork = Wallet.networks[networkId];
    console.log(deployedNetwork.address);
    return new web3.eth.Contract(
        Wallet.abi,
        deployedNetwork && deployedNetwork.address
    );
};

export { getWeb3, getWallet };