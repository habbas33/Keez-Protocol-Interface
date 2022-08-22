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
      <div className="bg-welcome">
        <AboutUsInfo />
        <div className="flex-column flex-initial justify-between py-5 px-20">
          <h1 className="text-3xl text-left text-white font-extrabold">
            Team Members
          </h1>
        </div>

        <div className="bg-welcome grid flex-wrap place-content-stretch gap-3 md:grid-cols-2 lg:grid-cols-3 items-center px-5 md:px-20">
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
