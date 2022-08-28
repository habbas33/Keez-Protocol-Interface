import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SingleSelect } from "../components";
import { getAllDaos } from "../services/keezBackend";
import { getParsedJsonObj } from "../utils/getParsedJsonObj";
import Skeleton from "@material-ui/lab/Skeleton";
import ReactCardFlip from "react-card-flip";

const Discover: React.FC = () => {
  const state = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Closed",
      label: "Closed",
    },
  ];
  const [filterString, setFilter] = useState("");
  const [allDaos, setAllDaos] = useState<any>([]);
  const filterParam = [
    "All",
    "Investment",
    "Grant",
    "Protocol",
    "Social",
    "Research",
  ];
  const filterByCategory = (category: string) => {
    if (category === "All") {
      setFilter("");
    } else {
      setFilter(category.toLowerCase());
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllDaos();
      // console.log("x ->",result);
      setAllDaos(result);
    };
    fetchData();
  }, []);

  const userProfiles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="min-h-screen">
      <div className="bg-other flex min-h-[100vh] w-full px-5 lg:px-40 md:px-20">
        <div className="pt-28 text-white w-full flex-col justify-start items-start">
          <p className="text-4xl text-center pb-4">Discover DAOs</p>
          <div className="flex-col justify-start items-start w-full">
            <div className="flex flex-wrap justify-between m-5 items-center pb-4 my-1 rounded-lg">
              <div className="flex flex-wrap items-center border-solid rounded-lg  border-[#999999] border-2 bg-white  text-[#7f7f81] px-2 text-sm font-bold">
                {filterParam.map((item) => (
                  <p
                    className={`hover:border-[#1A1A1D] border-b-2 cursor-pointer px-2 hover:text-[#1A1A1D] py-2 ${
                      filterString === item.toLowerCase()
                        ? " text-[#1A1A1D] border-[#1A1A1D]"
                        : ""
                    }`}
                    onClick={() => filterByCategory(item)}
                  >
                    {item}
                  </p>
                ))}
              </div>
              {/* <div className="md:w-1/3">
                <SingleSelect
                  handleChange={(e: string) => {
                    console.log(e);
                  }}
                  name={"MinVotingDelay"}
                  placeholder={"Select your state"}
                  // listItems={state}
                />
              </div> */}
            </div>
            {allDaos.length != [] ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 m-5 gap-4 ">
                {[...allDaos]
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 m-5 gap-4 ">
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
      </div>
    </div>
  );
};

export default Discover;

const DaoCard = (props: { id: number; daoDetail: any }) => {
  const { id, daoDetail } = props;
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const handleMouseOver = async () => {
    // await delay(200);
    setIsHovering(true);
  };

  const handleMouseOut = async () => {
    // await delay(300);
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
        <div className="flex w-full h-[250px] flex-col border-2 border-white bg-gradient-to-tr from-purple-300 via-purple-500 to-blue-300 justify-between rounded-lg items-start">
          <div className="w-[180px] h-[150px] absolute overflow-none rounded-lg p-5 ">
            <img
              className="object-cover w-[180px] h-[150px] text-center rounded-full  bg-[#1A1A1D]"
              src={profileImageUrl}
              alt=""
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

        <div className="flex h-[250px] w-full flex-col rounded-lg border-2 border-white bg-gradient-to-tr from-purple-100 via-purple-200 to-blue-300 justify-between items-center p-5">
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
