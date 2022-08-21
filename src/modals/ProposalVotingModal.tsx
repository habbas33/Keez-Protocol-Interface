import React, { Fragment, useRef, useState, useContext,useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from '@headlessui/react';
import { ProfileContext } from '../context/ProfileContext'
import { getParsedJsonObj } from "../utils/getParsedJsonObj";
import { shortenAddress } from "../utils/shortenAddress";
import { getDaoByCID } from "../services/keezBackend";
import { votingDelayItems } from '../constants/votingPeriodItems';
import dayjs from 'dayjs';

export default function ProposalVotingModal(props:{setShowModal:any, showModal:boolean, proposal:any, daoSelected:any}) {
    const {setShowModal, showModal, proposal, daoSelected} = props;
    const [open, setOpen] = useState(true);

    const cancelButtonRef = useRef(null);

    const handleModel = () =>{
        setShowModal(false);
        setOpen(!open);
        console.log(proposal)
    }

    useEffect(() => {
        if (!open)
            setShowModal(false);
    }, [open])
    
    const proposalDetailsObject = getParsedJsonObj(proposal.proposalDetails);
    const votingParametersObject = daoSelected.length!=""?getParsedJsonObj(daoSelected.votingParameters):"";
    const createdAt = dayjs(Number(proposal.createdAt));
    const min_voting_delay = votingParametersObject.minVotingDelay;
    const min_voting_period = votingParametersObject.minVotingPeriod;
    const min_execution_delay = votingParametersObject.minExecutionDelay;
    const startDay = createdAt.add(min_voting_delay, 'day');
    const endDay = startDay.add(min_voting_period, 'day');
    const executionDay = startDay.add(min_execution_delay?Number(min_voting_period)+Number(min_execution_delay):min_voting_period, 'day');
    const proposalStatus = startDay > dayjs() ? "Pending" 
        : startDay <= dayjs() && endDay >= dayjs() ? "Active"
        : "Closed"
    return (
        <Transition.Root show={showModal} as={Fragment}>
        <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto"
            initialFocus={cancelButtonRef}
            onClose={setShowModal}
        >
            <div
            className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
                >
    
                <div className="flex flex-col justify-between items-center p-8 bg-black">
                    <div className="flex flex-row w-full justify-between items-center">
                        <h1 className="text-slate-100 text-sm font-semi">{daoSelected.daoName}</h1>
                        <AiOutlineClose fontSize={24} className="text-white hover:bg-[#59595c] p-[2px] rounded-full cursor-pointer" onClick={handleModel}/>
                    </div>
                    
                    <div className="grid gap-x-6 gap-y-0 md:grid-cols-2 grid-cols-1 w-full text-white py-2">
                        <div className="flex flex-col space-y-2 justify-start items-start">
                            <h1 className="text-white text-md font-semibold">{proposal.proposalName}</h1>
                            {proposalStatus === "Active" &&
                                <div className="flex justify-start items-center bg-green-800 rounded-full">
                                    <h1 className="text-slate-100 text-xs font-normal py-1 px-2">Active</h1>
                                </div>
                            }
                            {proposalStatus === "Closed" &&
                                <div className="flex justify-start items-center bg-red-800 rounded-full">
                                    <h1 className="text-slate-100 text-xs font-normal py-1 px-2">Closed</h1>
                                </div>
                            }
                            {proposalStatus === "Pending" &&
                                <div className="flex justify-start items-center bg-yellow-800 rounded-full">
                                    <h1 className="text-slate-100 text-xs font-normal py-1 px-2">Pending</h1>
                                </div>
                            }
                            <div className="flex flex-col w-full justify-start items-start">
                                <div className="flex flex-row w-full justify-between items-center">
                                    <div className="flex justify-start items-center">
                                        <h1 className="text-slate-400 text-sm font-normal">Proposed By</h1>
                                        <h1 className="text-white text-sm px-2 font-semibold">{shortenAddress(proposal.creator)}</h1>
                                    </div>
                                    {/* <div className="flex justify-start items-center">
                                        <MdLink className="px-1 w-6" color="#fff" fontSize={20}  />
                                        <MdShare className="px-1 w-6" color="#fff" fontSize={20}  />
                                    </div> */}
                                </div>
                            </div>
                            <div className="flex flex-col h-full w-full justify-between items-start">
                                <h1 className="text-white pb-3 text-xs font-normal break-words">{proposal.description}</h1>
                                <div className="flex flex-col w-full justify-between space-y-4 items-start p-2 bg-white rounded-md text-black">
                                    <h1 className="text-sm text-center font-bold">Proposal Details</h1>
        
                                    {proposal.proposalType === "Voting" && <VotingDetails proposalDetailsObject={proposalDetailsObject}/>}
                                    {proposal.proposalType === "Token Transfer" && <TokenTransferDetails proposalDetailsObject={proposalDetailsObject}/>}
                                    {proposal.proposalType === "Permission" && <PermissionDetails proposalDetailsObject={proposalDetailsObject}/>}
                                    {proposal.proposalType === "General" && <GeneralDetails proposalDetailsObject={proposalDetailsObject}/>}

                                
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between space-y-4 items-between p-4 bg-white rounded-md text-black">
                            <div className="flex flex-col justify-between space-y-4 items-start">
                                <h1 className="text-sm font-bold">Information</h1>
                                <div className="flex flex-col justify-start items-start">
                                    <div className="flex justify-start items-center">
                                        <h1 className="text-sm font-normal">Proposal Type:</h1>
                                        <h1 className="text-sm font-semibold px-2">{proposal.proposalType}</h1>
                                    </div>
                                    <div className="flex justify-start items-center">
                                        <h1 className="text-sm font-normal">Voting System:</h1>
                                        <h1 className="text-sm font-semibold px-2">Single Choice</h1>
                                    </div>
                                </div>
                            
                                <div className="flex flex-col justify-start items-start">
                                    <div className="flex justify-start items-center">
                                        <h1 className="text-sm font-normal">Voting Starts on:</h1>
                                        <h1 className="text-sm font-semibold px-2">{startDay.format('YYYY-MM-DD HH:mm')}</h1>
                                    </div>
                                    <div className="flex justify-start items-center">
                                        <h1 className="text-sm font-normal">Voting Ends on:</h1>
                                        <h1 className="text-sm font-semibold px-2">{endDay.format('YYYY-MM-DD HH:mm')}</h1>
                                    </div>
                                    <div className="flex justify-start items-center">
                                        <h1 className="text-sm font-normal">Proposal Executes on:</h1>
                                        <h1 className="text-sm font-semibold px-2">{executionDay.format('YYYY-MM-DD HH:mm')}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full text-center space-y-1 justify-center items-center text-center">
                                <h1 className="text-sm font-bold">VOTE</h1>
                                <div className="flex justify-start items-center w-28 cursor-pointer  active:bg-blue-600 hover:bg-blue-700 bg-blue-800 rounded-full">
                                    <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">For</h1>
                                </div>
                                <div className="flex justify-start items-center w-28 cursor-pointer active:bg-blue-600 hover:bg-blue-700 bg-blue-800 rounded-full">
                                    <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">Against</h1>
                                </div>
                                <div className="flex justify-start items-center w-28 cursor-pointer active:bg-blue-600 hover:bg-blue-700 bg-blue-800 rounded-full">
                                    <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">Abstain</h1>
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

const GeneralDetails = (props:{ proposalDetailsObject: any} ) => {
    const { proposalDetailsObject } = props;  
    // useContext(CreateProposalContext);
    return (
        <div className="flex flex-col justify-start items-start">
            {/* <div className="flex justify-start items-center">
                <h1 className="text-sm font-normal">Proposal Type:</h1>
                <h1 className="text-sm font-semibold px-2"></h1>
            </div> */}
            <div className="flex flex-col justify-start items-start">
                <h1 className="text-sm font-normal">Voting Options:</h1>
                {proposalDetailsObject.votingOptions.map((value:any,index:number) => (

                <h1 key={index} className="text-sm font-semibold px-4">{value}</h1>
                )
                )}
            </div>
        </div>
    );
  };

const VotingDetails = (props:{ proposalDetailsObject: any}) => {
    const { proposalDetailsObject } = props;
    const votingDelay = votingDelayItems.find((element:any) => element.value === proposalDetailsObject.minVotingDelay) || { value:0 , label:'instant' };
    const votingPeriod = votingDelayItems.find((element:any) => element.value === proposalDetailsObject.minVotingPeriod) || { value:1 , label:'24 hrs' };
    const executionDelay = votingDelayItems.find((element:any) => element.value === proposalDetailsObject.minExecutionDelay) || { value:0 , label:'instant' };
    return (
        <div className="flex flex-col justify-start items-start">
            <div className="flex justify-start items-center">
                <h1 className="text-sm font-normal">Participation Rate:</h1>
                <h1 className="text-sm font-semibold px-2">{proposalDetailsObject.participationRate}%</h1>
            </div>
            <div className="flex justify-start items-center">
                <h1 className="text-sm font-normal">Majority:</h1>
                <h1 className="text-sm font-semibold px-2">{proposalDetailsObject.votingMajority}%</h1>
            </div>
            <div className="flex justify-start items-center">
                <h1 className="text-sm font-normal">Min. Voting Delay:</h1>
                <h1 className="text-sm font-semibold px-2">{votingDelay.label}</h1>
            </div>
            <div className="flex justify-start items-center">
                <h1 className="text-sm font-normal">Min. Voting Period:</h1>
                <h1 className="text-sm font-semibold px-2">{votingPeriod.label}</h1>
            </div>
            <div className="flex justify-start items-center">
                <h1 className="text-sm font-normal">Min. Execution Delay:</h1>
                <h1 className="text-sm font-semibold px-2">{executionDelay.label}</h1>
            </div>
        </div>
    );
  };

  const TokenTransferDetails = (props:{ proposalDetailsObject: any}) => {
    const { proposalDetailsObject } = props;
    return (
        <div className="flex flex-col justify-start items-start">
            <div className="flex justify-start items-center">
                <h1 className="text-sm font-normal">Receiving Vault:</h1>
                <h1 className="text-sm font-semibold px-2">{proposalDetailsObject.selectedVault}</h1>
            </div>
            <div className="flex justify-start items-center">
                <h1 className="text-sm font-normal">Token Type:</h1>
                <h1 className="text-sm font-semibold px-2">{proposalDetailsObject.selectedToken}</h1>
            </div>
            <div className="flex justify-start items-center">
                <h1 className="text-sm font-normal">Number of Tokens:</h1>
                <h1 className="text-sm font-semibold px-2">{proposalDetailsObject.tokenAmount}</h1>
            </div>
            <div className="flex justify-start items-center">
                <h1 className="text-sm font-normal">Receiving Address:</h1>
                <h1 className="text-sm font-semibold px-2">{shortenAddress(proposalDetailsObject.receivingAddress)}</h1>
            </div>
        </div>
    );
  };

  const PermissionDetails = (props:{ proposalDetailsObject: any}) => {
    const { proposalDetailsObject } = props;
    // console.log(proposalDetailsObject)
    return (
        <div className="flex flex-col justify-start items-start">
            <div className="flex justify-start items-center">
                <h1 className="text-sm font-normal">Address:{shortenAddress(proposalDetailsObject.keyPermissions.upAddress)}</h1>
                <h1 className="text-sm font-semibold px-2"></h1>
            </div>
            
            <h1 className="text-sm font-normal">New Permissions</h1>
            <div className="flex justify-start items-center">
                <h1 className="text-xs font-normal">Vote:</h1>
                <h1 className="text-xs font-semibold px-2">{proposalDetailsObject.keyPermissions.keyPermissions.vote?"true":"false"}</h1>
            </div>
            <div className="flex justify-start items-center">
                <h1 className="text-xs font-normal">Propose:</h1>
                <h1 className="text-xs font-semibold px-2">{proposalDetailsObject.keyPermissions.keyPermissions.propose?"true":"false"}</h1>
            </div>
            <div className="flex justify-start items-center">
                <h1 className="text-xs font-normal">Execute:</h1>
                <h1 className="text-xs font-semibold px-2">{proposalDetailsObject.keyPermissions.keyPermissions.execute?"true":"false"}</h1>
            </div>

            <div className="flex justify-start items-center">
                <h1 className="text-xs font-normal">Register:</h1>
                <h1 className="text-xs font-semibold px-2">{proposalDetailsObject.keyPermissions.keyPermissions.registerVotes?"true":"false"}</h1>
            </div>
            <div className="flex justify-start items-center">
                <h1 className="text-xs font-normal">Add Permission:</h1>
                <h1 className="text-xs font-semibold px-2">{proposalDetailsObject.keyPermissions.keyPermissions.addPermission?"true":"false"}</h1>
            </div>
            <div className="flex justify-start items-center">
                <h1 className="text-xs font-normal">Remove Permission:</h1>
                <h1 className="text-xs font-semibold px-2">{proposalDetailsObject.keyPermissions.keyPermissions.removePermission?"true":"false"}</h1>
            </div>

            <div className="flex justify-start items-center">
                <h1 className="text-xs font-normal">Send Delegate:</h1>
                <h1 className="text-xs font-semibold px-2">{proposalDetailsObject.keyPermissions.keyPermissions.sendDelegate?"true":"false"}</h1>
            </div>
            <div className="flex justify-start items-center">
                <h1 className="text-xs font-normal">Receive Delegate:</h1>
                <h1 className="text-xs font-semibold px-2">{proposalDetailsObject.keyPermissions.keyPermissions.receiveDelegate?"true":"false"}</h1>
            </div>
        </div>
    );
  };