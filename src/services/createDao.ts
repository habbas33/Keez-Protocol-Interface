import UniversalReceiverDelegateUPJSON from '../contracts/artifacts/contracts/deps/UniversalReceiverDelegateUP.sol/UniversalReceiverDelegateUP.json';
import UniversalReceiverDelegateVaultJSON from '../contracts/artifacts/contracts/deps/UniversalReceiverDelegateVault.sol/UniversalReceiverDelegateVault.json';
import UniversalProfileJSON from '../contracts/artifacts/contracts/deps/UniversalProfile.sol/UniversalProfile.json';
import VaultJSON from '../contracts/artifacts/contracts/deps/Vault.sol/Vault.json';
import KeyManagerJSON from '../contracts/artifacts/contracts/deps/KeyManager.sol/KeyManager.json';
import DaoPermissionsJSON from '../contracts/artifacts/contracts/Dao/DaoPermissions.sol/DaoPermissions.json';
import DaoDelegatesJSON from '../contracts/artifacts/contracts/Dao/DaoDelegates.sol/DaoDelegates.json';
import DaoProposalsJSON from '../contracts/artifacts/contracts/Dao/DaoProposals.sol/DaoProposals.json';
import { fetchErc725Data } from './erc725'
import Web3 from 'web3';
import { DAO_CREATOR_ADDRESS, RPC_URL } from '../constants/globals'
// import Web3 from 'web3';
import { AbiItem } from 'web3-utils'
// import { ethers } from "hardhat";
import { ethers } from "ethers";


