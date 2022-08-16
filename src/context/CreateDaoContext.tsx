import React, {useState} from 'react';

interface CreateDaoContextInterface {
    daoName: string;
    setDaoName: any;
    logoImageFile: File|undefined;
    setLogoImageFile: any;
    categories: {value:string, label:string}[];
    setCategories: any;
    description: string;
    setDescription: any;

    keyPermissions: {upAddress:string, keyPermissions:{vote:boolean, propose:boolean, execute:boolean, addPermission:boolean, removePermission:boolean, registerVotes:boolean, sendDelegate:boolean, receiveDelegate:boolean}}[];
    setKeyPermissions: any;

    vaultName: string;
    setVaultName: any;
    daoMembers: string[];
    setDaoMembers: any;
    majority: number;
    setMajority: any;
    
    participationRate: number;
    setParticipationRate: any;
    votingMajority: number;
    setVotingMajority: any;
    minVotingDelay: number;
    setMinVotingDelay: any;
    minVotingPeriod: number;
    setMinVotingPeriod: any;
    minExecutionDelay: number;
    setMinExecutionDelay: any;

}

export const CreateDaoContext = React.createContext<CreateDaoContextInterface>(
    {
        daoName: '',
        setDaoName: () => {},
        logoImageFile: null as any,
        setLogoImageFile: () => {},
        categories: [{value: "DAO", label: "DAO"},{value: "Social", label: "Social"}],
        setCategories: () => {},
        description: '',
        setDescription: () => {},

        keyPermissions: [],
        setKeyPermissions: () => {},

        vaultName: '',
        setVaultName: () => {},
        daoMembers: [],
        setDaoMembers: () => {},
        majority: 0,
        setMajority: () => {},
        
        participationRate: 0,
        setParticipationRate: () => {},
        votingMajority: 0,
        setVotingMajority: () => {},
        minVotingDelay: 0,
        setMinVotingDelay: () => {},
        minVotingPeriod: 1,
        setMinVotingPeriod: () => {},
        minExecutionDelay: 0,
        setMinExecutionDelay: () => {},
    }   
);

export const CreateDaoContextProvider = ({children}:any) => {
    const [daoName, setDaoName] = useState<string>('');
    const [logoImageFile, setLogoImageFile] = useState<File>();
    const [categories, setCategories] = useState<{value:string, label:string}[]>([{value: "DAO", label: "DAO"},{value: "Social", label: "Social"}]);
    const [description, setDescription] = useState<string>('');

    const [keyPermissions, setKeyPermissions] = useState<{upAddress:string, keyPermissions:{vote:boolean, propose:boolean, execute:boolean, addPermission:boolean, removePermission:boolean, registerVotes:boolean, sendDelegate:boolean, receiveDelegate:boolean}}[]>([]);
    
    const [vaultName, setVaultName] = useState<string>('');
    const [daoMembers, setDaoMembers] = useState<string[]>([]);
    const [majority, setMajority] = useState<number>(0);
    
    const [participationRate, setParticipationRate] = useState<number>(0);
    const [votingMajority, setVotingMajority] = useState<number>(0);
    const [minVotingDelay, setMinVotingDelay] = useState<number>(0);
    const [minVotingPeriod, setMinVotingPeriod] = useState<number>(1);
    const [minExecutionDelay, setMinExecutionDelay] = useState<number>(0);
    
    return (
        <CreateDaoContext.Provider 
            value={{
                daoName: daoName, 
                logoImageFile: logoImageFile, 
                categories: categories, 
                description: description, 
                setDaoName: setDaoName, 
                setLogoImageFile: setLogoImageFile, 
                setCategories: setCategories ,
                setDescription: setDescription,
                
                keyPermissions: keyPermissions,
                setKeyPermissions: setKeyPermissions,

                vaultName:vaultName,
                daoMembers:daoMembers,
                majority:majority,
                setVaultName:setVaultName,
                setDaoMembers:setDaoMembers,
                setMajority:setMajority,

                participationRate:participationRate,
                votingMajority:votingMajority,
                minVotingDelay:minVotingDelay,
                minVotingPeriod:minVotingPeriod,
                minExecutionDelay:minExecutionDelay,
                setParticipationRate:setParticipationRate,
                setVotingMajority:setVotingMajority,
                setMinVotingDelay:setMinVotingDelay,
                setMinVotingPeriod:setMinVotingPeriod,
                setMinExecutionDelay:setMinExecutionDelay,
                }}>
            {children}
        </CreateDaoContext.Provider>
    );
}