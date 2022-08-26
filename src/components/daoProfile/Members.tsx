import React, { useEffect, useContext, useState } from "react";
import { shortenAddress } from "../../utils/shortenAddress";
import { SingleSelect } from "../../components";
import { ProfileContext } from "../../context/ProfileContext";
import { getParsedJsonObj } from "../../utils/getParsedJsonObj";
import { IPFS_GATEWAY } from "../../constants/globals";
import Skeleton from "@material-ui/lab/Skeleton";

const Members = (props: { daoDetail: any }) => {
  const { daoDetail } = props;
  const keyPermissionObject = getParsedJsonObj(daoDetail.keyPermissions);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const votingList = [0, 1, 2, 3];
  return (
    <div className="flex-col py-4 justify-start items-start w-full">
      <div className="flex-col justify-start items-start w-full">
        <div className="flex justify-start items-center">
          <p className="text-2xl text-bold">{`Members (`}</p>
          <p className="text-2xl text-bold">{keyPermissionObject.length}</p>
          <p className="text-2xl text-bold">{`)`}</p>
        </div>
        <div className="grid md-grid-cols-3 lg:grid-cols-4 my-2">
          {keyPermissionObject.map((profile: any, i: any) => (
            <ProfileBox key={i} upAddress={profile.upAddress} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;

const ProfileBox = (props: { upAddress: string }) => {
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
      if (upAddress) {
        const profile_data = await getProfileInfo(upAddress);
        // console.log("erc725profile = ", profile_data);
        setProfileData(profile_data);
        getUserProfile(upAddress, profile_data);
      }
    };
    fetchData();
  }, [upAddress]);

  return (
    <div className="w-full m-4">
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
