pragma solidity 0.8.0;
//pragma experimental ABIEncoderV2;

contract Wallet {
    //state variables
    address[] public approvers;
    uint public quorum;
    struct Transfer {
        uint id;
        uint amount;
        address payable to;
        uint approvals;
        bool sent;
    }
    Transfer[] public transfers;
    mapping(address => mapping(uint => bool)) public approvals;
    
    constructor(address[] memory _approvers, uint _quorum)  {
        approvers = _approvers;
        quorum = _quorum;
    }
    /// @return returns array of approvers of type address
    function getApprovers() external view returns(address[] memory) {
        return approvers;
    }
    /// @return returns array of transfers of struct Transfer
    function getTransfers() external view returns(Transfer[] memory) {
        return transfers;
    }
  
    /// @param amount How much ether to transfer
    /// @param to Address of who is receiving the ether
    function createTransfer(uint amount, address payable to) external onlyApprover() {
        transfers.push(Transfer(
            transfers.length,
            amount,
            to,
            0,
            false
            )
        );
    }
    /// @param id ID of transfer to be approved
    function approveTransfer(uint id) external onlyApprover() {
        require(transfers[id].sent == false, 'transfer has already been sent');
        require(approvals[msg.sender][id] == false, 'cannot approve transfer twice');
        
        approvals[msg.sender][id] = true;
        transfers[id].approvals++;
        
        if(transfers[id].approvals >= quorum) {
            transfers[id].sent = true;
            address payable to = transfers[id].to;
            uint amount = transfers[id].amount;
            to.transfer(amount); //transfer is method for addresses in solidity
        }
    }
    
    //native way to receiv ether
    receive() external payable {}
    
    modifier onlyApprover() {
        bool allowed = false;
        for (uint i =0; i< approvers.length; i++) {
            if(approvers[i] == msg.sender) {
                allowed = true;
            }
        }
        require(allowed == true, 'only approver allowed');
        _;
    }
}
