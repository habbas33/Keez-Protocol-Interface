import React, { useEffect, useState, useContext, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { shortenAddress } from "../../utils/shortenAddress";
import { IPFS_GATEWAY } from "../../constants/globals";
import { ProfileContext } from "../../context/ProfileContext";
import { AiOutlineLink, AiFillAppstore } from "react-icons/ai";
import { IoAppsSharp } from "react-icons/io5";
import { SingleSelect } from "../../components";
import { getDaoByMember } from "../../services/keezBackend";
import { getParsedJsonObj } from "../../utils/getParsedJsonObj";
import Skeleton from "@material-ui/lab/Skeleton";
import ReactCardFlip from "react-card-flip";
import { useNavigate } from "react-router-dom";
import { fetchErc725Data } from "../../services/erc725";

const ProfileDetails = (props: { accountAddress: string }) => {
  const { accountAddress } = props;
  const [profileData, setProfileData] = useState<any>({});
  const [upName, setUpName] = useState<string>("");
  const [upDescription, setUpDescription] = useState<string>("");
  const [upLinks, setUpLinks] = useState<{ title: string; url: string }[]>([]);
  const [upTags, setUpTags] = useState<string[]>([]);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>("");
  const [profileImageAvailable, setProfileImageAvailable] =
    useState<boolean>(false);
  const [bgImageAvailable, setBgImageAvailable] = useState<boolean>(false);
  const [daoCardView, setDaoCardView] = useState<number>(3);

  const [daoSelected, setDaoSelected] = useState<number>(0);
  const [memberDaos, setMemberDaos] = useState<any>([]);
  const [filterString, setFilter] = useState<string>("");
  const fetchProfile = async (account: string) => {
    try {
      const data = await fetchErc725Data(account);
      setProfileData(data);
      console.log("erc725profile = ", data);
    } catch (error) {
      console.log("This is not an ERC725 Contract");
    }
  };

  const getUserProfile = async (upAddress: string) => {
    try {
      const data: any = await fetchErc725Data(upAddress);
      setProfileData(data);
      if (data.value.LSP3Profile) {
        const profile = data?.value?.LSP3Profile;
        const profileImgUrl = IPFS_GATEWAY.concat(
          profile?.profileImage[4]?.url.slice(7)
        );
        const backgroundImgUrl = IPFS_GATEWAY.concat(
          profile?.backgroundImage[1]?.url.slice(7)
        );
        // console.log(profile?.links);
        setProfileImageAvailable(profile?.profileImage[4]?.url ? true : false);
        setBgImageAvailable(profile?.backgroundImage[0]?.url ? true : false);
        setProfileImageUrl(profileImgUrl);
        setBackgroundImageUrl(backgroundImgUrl);
        setUpName(profile?.name);
        setUpDescription(profile?.description);
        setUpLinks(profile?.links);
        setUpTags(profile?.tags);
      }
      const result = await getDaoByMember(accountAddress);
      console.log(result);
      setMemberDaos(result);
    } catch (error) {
      setUpName(shortenAddress(upAddress));
      console.log(upAddress, "This is not an ERC725 Contract");
    }
  };
  // const location = useLocation().pathname;
  const aggregate = useCallback(async () => {
    if (accountAddress) {
      await getUserProfile(accountAddress);
    }
  }, [accountAddress]);
  useEffect(() => {
    aggregate();
    window.scrollTo(0, 0);
  }, [aggregate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bg_imgfromurl = "url('".concat(backgroundImageUrl).concat("')");

  const filterParam = [
    "All",
    "Investment",
    "Grant",
    "Protocol",
    "Social",
    "Research",
  ];

  const filterByCategory = (category: string) => {
    if (category === "all") {
      setFilter("");
    } else {
      // console.log(category)
      setFilter(category);
    }
  };

  return (
    <div className="pt-10 text-white min-h-[100vh] w-5/6 flex-col justify-start items-start">
      <div
        className="flex-col justify-end items-end full h-40 overflow-hidden bg-[#0a2d61]"
        style={{
          backgroundImage: bg_imgfromurl,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="mt-[-80px] flex justify-start items-start mx-10 ">
        <div className="w-40 h-40 rounded-full overflow-hidden border-[5px] border-[#1A1A1D] flex justify-center items-center">
          <img
            className="object-cover w-40 h-40 bg-[#1A1A1D] rounded-full "
            src={profileImageUrl}
            alt="altimg"
          />
        </div>

        <div className="flex-col h-40 p-4">
          <p className="h-16 w-full text-4xl p-2 textShadow">{upName}</p>
          <p className="h-20 p-2">{upDescription}</p>
          <div className="flex justify-start items-center my-1">
            <AiOutlineLink className="w-6" fontSize={20} />
            {upLinks?.map((links: any, index: number) => (
              <a
                className="px-2 text-normal text-sm"
                href={links.url}
                key={index}
              >
                {links.title}
              </a>
            ))}
          </div>
          <div className="flex justify-start items-center my-1">
            {/* <AiOutlineLink className="w-6" fontSize={20}  /> */}
            {upTags?.map((tags: string, index: number) => (
              <div key={index} className="rounded-md mx-1 bg-[#8681ff]">
                <a className="px-2 py-1 text-normal text-sm">{tags}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sm:w-[100%] mt-[80px] w-full h-[0.1px] bg-zinc-800 " />
      <div className="flex-col justify-start items-start w-full">
        <div className="flex justify-between items-center py-4 my-1">
          <p className="text-2xl font-bold">Joined DAOs</p>
          {/* <div className= "flex justify-between items-center px-1">
                        <AiFillAppstore onClick={() => setDaoCardView(2)} className="w-6 cursor-pointer hover:text-[#ac0537]" fontSize={20}/>
                        <IoAppsSharp onClick={() => setDaoCardView(3)} className="w-6 cursor-pointer hover:text-[#ac0537]" fontSize={18}/>
                    </div> */}
        </div>
        <div className="flex flex-wrap justify-between m-5 items-center pb-4 my-1 rounded-lg">
          <div className="flex flex-wrap items-center border-solid rounded-lg  border-[#999999] border-2 bg-white  text-[#7f7f81] px-2 text-sm font-bold">
            {filterParam?.map((item, index) => (
              <p
                key={index}
                className={`hover:border-[#1A1A1D] border-b-2 cursor-pointer px-2 hover:text-[#1A1A1D] py-2 ${
                  filterString === item.toLowerCase() ||
                  ("All" === item && filterString === "")
                    ? " text-[#1A1A1D] border-[#1A1A1D]"
                    : ""
                }`}
                onClick={() => filterByCategory(item.toLowerCase())}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        {memberDaos.length !== 0 ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 m-5 gap-4 grid-cols-1">
            {[...memberDaos]
              .filter((dao: any) =>
                getParsedJsonObj(dao.categories)[0]
                  .value.toLowerCase()
                  .includes(filterString)
              )
              .reverse()
              .map((daoDetail, i) => (
                // console.log(getParsedJsonObj(daoDetail.categories)[0]),
                <DaoCard key={i} id={i} daoDetail={daoDetail} />
              ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 m-5 gap-4 grid-cols-1">
            {[1, 1, 1, 1].reverse().map((daoDetail, i) => (
              <Skeleton
                key={i}
                animation="wave"
                className="w-full rounded-md"
                variant="rect"
                height={240}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;

const DaoCard = (props: { id: number; daoDetail: any }) => {
  const { id, daoDetail } = props;
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const handleMouseOver = async () => {
    setIsHovering(true);
  };

  const handleMouseOut = async () => {
    setIsHovering(false);
  };

  const navigate = useNavigate();
  const keyPermissionObject = getParsedJsonObj(daoDetail.keyPermissions);
  const categoriesObject = getParsedJsonObj(daoDetail.categories);
  const profileImageObj = getParsedJsonObj(daoDetail.profileImage);
  const profileImageUrl = profileImageObj.url.concat(profileImageObj.hash);

  const memberStr = keyPermissionObject.length > 1 ? "Members" : "Member";
  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className=" w-full"
    >
      <ReactCardFlip isFlipped={isHovering} flipDirection="horizontal">
        <div className="flex h-[250px] border-2 border-white bg-[#8168ff] flex-col justify-between rounded-lg items-start">
          <div className="w-[180px] h-[150px] absolute overflow-none rounded-lg p-5 ">
            <img
              className="object-cover w-[180px] h-[150px] text-center rounded-full  bg-[#1A1A1D]"
              src={profileImageUrl}
              alt="Not Found"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src =
                  "https://i0.wp.com/zeevector.com/wp-content/uploads/2021/02/black-grey-gradient-background.jpg?resize=768%2C576&ssl=1";
              }}
            ></img>
          </div>
          <div className="p-1 min-w-[35%] rounded-full text-base bg-black self-end z-10 m-5">
            <h1 className="text-white text-xs text-center px-1">
              {categoriesObject[0].label}
            </h1>
          </div>
          <div className="flex w-full flex-col justify-end items-start h-full z-10 m-5">
            <h1 className="text-black text-lg font-bold py-1">
              {daoDetail.daoName}
            </h1>
            <h1 className="text-black text-xs font-bold ">
              {keyPermissionObject.length} {memberStr}
            </h1>
          </div>
        </div>

        <div className="flex h-[250px] w-full flex-col rounded-lg border-2 border-white bg-slate-300 justify-between items-center p-5">
          <div className="flex w-full flex-col justify-start items-center h-full ">
            <h1 className="text-black text-lg font-bold">
              {daoDetail.daoName}
            </h1>
            <h1 className="text-black text-xs py-1">{daoDetail.description}</h1>
          </div>
          <div className="flex flex-col justify-end items-center h-full">
            <button
              type="button"
              onClick={() =>
                navigate("/DaoProfile", { state: { daoDetail: daoDetail } })
              }
              className="flex flex-row items-center w-20  justify-center text-[#6341ff] text-xs font-bold py-2 hover:text-white hover:border-white border-2 border-transparent rounded-full bg-white hover:bg-[#8168ff]"
            >
              View DAO
            </button>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
};
