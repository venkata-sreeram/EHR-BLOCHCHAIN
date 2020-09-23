import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, BrowserRouter } from "react-router-dom";
import { Switch } from "react-router";
import "./style.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Web3 from 'web3'
import ipfs from './js/ipfs'
import { encryptKey, encryptFile, decryptFile, decryptKey, uintToString } from './js/encryption';
import IPFS from './contracts/IPFS.json';
import HealthCare from './contracts/HealthCare.json';
const cryptoRandomString = require('crypto-random-string');
const FileSaver = require('file-saver');
class application extends React.Component {
  redirect = () => {
    window.location.href = 'http://localhost:5000/hss';
    // maybe can add spinner while loading
    return null;
  }
  render() {
    return (
      <div className="App">
        <div className="=container-fluid bg-light text-dark">
          <nav className="navbar navbar-expand-sm bg-success navbar-light">
            <div
              className="nav-item active"
              style={{ color: "black", fontWeight: "bolder" }}
            >
              MISHMASH
            </div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <span>
                <Link to="/">
                  <a className="nav-link" style={{ color: "white !important" }}>
                    HOME
                  </a>
                </Link>
                {/* <Link to="http://localhost:5000/hss"> */}
                  <a className="nav-link" style={{ color: "white !important" }} href='http://localhost:5000/hss'>
                    DEMO 
                  </a>
                  </span>
                {/* </Link> */}
              </li>
            </ul>
          </nav>
          <div>
            <header className="text-center" style={{ padding: "5%" }}>
              <h1 className="text-success">ELECTRONIC HEALTH RECORD</h1>
              <h4>A blockchain based decentralised healthcare application</h4>
            </header>
            <br />
            <hr className="line" />
            <br />
            <br />
            <br />
          </div>
          <div className="row text-center">
            <div className="col-md-3">
              <h3 className="text-center">ARE YOU A :</h3>
            </div>
            <div className="col-md-2">
              <Link to="/doctor">
                <button type="button" className="btn btn-success">
                  DOCTOR
                </button>
              </Link>
            </div>
            <div className="col-md-2">
              <Link to="/patient">
                <button type="button" className="btn btn-success" id="Patient">
                  PATIENT
                </button>
              </Link>
            </div>
            <div className="col-md-2">
              <Link to="/technician">
                <button type="button" className="btn btn-success">
                  LAB TECHNICIAN
                </button>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default application;

export class loginDoctor extends React.Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    this.setState({docaddress:this.state.account});
    const networkId = await web3.eth.net.getId()
    const networkData = HealthCare.networks[networkId]
    if (networkData) {
      const contract1 = new web3.eth.Contract(HealthCare.abi, networkData.address)
      this.setState({ contract1 })
      // const memeHash = await contract.methods.get().call()
      // this.setState({ memeHash })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      patientHash: '',
      contract1: null,
      web3: null,

      account: null,
      docaddress: null
    }

  }

  // captureaddress = (event) => {
  //   event.preventDefault()
  //   this.setState({ docaddress: event.target.value });
  //   console.log(event.target.value);
  // }

  sendaddress = async (event) => {
    event.preventDefault()
    
    const flag = await this.state.contract1.methods.verifyDoctor(this.state.docaddress).call();
    if (flag == true)
      return this.props.history.push('/doctor/permissions/ViewUpload');
    else
     alert('user not registered');
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-light">
          <div
            className="nav-item active"
            style={{ color: "white", fontWeight: "bolder" }}
          >
            MISHMASH
          </div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/">
                <a className="nav-link">
                  <div style={{ color: "white" }}>HOME</div>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <h3 style={{ padding: "5%" }}>DOCTOR'S LOGIN:</h3>
            <div className="fadeIn"></div>
            <form>
              {/* <input
                type="text"
                id="login"
                className="fadeIn"
                name="login"
                placeholder="ADDRESS"
                style={{ border: "1px solid black" }}
                onChange={this.captureaddress}
              /> */}
              <Link to="/doctor/permissions">
                <button
                  type="text"
                  className="btn btn-primary fadeIn"
                  defaultValue="Log In"
                  onClick={this.sendaddress}
                >
                  Log In
                </button>
              </Link>
            </form>
            <br />
            <div id="formFooter">
              <a className="underlineHover" href="#">
                Forgot Credentials?
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class loginPatient extends React.Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    this.setState({ pataddress: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = HealthCare.networks[networkId]
    if (networkData) {
      const contract1 = new web3.eth.Contract(HealthCare.abi, networkData.address)
      this.setState({ contract1 })
      // const memeHash = await contract.methods.get().call()
      // this.setState({ memeHash })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      patientHash: '',
      contract1: null,
      web3: null,

      account: null,
      pataddress: null
    }
  }
  // captureaddress = (event) => {
  //   event.preventDefault()
  //   this.setState({ pataddress: event.target.value });
  //   console.log(event.target.value);
  // }
  sendaddress =async (event) => {
    const flag = await this.state.contract1.methods.verifyPatient(this.state.pataddress).call();
    if(flag==true)
    {
      return this.props.history.push('/patient/viewrecords');
    }
    else{
      alert('user not registered');
    }
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-light">
          <div
            className="nav-item active"
            style={{ color: "white", fontWeight: "bolder" }}
          >
            MISHMASH
          </div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/">
                <a className="nav-link">
                  <div style={{ color: "white" }}>HOME</div>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <h3 style={{ padding: "5%" }}>PATIENT'S LOGIN:</h3>
            <div className="fadeIn"></div>
            <form>
              {/* <input
                type="text"
                id="login"
                className="fadeIn"
                name="login"
                placeholder="ADDRESS"
                style={{ border: "1px solid black" }}
                onChange={this.captureaddress}
              /> */}
              <Link to="/patient/viewrecords">
              <button
              id="Log In"
                type="text"
                className="btn btn-primary fadeIn"
                defaultValue="Log In"
                onClick={this.sendaddress}
              >
                Log In
              </button>
              </Link>
            </form>
            <br />
            <div id="formFooter">
              <a className="underlineHover" href="#">
                Forgot Credentials?
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class loginTechnician extends React.Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    this.setState({ labaddress: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = HealthCare.networks[networkId]
    if (networkData) {
      const contract1 = new web3.eth.Contract(HealthCare.abi, networkData.address)
      this.setState({ contract1 })
      // const memeHash = await contract.methods.get().call()
      // this.setState({ memeHash })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      patientHash: '',
      contract1: null,
      web3: null,

      account: null,
      labaddress: null
    }
  }
  // captureaddress = (event) => {
  //   event.preventDefault()
  //   this.setState({ labaddress: event.target.value });
  //   console.log(event.target.value);
  // }
  sendaddress =async (event) => {
    const flag = await this.state.contract1.methods.verifyTechnician(this.state.labaddress).call();
    if(flag==true)
    {
      return this.props.history.push('/technician/permissions/ViewUpload');
    }
    else{
      alert('user not registered');
    }
  }
  
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-light">
          <div
            className="nav-item active"
            style={{ color: "white", fontWeight: "bolder" }}
          >
            MISHMASH
          </div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/">
                <a className="nav-link">
                  <div style={{ color: "white" }}>HOME</div>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <h3 style={{ padding: "5%" }}>LABTECHNICIAN'S LOGIN:</h3>
            <div className="fadeIn"></div>
            <form>
              {/* <input
                type="text"
                id="login"
                className="fadeIn"
                name="login"
                placeholder="ADDRESS"
                style={{ border: "1px solid black" }}
                onChange={this.captureaddress}
              /> */}
              <Link to="">
                <button
                  type="text"
                  className="btn btn-primary fadeIn"
                  defaultValue="Log In"
                  onClick={this.sendaddress}
                >
                  Log In
                </button>
              </Link>
            </form>
            <br />
            <div id="formFooter">
              <a className="underlineHover" href="#">
                Forgot Credentials?
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class createPermissionsDoc extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-light">
          <div
            className="nav-item active"
            style={{ color: "white", fontWeight: "bolder" }}
          >
            MISHMASH
          </div>
          <ul className="navbar-nav ml-auto">
            <Link to="/">
              <li className="nav-item">
                <a className="nav-link" style={{ color: "white !important" }}>
                  HOME
                </a>
              </li>
            </Link>
          </ul>
        </nav>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <h3 style={{ padding: "5%" }}>DOCTOR'S LOGIN:</h3>
            <h3>CREATE PERMISSION::</h3>
            <div className="fadeIn"></div>
            <form>
              <input
                type="text"
                id="login"
                className="fadeIn"
                name="login"
                style={{ border: "1px solid black" }}
                placeholder="ENTER PATIENT'S ADDRESS"
              />
              <Link to="/doctor/permissions/ViewUpload">
                <input
                  type="submit"
                  className="fadeIn"
                  defaultValue="GET DETAILS ->"
                />
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export class createPermissionsTech extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-light">
          <div
            className="nav-item active"
            style={{ color: "white", fontWeight: "bolder" }}
          >
            MISHMASH
          </div>
          <ul className="navbar-nav ml-auto">
            <Link to="/">
              <li className="nav-item">
                <a className="nav-link" style={{ color: "white !important" }}>
                  HOME
                </a>
              </li>
            </Link>
          </ul>
        </nav>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <h3 style={{ padding: "5%" }}>Technician'S LOGIN:</h3>
            <h3>CREATE PERMISSION::</h3>
            <div className="fadeIn"></div>
            <form>
              <input
                type="text"
                id="login"
                className="fadeIn"
                name="login"
                style={{ border: "1px solid black" }}
                placeholder="ENTER PATIENT'S ADDRESS"
              />
              <input
                type="submit"
                className="fadeIn"
                defaultValue="GET DETAILS ->"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export class fileViewUploadDoctor extends React.Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = IPFS.networks[networkId]
    if (networkData) {
      const contract = new web3.eth.Contract(IPFS.abi, networkData.address)
      this.setState({ contract })
      // const memeHash = await contract.methods.get().call()
      // this.setState({ memeHash })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      patientHash: '',
      contract: null,
      web3: null,
      buffer: null,
      account: null,
      pataddress: null,
      hash: null,
      patadd: null,
    }
  }
  captureHash = (event) => {
    event.preventDefault()
    this.setState({ hash: event.target.value });
    // console.log(event.target.value);

  }

  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }
  captureAddress = (event) => {
    event.preventDefault();
    this.setState({ pataddress: event.target.value });
    console.log(event.target.value);

  }
  onSubmit = (event) => {
    event.preventDefault();
    console.log("submitting the form");
    const aeskey = cryptoRandomString({ length: 32 });
    console.log('aes key', aeskey);

    const encryptedfile = encryptFile(this.state.buffer.toString(), aeskey);
    console.log('encrypted file', encryptedfile);

    // const encryptedKey = encryptKey(this.state.pataddress, aeskey);
    // console.log('Encrypted key', typeof(encryptedKey));

    const buffer1 = Buffer.from(encryptedfile.toString());
    // const encryptedKey = "1";
    ipfs.add(buffer1, (error, result) => {
      console.log('ipfs results', result[0].hash);
      console.log(this.state.pataddress);

      this.state.contract.methods.doctorSendIPFS(result[0].hash, this.state.pataddress, aeskey).send({ from: this.state.account }).then((r) => {
        console.log(this.state.pataddress);
        console.log('ipfs added');
        console.log('redirecting');
        return window.location.reload();

      })
      if (error)
        console.log(error);
    })
  }
  capturePatAddress = (event) => {
    event.preventDefault();
    this.setState({ patadd: event.target.value });
    // console.log(event.target.value);
  }
  onHashSubmit = async (event) => {
    event.preventDefault();
    console.log("decrypting");
    console.log(this.state.hash);
    const key = await this.state.contract.methods.retriveDoctorIPFS(this.state.hash).call();
    //retrieveKey = decryptKey(privatekey, key);

    console.log(key);
    if (key == "no") {
      alert('not permitted for this record');
    }
    else {


      ipfs.get(this.state.hash, function (err, files) {
        files.forEach((file) => {
          console.log('content in word array', file.content);
          const content = uintToString(file.content);
          const decryptedfile = decryptFile(content, key);
          console.log('on index side', decryptedfile);
          var blob = new Blob([decryptedfile], { type: "text/plain;charset=utf-8" });
          FileSaver.saveAs(blob, "doc.txt");

        })
      })
      console.log("tadda");


    }


  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-light">
          <div
            className="nav-item active"
            style={{ color: "white", fontWeight: "bolder" }}
          >
            MISHMASH
          </div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/">
                <li className="nav-item">
                  <a className="nav-link" style={{ color: "white !important" }}>
                    HOME
                  </a>
                </li>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <h3 style={{ padding: "1%" }}>DOCTOR'S LOGIN:</h3>
            <hr />
            <div className="fadeIn">
              {/* <button className="btn btn-danger">UPLOAD FILE</button> */}

              <form onSubmit={this.onSubmit}>
                <input type='file' onChange={this.captureFile} />
                <label>Enter your patient's public address:</label>
                <input type='text' onChange={this.captureAddress} />
                <input type='submit' />
              </form>
              {/* <br /> */}
              <h4 style={{ padding: "0%" }}>OR</h4>
              <form onSubmit={this.onHashSubmit}>
              <label>Enter ipfs hash of file:</label>
                <input
                  type="text"
                  className="form-control fadeIn "
                  style={{ border: "1px solid black" }}
                  name="hash"
                  onChange={this.captureHash}
                />

                {/* <br /> */}
                {/* <br /> */}
                {/* <label>Enter the hash of the file to view record:</label> */}

                <label>Enter your patient's public address:</label>
                <input type='text' onChange={this.capturePatAddress} />
                <input type='submit' />
              </form>
              <hr />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class fileViewUploadTechnician extends React.Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = IPFS.networks[networkId]
    if (networkData) {
      const contract = new web3.eth.Contract(IPFS.abi, networkData.address)
      this.setState({ contract })
      // const memeHash = await contract.methods.get().call()
      // this.setState({ memeHash })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      patientHash: '',
      contract: null,
      web3: null,
      buffer: null,
      account: null,
      pataddress: null,
      hash: null,
      patadd: null,
    }
  }
  captureHash = (event) => {
    event.preventDefault()
    this.setState({ hash: event.target.value });
    // console.log(event.target.value);

  }

  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }
  captureAddress = (event) => {
    event.preventDefault();
    this.setState({ pataddress: event.target.value });
    console.log(event.target.value);

  }
  onSubmit = (event) => {
    event.preventDefault();
    console.log("submitting the form");
    const aeskey = cryptoRandomString({ length: 32 });
    console.log('aes key', aeskey);

    const encryptedfile = encryptFile(this.state.buffer.toString(), aeskey);
    console.log('encrypted file', encryptedfile);

    // const encryptedKey = encryptKey(this.state.pataddress, aeskey);
    // console.log('Encrypted key', typeof(encryptedKey));

    const buffer1 = Buffer.from(encryptedfile.toString());
    // const encryptedKey = "1";
    ipfs.add(buffer1, (error, result) => {
      console.log('ipfs results', result[0].hash);
      console.log(this.state.pataddress);

      this.state.contract.methods.labSendIPFS(result[0].hash, this.state.pataddress, aeskey).send({ from: this.state.account }).then((r) => {
        console.log(this.state.pataddress);
        console.log('ipfs added');
        console.log('redirecting');
        return window.location.reload();

      })
      if (error)
        console.log(error);
    })
  }
  capturePatAddress = (event) => {
    event.preventDefault();
    this.setState({ patadd: event.target.value });
    // console.log(event.target.value);
  }
  onHashSubmit = async (event) => {
    event.preventDefault();
    console.log("decrypting");
    console.log(this.state.hash);
    const key = await this.state.contract.methods.retriveLabIPFS(this.state.hash).call();
    //retrieveKey = decryptKey(privatekey, key);

    console.log(key);
    if (key == "no") {
      alert('not permitted for this record');
    }
    else {


      ipfs.get(this.state.hash, function (err, files) {
        files.forEach((file) => {
          console.log('content in word array', file.content);
          const content = uintToString(file.content);
          const decryptedfile = decryptFile(content, key);
          console.log('on index side', decryptedfile);
          var blob = new Blob([decryptedfile], { type: "text/plain;charset=utf-8" });
          FileSaver.saveAs(blob, "doc.txt");

        })
      })
      console.log("tadda");


    }


  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-light">
          <div
            className="nav-item active"
            style={{ color: "white", fontWeight: "bolder" }}
          >
            MISHMASH
          </div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/">
                <li className="nav-item">
                  <a className="nav-link" style={{ color: "white !important" }}>
                    HOME
                  </a>
                </li>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <h3 style={{ padding: "1%" }}>LAB TECHNICIAN'S LOGIN:</h3>
            <hr />
            <div className="fadeIn">
              {/* <button className="btn btn-danger">UPLOAD FILE</button> */}

              <form onSubmit={this.onSubmit}>
                <input type='file' onChange={this.captureFile} />
                <label>Enter your patient's public address:</label>
                <input type='text' onChange={this.captureAddress} />
                <input type='submit' />
              </form>
              {/* <br /> */}
              <h4 style={{ padding: "0%" }}>OR</h4>
              <form onSubmit={this.onHashSubmit}>
              <label>Enter ipfs hash of patient:</label>
                <input
                  type="text"
                  className="form-control fadeIn "
                  style={{ border: "1px solid black" }}
                  name="hash"
                  onChange={this.captureHash}
                />

                {/* <br />
                <br /> */}
                {/* <label>Enter the hash of the file to view record:</label> */}

                <label>Enter your patient's public address:</label>
                <input type='text' onChange={this.capturePatAddress} />
                <input type='submit' />
              </form>
              <hr />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}




export class patientViewRecords extends React.Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = IPFS.networks[networkId]
    if (networkData) {
      const contract = new web3.eth.Contract(IPFS.abi, networkData.address)
      this.setState({ contract })
      // const memeHash = await contract.methods.get().call()
      // this.setState({ memeHash })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      patientHash: '',
      contract: null,
      web3: null,

      account: null,


      records: [],
      disabled: false
    }
    this.onResetArray = this.onResetArray.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  async onResetArray() {

    if (this.state.disabled) {
      return;
    }
    this.setState({ disabled: true });
    var i;
    i = 0;

    const count = await this.state.contract.methods.recordcount(this.state.account).call()

    console.log(count);
    for (i = 0; i < count; i++) {
      this.setState({
        records: [...this.state.records, await this.state.contract.methods.record(i, this.state.account).call()]
      })

      console.log(this.state.records);
    }

  };



  render() {

    return (
      <div style={{ padding: "20px" }} >
      <br />
      <hr />
      <br />
      <Link to="/patient/viewrecords/permitdoc">
        <button
          type="text"
          className="btn btn-primary fadeIn"
          defaultValue="permit doc"
          style={{ marginRight: "20px" }}
        >
          permit doc
              </button>
      </Link>
      <Link to="/patient/viewrecords/revokedoc">
        <button
          type="text"
          className="btn btn-danger fadeIn"
          defaultValue="revoke doc"
          style={{ marginRight: "20px" }}
        >
          revoke doc
              </button>
      </Link>
      <Link to="/patient/viewrecords/permitlab">
        <button
          type="text"
          className="btn btn-primary fadeIn"
          defaultValue="permit lab"
          style={{ marginRight: "20px" }}
          id="Permit Doc"
        >
          permit lab
              </button>
      </Link>
      <Link to="/patient/viewrecords/revokelab">
        <button
          type="text"
          className="btn btn-danger fadeIn"
          defaultValue="revoke lab"
          style={{ marginRight: "20px" }}
        >
          revoke lab
              </button>
      </Link>
      <br />
      <br />
      <hr />
      <button disabled={this.state.disabled} type="button" onClick={this.onResetArray}>
        show
              </button>
      <br />
      <br />
      <ul>
        {this.state.records.map(function (record, i) {
          return <li><a href={"https://ipfs.infura.io/ipfs/" + record} >
            https://ipfs.infura.io/ipfs/{record}  </a></li>
        })}
      </ul>
    </div>
      



    );
  }
}
export class permitdoc extends React.Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = IPFS.networks[networkId]
    if (networkData) {
      const contract = new web3.eth.Contract(IPFS.abi, networkData.address)
      this.setState({ contract })
      // const memeHash = await contract.methods.get().call()
      // this.setState({ memeHash })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      patientHash: '',
      contract: null,
      web3: null,
      buffer: null,
      account: null,
      docaddress: null,
      hash: null,
      patadd: null,
    }
  }
  captureHash = (event) => {
    event.preventDefault()
    this.setState({ hash: event.target.value });
    // console.log(event.target.value);

  }


