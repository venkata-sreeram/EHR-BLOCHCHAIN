// import { encryptFile, encryptKey, decryptKey, decrypFile, decryptFile } from "./encryption";
// import { generate } from "./aeskey";

// // import Web3 from 'web3' 
// var fs = require(‘fs’);



// sendDoctorIPFS(file, pubAddress){
//     aeskey = generate();
//     const readStream = fs.createReadStream(file);
//     const encryptedfile = encryptFile(readStream, aeskey);
//     const encryptedKey = encryptKey(pubAddress, aeskey);
//     ipfs.add(encryptedfile, (error, result) => {
//         console.log('ipfs results', encryptedfile);


//         this.state.contracts.methods.doctorSendIPFS(result[0].hash, pubAddress, encryptedKey).send({ from: this.state.account }).then((r) => {
//             console.log('ipfs added');

//         })
//         if (error)
//             console.log(error);
//     })

// }
// sendLabIPFS(file, pubAddress){
//   aeskey = generate();
//   const readStream = fs.createReadStream(file);
//   const encryptedfile = encryptFile(readStream, aeskey);
//   const encryptedKey = encryptKey(pubAddress, aeskey);
//   ipfs.add(encryptedfile, (error, result) => {
//       console.log('ipfs results', encryptedfile);


//       this.state.contracts.methods.labSendIPFS(result[0].hash, pubAddress, encryptedKey).send({ from: this.state.account }).then((r) => {
//           console.log('ipfs added');

//       })
//       if (error)
//           console.log(error);
//   })

// }
// patientDoctorPermit(pubAddress,hash)
// {
//   const key = await this.state.contract.methods.retrievePatientIPFS(ipfs).call();
//   retrieveKey = decryptKey(privatekey, key);
//   const encryptedKey = encryptKey(pubAddress,retrieveKey);

//   this.state.contracts.methods.createPermissionForDoctor( hash, encryptedKey).send({ from: this.state.account }).then((r) => {
//     console.log('permission granted');

//       })
//    if (error)
//     console.log(error);
//     })


// }
// patientLabPermit(pubAddress,hash)
// {
//   const key = await this.state.contract.methods.retrievePatientIPFS(ipfs).call();
//   retrieveKey = decryptKey(privatekey, key);
//   const encryptedKey = encryptKey(pubAddress,retrieveKey);

//   this.state.contracts.methods.createPermissionForLab( hash, encryptedKey).send({ from: this.state.account }).then((r) => {
//     console.log('permission granted');

//       })
//    if (error)
//     console.log(error);
//     })


// }
// retrieveDoctorFile(ipfs, privateKey){
//     const key = await this.state.contract.methods.retrieveDoctorIPFS(ipfs).call();
//     retrieveKey = decryptKey(privatekey, key);
//     const chunks = []
//     for await (const chunk of ipfs.cat(ipfsPath)) {
//         chunks.push(chunk);
//     }
//     const file = Buffer.concat(chunks).toString();
//     decryptFile(file, retrieveKey);

// }
// retrieveLabFile(ipfs, privateKey){
//   const key = await this.state.contract.methods.retrieveLabIPFS(ipfs).call();
//   retrieveKey = decryptKey(privatekey, key);
//   const chunks = []
//   for await (const chunk of ipfs.cat(ipfsPath)) {
//       chunks.push(chunk);
//   }
//   const file = Buffer.concat(chunks).toString();
//   decryptFile(file, retrieveKey);

// }
// retrievePatientFile(ipfs, privateKey){
//   const key = await this.state.contract.methods.retrievePatientIPFS(ipfs).call();
//   retrieveKey = decryptKey(privatekey, key);
//   const chunks = []
//   for await (const chunk of ipfs.cat(ipfsPath)) {
//       chunks.push(chunk);
//   }
//   const file = Buffer.concat(chunks).toString();
//   decryptFile(file, retrieveKey);

// }



