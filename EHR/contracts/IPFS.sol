pragma solidity >=0.4.21 <0.7.0;

contract IPFS {
    struct Keys {
        string key1;
        string key2;
        string key3;
    }
    struct Pat {
        address patient;
        string[] ipfs;
    }
    mapping(string => Keys) public key;
    mapping(address => Pat) public patients;

    function doctorSendIPFS(
        string memory hash,
        address patient,
        string memory aeskey
    ) public {
      //   patients[patient] = Pat(patient, new string[](0));
        patients[patient].ipfs.push(hash);
        
        key[hash].key1 = "no";
         key[hash].key2 = "no";

        key[hash].key3 = aeskey;
    }
    function retriveDoctorIPFS(string memory hash)
        public
        view
        returns (string memory)
    {
        return key[hash].key1;
    }
    function retriveLabIPFS(string memory hash)
        public
        view
        returns (string memory)
    {
        return key[hash].key2;
    }
    function retrivePatientIPFS(string memory hash)
        public
        view
        returns (string memory)
    {
        return key[hash].key3;
    }

    function labSendIPFS(
        string memory hash,
        address patient,
        string memory aeskey
    ) public {
      //   patients[patient] = Pat(patient, new string[](0));
        patients[patient].ipfs.push(hash);
        
        key[hash].key1 = "no";
         key[hash].key2 = "no";

        key[hash].key3 = aeskey;
    }

    function createPermissionForDoctor(string memory hash, string memory aeskey)
        public
    {
        key[hash].key1 = aeskey;
    }
    function createPermissionForLab(string memory hash, string memory aeskey)
        public
    {
        key[hash].key2 = aeskey;
    }
      function removeForDoctor(string memory hash)
        public
    {
        key[hash].key1 = "no";
    }
      function removeForLab(string memory hash)
        public
    {
        key[hash].key2 = "no";
    }
     function recordcount(address patient) public  returns(uint ){
     
       
          
              
           return patients[patient].ipfs.length;
    
     }
     function record(uint z,address patient) public  returns(string memory ){
     //   return patients[msg.sender].record[z];
          
             return patients[patient].ipfs[z];
     }

}

contract Permission is IPFS {
    
    struct Doctor {
        address doctor;
        mapping(address => bool) patDoctor;
    }
    struct Lab {
        address lab;
        mapping(address => bool) patLab;
    }
    mapping(address => Doctor) public doctors;
    mapping(address => Lab) public labs;

    function createDoctorPermission(address patient) public {
        patients[patient] = Pat(patient, new string[](0));
        doctors[msg.sender] = Doctor(msg.sender);
        doctors[msg.sender].patDoctor[patient] = true;


    }
     function createLabPermission(address patient) public {
        labs[msg.sender] = Lab(msg.sender);
        labs[msg.sender].patLab[patient] = true;


    }

}
