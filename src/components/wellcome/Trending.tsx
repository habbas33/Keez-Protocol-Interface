import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDaos } from "../../services/keezBackend";
import { getParsedJsonObj } from "../../utils/getParsedJsonObj";
import Skeleton from "@material-ui/lab/Skeleton";
import ReactCardFlip from "react-card-flip";
 
const Trending = () => {
  const [allDaos, setAllDaos] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllDaos();
      setAllDaos(result);
    };
    fetchData();
  }, []);
  return (
    <div className="w-full justify-start items-center px-10 py-20 lg:px-20 md:px-20 ">
      <div className=" flex-initial justify-between w-[90%] mx-auto">
        <h1 className="text-4xl md:text-3xl text-left textShadow text-white ">
          Trending DAOs
        </h1>
        <div className="flex gap-3 flex-no-wrap justify-between items-center py-5">
          {allDaos.length != [] ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-5 gap-4 w-full">
                {[...allDaos].reverse().map((daoDetail, i) => (
                  i<4?<DaoCard key={i} id={i} daoDetail={daoDetail} />:""
                ))} 
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-5 gap-4 w-full">
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
  );
};

export default Trending;

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
              alt="Not Found" onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="https://i0.wp.com/zeevector.com/wp-content/uploads/2021/02/black-grey-gradient-background.jpg?resize=768%2C576&ssl=1";
              }}
              
            >
            </img>
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
