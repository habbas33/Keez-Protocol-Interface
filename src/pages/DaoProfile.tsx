import React, { useContext, useState, useEffect, useCallback } from "react";
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
import { MdCreate, MdOutlineAdd } from "react-icons/md";
import MobileSideNav from "../components/MobileSideNav";
import { permissionContract, universalProfileContract } from "../services/web3";
import { toast } from "react-toastify";
//@ts-ignore
type LocationProps = {
  state: {
    daoDetail: any;
  };
};

const DaoProfile = () => {
  const [votingParameters, setVotingParams] = useState({});
  const location = useLocation() as unknown as LocationProps;
  const { accountAddress } = useContext(ProfileContext);
  const [profileComponent, setProfileComponent] = useState<string>("Proposals");
  const daoDetail = location.state?.daoDetail;
  const [permisions, setPermisions] = useState<any>({});
  const universalProfile = getParsedJsonObj(
    daoDetail.daoUpAddress
  ).universalProfile;
  const permissionProfile = getParsedJsonObj(
    daoDetail.daoUpAddress
  ).daoPermissions;

  const navigate = useNavigate();

  const handleComponent = (Component: string) => {
    // console.log(Component);
    setProfileComponent(Component);
  };
  const profileImageObj = getParsedJsonObj(daoDetail.profileImage);
  const profileImageUrl = profileImageObj.url.concat(profileImageObj.hash);
  // console.log(user.length);
  const isMember: boolean = permisions.vote ? true : false;
  const changePermission: boolean =
    permisions?.addPermission === true && permisions?.removePermission == true
      ? true
      : false;
  const getProfile = useCallback(async () => {
    let contract = await universalProfileContract(universalProfile)
      ["getData(bytes32[])"]([
        // DAO Settings
        "0xbc776f168e7b9c60bb2a7180950facd372cd90c841732d963c31a93ff9f8c127",
        "0xf89f507ecd9cb7646ce1514ec6ab90d695dac9314c3771f451fd90148a3335a9",
        "0x799787138cc40d7a47af8e69bdea98db14e1ead8227cef96814fa51751e25c76",
        "0xd3cf4cd71858ea36c3f5ce43955db04cbe9e1f42a2c7795c25c1d430c9bb280a",
        "0xb207580c05383177027a90d6c298046d3d60dfa05a32b0bb48ea9015e11a3424",
      ])
      .call();
    // let Permision = await permissionContract(permissionProfile);
    // console.log("perm", Permision);
    if (accountAddress) {
      let contract1 = await universalProfileContract(universalProfile)
        ["getData(bytes32[])"]([
          "0x4b80742de2bfb3cc0e490000" + accountAddress.substring(2),
        ])
        .call();
      const permissionBin = parseInt(contract1[0], 16).toString(2);
      const permision = {
        registerVotes: permissionBin[0] === "1",
        removePermission: permissionBin[1] === "1",
        addPermission: permissionBin[2] === "1",
        receiveDelegate: permissionBin[3] === "1",
        sendDelegate: permissionBin[4] === "1",
        execute: permissionBin[5] === "1",
        propose: permissionBin[6] === "1",
        vote: permissionBin[7] === "1",
      };
      setPermisions(permision);
    }

    const Params = {
      votingMajority: parseInt(contract[0]),
      participationRate: parseInt(contract[1]),
      minVotingDelay: parseInt(contract[2]),
      minVotingPeriod: parseInt(contract[3]) / (24 * 3600),
      minExecutionDelay: parseInt(contract[4]) / (24 * 3600),
    };
    setVotingParams(Params);
  }, [universalProfile, accountAddress]);
  // console.log(votingParameters);

  const handleCreateProposal = (event: any) => {
    navigate("/Governance", {
      state: { component: "ChooseTemplate", CID: daoDetail.CID },
    });
  };
  const handleAddPermisson = (event: any) => {
    navigate("/addmember", {
      state: { CID: daoDetail.CID, dao: daoDetail },
    });
  };
  toast.configure();
  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      getProfile();
    } catch {
      toast.error("An error ocurred, check your connection", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }, [getProfile]);
// console.log(daoDetail)
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
          <div className="mt flex w-full flex-col md:flex-row justify-start items-start ">
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
            <div className="flex-row md:flex-col grow px-2 py-0.5 max-w-[65%]">
              <p className="h-10 w-full text-3xl md:text-4xl text-bold px-2 textShadow">
                {daoDetail.daoName}
              </p>
              <p className="md:h-20 px-2 w-full pt-2">{daoDetail.description}</p>
              <p className="md:h-10 px-2 pt-2"><a target="_blank" href={daoDetail.daoLink} rel="noreferrer">{daoDetail.daoLink}</a></p>
            </div>
            <div className="flex md:flex-col ml-auto self-end gap-2">
              {isMember && (
                <div
                  onClick={handleCreateProposal}
                  className="flex self-end ml-auto justify-center items-center rounded-full bg-[#6341ff] cursor-pointer hover:bg-[#8168ff] px-2 py-0.5"
                >
                  <MdCreate className="w-4" fontSize={16} />
                  <p className="text-sm p-1">Create Proposal</p>
                </div>
              )}
              {changePermission && (
                <div
                  onClick={handleAddPermisson}
                  className="flex self-end ml-auto justify-center items-center rounded-full bg-[#6341ff] cursor-pointer hover:bg-[#8168ff] px-2 py-0.5"
                >
                  <MdOutlineAdd className="w-4" fontSize={16} />
                  <p className="text-sm p-1">Add Member</p>
                </div>
              )}
            </div>
          </div>
          <>
            {profileComponent === "Proposals" && (
              <Proposals
                daoDetail={daoDetail}
                votingParameters={votingParameters}
              />
            )}
            {profileComponent === "About" && (
              <About
                daoDetail={daoDetail}
                votingParameters={votingParameters}
              />
            )}
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
