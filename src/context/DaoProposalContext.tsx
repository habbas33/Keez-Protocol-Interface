import React, { useEffect, useState } from 'react';
import useWeb3 from '../hooks/useWeb3';
import { requestAccount, getAccountBalance } from '../services/web3';
import { fetchErc725Data } from '../services/erc725';

import UniversalReceiverDelegateUPJSON from '../keezContracts/deps/UniversalReceiverDelegateUP.sol/UniversalReceiverDelegateUP.json';
import UniversalReceiverDelegateVaultJSON from '../keezContracts/deps/UniversalReceiverDelegateVault.sol/UniversalReceiverDelegateVault.json';
import UniversalProfileJSON from '../keezContracts/deps/UniversalProfile.sol/UniversalProfile.json';
import VaultJSON from '../keezContracts/deps/Vault.sol/Vault.json';
import KeyManagerJSON from '../keezContracts/deps/KeyManager.sol/KeyManager.json';
import DaoPermissionsJSON from '../keezContracts/Dao/DaoPermissions.sol/DaoPermissions.json';
import DaoDelegatesJSON from '../keezContracts/Dao/DaoDelegates.sol/DaoDelegates.json';
import DaoProposalsJSON from '../keezContracts/Dao/DaoProposals.sol/DaoProposals.json';

import { ethers } from "ethers";

interface DaoProposalContextInterface {
    createDaoProposal: any,
    getProposalSignatures: any,
    registerVotes: any,
    executeProposal: any,
    getProposalHash: any,
    signMessage: any,
    // deployDaoDelegates: any,
    // deployDaoProposals: any,
    
    // setDaoUpData: any,
    // setGiveOwnerPermissionToChangeOwner:any,
    // setControllerPermissionsForDao:any,
    // upTransferOwnership: any,
    // keyManagerClaimOwnership: any,
}

export const DaoProposalContext = React.createContext<DaoProposalContextInterface>(
    {
        createDaoProposal: () => {},
        getProposalSignatures: () => {},
        registerVotes: () => {},
        executeProposal: () => {},
        getProposalHash: () => {},
        signMessage: () => {},
        // deployDaoDelegates: () => {},
        // deployDaoProposals: () => {},
        
        // setDaoUpData: () => {},
        // setGiveOwnerPermissionToChangeOwner: () => {},
        // setControllerPermissionsForDao: () => {},
        // upTransferOwnership: () => {},
        // keyManagerClaimOwnership: () => {},
    }   
);

