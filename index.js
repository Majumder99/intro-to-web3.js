const Web3 = require("web3");

//connect with ganache
// const ganacheWeb3 = new Web3(
//   new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545")
// );
// console.log(ganacheWeb3);

const web3 = new Web3("HTTP://127.0.0.1:7545");

console.log(web3);

// web3.eth.getBlockNumber(function (error, result) {
//   console.log(result);
// });

//using async/await
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber();
  console.log(latestBlockNumber);
  return latestBlockNumber;
}

getBlockNumber();

//get the balance of the account
async function getBalanceAccount() {
  const bal = await web3.eth.getBalance(
    "0xaEA4e665291fdBFe4bAFc5b81F6F213551180ab5"
  );
  console.log(bal);
  return bal;
}

getBalanceAccount();

//transact form one account to another
const transactBalance = async () => {
  const transfer = web3.eth.sendTransaction({
    from: "0xA4c4f815766B5b2B99957474B5cAa40c1d14c5Bc",
    to: "0x02DFae4d2076A473e9ee33FeF136eB0a3aB5De40",
    value: web3.utils.toWei("5", "ether"),
  });
  console.log(transfer);
};

transactBalance();
