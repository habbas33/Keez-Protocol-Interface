import UniversalReceiverDelegateUPJSON from '../contracts/artifacts/contracts/deps/UniversalReceiverDelegateUP.sol/UniversalReceiverDelegateUP.json';
import UniversalReceiverDelegateVaultJSON from '../contracts/artifacts/contracts/deps/UniversalReceiverDelegateVault.sol/UniversalReceiverDelegateVault.json';
import UniversalProfileJSON from '../contracts/artifacts/contracts/deps/UniversalProfile.sol/UniversalProfile.json';
import VaultJSON from '../contracts/artifacts/contracts/deps/Vault.sol/Vault.json';
import KeyManagerJSON from '../contracts/artifacts/contracts/deps/KeyManager.sol/KeyManager.json';
import DaoPermissionsJSON from '../contracts/artifacts/contracts/Dao/DaoPermissions.sol/DaoPermissions.json';
import DaoDelegatesJSON from '../contracts/artifacts/contracts/Dao/DaoDelegates.sol/DaoDelegates.json';
import DaoProposalsJSON from '../contracts/artifacts/contracts/Dao/DaoProposals.sol/DaoProposals.json';
import { ethers } from "ethers";

const RPC_ENDPOINT = "https://rpc.l16.lukso.network";
const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);

const PRIVATE_KEY = '0x0e9845dd4781fd697320f65a8dfc071424893b23786420576a6360463a69e436'; // add the private key of your EOA here (created in Step 1)
const myEOA = new ethers.Wallet(PRIVATE_KEY, provider);

