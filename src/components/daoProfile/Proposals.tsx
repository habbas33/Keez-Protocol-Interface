import React, {useEffect, useState, useContext} from "react";
import { shortenAddress } from "../../utils/shortenAddress";
import { IPFS_GATEWAY } from "../../constants/globals";
import { ProfileContext } from '../../context/ProfileContext'
import { AiOutlineLink, AiFillAppstore } from "react-icons/ai";
import { IoAppsSharp } from "react-icons/io5";
import { SingleSelect } from "../../components";


const Proposals = (props: {accountAddress: string}) => {
    const {accountAddress} = props;
    const { profileData } = useContext(ProfileContext);
    const [upName, setUpName] = useState<string>('');
    const [upDescription, setUpDescription] = useState<string>('');
    const [upLinks, setUpLinks] = useState<{title: string, url: string}[]>([]);
    const [upTags, setUpTags] = useState<string[]>([]);
    const [profileImageUrl, setProfileImageUrl] = useState<string>('');
    const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');
    const [profileImageAvailable, setProfileImageAvailable] = useState<boolean>(false);
    const [bgImageAvailable, setBgImageAvailable] = useState<boolean>(false);
    const [daoCardView, setDaoCardView] = useState<number>(3);

    // const getUserProfile = async (upAddress:string) => {
    //   try {
    //     if (profileData.value.LSP3Profile) {
    //         const profile = profileData?.value?.LSP3Profile;
    //         const profileImgUrl = IPFS_GATEWAY.concat(profile?.profileImage[4]?.url.slice(7));
    //         const backgroundImgUrl = IPFS_GATEWAY.concat(profile?.backgroundImage[1]?.url.slice(7));
    //         console.log(profile?.links);
    //         setProfileImageAvailable(profile?.profileImage[4]?.url? true : false);
    //         setBgImageAvailable(profile?.backgroundImage[0]?.url? true : false);
    //         setProfileImageUrl(profileImgUrl);
    //         setBackgroundImageUrl(backgroundImgUrl);
    //         setUpName(profile?.name);
    //         setUpDescription(profile?.description);
    //         setUpLinks(profile?.links);
    //         setUpTags(profile?.tags);
    //     }
    //   } catch (error) {
    //       setUpName(shortenAddress(upAddress));
    //       console.log(upAddress,'This is not an ERC725 Contract');
    //   }  
    // }

    useEffect(() => {
        // if (accountAddress) {
        //     getUserProfile(accountAddress);
        // }
        window.scrollTo(0, 0)
    }, [accountAddress])

    const bg_imgfromurl = "url('".concat(backgroundImageUrl).concat("')");
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
    
    const userProfiles = [0,1,2,3,4,5]
    return (
        <div className="pt-28 text-white min-h-[100vh] w-5/6 flex-col justify-start items-start">
            {/* <div className="flex-col justify-end items-end full h-40 overflow-hidden bg-[#0a2d61]" 
                style={{backgroundImage: bg_imgfromurl, backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
            </div> */}
            <div className="mt flex justify-start items-start mx-10 ">
                <div className="w-40 h-40 rounded-full border-[5px] bg-red-500 border-[#1A1A1D] flex justify-center items-center">
                    {/* <img 
                        className="object-cover bg-[#1A1A1D] rounded-full "
                        src={profileImageUrl}
                        alt="altimg"
                    /> */}
                </div>
                
                <div className="flex-col h-40 p-4">
                    <p className="h-16 w-full text-4xl text-bold p-2 textShadow" >DAO title</p>
                    <p className="h-20 p-2">this is where dao description will be placed</p>

                </div>
            </div>
            {/* <div className="sm:w-[100%] mt-4 w-full h-[0.1px] bg-zinc-800 " /> */}
            <div className="flex-col py-4 justify-start items-start w-full">
                {/* <div className="flex justify-between items-center py-4 my-1">
                    <p className="text-2xl text-bold">Joined DAOs</p>
                    <div className= "flex justify-between items-center px-1">
                        <AiFillAppstore onClick={() => setDaoCardView(2)} className="w-6 cursor-pointer hover:text-[#ac0537]" fontSize={20}/>
                        <IoAppsSharp onClick={() => setDaoCardView(3)} className="w-6 cursor-pointer hover:text-[#ac0537]" fontSize={18}/>
                    </div>
                </div> */}
                <div className="flex justify-between items-center pb-4 my-1">
                    <div className="flex items-center border-solid border-[#999999] border-2 bg-white text-[#7f7f81] px-2 text-sm font-bold">
                        <p className="hover:border-[#1A1A1D] border-b-2 cursor-pointer px-2 hover:text-[#1A1A1D] py-2">Social</p>  
                        <p className="hover:border-[#1A1A1D] border-b-2 cursor-pointer px-2 hover:text-[#1A1A1D] py-2">Investment</p>
                        <p className="hover:border-[#1A1A1D] border-b-2 cursor-pointer px-2 hover:text-[#1A1A1D] py-2">Fasion</p>
                        <p className="hover:border-[#1A1A1D] border-b-2 cursor-pointer px-2 hover:text-[#1A1A1D] py-2">Gaming</p>
                    </div>
                    <div className='w-1/3'>
                        <SingleSelect handleChange={(e:string)=>{console.log(e)}} name={"MinVotingDelay"} placeholder={"Select your state"} listItems={state}/>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between items-center">
                    {[...userProfiles].reverse().map((profile, i) => (
                            <ProfileCard key={i} id={i} cardView={daoCardView}/>
                        ))}
                </div>
            </div>
        </div>    
    );
}

export default Proposals;

const ProfileCard = (props:{id:number, cardView:number} ) => {
    const {id, cardView} = props;
    const cardWidth:string = cardView === 2 ? "min-w-[40%]" : "min-w-[30%]";

    return (
      <div className={`bg-[#4b3132] ${cardWidth} h-80 my-2 flex flex-1 flex-col mx-3 p-3 rounded-md hover:shadow-2xl`}>
      </div>
    );
  };