export const createDao = async (DaoUpMetadata: any,metalink:string) => {
    console.log("DaoUpMetadata",JSON.stringify(DaoUpMetadata))
    const creator = DaoUpMetadata.daoProfile.creator;
    const votingParameters = DaoUpMetadata.votingParameters;
    console.log("votingParameters",votingParameters)
    console.log("participationRate",votingParameters.minExecutionDelay*24*3600)

    let addressArray = []
    let permissionArray = []
    for (let i=0; i<DaoUpMetadata.keyPermissions.length; i++) {
        const upAddress=DaoUpMetadata.keyPermissions[i].upAddress;
        const permissions=DaoUpMetadata.keyPermissions[i].keyPermissions;
        
        addressArray.push(upAddress)
        const permissionbyte = (permissions.registerVotes<<7) +(permissions.removePermission<<6) +(permissions.addPermission<<5) +(permissions.receiveDelegate<<4) +(permissions.sendDelegate<<3) 
            +(permissions.execute<<2) +(permissions.propose<<1) + permissions.vote; 
        permissionArray.push(ethers.utils.hexZeroPad(ethers.utils.hexValue(permissionbyte), 32))
    }
    console.log(addressArray)
    console.log(permissionArray)

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log("provider",provider);

    const signer = provider.getSigner();
    const owner = await signer.getAddress();
    console.log("signer",signer); 
    const UniversalReceiverDelegateUP  = new ethers.ContractFactory(UniversalReceiverDelegateUPJSON.abi, UniversalReceiverDelegateUPJSON.bytecode, signer);
    const universalReceiverDelegateUP  = await UniversalReceiverDelegateUP.deploy();
    await universalReceiverDelegateUP.deployTransaction.wait();
    console.log("universalReceiverDelegateUP"," is deployed",universalReceiverDelegateUP.address); 

    // const UniversalReceiverDelegateVault  = new ethers.ContractFactory(UniversalReceiverDelegateVaultJSON.abi, UniversalReceiverDelegateVaultJSON.bytecode, signer);
    // const universalReceiverDelegateVault  = await UniversalReceiverDelegateVault.deploy();
    // await universalReceiverDelegateVault.deployTransaction.wait();
    // console.log("universalReceiverDelegateVault"," is deployed",universalReceiverDelegateVault.address); 

    const UniversalProfile  = new ethers.ContractFactory(UniversalProfileJSON.abi, UniversalProfileJSON.bytecode, signer);
    const universalProfile  = await UniversalProfile.deploy(owner,universalReceiverDelegateUP.address);
    await universalProfile.deployTransaction.wait();
    console.log("universalProfile"," is deployed",universalProfile.address); 

    // const Vault  = new ethers.ContractFactory(VaultJSON.abi, VaultJSON.bytecode, signer);
    // const vault  = await Vault.deploy(owner,universalReceiverDelegateVault.address);
    // await vault.deployTransaction.wait();
    // console.log("vault"," is deployed",vault.address); 

    const KeyManager  = new ethers.ContractFactory(KeyManagerJSON.abi, KeyManagerJSON.bytecode, signer);
    const keyManager  = await KeyManager.deploy(universalProfile.address);
    await keyManager.deployTransaction.wait();
    console.log("keyManager"," is deployed",keyManager.address); 

    // const DaoPermissions  = new ethers.ContractFactory(DaoPermissionsJSON.abi, DaoPermissionsJSON.bytecode, signer);
    // const daoPermissions  = await DaoPermissions.deploy(universalProfile.address, keyManager.address);
    // await daoPermissions.deployTransaction.wait();
    // console.log("daoPermissions"," is deployed",daoPermissions.address); 

    // const DaoDelegates  = new ethers.ContractFactory(DaoDelegatesJSON.abi, DaoDelegatesJSON.bytecode, signer);
    // const daoDelegates  = await DaoDelegates.deploy(universalProfile.address, keyManager.address);
    // await daoDelegates.deployTransaction.wait();
    // console.log("daoDelegates"," is deployed",daoDelegates.address); 

    // const DaoProposals  = new ethers.ContractFactory(DaoProposalsJSON.abi, DaoProposalsJSON.bytecode, signer);
    // const daoProposals  = await DaoProposals.deploy(universalProfile.address, keyManager.address);
    // await daoProposals.deployTransaction.wait();
    // console.log("daoProposals"," is deployed",daoProposals.address); 



    console.log("daos loaded");
    // Initialize the dao with new members.
    try {
        await universalProfile.connect(signer).setDaoData(
            ethers.utils.hexlify(ethers.utils.toUtf8Bytes("https://somelink.com/")),
            ethers.utils.hexZeroPad(ethers.utils.hexValue(50), 32),//voting parameters
            ethers.utils.hexZeroPad(ethers.utils.hexValue(50), 32),//
            ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
            [
              owner,
              "0xD068de153Da11d1635efA93E6872E09d3a26b219",
              "0xCE49C5CD51B9a664a731bad461d2901F73B86ccb"
            ],
            [
              "0x00000000000000000000000000000000000000000000000000000000000000ff",
              "0x00000000000000000000000000000000000000000000000000000000000000ff",
              "0x00000000000000000000000000000000000000000000000000000000000000ff"
            ]
          );
        // await universalProfile.connect(signer).setDaoData(
        //     ethers.utils.hexlify(ethers.utils.toUtf8Bytes(metalink)),
        //     ethers.utils.hexZeroPad(ethers.utils.hexValue(Number(votingParameters.votingMajority)), 32),
        //     ethers.utils.hexZeroPad(ethers.utils.hexValue(Number(votingParameters.participationRate)), 32),
        //     ethers.utils.hexZeroPad(ethers.utils.hexValue(Number(votingParameters.minimumVotingDelay)*24*3600), 32),
        //     ethers.utils.hexZeroPad(ethers.utils.hexValue(Number(votingParameters.minVotingPeriod)*24*3600), 32),
        //     ethers.utils.hexZeroPad(ethers.utils.hexValue(Number(votingParameters.minExecutionDelay)*24*3600), 32),
        //     addressArray,
        //     permissionArray
        //   );
          console.log("dataset");
    } catch (error) {
        console.log(error)
        
    }

    try {
        await universalProfile.giveOwnerPermissionToChangeOwner();
        console.log("giveOwnerPermissionToChangeOwner");
    } catch (error) {
        console.log(error)
    }   

    // try {
    //     await universalProfile.setControllerPermissionsForDao(
    //     daoPermissions.address,
    //     daoDelegates.address,
    //     daoProposals.address
    //     );
    //     console.log("setControllerPermissionsForDao", daoPermissions.address);
    // } catch (error) {
    //     console.log(error)
    // } 
    // // Giving the ownership of the Universal Profile to the Key Manager.
  
    try {
        await universalProfile.transferOwnership(keyManager.address);
        console.log("transferOwnership");
    } catch (error) {
        console.log(error)
    } 

    let ABI = ["function claimOwnership()"];
    let iface = new ethers.utils.Interface(ABI);

    try {
        await keyManager.execute(iface.encodeFunctionData("claimOwnership"));
        console.log("execute", universalReceiverDelegateUP.address);
    } catch (error) {
        console.log(error)
    } 
    const vault = new ethers.Contract("0x5BF732ECCB219666d5B1AF91df13269E859428F9", VaultJSON.abi, signer);
    // const keyManager = new ethers.Contract("0xF9bB27367b9F25C8744DcdE01E28DB5b3701AaC1", KeyManagerJSON.abi, signer);
    const daoPermissions = new ethers.Contract("0x039f2baAbDCA3E5A66b11b7fF9d45B458bbe29D1", DaoPermissionsJSON.abi, signer);
    const daoDelegates = new ethers.Contract("0x0a3C73AB9DD7431fc8cb7BE1E76b21C2EEa4b679", DaoDelegatesJSON.abi, signer);
    const daoProposals = new ethers.Contract("0xb9572A8B3838f8Ce787591C18bEe054567a7885f", DaoProposalsJSON.abi, signer);
    return {
        universalReceiverDelegateUP,
        universalProfile,
        vault,
        keyManager,
        daoPermissions,
        daoDelegates,
        daoProposals,
      };
}

