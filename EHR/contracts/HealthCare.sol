pragma solidity >=0.4.21 <0.7.0;
// pragma experimental ABIEncoderV2;

import "./Roles.sol";


contract HealthCare {
  using Roles for Roles.Role;
  Roles.Role private superAdmins;
  Roles.Role private hospitalAdmins;
  Roles.Role private receptionist;
  Roles.Role private doctor;
  Roles.Role private patient;
  Roles.Role private lab;

//   Roles.Role private pharmacist;
//   Roles.Role private radiologist;
//   Roles.Role private pathologist;

  constructor() public {
    superAdmins.add(msg.sender);
  }
 //StructureOfPatient'sRecord
  struct patientRecords{
    address patient;
    
    
}
struct doctorRecords{
    address doctor;
    
    
}
struct labRecords{
    address lab;
    
    
}
   mapping(address=>patientRecords) patientDetails;
   mapping(address=>doctorRecords) doctorDetails;
   mapping(address=>labRecords) labDetails;

  address[] public patientAccounts;
  address[] public labAccounts;
  address[] public doctorAccounts;

  //inputtingBasicData(name,age)

  function addPatientDetails(address _patientAddress)
   external  onlyReceptionist(){
        patientDetails[_patientAddress].patient = _patientAddress;

        
        patientAccounts.push(_patientAddress);
  }
   function adddoctorDetails(address _doctorAddress)
   external  onlyHospitalAdmins(){
        doctorDetails[_doctorAddress].doctor = _doctorAddress;

        
        doctorAccounts.push(_doctorAddress);
  }
   function addLabtDetails(address _labAddress)
   external  onlyHospitalAdmins(){
        labDetails[_labAddress].lab = _labAddress;

        
        labAccounts.push(_labAddress);
  }
   //pathologist's work
//   function pushIPFSbyPathologist(address _patientAddress,string calldata _hash) external onlyPathologist(){
//        patientDetails[_patientAddress].ipfs.push(_hash);
//   }

//   //pharmascist's work
//   function pushIPFSbyPharmacist(address _patientAddress,string calldata _hash) external onlyPharmacist(){
//        patientDetails[_patientAddress].ipfs.push(_hash);
//   }

//   //radiologist's work
//   function pushIPFSbyRadiologist(address _patientAddress,string calldata _hash) external onlyRadiologist(){
//         patientDetails[_patientAddress].ipfs.push(_hash);
//   }

//   //fetchingDetails

//   function displayAllPatientAccounts() external view returns(address[] memory)
//   {
//     return patientAccounts;
//   }

//   function displayPatientDetails(address __patientAddress) external view returns (string memory, string memory, uint, string[] memory){
//       return (patientDetails[__patientAddress].fname, patientDetails[__patientAddress].lname,
//       patientDetails[__patientAddress].age, patientDetails[__patientAddress].ipfs);
//   }

//addNetworkMembers
  function addHospitalAdmins(address _newHospitalAdmin) external onlysuperAdmin(){
        hospitalAdmins.add(_newHospitalAdmin);
  }
   function addReceptionist(address _newDoctor) external onlyHospitalAdmins(){
        receptionist.add(_newDoctor);
  }
  
  function addPatient(address _newPatient) external onlyReceptionist(){
        patient.add(_newPatient);
  }
  function addDoctor(address _newDoctor) external onlyHospitalAdmins(){
        doctor.add(_newDoctor);
  }
  
  function addLab(address _newDoctor) external onlyHospitalAdmins(){
        lab.add(_newDoctor);
  }


//   function addPharmacist(address _newPharmacist) external onlyHospitalAdmins(){
//         pharmacist.add(_newPharmacist);
//   }
//   function addRadiologist(address _newRadiologist) external onlyHospitalAdmins(){
//         radiologist.add(_newRadiologist);
//   }
//   function addPathologist(address _newPathologist) external onlyHospitalAdmins(){
//         pathologist.add(_newPathologist);
//   }

  //removeNetworkMembers
  function removeHospitalAdmins(address _oldHospitalAdmin) external onlysuperAdmin(){
        hospitalAdmins.remove(_oldHospitalAdmin);
  }
  function removeReceptionist(address _oldDoctor) external onlyHospitalAdmins(){
        receptionist.remove(_oldDoctor);
  }
  

  function removePatient(address _oldPatient) external onlyReceptionist(){
        patient.remove(_oldPatient);
  }

  function removeDoctor(address _oldDoctor) external onlyHospitalAdmins(){
        doctor.remove(_oldDoctor);
  }
  function removeLab(address _oldDoctor) external onlyHospitalAdmins(){
        doctor.remove(_oldDoctor);
  }
  //verify network members
 function verifyPatient(address _pat) external view returns(bool){
     return patient.has(_pat);
 }

 function verifyDoctor(address _doc) external view returns(bool){
     return doctor.has(_doc);
 }

 function verifyTechnician(address _tech) external view returns(bool){
     return lab.has(_tech);
 }

 function verifyReceptionist(address _recp) external view returns(bool){
     return receptionist.has(_recp);
 }

//   function removePharmacist(address _oldPharmacist) external onlyHospitalAdmins(){
//         pharmacist.remove(_oldPharmacist);
//   }

//   function removeRadiologist(address _oldRadiologist) external onlyHospitalAdmins(){
//         radiologist.remove(_oldRadiologist);
//   }

//   function removePathologist(address _oldPathologist) external onlyHospitalAdmins(){
//         pathologist.remove(_oldPathologist);
//   }


//UnauthorizedAccessRestriction
  modifier onlysuperAdmin(){
    require(superAdmins.has(msg.sender),"Only Admins can add HospitalAdmins");
    _;
  }
   modifier onlyReceptionist(){
    require(receptionist.has(msg.sender),"Only Admins can add HospitalAdmins");
    _;
  }

  modifier onlyHospitalAdmins(){
    require(hospitalAdmins.has(msg.sender),'Only Hospital Administrators can perform such Operation');
    _;
  }

  modifier onlyDoctor(){
    require(doctor.has(msg.sender),"Only Registered Doctor can add Patients");
    _;
  }
 modifier onlyLab(){
    require(doctor.has(msg.sender),"Only Registered Doctor can add Patients");
    _;
  }

//   modifier onlyPharmacist(){
//     require(pharmacist.has(msg.sender),"Only Registered Pharmacist can perform such Operation");
//     _;
//   }

//   modifier onlyRadiologist(){
//     require(radiologist.has(msg.sender),"Only Registered Radiologist can perform such Operation");
//     _;
//   }

//   modifier onlyPathologist(){
//     require(pathologist.has(msg.sender),"Only Registered Pathologist can perform such Operation");
//     _;
//   }
}