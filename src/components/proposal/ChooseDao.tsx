import React, {useContext, useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import { MdNavigateNext } from "react-icons/md";
import { CreateProposalContext } from '../../context/CreateProposalContext'

const ChooseDao = (props: {handleComponent:any}) => {
    const {handleComponent} = props;
    const [daoSelected, setDaoSelected] = useState<number>(0);
    const { setDao
    } = useContext(CreateProposalContext);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        handleComponent("ChooseTemplate");
    }
    
    const handleDaoSelection = async (event: React.FormEvent, id:number) => {
      event.preventDefault();
      setDaoSelected(id);
      setDao("My DAO")
    }

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
  
      const daos = [0,1,2,3]
    return(
      <div className="bg-welcome pt-28  min-h-[100vh] w-full px-5 md:px-60">
        <h1 className="text-white text-sm py-2">Step 1</h1>
        <h1 className="text-white text-lg font-bold">Choose a DAO to create a proposal for</h1>
        <form onSubmit={handleSubmit}>
          <div className="py-4 ">
            <label className="block text-slate-400 text-sm font-normal" htmlFor="daoName">
              You have permission to create proposals for the following DAOs
            </label>

            <div className="flex flex-wrap justify-between items-center">
                  {[...daos].reverse().map((dao, i) => (
                          <DaoCard key={i} id={i} daoSelected={daoSelected} handleDaoSelection={handleDaoSelection}/>
                      ))}
            </div>

            <div className="flex justify-end items-center">
                <button
                    type="submit"
                    className="flex justify-center rounded-md item-center mt-[12px]
                        border border-transparent shadow-sm px-4 py-2 bg-[#C3073F]
                        text-base font-medium text-white hover:bg-[#ac0537] 
                        sm:w-auto sm:text-sm"
                    >

                    <p className="translate-x-1.5">Next</p>
                    <MdNavigateNext className="translate-x-1.5 w-6" color="#fff" fontSize={20}  />
                </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
  
  
export default ChooseDao;

const DaoCard = (props:{id:number, daoSelected:number, handleDaoSelection:any} ) => {
    const {id, daoSelected, handleDaoSelection } = props;  
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
      <div onClick={(event) => handleDaoSelection(event,id)} className={`min-w-[20%] max-w-[20%] h-60 flex flex-1 flex-col my-5 my-3  ${daoSelected === id ?"outline outline-offset-2 outline-1 outline-green-500":""}`}>
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
  