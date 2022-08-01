import DaoCreator from '../contracts/artifacts/DaoCreator.json';
import { DAO_CREATOR_ADDRESS, RPC_URL } from '../constants/globals'
import Web3 from 'web3';
import { AbiItem } from 'web3-utils'

export const createDao = async (_account: string) => {
    const web3 = new Web3(RPC_URL);
 
    //1. instantiate your contracts
    const DaoCreatorInst = new web3.eth.Contract(DaoCreator.abi as AbiItem[], DAO_CREATOR_ADDRESS);
    // try {
    //     console.log(_account);
    //     await DaoCreatorInst.methods.createUniversalProfile("keez", "urrr").send({from : _account});
    // } catch (err) {
    //     console.log(err);
    // }

    const result = await DaoCreatorInst.methods.getAddresses().call({from : _account});
    console.log(result)
    
    const result2 = await DaoCreatorInst.methods.getDaoProfile().call({from : _account});
    console.log("this - ",result2)
}