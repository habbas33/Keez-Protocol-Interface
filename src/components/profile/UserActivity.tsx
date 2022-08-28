import React, {useEffect, useContext, useState} from "react";
import { SingleSelect } from "../../components";
import { ProfileContext } from '../../context/ProfileContext'
import { getDaoByMember, getVotesByMember, getProposalsByCreator } from "../../services/keezBackend";
import { getParsedJsonObj } from "../../utils/getParsedJsonObj";
import { shortenAddress } from "../../utils/shortenAddress";
import { fetchErc725Data } from "../../services/erc725";
import dayjs from 'dayjs';
import { SiMetafilter } from "react-icons/si";

const UserActivity = (props: {handleComponent: any}) => {
    const {handleComponent} = props;
    const { accountAddress, profileData } = useContext(ProfileContext);
    const [upName, setUpName] = useState<string>('');
    const [filterState, setFilterState] = useState<string>('All');
    const [allActivities, setAllActivities] = useState<any>([]);
    const [daoActivities, setDaoActivities] = useState<any>([]);
    const [proposalActivities, setProposalActivities] = useState<any>([]);
    const [voteActivities, setVoteActivities] = useState<any>([]);
    const [activities, setActivities] = useState<any>([]);
    
    const state = [
        {
            value: "all",
            label: "All",
        },
        {
            value: "votes",
            label: "Voted On",
        },
        {
            value: "daos",
            label: "DAOs Created",
        },
        {
            value: "proposals",
            label: "New Proposals",
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

    const handleState = async (event:any) => {
        // console.log(event.value)
        setFilterState(event.value);
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (accountAddress) {
            getUserProfile(accountAddress);
            const fetchData = async () => {
                if (accountAddress) {
                    const userDaosCreated = await getDaoByMember(accountAddress);
                    const userProposalsCreated = await getProposalsByCreator(accountAddress);
                    const userVotes = await getVotesByMember(accountAddress);
                    const activity1 = userDaosCreated.map(function(dao:any,index:number) { 
                        return {time:dao.createdAt, type:'dao', daoName:dao.daoName, proposalName:"", description:dao.description, creator:dao.creator} });
                    const activity2 = userProposalsCreated.map(function(proposal:any,index:any) { 
                        const forDaoProposalObject = getParsedJsonObj(proposal.forDaoDetails)
                        return {time:proposal.createdAt, type:'proposal', daoName:forDaoProposalObject.daoName, proposalName:proposal.proposalName, description:proposal.description, creator:proposal.creator} });
                    const activity3 = userVotes.map(function(vote:any,index:number) { 
                        var detail = userProposalsCreated.filter(function (p:any) {
                            return p.identifier === vote.proposalSignature
                            });
                        const forDaoProposalObject = detail[0] && detail[0].forDaoDetails? getParsedJsonObj(detail[0].forDaoDetails):{daoName:""} ;
                        const daoName = forDaoProposalObject?forDaoProposalObject.daoName:"";
                        const description = detail[0] && detail[0].description? detail[0].description:"";
                        const creator = detail[0] && detail[0].creator? detail[0].creator:"";
                        return {time:vote.createdAt, vote:'vote', daoName:daoName, proposalName:vote.proposalName, description:description, creator:creator} });
                    // // Merge arrays
                    const merged = [...activity1, ...activity2, ...activity3];
                    setActivities(merged);
                    setAllActivities(merged);
                    setDaoActivities(activity1);
                    setProposalActivities(activity2);
                    setVoteActivities(activity3);
                }
            };
            fetchData();
        }
        window.scrollTo(0, 0)
    }, [accountAddress])
    
    useEffect(() => {
        if (accountAddress) {
            switch(filterState) {
                case "all":
                    setActivities(allActivities);
                  break;
                case "daos":
                    setActivities(daoActivities);
                  break;
                case "proposals":
                    setActivities(proposalActivities);
                    break;
                case "votes":
                    setActivities(voteActivities);
                    break;
              }
        }
    }, [filterState])

    return (
        <div className="pt-10 text-white min-h-[100vh] w-5/6 flex-column justify-start items-start">
            <div className="flex-col justify-start items-start w-full">
                <p className="text-4xl font-bold textShadow text-center">User Activity</p>
                <div className='flex justify-end my-5'>
                    <div className='w-1/4'>
                        <SingleSelect handleChange={handleState} name={"MinVotingDelay"} placeholder={"Filter by"} listItems={state}/>
                    </div>
                </div>
                    {[...activities].sort((a, b) => a.time < b.time ? 1 : -1).map((activity, i) => (
                        <div key={i} className='w-full my-5'>
                            <div className="flex justify-start items-center">
                                <p className="text-md font-semibold textShadow">{upName} </p>
                                <p className="text-md px-1">{activity.type === "dao"?"created new DAO":activity.type === "proposal"?"proposed":"voted on"}</p>
                            </div>
                            <VotingCard activity={activity}/>
                        </div>
                    ))}
            </div>
        </div>

    );
}

export default UserActivity;

const VotingCard = (props:{activity:any} ) => {
    const { activity } = props;
    const [creatorName, setCreatorName] = useState<string>("");

    const getCreatorName = async (upAddress: string) => {
        try {
          const profileData: any = await fetchErc725Data(upAddress);
          if (profileData.value.LSP3Profile) {
            const name = profileData?.value?.LSP3Profile?.name;
            setCreatorName(name);
          }
        } catch (error) {
            setCreatorName(shortenAddress(upAddress));
            console.log(upAddress, "This is not an ERC725 Contract");
        }
      };
    
      useEffect(() => {
        getCreatorName(activity.creator);
      }, []);
    return (
      <div className="bg-[#8168ff] my-2 flex flex-1 flex-col p-5 rounded-md hover:shadow-2xl">
        <div className = "grid md:grid-cols-2 grid-cols-1">
            <div className = "flex flex-col">
                <p className="text-lg text-bold text-start">{activity.daoName}</p>
                <p className="text-4xl text-bold text-start">{activity.proposalName}</p>
            </div>
            <div className = "flex flex-col">
                <div className="flex justify-start items-center">
                  <h1 className="text-sm font-normal">Date: </h1>
                  <h1 className="text-sm font-bold px-2">{dayjs(Number(activity.time)).format('YYYY-MM-DD, HH:mm')}</h1>
                </div>
                <div className="flex justify-start items-center">
                  <h1 className="text-sm font-normal">{activity.type === "dao" ? "Created by":"Proposed by"}:</h1>
                  <h1 className="text-sm font-bold px-2">{creatorName}</h1>
                </div>
                
                <h1 className="text-sm font-normal">{activity.description}</h1>
            </div>
            
        </div>
      </div>
    );
  };