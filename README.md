# Ethereum multi-signature wallet

## Summary: 
This app will allow transactions to be created that will send ether from one Ethereum account to another. The transaction will be displayed in a list with an approve button. A quorum of at least 2 out of 3 people must occur in order for funds to be transferred.

### Testing

  `truffle test`

will run the tests that were written for the smart contract


### To run:

Make sure you have truffle installed, 

  `npm install -g truffle`

then run a development blockchain at the root of project,

  `truffle develop`

compile the contracts at the develop console,

  `truffle(develop)> compile`

then migrate and deploy the contracts

  `truffle(develop)> migrate`

make sure the MetaMask extension is installed for your browser. Import account into MetaMask using the seed phrase from the truffle console. Configure MetaMask to use local development blockchain (http://localhost:9545)

cd to the client folder and run,

  `npm start`

the app should load in your default browser at localhost:3000






_If having errors running npm, 
Restore ownership of the user's npm related folders, to the current user, like this:_


  `sudo chown -R $USER:$GROUP ~/.npm`

  `sudo chown -R $USER:$GROUP ~/.config`


### Using the app
First 3 accounts should be able to create and approve transfers. If there are errors, reset transaction history for the first 3 accounts in MetaMask. Click top right, then Settings, then Advanced, and Reset Account. 

Also, you can create a transaction to other accounts, but those other accounts cannot approve.