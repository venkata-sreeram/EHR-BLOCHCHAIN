var Roles = artifacts.require("./Roles.sol");

module.exports = function(deployer) {
  deployer.deploy(Roles);
};
