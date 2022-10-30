// remix ide to ganache to web3.js

const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");

// console.log(web3);

// const contract = new web3.eth.Contract(Abi, address_of_contract)
const contract = new web3.eth.Contract(
  [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_x",
          type: "uint256",
        },
      ],
      name: "setX",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "x",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  "0x868003ecaA93A3b2bE44758f578F41BB8c85A1aC"
);

// console.log(contract);
contract.methods
  .x()
  .call()
  .then((r) => console.log(r));

contract.methods
  .setX(10)
  .send({ from: "0xaEA4e665291fdBFe4bAFc5b81F6F213551180ab5" })
  .then((r) => console.log(r));
