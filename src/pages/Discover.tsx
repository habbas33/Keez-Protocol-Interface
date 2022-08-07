import React, {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { SingleSelect } from "../components";

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
              <div className="flex flex-wrap ">
                  {[...userProfiles].reverse().map((profile, i) => (
                          <DaoCard key={i} id={i} />
                      ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discover;

const DaoCard = (props:{id:number} ) => {
  const {id } = props;  
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const handleMouseOver = async () => {
    await delay(200);
    setIsHovering(true);
  };

  const handleMouseOut = async () => {
    // await delay(300);
    setIsHovering(false);
  };
  
  const navigate = useNavigate();
  
  return (
    <div className="min-w-[21%] max-w-[21%] h-60 flex flex-1 flex-col m-5 p-3 rounded-md">
      <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="h-full w-full">
        <div className={`${isHovering?"bg-[#4b3132]":"bg-[#a44523]"} h-full w-full flipCardBack ease-in cursor-pointer duration-300`}>
          <div className="flex flex-col justify-end items-center h-full flipCardBack">
            
            { isHovering && <button
                type="button"
                onClick={ ()=> navigate('/DaoProfile') } 
                className="flex flex-row items-center w-20 justify-center text-white text-sm font-bold py-2 rounded bg-[#C3073F] hover:bg-[#ac0537]"
              >
                View DAO
                </button>
            }
          </div>
        </div>
        
      </div>
    </div>
  );
};

const delay = (ms:number) => new Promise(
  resolve => setTimeout(resolve, ms)
);