export const testDao = async () => {
    const providerx = new Web3.providers.HttpProvider(RPC_URL);
    console.log("provider web 3",providerx)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log("provider",provider);


    const signer = provider.getSigner();
    // console.log("signer",Signer.isSigner(signer)); 
    console.log("signer",signer.getAddress()); 
    console.log("signeraddress",await signer.getChainId()); 
    // console.log("signeraddress",signer.getChainId); 

    // const universalReceiverDelegateUP = new ethers.Contract("0x26Be0700a45eB157B746781c78a0acf63691bE15", UniversalReceiverDelegateUPJSON.abi, signer); 
    // const universalReceiverDelegateVault = new ethers.Contract("0xaeDf8489Ceda262AC180214d5C994C4265272E7b", UniversalReceiverDelegateVaultJSON.abi, signer);
    const universalProfile = new ethers.Contract("0x7ef1505769eB233D38B4435A3dD030b0f725cfA0", UniversalProfileJSON.abi, signer);
    // const vault = new ethers.Contract("0x5BF732ECCB219666d5B1AF91df13269E859428F9", VaultJSON.abi, signer);
    // const keyManager = new ethers.Contract("0xF9bB27367b9F25C8744DcdE01E28DB5b3701AaC1", KeyManagerJSON.abi, signer);
    // const daoPermissions = new ethers.Contract("0x039f2baAbDCA3E5A66b11b7fF9d45B458bbe29D1", DaoPermissionsJSON.abi, signer);
    // const daoDelegates = new ethers.Contract("0x0a3C73AB9DD7431fc8cb7BE1E76b21C2EEa4b679", DaoDelegatesJSON.abi, signer);
    // const daoProposals = new ethers.Contract("0xb9572A8B3838f8Ce787591C18bEe054567a7885f", DaoProposalsJSON.abi, signer);

    // const RPC_ENDPOINT = "https://rpc.l16.lukso.network";

    // const web3 = new Web3(RPC_ENDPOINT);
    // try {
    //     console.log("signed");
    //     await universalProfile.connect(signer).setDaoData(
    //             ethers.utils.hexlify(ethers.utils.toUtf8Bytes("https://somelink.com/")),
    //             ethers.utils.hexZeroPad(ethers.utils.hexValue(50), 32),//voting parameters
    //             ethers.utils.hexZeroPad(ethers.utils.hexValue(50), 32),//
    //             ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
    //             ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
    //             ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
    //             [
    //               "0x2aaddE1ff0d029f792FaBFE531F57f1C1856Ae1D"
    //             ],
    //             [
    //               "0x00000000000000000000000000000000000000000000000000000000000000ff"
    //             ]
    //       );
    //       console.log("dataset", universalProfile.address);
    // } catch (error) {
    //     console.log(error)
    // }

    
    // try {
    //     await universalProfile.giveOwnerPermissionToChangeOwner();
    //     console.log("giveOwnerPermissionToChangeOwner", daoDelegates.address);
    // } catch (error) {
    //     console.log(error)
    // }   

    // try {
    //     await universalProfile.setControllerPermissionsForDao(
    //     daoPermissions.address,
    //     daoDelegates.address,
    //     daoProposals.address
    //     );
    //     console.log("setControllerPermissionsForDao", daoPermissions.address);
    // } catch (error) {
    //     console.log(error)
    // } 
    // Giving the ownership of the Universal Profile to the Key Manager.
  
    // try {
    //     const x = await universalProfile.transferOwnership(keyManager.address);
    //     console.log("transferOwnership", x);
    // } catch (error) {
    //     console.log(error)
    // } 

    // let ABI = ["function claimOwnership()"];
    // let iface = new ethers.utils.Interface(ABI);

    // try {
    //     await keyManager.execute(iface.encodeFunctionData("claimOwnership"));
    //     console.log("execute", universalReceiverDelegateUP.address);
    // } catch (error) {
    //     console.log(error)
    // } 

    const keys = [
        "0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47",
        "0xeafec4d89fa9619884b60000abe425d64acd861a49b8ddf5c0b6962110481f38"
      ];

    // try {
    //     //@ts-ignore
    //     const myUniversalProfile = new web3.eth.Contract(UniversalProfileJSON.abi, "0x9FfA276481ea663E96Ed32cc097F7Ba7cf2142FB");
    //     // const keyManagerAddress = await myUniversalProfile.methods.owner().call();
    //     console.log("result")
    //     const result = await myUniversalProfile.methods["getData(bytes32[])"](keys).call();
    //     console.log(result)
    // } catch (error) {
    //     console.log(error) 
    // }


    try {
        const get_data = await universalProfile["getData(bytes32[])"](keys);
        
        // console.log("this")
        console.log("this",get_data)
    } catch (error) {
       console.log(error) 
    }  
}

