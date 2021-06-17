// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import Ownable from the Open Zeppelin Contracts library
import "@openzeppelin/contracts/access/Ownable.sol";

// Make Box inherit from the Ownable contract
contract Box is Ownable {
    uint256 private value;

    // Emmited when the store value changes
    event ValueChanged(uint256 newValue);

    // Auth access-control replaced by Ownable Open Zeppelin inheritance
    // constructor(Auth _auth) public {
    //     auth = _auth;
    // }

    // The onlyOwner modifier restricts who can call the store function
    // Stores a new value in the contract
    function store(uint256 newValue) public onlyOwner {
        // Require that the caller is registered as an administrator in Auth
        // require(auth.isAdministrator(msg.sender), "Unauthorized"); // replaced by onlyOwner modifier

        value = newValue;
        emit ValueChanged(newValue);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return value;
    }
}