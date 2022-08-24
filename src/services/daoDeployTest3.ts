import UniversalReceiverDelegateUPJSON from '../contracts/artifacts/contracts/deps/UniversalReceiverDelegateUP.sol/UniversalReceiverDelegateUP.json';
import UniversalReceiverDelegateVaultJSON from '../contracts/artifacts/contracts/deps/UniversalReceiverDelegateVault.sol/UniversalReceiverDelegateVault.json';
import UniversalProfileJSON from '../contracts/artifacts/contracts/deps/UniversalProfile.sol/UniversalProfile.json';
import VaultJSON from '../contracts/artifacts/contracts/deps/Vault.sol/Vault.json';
import KeyManagerJSON from '../contracts/artifacts/contracts/deps/KeyManager.sol/KeyManager.json';
import DaoPermissionsJSON from '../contracts/artifacts/contracts/Dao/DaoPermissions.sol/DaoPermissions.json';
import DaoDelegatesJSON from '../contracts/artifacts/contracts/Dao/DaoDelegates.sol/DaoDelegates.json';
import DaoProposalsJSON from '../contracts/artifacts/contracts/Dao/DaoProposals.sol/DaoProposals.json';
import { ethers } from "ethers";
import Web3 from 'web3';



const deployUniversalProfile = async () => {
    const RPC_ENDPOINT = "https://rpc.l16.lukso.network";
    const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
    const PRIVATE_KEY = '0x0e9845dd4781fd697320f65a8dfc071424893b23786420576a6360463a69e436'; 
    const myEOA = new ethers.Wallet(PRIVATE_KEY, provider);
    
    const UniversalProfile = new ethers.ContractFactory(
      UniversalProfileJSON.abi,
      UniversalProfileJSON.bytecode,
      myEOA
    );
    const universalProfile = await UniversalProfile.deploy(
      myEOA.address,
      myEOA.address
    );
  
    console.log("contract address", universalProfile.address);

    setTimeout(async() => {
        const check = await provider.getCode(universalProfile.address)
        console.log("getcode = ", check);
     }, 20000);
  }

const deployUniversalProfileFromUpExtension = async () => {

const web3 = new Web3(window.ethereum);
const accounts: string[] = await web3.eth.getAccounts();

    const provider_x = new ethers.providers.Web3Provider(window.ethereum)
    const signer_x = provider_x.getSigner();
    const owner = await signer_x.getAddress();
    console.log("owner address ",owner);

    let check = await provider_x.getCode("0xc8b9414A844973a0bF41a21f3f2bbC8EA001eb37")
    console.log("getcode = ", check);

    //  check = await provider_x.getCode("0xee91FF97AF9160A21b59Edd2240a8Af745fd9AeA")
    //   console.log("getcode = ", check);

  //   //@ts-ignore
  //   const UniversalProfile  = new web3.eth.Contract(UniversalProfileJSON.abi)

  //   const universalProfile = UniversalProfile.deploy({
  //       data: UniversalProfileJSON.bytecode,
  //       arguments: [owner,owner]
  //   })
  //   const newContractInstance = await universalProfile.send({
  //     from: accounts[0],
  //     gas: 1500000
  // })
  //   // const UniversalProfile = new ethers.ContractFactory(
  //   //   UniversalProfileJSON.abi,
  //   //   UniversalProfileJSON.bytecode,
  //   //   signer_x
  //   // );
  //   // const universalProfile = await UniversalProfile.deploy(
  //   //   owner,
  //   //   owner
  //   // );
  //   console.log("contract address", newContractInstance);
  
  //   setTimeout(async() => {
  //       const check = await provider_x.getCode(newContractInstance.options.address)
  //       console.log("getcode = ", check);
  //    }, 20000);
  
  }


export const daoDeployTest = async () => {
    deployUniversalProfile();
}

export const daoReadTest = async () => {
    deployUniversalProfileFromUpExtension();
}
export const providerTest = async () => {
    deployUniversalProfile();
}
