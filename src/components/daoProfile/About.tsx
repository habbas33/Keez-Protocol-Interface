import React, {useEffect, useContext, useState} from "react";
import { shortenAddress } from "../../utils/shortenAddress";
import { ProfileContext } from '../../context/ProfileContext'
import dayjs from "dayjs";
import { getParsedJsonObj } from "../../utils/getParsedJsonObj";

const About = (props: {daoDetail:any}) => {
    const {daoDetail} = props;
    const { accountAddress, profileData } = useContext(ProfileContext);
    const [upName, setUpName] = useState<string>('');
    const state = [
        {
            value: "State 1",
            label: "State 1",
        },
        {
            value: "State 2",
            label: "State 2",
        },
        {
            value: "State 2",
            label: "State 2",
        },
      ]

    const getUserProfile = async (upAddress:string) => {
        try {
            if (profileData.value.LSP3Profile) {
                const profile = profileData?.value?.LSP3Profile;
                setUpName(profile?.name);
            }
        } catch (error) {
            setUpName(shortenAddress(upAddress));
            console.log(upAddress,'This is not an ERC725 Contract');
        }  
    }

    useEffect(() => {
        if (accountAddress) {
            getUserProfile(accountAddress);
        }
        window.scrollTo(0, 0)
    }, [])
    
    console.log(Number(daoDetail.createdAt))
    const daoCreatedAt = dayjs(Number(daoDetail.createdAt))
    const vaultObject = getParsedJsonObj(daoDetail.vaultDetails);
    const categoriesObject = getParsedJsonObj(daoDetail.categories);
    const votingParametersObject = getParsedJsonObj(daoDetail.votingParameters);

    return (
        <div className="flex-col py-4 justify-start items-start w-full">
            <div className="flex-col justify-start items-start w-full">
                <p className="text-2xl text-bold">About</p>
                <div className='flex justify-start items-center mt-4'>
                    <h1 className="text-slate-100 text-lg font-normal">DAO Created: </h1>
                    <h1 className="text-lg font-bold px-2">{daoCreatedAt.format('DD MMM YYYY')}</h1>
                </div>
                <div className='flex justify-start items-center mt-4'>
                    <h1 className="text-slate-100 text-lg font-normal">Categories: </h1>
                    {categoriesObject.map((category:any, i:number) => (
                        <div key={i} className="rounded-full bg-black ml-2">
                            <h1 className="text-white text-xs text-center py-1 px-4">{category.label}</h1>
                        </div>
                    ))}
                </div>
                <div className='flex justify-start items-center mt-4'>
                    <h1 className="text-slate-100 text-lg font-normal">Vault: </h1>
                    <h1 className="text-lg font-bold px-2">{vaultObject.vaultName}</h1>
                </div>
                <div className='flex flex-col justify-start items-start mt-4'>
                    <h1 className="text-slate-100 text-lg font-normal">Voting Parameters: </h1>
                    <div className="flex justify-start items-center mt-1">
                        <h1 className="text-slate-100 text-sm font-normal">Participation rate:</h1>
                        <h1 className="text-sm font-bold px-2">{votingParametersObject.participationRate}</h1>
                    </div>
                    <div className="flex justify-start items-center mt-1">
                        <h1 className="text-slate-100 text-sm font-normal">Majority:</h1>
                        <h1 className="text-sm font-bold px-2">{votingParametersObject.votingMajority}</h1>
                    </div>
                    <div className="flex justify-start items-center mt-1">
                        <h1 className="text-slate-100 text-sm font-normal">Minimum Voting Delay:</h1>
                        <h1 className="text-sm font-bold px-2">{votingParametersObject.minVotingDelay}</h1>
                    </div>
                    <div className="flex justify-start items-center mt-1">
                        <h1 className="text-slate-100 text-sm font-normal">Minimum Voting Period: </h1>
                        <h1 className="text-sm font-bold px-2">{votingParametersObject.minVotingPeriod}</h1>
                    </div>
                    <div className="flex justify-start items-center mt-1">
                        <h1 className="text-slate-100 text-sm font-normal">Minimum Execution Delay: </h1>
                        <h1 className="text-sm font-bold px-2"> -- </h1>
                    </div>
                </div>


            </div>
        </div>

    );
}

export default About;

