import React, {useEffect} from "react";
import { AiFillHome, AiFillClockCircle, AiFillHeart } from "react-icons/ai";

const ProfileSideBar = (props: {handleComponent: any, profileComponent:string}) => {
    const {handleComponent, profileComponent} = props;
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <div className="pt-40 min-h-[100vh] w-1/6 flex-column justify-start items-start">
            <div onClick= {() => handleComponent("Proposals")}
                className={`flex justify-start items-center py-2 cursor-pointer ${profileComponent === 'Proposals'? 'text-[#6341ff]' :'text-white'} hover:text-[8168ff]`}>
                <AiFillHome className="w-6" fontSize={20}  />
                <p className=" px-2">Proposals</p>
            </div>
            
            <div onClick= {() => handleComponent("About")}
                className={`flex justify-start items-center py-2 cursor-pointer ${profileComponent === 'About'? 'text-[#6341ff]' :'text-white'} text-white hover:text-[#8168ff]`}>
                <AiFillClockCircle className="w-6" fontSize={20}  />
                <p className="px-2">About</p>
            </div>
            
            <div onClick= {() => handleComponent("Members")}
                className={`flex justify-start items-center py-2 cursor-pointer ${profileComponent === 'Members'? 'text-[#6341ff]' :'text-white'} text-white hover:text-[#8168ff]`}>
                <AiFillHeart className="w-6" fontSize={20}  />
                <p className=" px-2">Members</p>
            </div>
        </div>
    )
};

export default ProfileSideBar;