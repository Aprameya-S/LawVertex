const FileTransfer = artifacts.require("FileTransfer")
const LawVertex = artifacts.require("LawVertex")

module.exports = function(deployer) {
  deployer.deploy(FileTransfer);
  deployer.deploy(LawVertex);
};
