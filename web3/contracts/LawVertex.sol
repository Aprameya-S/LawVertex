// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract LawVertex {

  // constructor() payable {}
  // receive() external payable {}

  address public contractOwner;
  address private admin;
  uint public caseCount;

  constructor() {
    contractOwner = msg.sender;
    admin = msg.sender;
    caseCount = 0;
  }

  struct ActStruct{
    string name;
    string section;
  } 

  struct CaseInfo {
    uint _id;
    string pet;
    string res;

    //FIR Details
    string police_station;
    string fir_no;
    string year;
    string loc;
  }

  struct Case {
    //Case Details
    address owner;
    string case_type;
    uint filing_no;
    string filing_date;
    uint reg_no;
    string reg_date;
    string cnr;

    //Case Status
    string first_hearing;
    string next_hearing;
    string stage;
    address court_address;
    string court_no;
    string judge;
  }
  
  struct Court {
    address owner;
    string court_type;
    uint slno;
    string name;
    string location;
    string tel;
  }

  struct Party {
    address owner;
    address lead_adv_add;
    uint slno;
    string name;
    string cnr;
    string location;
    string email;
    string phone;
    string lead_adv;
  }

  Court[] courts;
  Party[] parties;
  Case[] cases;

  mapping(string => uint256) cnr_cases; //cnr->case
  mapping(string => CaseInfo) public infos; //cnr->case_info
  mapping(string => string) status; //cnr->status
  mapping(string => ActStruct[]) acts;
  mapping(address => string) roles;
  mapping(string => string[]) public docs; //cnr -> documents
  
  mapping(string => mapping(string => address[])) adv; //cnr -> party -> advocate addresses
  mapping(address => string[]) adv_cases;  //advAddress -> cnrs
  mapping(address => mapping(string => string)) adv_role; //advAddress -> cnr -> role


  function getAllCourts () external view returns (Court[] memory){
    return courts;
  } 

  function getActs (string memory _cnr) external view returns(ActStruct[] memory){
    return acts[_cnr];
  }

  function getAdvocate (string memory _cnr, string memory _party) external view returns(address[] memory){
    return adv[_cnr][_party];
  }

  function getAdocateRole (address _advAddress, string memory _cnr) external view returns(string memory){
    return adv_role[_advAddress][_cnr];
  }
  
  function getAllParties () external view returns (Party[] memory){
    return parties;
  }

  function getAllCases () external view returns (Case[] memory){
    return cases;
  }

  function addCourt(
    address _owner,
    string memory _court_type,
    string memory _name,
    string memory _location,
    string memory _tel
  ) external {
    require(msg.sender==admin, "Not authorized");
    courts.push(Court(_owner,_court_type,courts.length,_name,_location,_tel));
    roles[_owner] = "court";
  }

  function addParty(
    address _owner,
    address _lead_adv_add,
    string memory _name,
    string memory _cnr,
    string memory _location,
    string memory _email,
    string memory _phone,
    string memory _lead_adv
  ) external {
    require(keccak256(abi.encodePacked(roles[msg.sender])) == keccak256(abi.encodePacked("court")), "Not authorized");
    parties.push(Party(_owner,_lead_adv_add,parties.length,_name,_cnr,_location,_email,_phone,_lead_adv));
    roles[_owner] = "party";
  }

  function addCase(
    //Case Details
    string memory _case_type,
    uint _filing_no,
    string memory _filing_date,
    uint _reg_no,
    string memory _reg_date,
    string memory _cnr,

    //  Case Status
    string memory _first_hearing,
    string memory _next_hearing,
    string memory _stage,
    string memory _court_no,
    string memory _judge
  ) external {

    require(keccak256(abi.encodePacked(roles[msg.sender])) == keccak256(abi.encodePacked("court")), "Not authorized");
    cases.push(Case(msg.sender,_case_type,_filing_no,_filing_date,_reg_no,_reg_date,_cnr,_first_hearing,_next_hearing,_stage,
      msg.sender,
      _court_no,
      _judge
    ));

    cnr_cases[_cnr]=caseCount;
    
    caseCount++;
  }

  function viewCase(string memory _cnr) external view returns (Case memory){
    return cases[cnr_cases[_cnr]];
  }

  function addAct(
    string memory _cnr,
    ActStruct[] memory _acts
  )external{
    require(keccak256(abi.encodePacked(roles[msg.sender])) == keccak256(abi.encodePacked("court")), "Not authorized");

    while(acts[_cnr].length!=0){
      acts[_cnr].pop();
    }

    for(uint i=0;i<_acts.length;i++){
      acts[_cnr].push(ActStruct(_acts[i].name,_acts[i].section));
    }
  }

  function updateAdvocates(
    string memory _cnr,
    address[] memory _adv_addresses,
    string[] memory _parties,
    string[] memory _roles
  )external{
    require(cases[cnr_cases[_cnr]].court_address==msg.sender && keccak256(abi.encodePacked(roles[msg.sender])) == keccak256(abi.encodePacked("court")), "Not authorized");
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

  function updateCase(
    //  Case Status
    string memory _cnr,
    string memory _next_hearing,
    string memory _stage,
    string memory _court_no,
    string memory _judge
  ) external {

    Case storage newCase = cases[cnr_cases[_cnr]];

    require(newCase.court_address==msg.sender && keccak256(abi.encodePacked(roles[msg.sender])) == keccak256(abi.encodePacked("court")), "Not authorized");

    newCase.next_hearing = _next_hearing;
    newCase.stage = _stage;
    newCase.court_no = _court_no;
    newCase.judge = _judge;

    newCase.next_hearing = _next_hearing;
    newCase.stage = _stage;
    newCase.court_no = _court_no;
    newCase.judge = _judge;

    for (uint j = 0; j < cases.length; j++) {
        if(keccak256(abi.encodePacked(cases[j].cnr)) == keccak256(abi.encodePacked(_cnr))){
            cases[j] = newCase;
            break;
        }
    }
  }

  function addCaseInfo(
    string memory _cnr,
    string memory _pet,
    string memory _res,
    string memory _status,
    string memory _police_station,
    string memory _fir_no,
    string memory _year
  ) external {
    
    CaseInfo storage newCaseInfo = infos[_cnr];
    require(cases[caseCount-1].court_address==msg.sender && keccak256(abi.encodePacked(roles[msg.sender])) == keccak256(abi.encodePacked("court")), "Not authorized");

    newCaseInfo._id = caseCount-1;
    status[_cnr]=_status;
    newCaseInfo.pet =_pet;
    newCaseInfo.res =_res;
    newCaseInfo.police_station =_police_station;
    newCaseInfo.fir_no =_fir_no;
    newCaseInfo.year =_year;

    for(uint i=0;i<courts.length;i++){
      if(msg.sender==courts[i].owner){
        newCaseInfo.loc =courts[i].location;
        return;
      }
    }
  }

  function updateCaseInfo(
    string memory _cnr,
    string memory _pet,
    string memory _status,
    string memory _res
  ) external {
    require(cases[cnr_cases[_cnr]].court_address==msg.sender && keccak256(abi.encodePacked(roles[msg.sender])) == keccak256(abi.encodePacked("court")), "Not authorized");

    CaseInfo storage newCaseInfo = infos[_cnr];

    newCaseInfo.pet =_pet;
    status[_cnr]=_status;
    newCaseInfo.res =_res;
  }

  function addPublicDocument(string memory _cnr,string memory _url) external {
      require(msg.sender==cases[cnr_cases[_cnr]].owner, "You don't have permission to publish public documents");
      docs[_cnr].push(_url);
  }
}