import React, { useContext } from "react";

import { AboutUsInfo } from "../components/aboutus";
import {
  SageMemberCard,
  B00steMemberCard,
  HabbasMemberCard,
  LandonMemberCard,
  FawnMemberCard,
  MumeenMemberCard,
} from "../components/aboutus/TeamMembers";
// import ReactCardFlip from "react-card-flip";

const Main: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-other px-5 pt-8 pb-36 lg:px-40 md:px-20">
        <AboutUsInfo />
        </div>
        <div className='bg-black px-5 lg:px-40 md:px-20'>
        <div className="flex-column flex-initial justify-between py-5 ">
          <h1 className="text-4xl textShadow text-left pt-8 text-white">
            Team Members
          </h1>
        </div>

        <div className="  bg-black grid flex-wrap place-content-stretch gap-10 lg:grid-cols-2 xl:grid-cols-3 items-center ">
          <SageMemberCard />
          <B00steMemberCard />
          <HabbasMemberCard />
          <LandonMemberCard />
          <FawnMemberCard />
          <MumeenMemberCard />
        </div>
        </div>
      
    </div>
  );
};

export default Main;
