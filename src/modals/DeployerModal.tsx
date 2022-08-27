import React, { Fragment, useRef, useState, useContext, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiExternalLink } from "react-icons/hi";
import { Dialog, Transition } from '@headlessui/react';
import { DeployDaoContext } from '../context/DeployDaoContext'
import { SpinnerCircular } from 'spinners-react'
import { toast } from "react-toastify";
import { postDaoUp } from "../services/keezBackend";
import { IPFS_DWEB_URL } from "../constants/globals";
import { useNavigate } from "react-router-dom";

export default function DeployerModal(props:{setShowModal:any, showModal:boolean, daoUpMetadata:any, metalink:string}) {
  const { setShowModal, showModal, daoUpMetadata, metalink } = props;
  const { deployUniversalReceiverDelegateUP,
        executeDeployer
        } = useContext(DeployDaoContext);
  const [open, setOpen] = useState<boolean>(true);  
  const [loading, setLoading] = useState<boolean>(false);  
  const [step, setStep] = useState<number>(0);
  const [hashArray, setHashArray] = useState<string[]>([]);
  const [universalReceiverDelegateUPAddress, setUniversalReceiverDelegateUPAddress] = useState<string>("");
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleModel = () =>{
    setShowModal(false);
    setOpen(!open);
  }

  useEffect(() => {
      if (!open)
          setShowModal(false);
  }, [open])

  const gotoExplorer = (hashId:number) => {
    const txhash = hashArray[hashId];
    const linkAddress = "https://explorer.execution.l16.lukso.network/tx/".concat(txhash).concat("/internal-transactions");
    console.log(linkAddress);
    window.open(linkAddress, "_blank");
  }

  const postDeploy = async (contractAddresses:any) => {
    const DaoUpMetadata = daoUpMetadata;
    console.log(metalink);
    //@ts-ignore
    DaoUpMetadata.daoProfile['CID'] = metalink.replace(IPFS_DWEB_URL,""); 
    //@ts-ignore
    DaoUpMetadata.daoProfile['url'] = IPFS_DWEB_URL; 
    //@ts-ignore
    DaoUpMetadata.daoProfile['daoUpAddress'] = {
      universalReceiverDelegateUP: universalReceiverDelegateUPAddress,
      universalProfile: contractAddresses.UNIVERSAL_PROFILE,
      keyManager: contractAddresses.KEY_MANAGER,
      daoPermissions: contractAddresses.DAO_PERMISSIONS,
      daoDelegates: contractAddresses.DAO_DELEGATES,
      daoProposals: contractAddresses.DAO_PROPOSALS,
      multisig: contractAddresses.MULTISIG,
    };
    const result = await postDaoUp(DaoUpMetadata);
    console.log("DaoUpMetadata", DaoUpMetadata)
    toast.success("Dao Profile Created", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }

  const handleDeploy = async () => {
    let txHashArray = hashArray;
    let txhash: string = "";
    setLoading(true);
    switch (step) {
      case 0:
        const { hash0, contractAddress0} = await deployUniversalReceiverDelegateUP();
        txhash = hash0;
        setUniversalReceiverDelegateUPAddress(contractAddress0);
        break;
      case 1:
        const { hash, contractAddresses} = await executeDeployer(daoUpMetadata,metalink);
        txhash = hash;
        await postDeploy(contractAddresses);
        navigate("/Profile")
        break;
    }

    if (txhash != "Stopped" ) {
      txHashArray.push(txhash)
      setHashArray(txHashArray)
      setStep(step+1);
    }
    setLoading(false);
  }


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={()=>{}}
      >
        <div
          className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block
         sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block text-white align-bottom bg-[#4E4E50] rounded-lg
               text-left 
            overflow-hidden shadow-xl 
            transform transition-all 
            sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
            >
              <div className="bg-inherent">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center w-full sm:mt-0 sm:ml-0 sm:text-left">
                    <div className="px-6 py-5 bg-black flex justify-between items-center">
                      <Dialog.Title as="h3" className="text-xl leading-6 font-medium text-white">
                        Deploy and create your DAO
                      </Dialog.Title>
                      <AiOutlineClose fontSize={24} className="text-white hover:bg-black p-[2px] rounded-full cursor-pointer" onClick={handleModel}/>
                    </div>

                    <div className="grid grid-cols-1 px-6 py-2">
                      <div className="flex justify-between items-center  px-2 pb-4 sm:flex justify-center">
                        <p className="text-sm text-white-500">UniversalReceiverDelegateUP</p>
                        {step < 1 ? (
                          <button type="button" onClick={handleDeploy}
                          className={`flex justify-center rounded-md item-center min-w-[66px]
                          border border-transparent shadow-sm px-2 py-1 bg-[#C3073F]
                            text-sm font-medium text-white ${step === 0 ? "hover:bg-[#ac0537]":"opacity-50 cursor-default"} 
                            sm:ml-3 sm:w-auto sm:text-sm`}
                          >
                          {loading && step === 0 
                            ? <SpinnerCircular size={20} thickness={200} speed={118} color="rgba(153, 153, 153, 1)" secondaryColor="rgba(172, 5, 55, 1)" /> 
                            : "Deploy"} 
                        </button>
                        ):(                          
                        <div className="flex justify-center items-center">
                          <p className="text-sm text-green-500 px-1">Deployed</p>
                          <HiExternalLink fontSize={16} className="text-green-500 hover:text-green-400 cursor-pointer" onClick={() => gotoExplorer(0)}/>
                        </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center px-2 pb-4 sm:flex justify-center">
                        <p className="text-sm text-white-500">Deploy DAO</p>
                        {step < 2 ? (
                          <button type="button" onClick={handleDeploy}
                          className={`flex justify-center rounded-md item-center min-w-[66px]
                          border border-transparent shadow-sm px-2 py-1 bg-[#C3073F]
                            text-sm font-medium text-white ${step === 1 ? "hover:bg-[#ac0537]":"opacity-50 cursor-default"} 
                            sm:ml-3 sm:w-auto sm:text-sm`}
                          >
                          {loading && step === 1
                            ? <SpinnerCircular size={20} thickness={200} speed={118} color="rgba(153, 153, 153, 1)" secondaryColor="rgba(172, 5, 55, 1)" /> 
                            : "Deploy"} 
                        </button>
                        ):(
                          <div className="flex justify-center items-center">
                            <p className="text-sm text-green-500  px-1">Deployed</p>
                            <HiExternalLink fontSize={16} className="text-green-500 hover:text-green-400 cursor-pointer" onClick={() => gotoExplorer(1)}/>
                         </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

