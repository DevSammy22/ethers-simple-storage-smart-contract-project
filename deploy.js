//Prettier - Code formatter extension is used for different languages like js, python and solidity
const ethers = require("ethers");
const fs = require("fs-extra"); //This is to read from the abi and bin files. (Use yarn add fs-extra to install it)
require("dotenv").config(); //This is for the code to see what is in the .env file

async function main() {
    //we will be compiling the code separately
    //http://127.0.0.1:7545
    //console.log(process.env.RPC_URL);
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL); //(process.env.RPC_URL); //This is the way our script is going to connect to the local blockchain
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
    // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    //   encryptedJson,
    //   process.env.PRIVATE_KEY_PASSWORD
    // ); // we use let here because we are going to connect it with our provider
    // wallet = await wallet.connect(provider);
    const abi = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.abi",
        "utf8"
    );
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    );
    //ContractFactory is used to deploy contract
    const ContractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying, please wait...");
    const contract = await ContractFactory.deploy(); //Stop here! Wait fot contract to deploy - reason for using await
    await contract.deployTransaction.wait(1);
    //const transctionReceipt = await contract.deployTransaction.wait(1); //You only get transaction receipt when you wait for block confirmation. Otherwise, you get contract object which has deployed transaction with it
    //   console.log("Here is the deployment transaction (transaction response): ");
    //   console.log(contract.deployTransaction); // Transaction object with deployed transaction
    //   console.log("Here is the transaction receipt: ");
    //   console.log(transctionReceipt);

    //   const nonce = await wallet.getTransactionCount(); //nonce is the number of transction
    //   tx = {
    //     nonce: nonce,
    //     gasPrice: 100000000000,
    //     gasLimit: 1000000,
    //     to: null,
    //     value: 0,
    //     data: "0x608060405234801561001057600080fd5b50610941806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80632e64cec11461005c5780636057361d1461007a5780636f760f41146100965780638bab8dd5146100b25780639e7a13ad146100e2575b600080fd5b610064610113565b60405161007191906102b8565b60405180910390f35b610094600480360381019061008f9190610313565b61011c565b005b6100b060048036038101906100ab9190610486565b610126565b005b6100cc60048036038101906100c791906104e2565b6101b5565b6040516100d991906102b8565b60405180910390f35b6100fc60048036038101906100f79190610313565b6101e3565b60405161010a9291906105aa565b60405180910390f35b60008054905090565b8060008190555050565b60006040518060400160405280838152602001848152509050600281908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101908161018a91906107e6565b5050508160018460405161019e91906108f4565b908152602001604051809103902081905550505050565b6001818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b600281815481106101f357600080fd5b906000526020600020906002020160009150905080600001549080600101805461021c90610609565b80601f016020809104026020016040519081016040528092919081815260200182805461024890610609565b80156102955780601f1061026a57610100808354040283529160200191610295565b820191906000526020600020905b81548152906001019060200180831161027857829003601f168201915b5050505050905082565b6000819050919050565b6102b28161029f565b82525050565b60006020820190506102cd60008301846102a9565b92915050565b6000604051905090565b600080fd5b600080fd5b6102f08161029f565b81146102fb57600080fd5b50565b60008135905061030d816102e7565b92915050565b600060208284031215610329576103286102dd565b5b6000610337848285016102fe565b91505092915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6103938261034a565b810181811067ffffffffffffffff821117156103b2576103b161035b565b5b80604052505050565b60006103c56102d3565b90506103d1828261038a565b919050565b600067ffffffffffffffff8211156103f1576103f061035b565b5b6103fa8261034a565b9050602081019050919050565b82818337600083830152505050565b6000610429610424846103d6565b6103bb565b90508281526020810184848401111561044557610444610345565b5b610450848285610407565b509392505050565b600082601f83011261046d5761046c610340565b5b813561047d848260208601610416565b91505092915050565b6000806040838503121561049d5761049c6102dd565b5b600083013567ffffffffffffffff8111156104bb576104ba6102e2565b5b6104c785828601610458565b92505060206104d8858286016102fe565b9150509250929050565b6000602082840312156104f8576104f76102dd565b5b600082013567ffffffffffffffff811115610516576105156102e2565b5b61052284828501610458565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561056557808201518184015260208101905061054a565b60008484015250505050565b600061057c8261052b565b6105868185610536565b9350610596818560208601610547565b61059f8161034a565b840191505092915050565b60006040820190506105bf60008301856102a9565b81810360208301526105d18184610571565b90509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061062157607f821691505b602082108103610634576106336105da565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830261069c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261065f565b6106a6868361065f565b95508019841693508086168417925050509392505050565b6000819050919050565b60006106e36106de6106d98461029f565b6106be565b61029f565b9050919050565b6000819050919050565b6106fd836106c8565b610711610709826106ea565b84845461066c565b825550505050565b600090565b610726610719565b6107318184846106f4565b505050565b5b818110156107555761074a60008261071e565b600181019050610737565b5050565b601f82111561079a5761076b8161063a565b6107748461064f565b81016020851015610783578190505b61079761078f8561064f565b830182610736565b50505b505050565b600082821c905092915050565b60006107bd6000198460080261079f565b1980831691505092915050565b60006107d683836107ac565b9150826002028217905092915050565b6107ef8261052b565b67ffffffffffffffff8111156108085761080761035b565b5b6108128254610609565b61081d828285610759565b600060209050601f831160018114610850576000841561083e578287015190505b61084885826107ca565b8655506108b0565b601f19841661085e8661063a565b60005b8281101561088657848901518255600182019150602085019450602081019050610861565b868310156108a3578489015161089f601f8916826107ac565b8355505b6001600288020188555050505b505050505050565b600081905092915050565b60006108ce8261052b565b6108d881856108b8565b93506108e8818560208601610547565b80840191505092915050565b600061090082846108c3565b91508190509291505056fea2646970667358221220d69357f8d79ef85cd45e773b34d13bea13b59b587dd149b04be3ebec9b3b735564736f6c63430008110033",
    //     chanId: 5777,
    //   };
    //   //   const signedTxResponse = await wallet.signTransaction(tx); //This is to sign a transaction before sending it.
    //   //   console.log(signedTxResponse);
    //   const sendTxResponse = await wallet.sendTransaction(tx); //By sending the transaction, we all sign the transaction
    //   await sendTxResponse.wait(1);
    //   console.log(sendTxResponse);

    const currentFavoriteNumber = await contract.retrieve();
    console.log(
        `Current Favourite Number: ${currentFavoriteNumber.toString()}`
    );
    console.log("Updating favorite number...");
    const transactionResponse = await contract.store("7");
    const transctionReceipt = await transactionResponse.wait(1);
    const updatedFavouriteNumber = await contract.retrieve();
    console.log(`New Favorite Number: ${updatedFavouriteNumber}`);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

// synchronous [solidity]
// asynchronous [javascript]

// cooking
// Synchronous
// 1. Put popcorn in microwave -> Promise
// 2. Wait for popcorn to finish
// 3. Pour drinks for everyone

// Asynchronous
// 1. Put popcorn in the mircrowave
// 2. Pour drinks for everyone
// 3. Wait for popcorn to finish

// Promise
// Pending
// Fulfilled
// Rejected
