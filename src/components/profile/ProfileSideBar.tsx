import React, {useEffect} from "react";
import { AiFillHome, AiFillClockCircle, AiFillHeart } from "react-icons/ai";

const ProfileSideBar = (props: {handleComponent: any, profileComponent:string}) => {
    const {handleComponent, profileComponent} = props;
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <div className="pt-40 min-h-[100vh] w-1/6 flex-column justify-start items-start">
            <div onClick= {() => handleComponent("ProfileDetails")}
                className={`flex justify-start items-center py-2 cursor-pointer ${profileComponent === 'ProfileDetails'? 'text-[#6341ff]' :'text-white'} hover:text-[#8168ff]`}>
                <AiFillHome className="w-6" fontSize={20}  />
                <p className=" px-2">Profile</p>
            </div>
            
            <div onClick= {() => handleComponent("UserActivity")}
                className={`flex justify-start items-center py-2 cursor-pointer ${profileComponent === 'UserActivity'? 'text-[#6341ff]' :'text-white'} text-white hover:text-[#8168ff]`}>
                <AiFillClockCircle className="w-6" fontSize={20}  />
                <p className="px-2">Activity</p>
            </div>
            
            <div onClick= {() => handleComponent("POAPs")}
                className={`flex justify-start items-center py-2 cursor-pointer ${profileComponent === 'POAPs'? 'text-[#6341ff]' :'text-white'} text-white hover:text-[#8168ff]`}>
                <AiFillHeart className="w-6" fontSize={20}  />
                <p className=" px-2">POAPs</p>
            </div>
        </div>
    )
};

export default ProfileSideBar;