const solc = require("solc");
const fs = require("fs");
const Web3 = require("web3");

const web3 = new Web3("http://127.0.0.1:7545");

const fileContent = fs.readFileSync("demo.sol").toString();

// console.log(fileContent);

const input = {
  language: "Solidity",
  sources: {
    "demo.sol": {
      content: fileContent,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

//solc compiler gives us the value in JSON format and we convert the json format to object format
const output = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log(output);

const ABI = output.contracts["demo.sol"]["demo"].abi;
const bytecode = output.contracts["demo.sol"]["demo"].evm.bytecode.object;
// console.log(ABI, bytecode);
// console.log(bytecode.object);

//we are pointing this instance of contract so that we can interact
const contract = new web3.eth.Contract(ABI);

var defaultAccount;

web3.eth.getAccounts().then((acc) => {
  //   console.log(acc);
  defaultAccount = acc[0];
  console.log(defaultAccount);

  //after deploying the address of the contract is printing
  contract
    .deploy({ data: bytecode })
    .send({ from: defaultAccount, gas: 5000000 })
    .on("error", function (error) {
      console.log("error", error);
    })
    .on("transactionHash", function (transactionHash) {
      console.log("transactionHash", transactionHash);
    })
    .on("receipt", function (receipt) {
      //it will give us the contract address
      console.log("receipt", receipt.contractAddress);
    })
    .on("confirmation", function (confirmationNumber, receipt) {
      console.log("confirmation", confirmationNumber);
    })
    .then((demoContract) => {
      demoContract.methods.x().call((err, data) => {
        console.log(data);
      });
    });
});
