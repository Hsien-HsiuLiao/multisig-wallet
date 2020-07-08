# Ethereum multi-signature wallet

## Summary: A quorum of at least 2 out of 3 people must occur in order for funds to be transferred


### To run:

Make sure you have truffle installed, 

  `npm install -g truffle`

then run a development blockchain,

  `truffle develop`

compile the contracts at the develop console,

  `truffle develop > compile`

then migrate the contracts

  `truffle develop > migrate`

cd to the client folder and run,

  `npm start`







_If having errors running npm, 
Restore ownership of the user's npm related folders, to the current user, like this:_


  `sudo chown -R $USER:$GROUP ~/.npm`

  `sudo chown -R $USER:$GROUP ~/.config`

