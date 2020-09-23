# EHR-Blockchain Application 👨‍💻

The objective of this project is to build blockchain based decentralised web application which will provide privacy and security to the patients’ health record using RSA encryption algorithm,Access Control and IPFS. The system gives appropriate scope over a health record only on patient’s permission. 

ElectronicHealthRecords generally contain highly-sensitive and critical data related to patients, which is frequently shared among clinicians, radiologists, healthcare providers, pharmacists, and researchers, for effective diagnosis and treatment. Hence may use blockchain technology for accessing and managing the privacy and security of patient data and history in clinical practices.


## Approach of the projectflow 

![projectflow](https://user-images.githubusercontent.com/22374906/89004487-ea812300-d31f-11ea-9722-c58b84a227c6.png)

## Architecture of the project

![architech](https://user-images.githubusercontent.com/48272770/88478131-687dac80-cf63-11ea-9fbb-111afd1feab8.png)


## The project prerequisite and Instructions are as follows :-
```
node and npm
```
### Install truffle by using the following command

```bash
sudo npm install -g truffle**
```
### Install Ganache
[ganache](https://www.trufflesuite.com/ganache)

After installing Ganache, create new workspace <br/>
Mention the path to truffle-config.js and then add project

### Install metamask from Google chrome extension store
* Open Terminal, go to ehr
* Run **truffle migrate**
* truffle console
<br/>

### Now add the hospital admin, receptionist, doctor,lab technichian and patient.
## Run

```
HealthCare.deployed().then(function(instance) {app=instance})</b>

account=(await web3.eth.getAccounts())</b>

app.addHospitalAdmins(account[1],{from:account[0]})</b>

app.addReceptionist(account[2],{from:account[1]})</b>

app.addDcotor(account[3],{from:account[1]})</b>

app.addLab(account[4],{from:account[1]})</b>
app.addPatient(account[5],{from:account[2]})</b>
```

### Now go to chrome and connect it to the localhost of ganache
```
Import account[3] as doctor
Import account[4] as lab
Import account[5] as patient
```

### Navigate to Demo bot and do :
```
python blockchain.py
```
### Navigate to EHR/client and do :
```
npm install
```
### Start react Script by :
```
npm start
```


