// src/TokenVesting.sol
pragma solidity ^0.8.29;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TokenVesting is ReentrancyGuard {
    IERC20 public token;
    mapping(address => uint256) public released;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function release(address beneficiary, uint256 amount) external nonReentrant {
        require(block.timestamp >= cliff, "Cliff not reached");
        // Lógica de vesting
    }
}