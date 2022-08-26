import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { CreateProposalContext } from "../../context/CreateProposalContext";
import { ProfileContext } from "../../context/ProfileContext";
import { getDaoByMember } from "../../services/keezBackend";
import { getParsedJsonObj } from "../../utils/getParsedJsonObj";
import Skeleton from "@material-ui/lab/Skeleton";
import ReactCardFlip from "react-card-flip";

const ChooseDao = (props: { handleComponent: any }) => {
  const { handleComponent } = props;
  const [daoSelected, setDaoSelected] = useState<number>(0);
  const [memberDaos, setMemberDaos] = useState<any>([]);
  const { setDaoCid, daoCid } = useContext(CreateProposalContext);
  const { accountAddress } = useContext(ProfileContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // console.log("selected daoCid=", daoCid);
    handleComponent("ChooseTemplate");
  };

  const handleDaoSelection = async (
    event: React.FormEvent,
    id: number,
    CID: string
  ) => {
    event.preventDefault();
    setDaoSelected(id);
    console.log("set dao cid", CID);
    // console.log("set dao id", id)
    setDaoCid(CID);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (accountAddress) {
      const fetchData = async () => {
        const result = await getDaoByMember(accountAddress);
        // console.log("x ->",result);
        setMemberDaos(result);
        if (memberDaos.length != []) {
          setDaoCid(memberDaos[0].CID);
        }
      };
      fetchData();
    }
  }, [accountAddress]);

  useEffect(() => {
    if (memberDaos.length != []) {
      setDaoCid(memberDaos[memberDaos.length - 1].CID);
    }
  }, [memberDaos]);

  const daos = [0, 1, 2, 3];
  return (
    <div className="bg-other pt-28  min-h-[100vh] w-full px-5 md:px-[15%]">
      <h1 className="text-white text-sm py-2">Step 1</h1>
      <h1 className="text-white text-lg font-bold">
        Choose a DAO to create a proposal for
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="py-4 ">
          <label
            className="block text-white text-sm font-normal"
            htmlFor="daoName"
          >
            You have permission to create proposals for the following DAOs
          </label>

          {memberDaos.length != [] ? (
            <div className="grid md:grid-cols-4 m-5 gap-4 grid-cols-1">
              {[...memberDaos].reverse().map((daoDetail, i) => (
                <DaoCard
                  key={i}
                  id={i}
                  daoSelected={daoSelected}
                  handleDaoSelection={handleDaoSelection}
                  daoDetail={daoDetail}
                />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-4 m-5 gap-4 grid-cols-1">
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

          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="flex justify-center rounded-full item-center mt-[12px]
                        border border-transparent shadow-sm px-4 py-2 bg-[#6341ff]
                        text-base font-medium text-white hover:bg-[#8168ff] 
                        sm:w-auto sm:text-sm"
            >
              <p className="translate-x-1.5">Propose</p>
              <MdNavigateNext
                className="translate-x-1.5 w-6"
                color="#fff"
                fontSize={20}
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChooseDao;

const DaoCard = (props: {
  id: number;
  daoSelected: number;
  handleDaoSelection: any;
  daoDetail: any;
}) => {
  const { id, daoSelected, handleDaoSelection, daoDetail } = props;
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const handleMouseOver = async () => {
    setIsHovering(true);
  };

  const handleMouseOut = async () => {
    setIsHovering(false);
  };

  const keyPermissionObject = getParsedJsonObj(daoDetail.keyPermissions);
  const categoriesObject = getParsedJsonObj(daoDetail.categories);
  const memberStr = keyPermissionObject.length > 1 ? "Members" : "Member";
  const navigate = useNavigate();
  const profileImageObj = getParsedJsonObj(daoDetail.profileImage);
  const profileImageUrl = profileImageObj.url.concat(profileImageObj.hash);

  return (
    <div
      className={`w-full relative`}
      onClick={(event) => handleDaoSelection(event, id, daoDetail.CID)}
      onMouseLeave={handleMouseOut}
      onMouseEnter={handleMouseOver}
    >
      <ReactCardFlip isFlipped={isHovering} flipDirection="horizontal">
        <div
          className={`flex w-full flex-col bg-gradient-to-tr from-purple-300 via-purple-500 to-blue-300 border-2 border-white justify-between rounded-lg items-start h-[250px] p-5 ${
            daoSelected === id
              ? "outline outline-offset-2 outline-1 outline-green-500"
              : ""
          }`}
        >
          {" "}
          <div className="p-1 min-w-[35%] rounded-full bg-black self-end">
            {" "}
            <h1 className="text-white text-xs text-center px-1">
              {categoriesObject[0].label}
            </h1>{" "}
          </div>{" "}
          <img 
              className="object-cover w-[150px] h-[150px] text-center rounded-full  bg-[#1A1A1D]"
              src={profileImageUrl}
              alt=""
            >
            </img>
          <div className="flex w-full flex-col justify-end items-start h-full ">
            {" "}
            <h1 className="text-black text-lg font-bold py-1">
              {daoDetail.daoName}
            </h1>{" "}
            <h1 className="text-black text-xs font-bold ">
              {keyPermissionObject.length} {memberStr}
            </h1>{" "}
          </div>{" "}
        </div>

        <div
          className={`flex w-full flex-col bg-[#b8a5a6] border-2 border-white justify-between rounded-lg items-center h-[250px] p-5 ${
            daoSelected === id
              ? "outline outline-offset-2 outline-1 outline-green-500"
              : ""
          }`}
        >
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
