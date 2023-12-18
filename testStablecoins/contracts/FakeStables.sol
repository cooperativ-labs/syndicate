// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestUSDC is ERC20 {
    constructor(address account) ERC20("USD Coin Test", "USDC*") {
        _mint(account, 10000000000000); // 1 million USDC* with 6 decimals
    }

    function mint(uint256 amount) public {
        _mint(_msgSender(), amount);
    }

    function decimals() public view override returns (uint8) {
        return 6;
    }
}

contract TestDAI is ERC20 {
    constructor(address account) ERC20("Dai Stablecoin Test", "DAI*") {
        _mint(account, 10000000000000); // Adjust the amount based on decimals
    }

    function mint(uint256 amount) public {
        _mint(_msgSender(), amount);
    }

    function decimals() public view override returns (uint8) {
        return 18; 
    }
}

contract SimpleStorage {
    uint public storedData;

    function set(uint x) public {
        storedData = x;
    }
}