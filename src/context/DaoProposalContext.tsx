import React, { useEffect, useState, useContext } from 'react';
import useWeb3 from '../hooks/useWeb3';
import DaoProposalsJSON from '../keezContracts/Dao/DaoProposals.sol/DaoProposals.json';
import UniversalProfileJSON from '../keezContracts/deps/UniversalProfile.sol/UniversalProfile.json';
import { getParsedJsonObj } from "../utils/getParsedJsonObj";
import { ethers } from "ethers";
import { ProfileContext } from '../context/ProfileContext'

interface DaoProposalContextInterface {
    createDaoProposal: any,
    getProposalSignatures: any,
    registerVotes: any,
    executeProposal: any,
    getProposalHash: any,
    signMessage: any,
}

export const DaoProposalContext = React.createContext<DaoProposalContextInterface>(
    {
        createDaoProposal: () => {},
        getProposalSignatures: () => {},
        registerVotes: () => {},
        executeProposal: () => {},
        getProposalHash: () => {},
        signMessage: () => {},
    }   
);

export const DaoProposalProvider = ({children}:any) => {
    const { accountAddress } = useContext(ProfileContext);
    const web3 = useWeb3();
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
    }, [accountAddress]);

    // *********************************** //
    // ********* Create Proposal ********* //
    // *********************************** // 
    
    const createDaoProposal = async (dao:any, payloads:any,ProposalMetadata:any) => {
        try {
            console.log("dao",dao);
            const votingParametersObject = getParsedJsonObj(dao.votingParameters);
            const contractAddressObject = getParsedJsonObj(dao.daoUpAddress);
            // const votingParameters = {minimumVotingDelay:0, minVotingPeriod:0, minExecutionDelay:0};
            const metalink: string = ProposalMetadata.proposalProfile.url.concat(ProposalMetadata.proposalProfile.CID);
            const proposalTitle = ProposalMetadata.proposalProfile.proposalName;
            console.log("daoContractAddresses",contractAddressObject)
            console.log("daoProposalsContractAddress",contractAddressObject.daoProposals)
            console.log("votingParametersObject",votingParametersObject)
            console.log("participationRate",votingParametersObject.participationRate)
            
            console.log("payloads",payloads)
            console.log("participationRate",proposalTitle)
            console.log("metalink",metalink)
            const daoProposals = new ethers.Contract(contractAddressObject.daoProposals, DaoProposalsJSON.abi, signer);
                 
            const create_proposal = await daoProposals.connect(signer).createProposal(
                ProposalMetadata.proposalProfile.proposalName,
                metalink,
                ethers.utils.hexZeroPad(ethers.utils.hexValue(Number(votingParametersObject.minVotingDelay)*24*3600), 32),
                ethers.utils.hexZeroPad(ethers.utils.hexValue(Number(votingParametersObject.minVotingPeriod)*24*3600), 32),
                ethers.utils.hexZeroPad(ethers.utils.hexValue(Number(votingParametersObject.minExecutionDelay)*24*3600), 32),
                payloads,
                ethers.utils.hexZeroPad(ethers.utils.hexValue(2), 32),
                ethers.utils.hexZeroPad(ethers.utils.hexValue(1), 32),
                {gasPrice: '1000000000', gasLimit: 5_000_000}
            );
            console.log("create_proposal",create_proposal)
            const proposalSignature = (await create_proposal.wait(1)).logs[9].data.substring(0, 22);
            console.log("proposalSignature",proposalSignature?proposalSignature:"no signature")
        
            setCreatedProposal(proposalSignature);
            return proposalSignature
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
    

    
    // ******************************** //
    // ********* User Voting ********** //
    // ******************************** // 
    
    const getProposalHash = async (contractAddressObject:any,proposalSignature:any,choice:number) => {
        try {
            const userAddress = owner; //get that from connected profile
            const daoProposals = new ethers.Contract(contractAddressObject.daoProposals, DaoProposalsJSON.abi, signer);
            console.log(daoProposals.address)
            console.log(proposalSignature)
            const hashUser = await daoProposals.getProposalHash(
                userAddress,
                proposalSignature,
                choice
              );
                console.log("here");
            if (web3) {
                const signature = await web3.eth.sign(ethers.utils.arrayify(hashUser).toString(), userAddress);
                return signature
            }
            return "error"
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }
    
    const signMessage = async () => {
        try {
            console.log("userHash",userHash)
            const signature = await signer.signMessage(ethers.utils.arrayify(userHash))
            return signature // save this to backend
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }

        // ************************************************ //
    // ********** Register Votes and execute ********** //
    // ************************************************ // 
    
    const registerVotes = async (contractAddressObject:any, proposalSignature:any, signaturesArray:any, addressArray:any, choiceArray:any ) => {
        try {
            // console.log("proposalSignature",proposalSignature);
            // console.log("signaturesArray",signaturesArray);
            // console.log("addressArray",addressArray);
            // console.log("choiceArray",choiceArray);
            const daoProposals = new ethers.Contract(contractAddressObject.daoProposals, DaoProposalsJSON.abi, signer);
            const register_users = await daoProposals.connect(signer).registerVotes(
                proposalSignature,
                signaturesArray,
                addressArray,
                choiceArray
              );
            return register_users
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }

    const executeProposal = async (contractAddressObject:any, proposalSignature:any) => {
        try {
            console.log(proposalSignature);
            const daoProposals = new ethers.Contract(contractAddressObject.daoProposals, DaoProposalsJSON.abi, signer);
            const execution_result = await daoProposals.connect(signer).executeProposal(proposalSignature,{gasPrice: '1000000000', gasLimit: 5_000_000});
            return execution_result

            //  //@ts-ignore
            // const DaoProposals  = new web3.eth.Contract(DaoProposalsJSON.abi,contractAddressObject.daoProposals)
            
            // const newContractInstance = await DaoProposals.methods.executeProposal(proposalSignature).send({
            //     from: owner,
            //     gas: 1500000
            // }).on('transactionHash', function(hash:string){
            //     console.log(hash)
            // })

            // console.log("universalProfile", contractAddressObject.universalProfile);
            // const universalProfile = new ethers.Contract(contractAddressObject.universalProfile, UniversalProfileJSON.abi, signer);
            //   const getUserUpdatedPermissions = await universalProfile["getData(bytes32)"](
            //     "0x4b80742de2bfb3cc0e490000" + "0x2aaddE1ff0d029f792FaBFE531F57f1C1856Ae1D".substring(2)
            //   );
            //   console.log(getUserUpdatedPermissions)
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
