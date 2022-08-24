import React, { Fragment, useRef, useState, useContext, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiExternalLink } from "react-icons/hi";
import { Dialog, Transition } from '@headlessui/react';
import { ProfileContext } from '../context/ProfileContext'
import { DeployDaoContext } from '../context/DeployDaoContext'
import { SpinnerCircular } from 'spinners-react'
import { toast } from "react-toastify";
import { postDaoUp } from "../services/keezBackend";
import { IPFS_DWEB_URL } from "../constants/globals";

export default function CreateDaoModal(props:{setShowModal:any, showModal:boolean, daoUpMetadata:any, metalink:string}) {
  const { setShowModal, showModal, daoUpMetadata, metalink } = props;
  // const { connectWallet } = useContext(ProfileContext);
  const { deployUniversalReceiverDelegateUP,
        deployUniversalReceiverDelegateVault,
        deployUniversalProfile,
        deployVault,
        deployKeyManager,
        deployDaoPermissions,
        deployDaoDelegates,
        deployDaoProposals,
        setDaoUpData,
        setGiveOwnerPermissionToChangeOwner,
        setControllerPermissionsForDao,
        upTransferOwnership,
        keyManagerClaimOwnership,
        } = useContext(DeployDaoContext);
  const [open, setOpen] = useState<boolean>(true);  
  const [loading, setLoading] = useState<boolean>(false);  
  const [step, setStep] = useState<number>(0);
  const [hashArray, setHashArray] = useState<string[]>([]);

  const [universalReceiverDelegateUPAddress, setUniversalReceiverDelegateUPAddress] = useState<string>("");
  const [universalReceiverDelegateVaultAddress, setUniversalReceiverDelegateVaultAddress] = useState<string>("");
  const [universalProfileAddress, setUniversalProfileAddress] = useState<string>("");
  const [vaultAddress, setVaultAddress] = useState<string>("");
  const [keyManagerAddress, setKeyManagerAddress] = useState<string>("");
  const [daoPermissionsAddress, setDaoPermissionsAddress] = useState<string>("");
  const [daoDelegatesAddress, setDaoDelegatesAddress] = useState<string>("");
  const [daoProposalsAddress, setDaoProposalsAddress] = useState<string>("");

  const cancelButtonRef = useRef(null);

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

  const postDeploy = async () => {
    const DaoUpMetadata = daoUpMetadata;
    console.log(metalink);
    //@ts-ignore
    DaoUpMetadata.daoProfile['CID'] = metalink.replace(IPFS_DWEB_URL,""); 
    //@ts-ignore
    DaoUpMetadata.daoProfile['url'] = IPFS_DWEB_URL; 
    //@ts-ignore
    DaoUpMetadata.daoProfile['daoUpAddress'] = {
      universalReceiverDelegateUP: universalReceiverDelegateUPAddress,
      universalReceiverDelegateVault: universalReceiverDelegateVaultAddress,
      universalProfile: universalProfileAddress,
      vault: vaultAddress,
      keyManager: keyManagerAddress,
      daoPermissions: daoPermissionsAddress,
      daoDelegates: daoDelegatesAddress,
      daoProposals: daoProposalsAddress,
    };
    const result = await postDaoUp(DaoUpMetadata);
    console.log("DaoUpMetadata", DaoUpMetadata)
    toast.success("Dao Profile Created", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }

  const handleDeploy = async () => {
    // console.log("deploy");
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
        const { hash1, contractAddress1} = await deployUniversalReceiverDelegateVault();
        txhash = hash1;
        setUniversalReceiverDelegateVaultAddress(contractAddress1);
        break;
      case 2:
        const { hash2, contractAddress2} = await deployUniversalProfile();
        txhash = hash2;
        setUniversalProfileAddress(contractAddress2);
        break;
      case 3:
        const { hash3, contractAddress3} = await deployVault();
        txhash = hash3;
        setVaultAddress(contractAddress3);
        break;
      case 4:
        const { hash4, contractAddress4} = await deployKeyManager();
        txhash = hash4;
        setKeyManagerAddress(contractAddress4);
        break;
      case 5:
        const { hash5, contractAddress5} = await deployDaoPermissions();
        txhash = hash5;
        setDaoPermissionsAddress(contractAddress5);
        break;
      case 6:
        const { hash6, contractAddress6} = await deployDaoDelegates();
        txhash = hash6;
        setDaoDelegatesAddress(contractAddress6);
        break;
      case 7:
        const { hash7, contractAddress7} = await deployDaoProposals();
        txhash = hash7;
        setDaoProposalsAddress(contractAddress7);
        break;
      case 8:
        txhash = await setDaoUpData(daoUpMetadata,metalink);
        // console.log(txhash);
        break;
      case 9:
        txhash = await setGiveOwnerPermissionToChangeOwner();
        // console.log(txhash);
        break;
      case 10:
        txhash = await setControllerPermissionsForDao();
        // console.log(txhash);
        break;
      case 11:
        txhash = await upTransferOwnership();
        // console.log(txhash);
        break;
      case 12:
        txhash = await keyManagerClaimOwnership();
        // console.log(txhash);
        postDeploy();
        break;
    }

    // txhash = await setDaoUpData(daoUpMetadata,metalink);
    if (txhash != "Stopped" ) {
      txHashArray.push(txhash)
      setHashArray(txHashArray)
      setStep(step+1);
    }
    setLoading(false);
    // console.log(step);
  }

  const handleEnd = async () => {
    // setStep(100);
    postDeploy();
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
                        <p className="text-sm text-white-500">UniversalReceiverDelegateVault</p>
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

                      <div className="flex justify-between items-center px-2 pb-4 sm:flex justify-center">
                        <p className="text-sm text-white-500">UniversalProfile</p>
                        {step < 3 ? (
                          <button type="button" onClick={handleDeploy}
                          className={`flex justify-center rounded-md item-center min-w-[66px]
                          border border-transparent shadow-sm px-2 py-1 bg-[#C3073F]
                            text-sm font-medium text-white ${step === 2 ? "hover:bg-[#ac0537]":"opacity-50 cursor-default"} 
                            sm:ml-3 sm:w-auto sm:text-sm`}
                          >
                          {loading && step === 2
                            ? <SpinnerCircular size={20} thickness={200} speed={118} color="rgba(153, 153, 153, 1)" secondaryColor="rgba(172, 5, 55, 1)" /> 
                            : "Deploy"} 
                        </button>
                        ):(
                          <div className="flex justify-center items-center">
                            <p className="text-sm text-green-500  px-1">Deployed</p>
                            <HiExternalLink fontSize={16} className="text-green-500 hover:text-green-400 cursor-pointer" onClick={() => gotoExplorer(2)}/>
                         </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center px-2 pb-4 sm:flex justify-center">
                        <p className="text-sm text-white-500">Vault</p>
                        {step < 4 ? (
                          <button type="button" onClick={handleDeploy}
                          className={`flex justify-center rounded-md item-center min-w-[66px]
                          border border-transparent shadow-sm px-2 py-1 bg-[#C3073F]
                            text-sm font-medium text-white ${step === 3 ? "hover:bg-[#ac0537]":"opacity-50 cursor-default"} 
                            sm:ml-3 sm:w-auto sm:text-sm`}
                          >
                          {loading && step === 3
                            ? <SpinnerCircular size={20} thickness={200} speed={118} color="rgba(153, 153, 153, 1)" secondaryColor="rgba(172, 5, 55, 1)" /> 
                            : "Deploy"} 
                        </button>
                        ):(
                          <div className="flex justify-center items-center">
                            <p className="text-sm text-green-500  px-1">Deployed</p>
                            <HiExternalLink fontSize={16} className="text-green-500 hover:text-green-400 cursor-pointer" onClick={() => gotoExplorer(3)}/>
                         </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center px-2 pb-4 sm:flex justify-center">
                        <p className="text-sm text-white-500">KeyManager</p>
                        {step < 5 ? (
                          <button type="button" onClick={handleDeploy}
                          className={`flex justify-center rounded-md item-center min-w-[66px]
                          border border-transparent shadow-sm px-2 py-1 bg-[#C3073F]
                            text-sm font-medium text-white ${step === 4 ? "hover:bg-[#ac0537]":"opacity-50 cursor-default"} 
                            sm:ml-3 sm:w-auto sm:text-sm`}
                          >
                          {loading && step === 4
                            ? <SpinnerCircular size={20} thickness={200} speed={118} color="rgba(153, 153, 153, 1)" secondaryColor="rgba(172, 5, 55, 1)" /> 
                            : "Deploy"} 
                        </button>
                        ):(
                          <div className="flex justify-center items-center">
                            <p className="text-sm text-green-500  px-1">Deployed</p>
                            <HiExternalLink fontSize={16} className="text-green-500 hover:text-green-400 cursor-pointer" onClick={() => gotoExplorer(4)}/>
                         </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center px-2 pb-4 sm:flex justify-center">
                        <p className="text-sm text-white-500">DaoPermissions</p>
                        {step < 6 ? (
                          <button type="button" onClick={handleDeploy}
                          className={`flex justify-center rounded-md item-center min-w-[66px]
                          border border-transparent shadow-sm px-2 py-1 bg-[#C3073F]
                            text-sm font-medium text-white ${step === 5 ? "hover:bg-[#ac0537]":"opacity-50 cursor-default"} 
                            sm:ml-3 sm:w-auto sm:text-sm`}
                          >
                          {loading && step === 5
                            ? <SpinnerCircular size={20} thickness={200} speed={118} color="rgba(153, 153, 153, 1)" secondaryColor="rgba(172, 5, 55, 1)" /> 
                            : "Deploy"} 
                        </button>
                        ):(
                          <div className="flex justify-center items-center">
                            <p className="text-sm text-green-500  px-1">Deployed</p>
                            <HiExternalLink fontSize={16} className="text-green-500 hover:text-green-400 cursor-pointer" onClick={() => gotoExplorer(5)}/>
                         </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center px-2 pb-4 sm:flex justify-center">
                        <p className="text-sm text-white-500">DaoDelegates</p>
                        {step < 7 ? (
                          <button type="button" onClick={handleDeploy}
                          className={`flex justify-center rounded-md item-center min-w-[66px]
                          border border-transparent shadow-sm px-2 py-1 bg-[#C3073F]
                            text-sm font-medium text-white ${step === 6 ? "hover:bg-[#ac0537]":"opacity-50 cursor-default"} 
                            sm:ml-3 sm:w-auto sm:text-sm`}
                          >
                          {loading && step === 6
                            ? <SpinnerCircular size={20} thickness={200} speed={118} color="rgba(153, 153, 153, 1)" secondaryColor="rgba(172, 5, 55, 1)" /> 
                            : "Deploy"} 
                        </button>
                        ):(
                          <div className="flex justify-center items-center">
                            <p className="text-sm text-green-500  px-1">Deployed</p>
                            <HiExternalLink fontSize={16} className="text-green-500 hover:text-green-400 cursor-pointer" onClick={() => gotoExplorer(6)}/>
                         </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center px-2 pb-4 sm:flex justify-center">
                        <p className="text-sm text-white-500">DaoProposals</p>
                        {step < 8 ? (
                          <button type="button" onClick={handleDeploy}
                          className={`flex justify-center rounded-md item-center min-w-[66px]
                          border border-transparent shadow-sm px-2 py-1 bg-[#C3073F]
                            text-sm font-medium text-white ${step === 7 ? "hover:bg-[#ac0537]":"opacity-50 cursor-default"} 
                            sm:ml-3 sm:w-auto sm:text-sm`}
                          >
                          {loading && step === 7
                            ? <SpinnerCircular size={20} thickness={200} speed={118} color="rgba(153, 153, 153, 1)" secondaryColor="rgba(172, 5, 55, 1)" /> 
                            : "Deploy"} 
                        </button>
                        ):(
                          <div className="flex justify-center items-center">
                            <p className="text-sm text-green-500  px-1">Deployed</p>
                            <HiExternalLink fontSize={16} className="text-green-500 hover:text-green-400 cursor-pointer" onClick={() => gotoExplorer(7)}/>
                         </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center  px-2 pb-4 sm:flex justify-center">
                        <p className="text-sm text-white-500">setDaoUpData</p>
                        {step < 9 ? (
                          <button type="button" onClick={handleDeploy}
                          className={`flex justify-center rounded-md item-center min-w-[66px]
                          border border-transparent shadow-sm px-2 py-1 bg-[#C3073F]
                            text-sm font-medium text-white ${step === 8 ? "hover:bg-[#ac0537]":"opacity-50 cursor-default"} 
                            sm:ml-3 sm:w-auto sm:text-sm`}
                          >
                          {loading && step === 8 
                            ? <SpinnerCircular size={20} thickness={200} speed={118} color="rgba(153, 153, 153, 1)" secondaryColor="rgba(172, 5, 55, 1)" /> 
                            : "Deploy"} 
                        </button>
                        ):(                          
                        <div className="flex justify-center items-center">
                          <p className="text-sm text-green-500 px-1">Completed</p>
                          <HiExternalLink fontSize={16} className="text-green-500 hover:text-green-400 cursor-pointer" onClick={() => gotoExplorer(8)}/>
                        </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center  px-2 pb-4 sm:flex justify-center">
                        <p className="text-sm text-white-500">setGiveOwnerPermissionToChangeOwner</p>
                        {step < 10 ? (
                          <button type="button" onClick={handleDeploy}
                          className={`flex justify-center rounded-md item-center min-w-[66px]
                          border border-transparent shadow-sm px-2 py-1 bg-[#C3073F]
                            text-sm font-medium text-white ${step === 9 ? "hover:bg-[#ac0537]":"opacity-50 cursor-default"} 
                            sm:ml-3 sm:w-auto sm:text-sm`}
                          >
                          {loading && step === 9 
                            ? <SpinnerCircular size={20} thickness={200} speed={118} color="rgba(153, 153, 153, 1)" secondaryColor="rgba(172, 5, 55, 1)" /> 
                            : "Deploy"} 
                        </button>
                        ):(                          
                        <div className="flex justify-center items-center">
                          <p className="text-sm text-green-500 px-1">Completed</p>
                          <HiExternalLink fontSize={16} className="text-green-500 hover:text-green-400 cursor-pointer" onClick={() => gotoExplorer(9)}/>
                        </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center  px-2 pb-4 sm:flex justify-center">
                        <p className="text-sm text-white-500">setControllerPermissionsForDao</p>
                        {step < 11 ? (
                          <button type="button" onClick={handleDeploy}
                          className={`flex justify-center rounded-md item-center min-w-[66px]
                          border border-transparent shadow-sm px-2 py-1 bg-[#C3073F]
                            text-sm font-medium text-white ${step === 10 ? "hover:bg-[#ac0537]":"opacity-50 cursor-default"} 
                            sm:ml-3 sm:w-auto sm:text-sm`}
                          >
                          {loading && step === 10 
                            ? <SpinnerCircular size={20} thickness={200} speed={118} color="rgba(153, 153, 153, 1)" secondaryColor="rgba(172, 5, 55, 1)" /> 
                            : "Deploy"} 
                        </button>
                        ):(                          
                        <div className="flex justify-center items-center">
                          <p className="text-sm text-green-500 px-1">Completed</p>
                          <HiExternalLink fontSize={16} className="text-green-500 hover:text-green-400 cursor-pointer" onClick={() => gotoExplorer(10)}/>
                        </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center  px-2 pb-4 sm:flex justify-center">
                        <p className="text-sm text-white-500">upTransferOwnership</p>
                        {step < 12 ? (
                          <button type="button" onClick={handleDeploy}
                          className={`flex justify-center rounded-md item-center min-w-[66px]
                          border border-transparent shadow-sm px-2 py-1 bg-[#C3073F]
                            text-sm font-medium text-white ${step === 11 ? "hover:bg-[#ac0537]":"opacity-50 cursor-default"} 
                            sm:ml-3 sm:w-auto sm:text-sm`}
                          >
                          {loading && step === 11 
                            ? <SpinnerCircular size={20} thickness={200} speed={118} color="rgba(153, 153, 153, 1)" secondaryColor="rgba(172, 5, 55, 1)" /> 
                            : "Deploy"} 
                        </button>
                        ):(                          
                        <div className="flex justify-center items-center">
                          <p className="text-sm text-green-500 px-1">Completed</p>
                          <HiExternalLink fontSize={16} className="text-green-500 hover:text-green-400 cursor-pointer" onClick={() => gotoExplorer(11)}/>
                        </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center  px-2 pb-4 sm:flex justify-center">
                        <p className="text-sm text-white-500">keyManagerClaimOwnership</p>
                        {step < 13 ? (
                          <button type="button" onClick={handleDeploy}
                          className={`flex justify-center rounded-md item-center min-w-[66px]
                          border border-transparent shadow-sm px-2 py-1 bg-[#C3073F]
                            text-sm font-medium text-white ${step === 12 ? "hover:bg-[#ac0537]":"opacity-50 cursor-default"} 
                            sm:ml-3 sm:w-auto sm:text-sm`}
                          >
                          {loading && step === 12 
                            ? <SpinnerCircular size={20} thickness={200} speed={118} color="rgba(153, 153, 153, 1)" secondaryColor="rgba(172, 5, 55, 1)" /> 
                            : "Deploy"} 
                        </button>
                        ):(                          
                        <div className="flex justify-center items-center">
                          <p className="text-sm text-green-500 px-1">Completed</p>
                          <HiExternalLink fontSize={16} className="text-green-500 hover:text-green-400 cursor-pointer" onClick={() => gotoExplorer(12)}/>
                        </div>
                        )}
                      </div>
                    </div>
                   
                    <button type="button" onClick={handleEnd}
                          className={`flex justify-center rounded-md item-center min-w-[66px]
                          border border-transparent shadow-sm px-2 py-1 bg-[#C3073F]
                            text-sm font-medium text-white hover:bg-[#ac0537] 
                            sm:ml-3 sm:w-auto sm:text-sm`}
                          >
                          End
                        </button>
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

