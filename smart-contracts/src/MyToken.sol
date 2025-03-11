// src/MyToken.sol
pragma solidity ^0.8.29;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract MyToken is ERC20, ReentrancyGuard {
    address public vestingContract;

    constructor(string memory name, string memory symbol, uint256 totalSupply)
        ERC20(name, symbol)
    {
        _mint(msg.sender, totalSupply * 10**decimals());
    }

    function setVestingContract(address _vestingContract) external {
        require(vestingContract == address(0), "Vesting contract already set");
        vestingContract = _vestingContract;
    }
}