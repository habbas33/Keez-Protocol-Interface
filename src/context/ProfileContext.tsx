import React, { useEffect, useState } from 'react';

import useWeb3 from '../hooks/useWeb3';
import { requestAccount, getAccountBalance } from '../services/web3';

import { fetchErc725Data } from '../services/erc725';

interface ProfileContextInterface {
    accountAddress: string;
    accountBalance: number;
    connectWallet: any;
    disconnectWallet: any;
    profileData: any;
}

export const ProfileContext = React.createContext<ProfileContextInterface>(
    {
        accountAddress: "",
        accountBalance: 0, 
        connectWallet: () => {},
        disconnectWallet: () => {},
        profileData:{},
    }   
);


export const ProfileProvider = ({children}:any) => {
    const web3 = useWeb3();
    const [accountAddress, setAccountAddress] = useState<string>('');
    const [accountBalance, setAccountBalance] = useState<number>(0);
    const [profileData, setProfileData] = useState<any>({});
    
    // const provider = new Web3.providers.HttpProvider(RPC_URL);
    // const config = { ipfsGateway: IPFS_GATEWAY };

    useEffect(() => {
        if (!accountAddress || !web3) return;

        getAccountBalance(web3, accountAddress).then((balance:any) => {
        setAccountBalance(balance);
        // if (balance > 0) {
        //     setStep(STEP.DEPLOY_UP);
        // }
        });
    }, [accountAddress, web3]);

      
    const connectWallet = async () => {
        console.log("connect");
        try {
            if (web3){
                const account = await requestAccount(web3);
                console.log("this",account);
                setAccountAddress(account);
                fetchProfile(account);
            }
        } catch (error) {
            console.log(error);
            throw new Error("No object found")
        }
    }

    const disconnectWallet = async () => {
        try {
            if (!web3) return alert("Please install metamask")
            setAccountAddress("");
        } catch (error) {
            console.log(error);
            throw new Error("No object found")
        }
    }

    const fetchProfile = async (account: string) => {
        try {
            const data = await fetchErc725Data(account);
            setProfileData(data);
            console.log("erc725profile = ", data)
        } catch (error) {
            console.log('This is not an ERC725 Contract');
        }
      }
    
    // Debug
    // fetchProfile(accountAddress).then((profileData) =>
    // console.log(JSON.stringify(profileData, undefined, 2)),
    // );

    return (
        <ProfileContext.Provider 
            value={{
                accountAddress:accountAddress,
                connectWallet:connectWallet,
                accountBalance:accountBalance,
                disconnectWallet:disconnectWallet,
                profileData:profileData,
                }}>
            {children}
        </ProfileContext.Provider>
    );
};

