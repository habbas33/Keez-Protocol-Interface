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
import Web3 from 'web3';

interface DeployDaoContextInterface {
    deployUniversalReceiverDelegateUP: any,
    deployUniversalReceiverDelegateVault: any,
    deployUniversalProfile: any,
    deployVault: any,
    deployKeyManager: any,
    deployDaoPermissions: any,
    deployDaoDelegates: any,
    deployDaoProposals: any,
    
    setDaoUpData: any,
    setGiveOwnerPermissionToChangeOwner:any,
    setControllerPermissionsForDao:any,
    upTransferOwnership: any,
    keyManagerClaimOwnership: any,
}

export const DeployDaoContext = React.createContext<DeployDaoContextInterface>(
    {
        deployUniversalReceiverDelegateUP: () => {},
        deployUniversalReceiverDelegateVault: () => {},
        deployUniversalProfile: () => {},
        deployVault: () => {},
        deployKeyManager: () => {},
        deployDaoPermissions: () => {},
        deployDaoDelegates: () => {},
        deployDaoProposals: () => {},
        
        setDaoUpData: () => {},
        setGiveOwnerPermissionToChangeOwner: () => {},
        setControllerPermissionsForDao: () => {},
        upTransferOwnership: () => {},
        keyManagerClaimOwnership: () => {},
    }   
);

