import React, { useEffect, useState } from 'react';
import useWeb3 from '../hooks/useWeb3';
import UniversalReceiverDelegateUPJSON from '../keezContracts/deps/UniversalReceiverDelegateUP.sol/UniversalReceiverDelegateUP.json';
import UniversalProfileJSON from '../keezContracts/deps/UniversalProfile.sol/UniversalProfile.json';
import DaoDeployerJSON from '../keezContracts/Deployer/Deployer.sol/Deployer.json';
import { ethers } from "ethers";

interface DeployDaoContextInterface {
    // deployUniversalReceiverDelegateUP: any,
    executeDeployer: any
}

export const DeployDaoContext = React.createContext<DeployDaoContextInterface>(
    {
        // deployUniversalReceiverDelegateUP: () => {},
        executeDeployer: () => {},
    }   
);

export const DeployDaoProvider = ({children}:any) => {
    const web3 = useWeb3();
    const [owner, setOwner] = useState<string>('');
    const [signer, setSigner] = useState<any>([]);
    const [provider, setProvider] = useState<any>([]);
    // const [universalReceiverDelegateUPState, setUniversalReceiverDelegateUPState] = useState<any>([]);

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

      
    const executeDeployer = async (DaoUpMetadata: any, metalink:string) => {
        try {
            console.log("DaoUpMetadata",JSON.stringify(DaoUpMetadata))
            console.log("metalink",JSON.stringify(metalink))
            const votingParameters = DaoUpMetadata.votingParameters;
            const voting_majority = Number(votingParameters.votingMajority);
            const participation_rate = Number(votingParameters.participationRate);
            const min_voting_delay = Number(votingParameters.minVotingDelay)*24*3600;
            const min_voting_period = Number(votingParameters.minVotingPeriod)*24*3600;
            const min_execution_delay = Number(votingParameters.minExecutionDelay)*24*3600;
            console.log(typeof voting_majority,"voting_majority",voting_majority);
            console.log(typeof participation_rate,"participation_rate",participation_rate);
            console.log(typeof min_voting_delay,"min_voting_delay",min_voting_delay);
            console.log(typeof min_voting_period,"min_voting_period",min_voting_period);
            console.log(typeof min_execution_delay,"min_execution_delay",min_execution_delay);
        
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
            const universalReceiverDelegateUPAddress = "0x718D6ceD390FAeC92Aff2d8581BD41255a7fE1Cb";
            const deployerAddress = "0xD8443C594CFC573406ca80a86e879D3aa1750d7E";
            const deployer = new ethers.Contract(deployerAddress, DaoDeployerJSON.abi, signer);
            const deployment = await deployer
              .connect(signer)
              ["deploy(address,bytes,bytes32,bytes32,bytes32,bytes32,bytes32,address[],bytes32[])"](
                universalReceiverDelegateUPAddress,
                ethers.utils.hexlify(ethers.utils.toUtf8Bytes(metalink)),
                ethers.utils.hexZeroPad(ethers.utils.hexValue(voting_majority), 32),
                ethers.utils.hexZeroPad(ethers.utils.hexValue(participation_rate), 32),
                ethers.utils.hexZeroPad(ethers.utils.hexValue(min_voting_delay), 32),
                ethers.utils.hexZeroPad(ethers.utils.hexValue(min_voting_period), 32),
                ethers.utils.hexZeroPad(ethers.utils.hexValue(min_execution_delay), 32),
                addressArray,
                permissionArray,
            );
            console.log("deployment done", deployment);

            const addresses = await deployer
            .connect(signer)
            .getAddresses();
            const contractAddresses = {"UNIVERSAL_PROFILE": addresses[0],
                "KEY_MANAGER": addresses[1],
                "DAO_PERMISSIONS": addresses[2],
                "DAO_DELEGATES": addresses[3],
                "DAO_PROPOSALS": addresses[4],
                "MULTISIG": addresses[5],
                "UNIVERSALRECEIVER": universalReceiverDelegateUPAddress
            }
            const UniversalProfile  = new ethers.ContractFactory(UniversalProfileJSON.abi, UniversalProfileJSON.bytecode, signer);
            const universalProfile = UniversalProfile.attach(addresses[0]);
            console.log(await universalProfile.owner());
            console.log(contractAddresses);
            return {hash: deployment.hash , contractAddresses:contractAddresses}
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }

    // const deployUniversalReceiverDelegateUP = async () => {
    //     try {
    //         let txHash:string = "";
    //          //@ts-ignore
    //         const UniversalReceiverDelegateUP  = new web3.eth.Contract(UniversalReceiverDelegateUPJSON.abi)
    //         const universalReceiverDelegateUP = UniversalReceiverDelegateUP.deploy({
    //             data: UniversalReceiverDelegateUPJSON.bytecode,
    //             arguments: []
    //         })
    //         console.log("this")
    //         const newContractInstance = await universalReceiverDelegateUP.send({
    //             from: owner,
    //             gas: 1500000
    //         }).on('transactionHash', function(hash:string){
    //             txHash = hash;
    //         })
                        
    //         console.log("universalReceiverDelegateUP is deployed",newContractInstance.options.address); 
    //         setUniversalReceiverDelegateUPState(newContractInstance.options);
    //         return {hash0: txHash , contractAddress0:newContractInstance.options.address}
    //     } catch (error) {
    //         console.log(error);
    //         return "Stopped"
    //     }
    // }

   
    return (
        <DeployDaoContext.Provider 
            value={{
                // deployUniversalReceiverDelegateUP:deployUniversalReceiverDelegateUP,
                executeDeployer:executeDeployer,
                }}>
            {children}
        </DeployDaoContext.Provider>
    );
};