  captureAddress = (event) => {
    event.preventDefault();
    this.setState({ docaddress: event.target.value });
    console.log(event.target.value);

  }

  onHashSubmit = async (event) => {
    event.preventDefault();
    console.log("decrypting");
    console.log(this.state.hash);
    const key = await this.state.contract.methods.retrivePatientIPFS(this.state.hash).call();
    //retrieveKey = decryptKey(privatekey, key);

    this.state.contract.methods.createPermissionForDoctor(this.state.hash, key).send({ from: this.state.account }).then((r) => {
      console.log(this.state.pataddress);
      console.log('permission set');
      return window.location.reload();

    })
    // if (error)
    //   console.log(error);





  }



  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-light">
          <div
            className="nav-item active"
            style={{ color: "white", fontWeight: "bolder" }}
          >
            MISHMASH
          </div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/">
                <li className="nav-item">
                  <a className="nav-link" style={{ color: "white !important" }}>
                    HOME
                  </a>
                </li>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <h3 style={{ padding: "1%" }}>PATIENT'S LOGIN:</h3>
            <hr />
            <div className="fadeIn">
              {/* <button className="btn btn-danger">UPLOAD FILE</button> */}

              {/* <form onSubmit={this.onSubmit}>
              <input type='file' onChange={this.captureFile} />
              <label>Enter your patient's public address:</label>
              <input type='text' onChange={this.captureAddress} />
              <input type='submit' />
            </form>
            <br />
            <h4 style={{ padding: "0%" }}>OR</h4> */}
              <form onSubmit={this.onHashSubmit}>
                <label>Enter address of doctor:</label>
                <input
                  type="text"
                  className="form-control fadeIn "
                  style={{ border: "1px solid black" }}
                  name="hash"
                  onChange={this.captureAddress}
                />
                <label>Enter the hash of the file to view record:</label>
                <input
                  type="text"
                  className="form-control fadeIn "
                  style={{ border: "1px solid black" }}
                  name="hash"
                  onChange={this.captureHash}
                />

