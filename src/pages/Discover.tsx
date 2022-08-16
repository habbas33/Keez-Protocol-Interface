import React, {useContext, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import { SingleSelect } from "../components";
import { getAllDaos } from "../services/keezBackend";
import { getParsedJsonObj } from "../utils/getParsedJsonObj";
import Skeleton from "@material-ui/lab/Skeleton";
import ReactCardFlip from "react-card-flip";

const Discover: React.FC = () => {
  const state = [
    {
        value: "State 1",
        label: "State 1",
    },
    {
        value: "State 2",
        label: "State 2",
    },
    {
        value: "State 2",
        label: "State 2",
    },
  ]
  
  const [allDaos, setAllDaos] = useState<any>([]);

  useEffect(() => {
        const fetchData = async () => {
          const result = await getAllDaos();
          // console.log("x ->",result);
          setAllDaos(result);
        }
        fetchData();
  }, [])

  const userProfiles = [0,1,2,3,4,5,6,7,8,9]
  return (
    <div className="min-h-screen">
      <div className="bg-welcome flex min-h-[100vh] w-full px-5 lg:px-40 md:px-20">
        <div className="pt-28 text-white w-full flex-col justify-start items-start">
          <p className="text-2xl text-bold text-center pb-4">Discover DAOs</p>
          <div className="flex-col justify-start items-start w-full">
              <div className="flex justify-between m-5 items-center pb-4 my-1">
                  <div className="flex items-center border-solid border-[#999999] border-2 bg-white text-[#7f7f81] px-2 text-sm font-bold">
                      <p className="hover:border-[#1A1A1D] border-b-2 cursor-pointer px-2 hover:text-[#1A1A1D] py-2">Social</p>  
                      <p className="hover:border-[#1A1A1D] border-b-2 cursor-pointer px-2 hover:text-[#1A1A1D] py-2">Investment</p>
                      <p className="hover:border-[#1A1A1D] border-b-2 cursor-pointer px-2 hover:text-[#1A1A1D] py-2">Fasion</p>
                      <p className="hover:border-[#1A1A1D] border-b-2 cursor-pointer px-2 hover:text-[#1A1A1D] py-2">Gaming</p>
                  </div>
                  <div className='w-1/3'>
                      <SingleSelect handleChange={(e:string)=>{console.log(e)}} name={"MinVotingDelay"} placeholder={"Select your state"} listItems={state}/>
                  </div>
              </div>
              {allDaos.length != [] ? (
                <div className="flex flex-wrap py-3">
                    {[...allDaos].reverse().map((daoDetail, i) => (
                            <DaoCard key={i} id={i} daoDetail={daoDetail}/>
                        ))}
                </div>
              ) : (
                <div className="flex flex-wrap ">
                  {[1,1,1,1].reverse().map((daoDetail, i) => (
                  <Skeleton
                    key={i}
                    animation="wave"
                    className="m-5 min-w-[21%] max-w-[21%] rounded-md"
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
}

export default Discover;

const DaoCard = (props:{id:number, daoDetail:any} ) => {
  const {id, daoDetail } = props;  
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

  const memberStr = keyPermissionObject.length >1 ? "Members":"Member";

  return (
    <div className="min-w-[21%] max-w-[21%] flex flex-1 flex-col m-5 rounded-md">
      <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className=" w-full">
          <ReactCardFlip isFlipped={isHovering} flipDirection="horizontal">
            <div className="flex w-full flex-col bg-[#a44523] justify-between items-start h-60 p-5">
                <div className="p-1 min-w-[35%] rounded-full bg-black self-end">
                  <h1 className="text-white text-xs text-center px-1">{categoriesObject[0].label}</h1>
                </div>
                <div className="flex w-full flex-col justify-end items-start h-full ">
                  <h1 className="text-black text-lg font-bold py-1">{daoDetail.daoName}</h1>
                  <h1 className="text-black text-xs font-bold ">{keyPermissionObject.length} {memberStr}</h1>
                </div>
              </div>
              <div className="flex w-full flex-col bg-[#b8a5a6] justify-between items-center h-60  p-5">
                <div className="flex w-full flex-col justify-start items-center h-full ">
                    <h1 className="text-black text-lg font-bold">{daoDetail.daoName}</h1>
                    <h1 className="text-black text-xs py-1">{daoDetail.description}</h1>
                </div>
                <div className="flex flex-col justify-end items-center h-full ">
                  <button
                    type="button"
                    
                    onClick={ ()=> navigate('/DaoProfile', {state:{daoDetail:daoDetail}}) } 
                    className="flex flex-row items-center w-20 justify-center text-white text-xs font-bold py-2 rounded bg-[#C3073F] hover:bg-[#ac0537]"
                  >
                    View DAO
                  </button>
                </div>
              </div>
              

            </ReactCardFlip>
      </div>
    </div>
  );
};
