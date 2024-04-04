// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract FileTransfer {
    address public contractOwner;
    uint256 public usercount;

    constructor(){
        contractOwner = msg.sender;
        usercount = 0;
    }

    struct PrivateFile{
        address owner;
        string name;
        string desc;
        string format;
        string size;
        string createdAt;
        string publicid;
        string cid;
        
        bool encrypted;
        bool searchable;
        bool canRequest;
        string copyOf;
    }

    struct Access{
        string publicid;
        address user;
        string ogpublicid;
        bool viewOnly;
        bool valid;
    }

    mapping(string => PrivateFile) privateFiles; //public key -> file
    mapping(address => string[]) ownedFiles; //owner address -> public key
    mapping(address => string[]) receivedFiles; //receiver address -> public key
    mapping(string => Access[]) accesslist; //public key -> Access

    function addFile(
        string memory _name,
        string memory _desc,
        string memory _format,
        string memory _size,
        string memory _createdAt,
        string memory _publicid,
        string memory _cid,
        bool _encrypted,
        bool _searchable,
        bool _canRequest,
        string memory _copyOf
    ) public {
        // require(privateFiles[_publicid].exists!=true,"An unexpected error occured. Please try again.");
        PrivateFile storage file = privateFiles[_publicid];
        file.owner=msg.sender;
        file.name=_name;
        file.desc=_desc;
        file.format=_format;
        file.size=_size;
        file.createdAt=_createdAt;
        file.publicid=_publicid;
        file.cid=_cid;
        file.encrypted=_encrypted;
        file.searchable=_searchable;
        file.canRequest=_canRequest;
        file.copyOf=_copyOf;

        ownedFiles[msg.sender].push(_publicid);
    }

    function viewOwnedFiles()external view returns(PrivateFile[] memory){
        PrivateFile[] memory retFiles=new PrivateFile[](ownedFiles[msg.sender].length);
        for(uint i=0;i<ownedFiles[msg.sender].length;i++){
            retFiles[i]=privateFiles[ownedFiles[msg.sender][i]];
        }
        return retFiles;
    }

    function viewOwnedFile(string memory _publicid)external view returns(PrivateFile memory){
        require(privateFiles[_publicid].owner==msg.sender);
        return privateFiles[_publicid];
    }

    function deleteFile(string memory _publicid)public{
        PrivateFile memory file = privateFiles[_publicid];
        // require(msg.sender==file.owner, "You are not the owner");
        address owner = file.owner;
        string[] storage oFiles = ownedFiles[owner];
        bool flag = false;
        for(uint i=0; i<oFiles.length;i++){
            if(keccak256(abi.encodePacked(oFiles[i])) == keccak256(abi.encodePacked(_publicid))){
                flag=true;
            }
            if(flag==true && i<oFiles.length-1){
                oFiles[i]=oFiles[i+1];
            }
        }
        oFiles.pop();

        delete privateFiles[_publicid];

        while(accesslist[_publicid].length>0){
            revokeAccess(
                accesslist[_publicid][accesslist[_publicid].length-1].publicid,
                accesslist[_publicid][accesslist[_publicid].length-1].user
            );
        }
    }

    function grantAccess(
        string memory _publicid,
        string memory _cid,
        address _receivingUserAddress,
        string memory _ogpublicid,
        bool _viewOnly)
     external {
        PrivateFile memory file = privateFiles[_ogpublicid];
        require(msg.sender==file.owner, "You are not the owner");

        Access memory access;
        access.user = _receivingUserAddress;
        
        access.viewOnly = _viewOnly;
        access.valid = true;
        access.publicid = _publicid;
        access.ogpublicid=_ogpublicid;

        bool accessAlreadyGranted = false;
        string[] memory recvFiles = receivedFiles[_receivingUserAddress];
        for(uint i=0; i<recvFiles.length;i++){
            if(keccak256(abi.encodePacked(recvFiles[i])) == keccak256(abi.encodePacked(_publicid))){
                accessAlreadyGranted=true;
                break;
            }
        }

        if(accessAlreadyGranted==false){
            receivedFiles[_receivingUserAddress].push(_publicid);
            accesslist[_ogpublicid].push(access);
        }

        addFile(file.name, file.desc, file.format, file.size, file.createdAt, _publicid, _cid, file.encrypted, file.searchable, file.canRequest, file.publicid);

    }

    function revokeAccess(
        string memory _publicid,
        address _revokeUserAddress
    ) public {
        string[] storage recvFiles = receivedFiles[_revokeUserAddress];
        bool flag = false;
        string memory ogpublicid;
        for(uint i=0; i<recvFiles.length;i++){
            if(keccak256(abi.encodePacked(recvFiles[i])) == keccak256(abi.encodePacked(_publicid))){
                flag=true;
                ogpublicid=privateFiles[recvFiles[i]].copyOf;
            }
            if(flag==true && i<recvFiles.length-1){
                recvFiles[i]=recvFiles[i+1];
            }
        }
        recvFiles.pop();

        // removing user address from accesslist
        Access[] storage list = accesslist[ogpublicid];
        bool flag2 = false;
        for(uint i=0; i<list.length;i++){
            if(list[i].user==_revokeUserAddress){
                flag2=true;
            }
            if(flag==true && i<list.length-1){
                list[i]=list[i+1];
            }
        }
        list.pop();

        deleteFile(_publicid);
    }

    function viewAccessList(string memory _publicid) external view returns(Access[] memory){
        PrivateFile memory file = privateFiles[_publicid];
        require(msg.sender==file.owner, "You are not the owner");
        return accesslist[_publicid];
    }

    function viewRecievedFiles() external view returns(PrivateFile[] memory){
        string[] memory publicids = receivedFiles[msg.sender];

        PrivateFile[] memory infos = new PrivateFile[](publicids.length);
        for(uint i=0;i<publicids.length;i++){
            PrivateFile storage info = privateFiles[publicids[i]];
            infos[i]=info;
        }
        return infos;
    }

    function viewFile(string memory _publicid)external view returns(PrivateFile memory){
        bool fileReceived = false;
        for(uint i=0; i<receivedFiles[msg.sender].length;i++){
            if(keccak256(abi.encodePacked(receivedFiles[msg.sender][i])) == keccak256(abi.encodePacked(_publicid))){
                fileReceived=true;
            }
        }

        require(fileReceived==true,"You have not received this file or the owner has deleted it");

        PrivateFile memory retFile = privateFiles[_publicid];

        return retFile;
    }
}