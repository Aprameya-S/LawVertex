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

  

  struct ActStruct{
    string name;
    string section;
  } 

  struct History{
    string judge;
    string date;
    string next_hearing_date;
    string next_hearing_purpose;
    string business;
    string presentee;
  }

  struct CaseInfo {
    uint _id;
    string pet;
    string res;

    //FIR Details
    string police_station;
    string fir_no;
    string year;
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
    string party;
    string name;
    string lead_adv;
    string location;
  }

  Court[] courts;
  Case[] cases;

  mapping(string => uint256) cnr_cases; //cnr->case
  mapping(string => CaseInfo) public infos; //cnr->case_info
  mapping(string => string) status; //cnr->status
  mapping(string => ActStruct[]) acts;
  mapping(string => History[]) histories;
  mapping(string => Party[]) parties;
  mapping(address => string) roles;
  mapping(string => string[]) docs; //cnr -> documents

    
  constructor() {
    contractOwner = msg.sender;
    admin = msg.sender;
    caseCount = 1;
    cases.push(Case(msg.sender,"",0,"",0,"","invalid","","","","",""));
  }

  function getAllCourts () external view returns (Court[] memory){
    return courts;
  }

  function getActs (string memory _cnr) external view returns(ActStruct[] memory){
    return acts[_cnr];
  }

  function getHistory (string memory _cnr) external view returns(History[] memory){
    return histories[_cnr];
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
    string memory _cnr,
    string memory _party,
    string memory _name,
    string memory _lead_adv,
    string memory _location
  ) external {
    require(keccak256(abi.encodePacked(roles[msg.sender])) == keccak256(abi.encodePacked("court")), "Not authorized");
    parties[_cnr].push(Party(_party,_name,_lead_adv,_location));
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
      _court_no,
      _judge
    ));

    cnr_cases[_cnr]=caseCount;
    
    caseCount++;
  }

  function viewCase(string memory _cnr) external view returns (Case memory){
    require(cnr_cases[_cnr]!=0,"CNR does not exist");
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

  function addHistory(
    string memory _cnr,
    History[] memory _histories
  )external{
    require(keccak256(abi.encodePacked(roles[msg.sender])) == keccak256(abi.encodePacked("court")), "Not authorized");

    while(acts[_cnr].length!=0){
      acts[_cnr].pop();
    }

    for(uint i=0;i<_histories.length;i++){
      histories[_cnr].push(History(
        _histories[i].judge,
        _histories[i].date,
        _histories[i].next_hearing_date,
        _histories[i].next_hearing_purpose,
        _histories[i].business,
        _histories[i].presentee
      ));
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

    require(newCase.owner==msg.sender && keccak256(abi.encodePacked(roles[msg.sender])) == keccak256(abi.encodePacked("court")), "Not authorized");

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

  // Use for both creating and updateing
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
    require(cases[caseCount-1].owner==msg.sender && keccak256(abi.encodePacked(roles[msg.sender])) == keccak256(abi.encodePacked("court")), "Not authorized");

    newCaseInfo._id = caseCount-1;
    status[_cnr]=_status;
    newCaseInfo.pet =_pet;
    newCaseInfo.res =_res;
    newCaseInfo.police_station =_police_station;
    newCaseInfo.fir_no =_fir_no;
    newCaseInfo.year =_year;
  }

  function getParties(string memory _cnr)external view returns(Party[] memory){
    return parties[_cnr];
  }

  function addPublicDocument(string memory _cnr,string memory _url) external {
      require(msg.sender==cases[cnr_cases[_cnr]].owner, "You don't have permission to publish public documents");
      docs[_cnr].push(_url);
  }

  function viewPublicDocuments(string memory _cnr)external view returns(string[] memory){
    return docs[_cnr];
  }
}

