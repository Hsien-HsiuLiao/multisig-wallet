pragma solidity 0.6.0;

contract Wallet {
    //state variables
    address[] public approvers;
    uint public quorum;
    
    constructor(address[] memory _approvers, uint _quorum) public {
        approvers = _approvers;
        quorum = _quorum;
    }
}
