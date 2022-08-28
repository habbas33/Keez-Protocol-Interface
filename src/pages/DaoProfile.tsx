import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProfileContext } from "../context/ProfileContext";
import {
  Proposals,
  About,
  Members,
  DaoProfileSideBar,
} from "../components/daoProfile";
import Skeleton from "@material-ui/lab/Skeleton";
import { getParsedJsonObj } from "../utils/getParsedJsonObj";
import { MdCreate } from "react-icons/md";
import MobileSideNav from "../components/MobileSideNav";
//@ts-ignore
type LocationProps = {
  state: {
    daoDetail: any;
  };
};

const DaoProfile = () => {
  const location = useLocation() as unknown as LocationProps;
  const { accountAddress } = useContext(ProfileContext);
  const [profileComponent, setProfileComponent] = useState<string>("Proposals");
  const daoDetail = location.state?.daoDetail;

  const navigate = useNavigate();

  const handleComponent = (Component: string) => {
    console.log(Component);
    setProfileComponent(Component);
  };
  const profileImageObj = getParsedJsonObj(daoDetail.profileImage);
  const profileImageUrl = profileImageObj.url.concat(profileImageObj.hash);
  const keyPermissionObj = getParsedJsonObj(daoDetail.keyPermissions);
  const user = keyPermissionObj.filter(function (e: any) {
    return (
      e.upAddress === accountAddress && e.keyPermissions.propose === "True"
    );
  });
  // console.log(user.length);
  const isMember: boolean = user.length > 0 ? true : false;

  const handleCreateProposal = (event: any) => {
    navigate("/Governance", {
      state: { component: "ChooseTemplate", CID: daoDetail.CID },
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="bg-other flex-col gap-5 lg:flex-row flex min-h-[100vh] w-full justify-start items-start px-5 lg:px-40 md:px-20">
        <DaoProfileSideBar
          handleComponent={handleComponent}
          profileComponent={profileComponent}
        />
        <MobileSideNav
          handleComponent={handleComponent}
          profileComponent={profileComponent}
        />
        <div className="lg:pt-10 pt-5 text-white min-h-[100vh] lg:w-5/6 flex-col justify-start items-start">
          <div className="mt flex justify-start items-start">
            {profileImageObj ? (
              <div className="md:w-32 w-20">
                <img
                  className="object-cover overflow-hidden h-20 w-20 md:w-32 md:h-32 bg-[#1A1A1D] rounded-full"
                  src={profileImageUrl}
                  alt=""
                />
              </div>
            ) : (
              <div className="w-20 md:w-32">
                <Skeleton
                  animation="wave"
                  className=""
                  variant="circle"
                  height={"8rem"}
                />
              </div>
            )}
            <div className="flex-col px-2 py-0.5 max-w-[65%]">
              <p className="h-10 w-full text-3xl md:text-4xl text-bold px-2 textShadow">
                {daoDetail.daoName}
              </p>
              <p className="h-20 px-2 pt-2">{daoDetail.description}</p>
            </div>
            {isMember && (
              <div
                onClick={handleCreateProposal}
                className="flex self-end ml-auto justify-center items-center rounded-full bg-[#6341ff] cursor-pointer hover:bg-[#8168ff] px-2 py-0.5"
              >
                <MdCreate className="w-4" fontSize={16} />
                <p className="text-sm p-1">Create Proposal</p>
              </div>
            )}
          </div>
          <>
            {profileComponent === "Proposals" && (
              <Proposals daoDetail={daoDetail} />
            )}
            {profileComponent === "About" && <About daoDetail={daoDetail} />}
            {profileComponent === "Members" && (
              <Members daoDetail={daoDetail} />
            )}
          </>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default DaoProfile;