                <br />
                <br />
                {/*  */}

                {/* <label>Enter your patient's public address:</label>
              <input type='text' onChange={this.capturePatAddress} />
               */}
                <input type='submit' />
              </form>
              <hr />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }

}
export class revokedoc extends React.Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = IPFS.networks[networkId]
    if (networkData) {
      const contract = new web3.eth.Contract(IPFS.abi, networkData.address)
      this.setState({ contract })
      // const memeHash = await contract.methods.get().call()
      // this.setState({ memeHash })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      patientHash: '',
      contract: null,
      web3: null,
      buffer: null,
      account: null,
      docaddress: null,
      hash: null,
      patadd: null,
    }
  }
  captureHash = (event) => {
    event.preventDefault()
    this.setState({ hash: event.target.value });
    // console.log(event.target.value);

  }


  captureAddress = (event) => {
    event.preventDefault();
    this.setState({ docaddress: event.target.value });
    console.log(event.target.value);

  }

  onHashSubmit = async (event) => {
    event.preventDefault();

    console.log(this.state.hash);

    //retrieveKey = decryptKey(privatekey, key);

    this.state.contract.methods.removeForDoctor(this.state.hash).send({ from: this.state.account }).then((r) => {
      console.log(this.state.pataddress);
      console.log('permission revoked');
      return window.location.reload();

    })
    // if (error)
    //   console.log(error);





  }



  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-light">
          <div
            className="nav-item active"
            style={{ color: "white", fontWeight: "bolder" }}
          >
            MISHMASH
          </div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/">
                <li className="nav-item">
                  <a className="nav-link" style={{ color: "white !important" }}>
                    HOME
                  </a>
                </li>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <h3 style={{ padding: "1%" }}>PATIENT'S LOGIN:</h3>
            <hr />
            <div className="fadeIn">
              {/* <button className="btn btn-danger">UPLOAD FILE</button> */}

              {/* <form onSubmit={this.onSubmit}>
              <input type='file' onChange={this.captureFile} />
              <label>Enter your patient's public address:</label>
              <input type='text' onChange={this.captureAddress} />
              <input type='submit' />
            </form>
            <br />
            <h4 style={{ padding: "0%" }}>OR</h4> */}
              <form onSubmit={this.onHashSubmit}>
                <label>Enter address of doctor:</label>
                <input
                  type="text"
                  className="form-control fadeIn "
                  style={{ border: "1px solid black" }}
                  name="hash"
                  onChange={this.captureAddress}
                />
                <label>Enter the hash of the file to view record:</label>
                <input
                  type="text"
                  className="form-control fadeIn "
                  style={{ border: "1px solid black" }}
                  name="hash"
                  onChange={this.captureHash}
                />

                <br />
                <br />
                {/*  */}

                {/* <label>Enter your patient's public address:</label>
              <input type='text' onChange={this.capturePatAddress} />
               */}
                <input type='submit' />
              </form>
              <hr />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }

}
export class permitlab extends React.Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = IPFS.networks[networkId]
    if (networkData) {
      const contract = new web3.eth.Contract(IPFS.abi, networkData.address)
      this.setState({ contract })
      // const memeHash = await contract.methods.get().call()
      // this.setState({ memeHash })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      patientHash: '',
      contract: null,
      web3: null,
      buffer: null,
      account: null,
      docaddress: null,
      hash: null,
      patadd: null,
    }
  }
  captureHash = (event) => {
    event.preventDefault()
    this.setState({ hash: event.target.value });
    // console.log(event.target.value);

  }


  captureAddress = (event) => {
    event.preventDefault();
    this.setState({ docaddress: event.target.value });
    console.log(event.target.value);

  }

  onHashSubmit = async (event) => {
    event.preventDefault();
    console.log("decrypting");
    console.log(this.state.hash);
    const key = await this.state.contract.methods.retrivePatientIPFS(this.state.hash).call();
    //retrieveKey = decryptKey(privatekey, key);

    this.state.contract.methods.createPermissionForLab(this.state.hash, key).send({ from: this.state.account }).then((r) => {
      console.log(this.state.pataddress);
      console.log('permission set');
      return window.location.reload();

    })
    // if (error)
    //   console.log(error);





  }



  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-light">
          <div
            className="nav-item active"
            style={{ color: "white", fontWeight: "bolder" }}
          >
            MISHMASH
          </div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/">
                <li className="nav-item">
                  <a className="nav-link" style={{ color: "white !important" }}>
                    HOME
                  </a>
                </li>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <h3 style={{ padding: "1%" }}>PATIENT'S LOGIN:</h3>
            <hr />
            <div className="fadeIn">
              {/* <button className="btn btn-danger">UPLOAD FILE</button> */}

              {/* <form onSubmit={this.onSubmit}>
              <input type='file' onChange={this.captureFile} />
              <label>Enter your patient's public address:</label>
              <input type='text' onChange={this.captureAddress} />
              <input type='submit' />
            </form>
            <br />
            <h4 style={{ padding: "0%" }}>OR</h4> */}
              <form onSubmit={this.onHashSubmit}>
                <label>Enter address of lab technician:</label>
                <input
                  type="text"
                  className="form-control fadeIn "
                  style={{ border: "1px solid black" }}
                  name="hash"
                  onChange={this.captureAddress}
                />
                <label>Enter the hash of the file to view record:</label>
                <input
                  type="text"
                  className="form-control fadeIn "
                  style={{ border: "1px solid black" }}
                  name="hash"
                  onChange={this.captureHash}
                />

                <br />
                <br />
                {/*  */}

                {/* <label>Enter your patient's public address:</label>
              <input type='text' onChange={this.capturePatAddress} />
               */}
                <input type='submit' />
              </form>
              <hr />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }

}
export class revokelab extends React.Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = IPFS.networks[networkId]
    if (networkData) {
      const contract = new web3.eth.Contract(IPFS.abi, networkData.address)
      this.setState({ contract })
      // const memeHash = await contract.methods.get().call()
      // this.setState({ memeHash })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      patientHash: '',
      contract: null,
      web3: null,
      buffer: null,
      account: null,
      docaddress: null,
      hash: null,
      patadd: null,
    }
  }
  captureHash = (event) => {
    event.preventDefault()
    this.setState({ hash: event.target.value });
    // console.log(event.target.value);

  }


  captureAddress = (event) => {
    event.preventDefault();
    this.setState({ docaddress: event.target.value });
    console.log(event.target.value);

  }

  onHashSubmit = async (event) => {
    event.preventDefault();


    //retrieveKey = decryptKey(privatekey, key);

    this.state.contract.methods.removeForLab(this.state.hash).send({ from: this.state.account }).then((r) => {
      console.log(this.state.pataddress);
      console.log('permission set');
      return window.location.reload();

    })
    // if (error)
    //   console.log(error);





  }



  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-light">
          <div
            className="nav-item active"
            style={{ color: "white", fontWeight: "bolder" }}
          >
            MISHMASH
          </div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/">
                <li className="nav-item">
                  <a className="nav-link" style={{ color: "white !important" }}>
                    HOME
                  </a>
                </li>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <h3 style={{ padding: "1%" }}>PATIENT'S LOGIN:</h3>
            <hr />
            <div className="fadeIn">
              {/* <button className="btn btn-danger">UPLOAD FILE</button> */}

              {/* <form onSubmit={this.onSubmit}>
              <input type='file' onChange={this.captureFile} />
              <label>Enter your patient's public address:</label>
              <input type='text' onChange={this.captureAddress} />
              <input type='submit' />
            </form>
            <br />
            <h4 style={{ padding: "0%" }}>OR</h4> */}
              <form onSubmit={this.onHashSubmit}>
                <label>Enter address of lab technician:</label>
                <input
                  type="text"
                  className="form-control fadeIn "
                  style={{ border: "1px solid black" }}
                  name="hash"
                  onChange={this.captureAddress}
                />
                <label>Enter the hash of the file to view record:</label>
                <input
                  type="text"
                  className="form-control fadeIn "
                  style={{ border: "1px solid black" }}
                  name="hash"
                  onChange={this.captureHash}
                />

                <br />
                <br />
                {/*  */}

                {/* <label>Enter your patient's public address:</label>
              <input type='text' onChange={this.capturePatAddress} />
               */}
                <input type='submit' />
              </form>
              <hr />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }

}


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={application} />
      <Route exact path="/doctor" component={loginDoctor} />
      <Route
        exact
        path="/doctor/permissions"
        component={createPermissionsDoc}
      />
      <Route
        exact
        path="/doctor/permissions/ViewUpload"
        component={fileViewUploadDoctor}
      />
      <Route
        exact
        path="/technician/permissions/ViewUpload"
        component={fileViewUploadTechnician}
      />
      <Route exact path="/patient" component={loginPatient} />
      <Route exact path="/technician" component={loginTechnician} />
      <Route
        exact
        path="/technician/permissions"
        component={createPermissionsTech}
      />
      <Route
        exact
        path="/patient/viewrecords"
        component={patientViewRecords}
      />
      <Route
        exact
        path="/patient/viewrecords/permitdoc"
        component={permitdoc}
      />
      <Route
        exact
        path="/patient/viewrecords/permitlab"
        component={permitlab}
      />
      <Route
        exact
        path="/patient/viewrecords/revokelab"
        component={revokelab}
      />
      <Route
        exact
        path="/patient/viewrecords/revokedoc"
        component={revokedoc}
      />
    </Switch>
  </BrowserRouter >,
  document.getElementById("root")
);
