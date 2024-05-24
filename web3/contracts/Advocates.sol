// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Advocates{
  struct Advocate{
    address adv_address;
    string name;
    string cnr;
    string party;
  }

  mapping(string => Advocate[]) cnr_adv; //cnr -> Advocate
  mapping(address => string[]) adv_cnr; //advocate address -> cnrs
  

  function getAdvocates (string memory _cnr) external view returns(Advocate[] memory){
    return cnr_adv[_cnr];
  }

  function getAdvocateCases (address _adv_address) external view returns(string[] memory){
    return adv_cnr[_adv_address];
  }

  function addAdvocates(
    string memory _cnr,
    address[] memory _adv_address,
    string[] memory _name,
    string[] memory _party
  ) public {
    while(cnr_adv[_cnr].length>0){
      cnr_adv[_cnr].pop();
    }

    for(uint i=0;i<_name.length;i++){
      cnr_adv[_cnr].push(Advocate(_adv_address[i], _name[i], _cnr, _party[i]));
      bool exists=false;
      for(uint j=0;j<adv_cnr[_adv_address[i]].length;j++){
        if(keccak256(abi.encodePacked(adv_cnr[_adv_address[i]][j]))==keccak256(abi.encodePacked(_cnr))){
          exists=true;
        }
      }
      if(!exists){
        adv_cnr[_adv_address[i]].push(_cnr);
      }
    }
  }
   
}