export const daoDeployTest = async () => {
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // console.log("provider",provider);

    // const signer = provider.getSigner();
    // const owner = await signer.getAddress();
    // console.log("signer",signer); 

    const UniversalReceiverDelegateUP  = new ethers.ContractFactory(UniversalReceiverDelegateUPJSON.abi, UniversalReceiverDelegateUPJSON.bytecode, myEOA);
    const universalReceiverDelegateUP  = await UniversalReceiverDelegateUP.deploy();
    await universalReceiverDelegateUP.deployTransaction.wait();
    console.log("universalReceiverDelegateUP"," is deployed",universalReceiverDelegateUP.address); 


    // const UniversalReceiverDelegateVault  = new ethers.ContractFactory(UniversalReceiverDelegateVaultJSON.abi, UniversalReceiverDelegateVaultJSON.bytecode, myEOA);
    // const universalReceiverDelegateVault  = await UniversalReceiverDelegateVault.deploy();
    // await universalReceiverDelegateVault.deployTransaction.wait();
    // console.log("universalReceiverDelegateVault"," is deployed",universalReceiverDelegateVault.address); 

    const UniversalProfile  = new ethers.ContractFactory(UniversalProfileJSON.abi, UniversalProfileJSON.bytecode, myEOA);
    const universalProfile  = await UniversalProfile.deploy(myEOA.address,universalReceiverDelegateUP.address);
    await universalProfile.deployTransaction.wait();
    console.log("universalProfile"," is deployed",universalProfile.address); 

    // const Vault  = new ethers.ContractFactory(VaultJSON.abi, VaultJSON.bytecode, myEOA);
    // const vault  = await Vault.deploy(myEOA.address,universalReceiverDelegateVault.address);
    // await vault.deployTransaction.wait();
    // console.log("vault"," is deployed",vault.address); 

    const KeyManager  = new ethers.ContractFactory(KeyManagerJSON.abi, KeyManagerJSON.bytecode, myEOA);
    const keyManager  = await KeyManager.deploy(universalProfile.address);
    await keyManager.deployTransaction.wait();
    console.log("keyManager"," is deployed",keyManager.address); 

    // const DaoPermissions  = new ethers.ContractFactory(DaoPermissionsJSON.abi, DaoPermissionsJSON.bytecode, myEOA);
    // const daoPermissions  = await DaoPermissions.deploy(universalProfile.address, keyManager.address);
    // await daoPermissions.deployTransaction.wait();
    // console.log("daoPermissions"," is deployed",daoPermissions.address); 

    // const DaoDelegates  = new ethers.ContractFactory(DaoDelegatesJSON.abi, DaoDelegatesJSON.bytecode, myEOA);
    // const daoDelegates  = await DaoDelegates.deploy(universalProfile.address, keyManager.address);
    // await daoDelegates.deployTransaction.wait();
    // console.log("daoDelegates"," is deployed",daoDelegates.address); 

    // const DaoProposals  = new ethers.ContractFactory(DaoProposalsJSON.abi, DaoProposalsJSON.bytecode, myEOA);
    // const daoProposals  = await DaoProposals.deploy(universalProfile.address, keyManager.address);
    // await daoProposals.deployTransaction.wait();
    // console.log("daoProposals"," is deployed",daoProposals.address); 



    console.log("daos loaded");
    // Initialize the dao with new members.
    try {
        await universalProfile.connect(myEOA).setDaoData(
            ethers.utils.hexlify(ethers.utils.toUtf8Bytes("https://somelink.com/")),
            ethers.utils.hexZeroPad(ethers.utils.hexValue(50), 32),//voting parameters
            ethers.utils.hexZeroPad(ethers.utils.hexValue(50), 32),//
            ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
            [
                myEOA.address,
              "0xD068de153Da11d1635efA93E6872E09d3a26b219",
              "0xCE49C5CD51B9a664a731bad461d2901F73B86ccb"
            ],
            [
              "0x00000000000000000000000000000000000000000000000000000000000000ff",
              "0x00000000000000000000000000000000000000000000000000000000000000ff",
              "0x00000000000000000000000000000000000000000000000000000000000000ff"
            ]
          );
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
        await universalProfile.transferOwnership(keyManager.address); // this one does nothing and stops
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
    // const vault = new ethers.Contract("0x5BF732ECCB219666d5B1AF91df13269E859428F9", VaultJSON.abi, signer);
    // // const keyManager = new ethers.Contract("0xF9bB27367b9F25C8744DcdE01E28DB5b3701AaC1", KeyManagerJSON.abi, signer);
    // const daoPermissions = new ethers.Contract("0x039f2baAbDCA3E5A66b11b7fF9d45B458bbe29D1", DaoPermissionsJSON.abi, signer);
    // const daoDelegates = new ethers.Contract("0x0a3C73AB9DD7431fc8cb7BE1E76b21C2EEa4b679", DaoDelegatesJSON.abi, signer);
    // const daoProposals = new ethers.Contract("0xb9572A8B3838f8Ce787591C18bEe054567a7885f", DaoProposalsJSON.abi, signer);
    // return {
    //     universalReceiverDelegateUP,
    //     universalProfile,
    //     vault,
    //     keyManager,
    //     daoPermissions,
    //     daoDelegates,
    //     daoProposals,
    //   };
}

export const daoReadTest = async () => {

    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // console.log("provider",provider);


    // const signer = provider.getSigner();
    // console.log("signer",signer.getAddress()); 
    // console.log("signeraddress",await signer.getChainId()); 
    
    // const universalReceiverDelegateUP = new ethers.Contract("0x26Be0700a45eB157B746781c78a0acf63691bE15", UniversalReceiverDelegateUPJSON.abi, signer); 
    // const universalReceiverDelegateVault = new ethers.Contract("0xaeDf8489Ceda262AC180214d5C994C4265272E7b", UniversalReceiverDelegateVaultJSON.abi, signer);
    const universalProfile = new ethers.Contract("0x9d16ddDD1eb8beA1D29b8f26E737d9673F710897", UniversalProfileJSON.abi, myEOA);
    const check = await provider.getCode("0xaeDf8489Ceda262AC180214d5C994C4265272E7b")
    console.log("getcode = ", check);
    // const vault = new ethers.Contract("0x5BF732ECCB219666d5B1AF91df13269E859428F9", VaultJSON.abi, signer);
    // const keyManager = new ethers.Contract("0xF9bB27367b9F25C8744DcdE01E28DB5b3701AaC1", KeyManagerJSON.abi, signer);
    // const daoPermissions = new ethers.Contract("0x039f2baAbDCA3E5A66b11b7fF9d45B458bbe29D1", DaoPermissionsJSON.abi, signer);
    // const daoDelegates = new ethers.Contract("0x0a3C73AB9DD7431fc8cb7BE1E76b21C2EEa4b679", DaoDelegatesJSON.abi, signer);
    // const daoProposals = new ethers.Contract("0xb9572A8B3838f8Ce787591C18bEe054567a7885f", DaoProposalsJSON.abi, signer);

    const keys = [
        "0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47",
        "0xeafec4d89fa9619884b60000abe425d64acd861a49b8ddf5c0b6962110481f38"
      ];


    try {
        const get_data = await universalProfile["getData(bytes32[])"](keys); // this one gives error
        console.log("this",get_data)
    } catch (error) {
       console.log(error) 
    }  
}

