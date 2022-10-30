const solc = require("solc");
const fs = require("fs");
const Web3 = require("web3");

const web3 = new Web3("HTTP://127.0.0.1:7545");

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
console.log(output);

const ABI = output.contracts["demo.sol"]["demo"].abi;
const bytecode = output.contracts["demo.sol"]["demo"].evm.bytecode;
console.log(ABI, bytecode);
