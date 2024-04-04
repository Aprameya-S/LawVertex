const FileTransfer = artifacts.require("FileTransfer")

module.exports = function(deployer) {
  deployer.deploy(FileTransfer);
};
