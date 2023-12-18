const TestUSDC = artifacts.require('TestUSDC');

module.exports = function (deployer, network, accounts) {
  deployer.deploy(TestUSDC, accounts[0], { gas: 5000000 }); // Using the first account provided by Ganache
};
