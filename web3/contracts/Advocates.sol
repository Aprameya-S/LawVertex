// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Advocates{
  mapping(string => mapping(string => address[])) adv; //cnr -> party -> advocate addresses
  mapping(address => string[]) adv_cases;  //advAddress -> cnrs
  mapping(address => mapping(string => string)) adv_role; //advAddress -> cnr -> role

  function getAdvocate (string memory _cnr, string memory _party) external view returns(address[] memory){
    return adv[_cnr][_party];
  }

  function getAdvocateRole (address _advAddress, string memory _cnr) external view returns(string memory){
    return adv_role[_advAddress][_cnr];
  }

  function addOrUpdateAdvocates(
    string memory _cnr,
    address[] memory _adv_addresses,
    string[] memory _parties,
    string[] memory _roles
  )external{
    require(_adv_addresses.length==_roles.length, "Incorrect input format");

    for(uint i=0;i<adv[_cnr]["pet"].length;i++){
      adv[_cnr]["pet"].pop();
    }
    for(uint i=0;i<adv[_cnr]["res"].length;i++){
      adv[_cnr]["res"].pop();
    }

    for(uint i=0;i<_roles.length;i++){
      adv[_cnr][_parties[i]].push(_adv_addresses[i]);
      adv_cases[_adv_addresses[i]].push(_cnr);
      adv_role[_adv_addresses[i]][_cnr]=_roles[i];
    }
  }
}