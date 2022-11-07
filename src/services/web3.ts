import { ethers } from "ethers";
import Web3 from "web3";
import web3 from "web3";
import deployer from "../keezContracts/deps/UniversalProfile.sol/UniversalProfile.json";
import permission from "../keezContracts/Dao/DaoPermissions.sol/DaoPermissions.json";

export const getAccountBalance = async (web3: Web3, account: string) => {
  return parseFloat(web3.utils.fromWei(await web3.eth.getBalance(account)));
};

export const requestAccount = async (web3: Web3) => {
  const accountsRequest: string[] = await web3.eth.requestAccounts();
  console.log(accountsRequest);
  return accountsRequest[0];
};

export const universalProfileContract = (address: string) => {
  const Web3 = new web3("https://rpc.l16.lukso.network/");
  // const provider = new ethers.providers.JsonRpcProvider(
  //   "https://rpc.l16.lukso.network/"
  // );
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();
  // const contract = new ethers.Contract("address", deployer.abi as any, signer);
  // let method: any = new Web3.eth.Contract(deployer.abi as any, address).methods;
  let method: any = new Web3.eth.Contract(deployer.abi as any, address).methods;
  // return contract;
  return method;
};
export const permissionContract = async (
  address: string,
  profile: string,
  permissionByte: number
) => {
  // const Web3 = new web3("https://rpc.l16.lukso.network/");
  // const provider = new ethers.providers.JsonRpcProvider(
  //   "https://rpc.l16.lukso.network/"
  // );
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, permission.abi as any, signer);
  await contract.addPermissions(
    profile,
    ethers.utils.hexZeroPad(ethers.utils.hexValue(permissionByte), 32)
  );

  // let method: any = new Web3.eth.Contract(deployer.abi as any, address).methods;
  // let method: any = new Web3.eth.Contract(permission.abi as any, address)
  //   .methods;
  // return contract;
  return contract;
};
