import UniversalReceiverDelegateUPJSON from '../contracts/artifacts/contracts/deps/UniversalReceiverDelegateUP.sol/UniversalReceiverDelegateUP.json';
import UniversalReceiverDelegateVaultJSON from '../contracts/artifacts/contracts/deps/UniversalReceiverDelegateVault.sol/UniversalReceiverDelegateVault.json';
import UniversalProfileJSON from '../contracts/artifacts/contracts/deps/UniversalProfile.sol/UniversalProfile.json';
import VaultJSON from '../contracts/artifacts/contracts/deps/Vault.sol/Vault.json';
import KeyManagerJSON from '../contracts/artifacts/contracts/deps/KeyManager.sol/KeyManager.json';
import DaoPermissionsJSON from '../contracts/artifacts/contracts/Dao/DaoPermissions.sol/DaoPermissions.json';
import DaoDelegatesJSON from '../contracts/artifacts/contracts/Dao/DaoDelegates.sol/DaoDelegates.json';
import DaoProposalsJSON from '../contracts/artifacts/contracts/Dao/DaoProposals.sol/DaoProposals.json';
import { ethers } from "ethers";



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

    const provider_x = new ethers.providers.Web3Provider(window.ethereum)
    const signer_x = provider_x.getSigner();
    const owner = await signer_x.getAddress();
    console.log("owner address ",owner);

    const UniversalProfile = new ethers.ContractFactory(
      UniversalProfileJSON.abi,
      UniversalProfileJSON.bytecode,
      signer_x
    );
    const universalProfile = await UniversalProfile.deploy(
      owner,
      owner
    );
    console.log("contract address", universalProfile.address);
  
    setTimeout(async() => {
        const check = await provider_x.getCode(universalProfile.address)
        console.log("getcode = ", check);
     }, 20000);
  
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
