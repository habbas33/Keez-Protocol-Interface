import React, { useEffect, useContext, useState, useCallback } from "react";
import { shortenAddress } from "../../utils/shortenAddress";
import { SingleSelect } from "../../components";
import { ProfileContext } from "../../context/ProfileContext";
import { getParsedJsonObj } from "../../utils/getParsedJsonObj";
import { IPFS_GATEWAY } from "../../constants/globals";
import Skeleton from "@material-ui/lab/Skeleton";
import { universalProfileContract } from "../../services/web3";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const Members = (props: { daoDetail: any }) => {
  const { daoDetail } = props;
  const [isLoading, setIsLoading] = useState(true);
  const universalProfile = getParsedJsonObj(
    daoDetail.daoUpAddress
  ).universalProfile;
  const [members, setMembers] = useState<any[]>([]);
  const keyPermissionObject = getParsedJsonObj(daoDetail.keyPermissions);
  const getProfile = useCallback(async () => {
    let contract = await universalProfileContract(universalProfile)
      ["getData(bytes32[])"]([
        // DAO Settings
        "0xf7f9c7410dd493d79ebdaee15bbc77fd163bd488f54107d1be6ed34b1e099004",
      ])
      .call();
    let totalMembers: number = parseInt(contract[0]);
    let members = [];
    if (totalMembers >= 0) {
      console.log(totalMembers);
      for (let i = 0; i < totalMembers; i++) {
        console.log(i);
        let contract = await universalProfileContract(universalProfile)
          ["getData(bytes32[])"]([
            "0xf7f9c7410dd493d79ebdaee15bbc77fd" +
              ethers.utils
                .hexZeroPad(ethers.utils.hexValue(i), 16)
                .substring(2),
          ])
          .call();
        members.push(contract[0]);
      }
      console.log(members);
      setMembers(members);
      setIsLoading(false);
    }

    const Params = {
      votingMajority: parseInt(contract[0]),
    };
    console.log(Params);
  }, [universalProfile]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProfile();
  }, [getProfile]);

  const votingList = [0, 1, 2, 3];
  if (isLoading) {
    return (
      <div className="flex-col py-4 justify-start items-start w-full">
        loading...
      </div>
    );
  }
  return (
    <div className="flex-col py-4 justify-start items-start w-full">
      <div className="flex-col justify-start items-start w-full">
        <div className="flex justify-start items-center">
          <p className="text-2xl text-bold">{`Members (`}</p>
          <p className="text-2xl text-bold">{members.length}</p>
          <p className="text-2xl text-bold">{`)`}</p>
        </div>
        <div className="grid md-grid-cols-3 lg:grid-cols-4 my-2">
          {members.map((profile: any, i: any) => (
            <ProfileBox key={i} upAddress={profile} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;

const ProfileBox = (props: { upAddress: string }) => {
  const navigate = useNavigate();
  const { upAddress } = props;
  const { getProfileInfo } = useContext(ProfileContext);
  const [upName, setUpName] = useState<string>("");
  const [profileData, setProfileData] = useState<any>({});
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

  const getUserProfile = async (upAddress: string, profile_data: any) => {
    try {
      // console.log("erc725profile = ", profile_data);
      if (profile_data.value.LSP3Profile) {
        const profile = profile_data?.value?.LSP3Profile;
        const profileImgUrl = IPFS_GATEWAY.concat(
          profile?.profileImage[4]?.url.slice(7)
        );
        setUpName(profile?.name);
        setProfileImageUrl(profileImgUrl);
      }
    } catch (error) {
      setUpName(shortenAddress(upAddress));
      console.log(upAddress, "This is not an ERC725 Contract");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const profile_data = await getProfileInfo(upAddress);
      if (upAddress) {
        // console.log("erc725profile = ", profile_data);
        setProfileData(profile_data);
        getUserProfile(upAddress, profile_data);
      }
    };
    fetchData();
  }, [upAddress]);

  return (
    <div
      className="w-full m-4 cursor-pointer"
      onClick={() => navigate(`/profile/${upAddress}`)}
    >
      <div className="w-full flex flex-col justify-start items-center p-1">
        {profileImageUrl != "" ? (
          <img
            className="object-cover w-32 h-32 rounded-full "
            src={profileImageUrl}
            alt="altimg"
          />
        ) : (
          <Skeleton
            className="w-32"
            animation="wave"
            variant="circle"
            height={128}
          />
        )}
      </div>
      {upName != "" ? (
        <p className="text-lg text-center text-bold">{upName}</p>
      ) : (
        <div className="w-full flex justify-center items-center p-1">
          <Skeleton
            className="w-32"
            animation="wave"
            variant="rect"
            height={24}
          />
        </div>
      )}
    </div>
  );
};
