// const FileTransfer = artifacts.require("FileTransfer")
const LawVertex = artifacts.require("LawVertex")
const Advocates = artifacts.require("Advocates")

module.exports = function(deployer) {
  // deployer.deploy(FileTransfer);
  // deployer.deploy(LawVertex);
  deployer.deploy(Advocates);
};