export const DeployDaoProvider = ({children}:any) => {
    const [owner, setOwner] = useState<string>('');
    const [signer, setSigner] = useState<any>([]);
    const [provider, setProvider] = useState<any>([]);
    const [web3, setWeb3] = useState<any>([]);
    const [universalReceiverDelegateUPState, setUniversalReceiverDelegateUPState] = useState<any>([]);
    const [universalReceiverDelegateVaultState, setUniversalReceiverDelegateVaultState] = useState<any>([]);

    const [universalProfileState, setUniversalProfileState] = useState<any>([]);
    const [vaultState, setVaultState] = useState<any>([]);
    const [keyManagerState, setKeyManagerState] = useState<any>([]);
    const [daoPermissionsState, setDaoPermissionsState] = useState<any>([]);
    const [daoDelegatesState, setDaoDelegatesState] = useState<any>([]);
    const [daoProposalsState, setDaoProposalsState] = useState<any>([]);

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
            
            const web3 = new Web3(window.ethereum);
            setWeb3(web3);
        }
        fetchProvider();
    }, []);

      
    const deployUniversalReceiverDelegateUP = async () => {
        try {
            let txHash:string = "";
             //@ts-ignore
            const UniversalReceiverDelegateUP  = new web3.eth.Contract(UniversalReceiverDelegateUPJSON.abi)
            const universalReceiverDelegateUP = UniversalReceiverDelegateUP.deploy({
                data: UniversalReceiverDelegateUPJSON.bytecode,
                arguments: []
            })
            const newContractInstance = await universalReceiverDelegateUP.send({
                from: owner,
                gas: 1500000
            }).on('transactionHash', function(hash:string){
                txHash = hash;
            })
            
            // const UniversalReceiverDelegateUP  = new ethers.ContractFactory(UniversalReceiverDelegateUPJSON.abi, UniversalReceiverDelegateUPJSON.bytecode, signer);
            // const universalReceiverDelegateUP  = await UniversalReceiverDelegateUP.deploy();
            // const result = await universalReceiverDelegateUP.deployTransaction.wait();
            
            console.log("universalReceiverDelegateUP is deployed",newContractInstance.options.address); 
            setUniversalReceiverDelegateUPState(newContractInstance.options);
            return {hash0: txHash , contractAddress0:newContractInstance.options.address}
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }

    const deployUniversalReceiverDelegateVault = async () => {
        try {
            let txHash:string = "";
             //@ts-ignore
            const UniversalReceiverDelegateVault  = new web3.eth.Contract(UniversalReceiverDelegateVaultJSON.abi)
            const universalReceiverDelegateVault = UniversalReceiverDelegateVault.deploy({
                data: UniversalReceiverDelegateVaultJSON.bytecode,
                arguments: []
            })
            const newContractInstance = await universalReceiverDelegateVault.send({
                from: owner,
                gas: 1500000
            }).on('transactionHash', function(hash:string){
                txHash = hash;
            })
            
            // const UniversalReceiverDelegateVault  = new ethers.ContractFactory(UniversalReceiverDelegateVaultJSON.abi, UniversalReceiverDelegateVaultJSON.bytecode, signer);
            // const universalReceiverDelegateVault  = await UniversalReceiverDelegateVault.deploy();
            // const result = await universalReceiverDelegateVault.deployTransaction.wait();
            console.log("universalReceiverDelegateVault"," is deployed",newContractInstance.options.address);
            setUniversalReceiverDelegateVaultState(newContractInstance.options);
            return {hash1: txHash , contractAddress1:newContractInstance.options.address}
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }

    const deployUniversalProfile = async () => {
        try {
            let txHash:string = "";
             //@ts-ignore
            const UniversalProfile  = new web3.eth.Contract(UniversalProfileJSON.abi)
            const universalProfile = UniversalProfile.deploy({
                data: UniversalProfileJSON.bytecode,
                arguments: [owner,universalReceiverDelegateUPState.address]
            })
            const newContractInstance = await universalProfile.send({
                from: owner,
                gas: 1500000
            }).on('transactionHash', function(hash:string){
                txHash = hash;
            })
            
            // const UniversalProfile  = new ethers.ContractFactory(UniversalProfileJSON.abi, UniversalProfileJSON.bytecode, signer);
            // const universalProfile  = await UniversalProfile.deploy(owner,universalReceiverDelegateUPState.address);
            // const result = await universalProfile.deployTransaction.wait();
            console.log("universalProfile"," is deployed",newContractInstance.options.address); 
            setUniversalProfileState(newContractInstance.options);
            return {hash2: txHash , contractAddress2:newContractInstance.options.address}
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }

    const deployVault = async () => {
        try {
            let txHash:string = "";
             //@ts-ignore
            const Vault  = new web3.eth.Contract(VaultJSON.abi)
            const vault = Vault.deploy({
                data: VaultJSON.bytecode,
                arguments: [owner,universalReceiverDelegateVaultState.address]
            })
            const newContractInstance = await vault.send({
                from: owner,
                gas: 1500000
            }).on('transactionHash', function(hash:string){
                txHash = hash;
            })
            
            // const Vault  = new ethers.ContractFactory(VaultJSON.abi, VaultJSON.bytecode, signer);
            // const vault  = await Vault.deploy(owner,universalReceiverDelegateVaultState.address);
            // const result = await vault.deployTransaction.wait();
            console.log("vault"," is deployed",newContractInstance.options.address);
            setVaultState(newContractInstance.options);
            return {hash3: txHash , contractAddress3:newContractInstance.options.address}
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }
    
    const deployKeyManager = async () => {
        try {
            let txHash:string = "";
             //@ts-ignore
            const KeyManager  = new web3.eth.Contract(KeyManagerJSON.abi)
            const keyManager = KeyManager.deploy({
                data: KeyManagerJSON.bytecode,
                arguments: [universalProfileState.address]
            })
            const newContractInstance = await keyManager.send({
                from: owner,
                gas: 1500000
            }).on('transactionHash', function(hash:string){
                txHash = hash;
            })
            
            // const KeyManager  = new ethers.ContractFactory(KeyManagerJSON.abi, KeyManagerJSON.bytecode, signer);
            // const keyManager  = await KeyManager.deploy(universalProfileState.address);
            // const result = await keyManager.deployTransaction.wait();
            console.log("keyManager"," is deployed",newContractInstance.options.address); 
            setKeyManagerState(newContractInstance.options);
            return {hash4: txHash , contractAddress4:newContractInstance.options.address}
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }

    const deployDaoPermissions = async () => {
        try {
            let txHash:string = "";
             //@ts-ignore
            const DaoPermissions  = new web3.eth.Contract(DaoPermissionsJSON.abi)
            const daoPermissions = DaoPermissions.deploy({
                data: DaoPermissionsJSON.bytecode,
                arguments: [universalProfileState.address, keyManagerState.address]
            })
            const newContractInstance = await daoPermissions.send({
                from: owner,
                gas: 1500000
            }).on('transactionHash', function(hash:string){
                txHash = hash;
            })
            
            // const DaoPermissions  = new ethers.ContractFactory(DaoPermissionsJSON.abi, DaoPermissionsJSON.bytecode, signer);
            // const daoPermissions  = await DaoPermissions.deploy(universalProfileState.address, keyManagerState.address);
            // const result = await daoPermissions.deployTransaction.wait();
            console.log("daoPermissions"," is deployed",newContractInstance.options.address); 
            setDaoPermissionsState(newContractInstance.options);
            return {hash5: txHash , contractAddress5:newContractInstance.options.address}
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }

    const deployDaoDelegates = async () => {
        try {
            let txHash:string = "";
             //@ts-ignore
            const DaoDelegates  = new web3.eth.Contract(DaoDelegatesJSON.abi)
            const daoDelegates = DaoDelegates.deploy({
                data: DaoDelegatesJSON.bytecode,
                arguments: [universalProfileState.address, keyManagerState.address]
            })
            const newContractInstance = await daoDelegates.send({
                from: owner,
                gas: 1500000
            }).on('transactionHash', function(hash:string){
                txHash = hash;
            })
            
            // const DaoDelegates  = new ethers.ContractFactory(DaoDelegatesJSON.abi, DaoDelegatesJSON.bytecode, signer);
            // const daoDelegates  = await DaoDelegates.deploy(universalProfileState.address, keyManagerState.address);
            // const result = await daoDelegates.deployTransaction.wait();
            console.log("daoDelegates"," is deployed",newContractInstance.options.address); 
            setDaoDelegatesState(newContractInstance.options);
            return {hash6: txHash , contractAddress6:newContractInstance.options.address}
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }

    const deployDaoProposals = async () => {
        try {
            let txHash:string = "";
             //@ts-ignore
            const DaoProposals  = new web3.eth.Contract(DaoProposalsJSON.abi)
            const daoProposals = DaoProposals.deploy({
                data: DaoProposalsJSON.bytecode,
                arguments: [universalProfileState.address, keyManagerState.address]
            })
            const newContractInstance = await daoProposals.send({
                from: owner,
                gas: 1500000
            }).on('transactionHash', function(hash:string){
                txHash = hash;
            })
            
            // const DaoProposals  = new ethers.ContractFactory(DaoProposalsJSON.abi, DaoProposalsJSON.bytecode, signer);
            // const daoProposals  = await DaoProposals.deploy(universalProfileState.address, keyManagerState.address);
            // const result = await daoProposals.deployTransaction.wait();
            console.log("daoProposals"," is deployed",newContractInstance.options.address); 
            setDaoProposalsState(newContractInstance.options);
            return {hash7: txHash , contractAddress7:newContractInstance.options.address}
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }

    const setDaoUpData = async (DaoUpMetadata: any, metalink:string) => {
        try {
            console.log("DaoUpMetadata",JSON.stringify(DaoUpMetadata))
            console.log("metalink",JSON.stringify(metalink))
            const votingParameters = DaoUpMetadata.votingParameters;
        
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

            const universalProfile = new ethers.Contract(universalProfileState.address, UniversalProfileJSON.abi, signer);
            const result = await universalProfile.connect(signer).setDaoData(
                ethers.utils.hexlify(ethers.utils.toUtf8Bytes(metalink)),
                ethers.utils.hexZeroPad(ethers.utils.hexValue(Number(votingParameters.votingMajority)), 32),
                ethers.utils.hexZeroPad(ethers.utils.hexValue(Number(votingParameters.participationRate)), 32),
                ethers.utils.hexZeroPad(ethers.utils.hexValue(Number(votingParameters.minimumVotingDelay)*24*3600), 32),
                ethers.utils.hexZeroPad(ethers.utils.hexValue(Number(votingParameters.minVotingPeriod)*24*3600), 32),
                ethers.utils.hexZeroPad(ethers.utils.hexValue(Number(votingParameters.minExecutionDelay)*24*3600), 32),
                addressArray,
                permissionArray
            );
            return result.hash
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }

    const setGiveOwnerPermissionToChangeOwner = async () => {
        try {
            const universalProfile = new ethers.Contract(universalProfileState.address, UniversalProfileJSON.abi, signer);
            const result = await universalProfile.giveOwnerPermissionToChangeOwner();
            return result.hash
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }

    const setControllerPermissionsForDao = async () => {
        try {
            const universalProfile = new ethers.Contract(universalProfileState.address, UniversalProfileJSON.abi, signer);
            const result = await universalProfile.setControllerPermissionsForDao(
                  daoPermissionsState.address,
                  daoDelegatesState.address,
                  daoProposalsState.address
                );
            return result.hash
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }

    const upTransferOwnership = async () => {
        try {
            const universalProfile = new ethers.Contract(universalProfileState.address, UniversalProfileJSON.abi, signer);
            const result = await universalProfile.transferOwnership(keyManagerState.address);
            return result.hash
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }

    const keyManagerClaimOwnership = async () => {
        try {
            const keyManager = new ethers.Contract(keyManagerState.address, KeyManagerJSON.abi, signer);
            let ABI = ["function claimOwnership()"];
            let iface = new ethers.utils.Interface(ABI);
            const result = await keyManager.execute(iface.encodeFunctionData("claimOwnership"));
            return result.hash
        } catch (error) {
            console.log(error);
            return "Stopped"
        }
    }
    return (
        <DeployDaoContext.Provider 
            value={{
                deployUniversalReceiverDelegateUP:deployUniversalReceiverDelegateUP,
                deployUniversalReceiverDelegateVault:deployUniversalReceiverDelegateVault,
                deployUniversalProfile:deployUniversalProfile,
                deployVault:deployVault,
                deployKeyManager:deployKeyManager,
                deployDaoPermissions:deployDaoPermissions,
                deployDaoDelegates:deployDaoDelegates,
                deployDaoProposals:deployDaoProposals,
                setDaoUpData:setDaoUpData,
                setGiveOwnerPermissionToChangeOwner:setGiveOwnerPermissionToChangeOwner,
                setControllerPermissionsForDao:setControllerPermissionsForDao,
                upTransferOwnership:upTransferOwnership,
                keyManagerClaimOwnership:keyManagerClaimOwnership,
                }}>
            {children}
        </DeployDaoContext.Provider>
    );
};
