// src/TokenVesting.sol
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract TokenVesting is ReentrancyGuard {
    IERC20 public immutable token;
    address public beneficiary;
    uint256 public releaseTime;

    constructor(
        IERC20 _token,
        address _beneficiary,
        uint256 _releaseTime
    ) {
        token = _token;
        beneficiary = _beneficiary;
        releaseTime = _releaseTime;
    }

    function release() external nonReentrant {
        require(block.timestamp >= releaseTime, "Fondos bloqueados");
        uint256 amount = token.balanceOf(address(this));
        require(amount > 0, "Sin fondos para liberar");
        token.transfer(beneficiary, amount);
    }
}