// The Contract interface
// let abi = [
//     "event ValueChanged(address indexed author, string oldValue, string newValue)",
//     "constructor(string value)",
//     "function getValue() view returns (string value)",
//     "function setValue(string value)"
// ];


    // let contractAddress = "0x3D0C0566B4E290366FeF431c12BE37e650bfdd79";
    // let contract = new ethers.Contract(contractAddress, abi, provider);
    // let currentValue = await contract.getValue();
    // console.log(currentValue);

// // The bytecode from Solidity, compiling the above source
// let bytecode = "0x608060405234801561001057600080fd5b506040516105bd3803806105bd8339" +
//                  "8101604081815282518183526000805460026000196101006001841615020190" +
//                  "91160492840183905293019233927fe826f71647b8486f2bae59832124c70792" +
//                  "fba044036720a54ec8dacdd5df4fcb9285919081906020820190606083019086" +
//                  "9080156100cd5780601f106100a2576101008083540402835291602001916100" +
//                  "cd565b820191906000526020600020905b815481529060010190602001808311" +
//                  "6100b057829003601f168201915b505083810382528451815284516020918201" +
//                  "9186019080838360005b838110156101015781810151838201526020016100e9" +
//                  "565b50505050905090810190601f16801561012e578082038051600183602003" +
//                  "6101000a031916815260200191505b5094505050505060405180910390a28051" +
//                  "610150906000906020840190610157565b50506101f2565b8280546001816001" +
//                  "16156101000203166002900490600052602060002090601f0160209004810192" +
//                  "82601f1061019857805160ff19168380011785556101c5565b82800160010185" +
//                  "5582156101c5579182015b828111156101c55782518255916020019190600101" +
//                  "906101aa565b506101d19291506101d5565b5090565b6101ef91905b80821115" +
//                  "6101d157600081556001016101db565b90565b6103bc806102016000396000f3" +
//                  "0060806040526004361061004b5763ffffffff7c010000000000000000000000" +
//                  "0000000000000000000000000000000000600035041663209652558114610050" +
//                  "57806393a09352146100da575b600080fd5b34801561005c57600080fd5b5061" +
//                  "0065610135565b60408051602080825283518183015283519192839290830191" +
//                  "85019080838360005b8381101561009f57818101518382015260200161008756" +
//                  "5b50505050905090810190601f1680156100cc57808203805160018360200361" +
//                  "01000a031916815260200191505b509250505060405180910390f35b34801561" +
//                  "00e657600080fd5b506040805160206004803580820135601f81018490048402" +
//                  "8501840190955284845261013394369492936024939284019190819084018382" +
//                  "80828437509497506101cc9650505050505050565b005b600080546040805160" +
//                  "20601f6002600019610100600188161502019095169490940493840181900481" +
//                  "0282018101909252828152606093909290918301828280156101c15780601f10" +
//                  "610196576101008083540402835291602001916101c1565b8201919060005260" +
//                  "20600020905b8154815290600101906020018083116101a457829003601f1682" +
//                  "01915b505050505090505b90565b604080518181526000805460026000196101" +
//                  "00600184161502019091160492820183905233927fe826f71647b8486f2bae59" +
//                  "832124c70792fba044036720a54ec8dacdd5df4fcb9285918190602082019060" +
//                  "60830190869080156102715780601f1061024657610100808354040283529160" +
//                  "200191610271565b820191906000526020600020905b81548152906001019060" +
//                  "200180831161025457829003601f168201915b50508381038252845181528451" +
//                  "60209182019186019080838360005b838110156102a557818101518382015260" +
//                  "200161028d565b50505050905090810190601f1680156102d257808203805160" +
//                  "01836020036101000a031916815260200191505b509450505050506040518091" +
//                  "0390a280516102f49060009060208401906102f8565b5050565b828054600181" +
//                  "600116156101000203166002900490600052602060002090601f016020900481" +
//                  "019282601f1061033957805160ff1916838001178555610366565b8280016001" +
//                  "0185558215610366579182015b82811115610366578251825591602001919060" +
//                  "01019061034b565b50610372929150610376565b5090565b6101c991905b8082" +
//                  "1115610372576000815560010161037c5600a165627a7a723058202225a35c50" +
//                  "7b31ac6df494f4be31057c7202b5084c592bdb9b29f232407abeac0029";



                 // //1. instantiate your contracts
    // const DaoCreatorInst = new web3.eth.Contract(DaoCreator.abi as AbiItem[], DAO_CREATOR_ADDRESS);
    // // try {
    // //     console.log(_account);
    // //     await DaoCreatorInst.methods.createUniversalProfile("keez", "urrr").send({from : _account});
    // // } catch (err) {
    // //     console.log(err);
    // // }

    // const result = await DaoCreatorInst.methods.getAddresses().call({from : _account});
    // console.log(result)
    
    // const result2 = await DaoCreatorInst.methods.getDaoProfile().call({from : _account});
    // console.log("this - ",result2)
    
    // 0x32e5ebea48c9b15d17a6f75ae1f584e4a91e3b1f2b0b121f9012cf8176cf1548
    // 0x3D0C0566B4E290366FeF431c12BE37e650bfdd79