export const DaoProposalProvider = ({children}:any) => {
    const [owner, setOwner] = useState<string>('');
    const [signer, setSigner] = useState<any>([]);
    const [provider, setProvider] = useState<any>([]);
    const [createdProposal, setCreatedProposal] = useState<any>([]);
    const [userHash, setUserHash] = useState<any>([]);

    useEffect(() => {
        const fetchProvider = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            setProvider(provider);
            console.log("provider ",provider);
        
            const signer = provider.getSigner();
            setSigner(signer);
            console.log("provider ",signer);
            
            const owner = await signer.getAddress();
            setOwner(owner);
            console.log("owner ",owner);
        }
        fetchProvider();
    }, []);

    // *********************************** //
    // ********* Create Proposal ********* //
    // *********************************** // 
    
    const createDaoProposal = async () => {
        try {
            // const universalProfileContractAddress= "";
            const daoProposalsContractAddress= "";
            const userAddress = "";
            const votingParameters = {minimumVotingDelay:0, minVotingPeriod:0, minExecutionDelay:0};

            // const universalProfile = new ethers.Contract(universalProfileContractAddress, UniversalProfileJSON.abi, signer);
            const daoProposals = new ethers.Contract(daoProposalsContractAddress, DaoProposalsJSON.abi, signer);
            
            const ABI = ["function setData(bytes32 dataKey, bytes memory dataValue)"];
            const ERC725Yinterface = new ethers.utils.Interface(ABI);
            const payloads = [ //* ask b00ste about this
              ERC725Yinterface.encodeFunctionData(
                "setData",
                [
                  "0x4b80742de2bfb3cc0e490000" + userAddress.substring(2),
                  "0x000000000000000000000000000000000000000000000000000000000000ffff"
                ]
              )
            ];
        
            const create_proposal = await daoProposals.connect(signer).createProposal(
              "Som random title",
              "https://somerandomlink.sahs",
              ethers.utils.hexZeroPad(ethers.utils.hexValue(Number(votingParameters.minimumVotingDelay)*24*3600), 32),
              ethers.utils.hexZeroPad(ethers.utils.hexValue(Number(votingParameters.minVotingPeriod)*24*3600), 32),
              ethers.utils.hexZeroPad(ethers.utils.hexValue(Number(votingParameters.minExecutionDelay)*24*3600), 32),
              payloads,
              ethers.utils.hexZeroPad(ethers.utils.hexValue(2), 32),
              ethers.utils.hexZeroPad(ethers.utils.hexValue(1), 32)
            );
        
            setCreatedProposal(create_proposal);
            return create_proposal.transactionHash
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }

    const getProposalSignatures = async () => {
        try {
            const proposalSignature = (await createdProposal.wait(1)).logs[9].data.substring(0, 22);
            return proposalSignature //save this to backend
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }
    
    // ************************************************ //
    // ********** Register Votes and execute ********** //
    // ************************************************ // 
    
    const registerVotes = async () => {
        try {
            const daoProposalsContractAddress= "";// get this data from backend
            const signaturesArray: string[] = [];// get this data from new voting model at backend
            const addressArray: string[] = [];// get this data from new voting model at backend
            const choiceArray: string[] = [];// get this data from new voting model at backend
            const proposalSignature = ""; // get this data from backend
            const daoProposals = new ethers.Contract(daoProposalsContractAddress, DaoProposalsJSON.abi, signer);
            const register_users = await daoProposals.connect(signer).registerVotes(
                proposalSignature,
                signaturesArray,
                addressArray,
                choiceArray
              );
            return register_users.transactionHash
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }

    const executeProposal = async () => {
        try {
            const daoProposalsContractAddress= "";// get this data from backend
            const proposalSignature = ""; // get this data from backend
            const daoProposals = new ethers.Contract(daoProposalsContractAddress, DaoProposalsJSON.abi, signer);
            const execution_result = await daoProposals.connect(signer).executeProposal( proposalSignature );
            return execution_result.transactionHash
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }
    
    // ******************************** //
    // ********* User Voting ********** //
    // ******************************** // 
    
    const getProposalHash = async () => {
        try {
            const daoProposalsContractAddress= "";// get this data from backend
            const proposalSignature = ""; // get this data from backend
            const userAddress = ""; //get that from connected profile
            const choice: number = 0; //get that from vote page
            const arrayOfChoices = [ //** ask booste about this
                ethers.utils.hexZeroPad(ethers.utils.hexValue(1), 32),
                ethers.utils.hexZeroPad(ethers.utils.hexValue(1), 32),
                ethers.utils.hexZeroPad(ethers.utils.hexValue(1), 32)
              ];
            const daoProposals = new ethers.Contract(daoProposalsContractAddress, DaoProposalsJSON.abi, signer);
            const hashUser = await daoProposals.getProposalHash(
                userAddress,
                proposalSignature,
                arrayOfChoices[choice]
              );
            setUserHash(hashUser);
            return hashUser
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }
    
    const signMessage = async () => {
        try {
            const signature = await signer.signMessage(ethers.utils.arrayify(userHash))
            return signature // save this to backend
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }
    return (
        <DaoProposalContext.Provider 
            value={{
                createDaoProposal:createDaoProposal,
                getProposalSignatures:getProposalSignatures,
                registerVotes:registerVotes,
                executeProposal:executeProposal,
                getProposalHash:getProposalHash,
                signMessage:signMessage
                }}>
            {children}
        </DaoProposalContext.Provider>
    );
};
