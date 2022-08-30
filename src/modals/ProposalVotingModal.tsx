import React, { Fragment, useRef, useState, useContext,useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from '@headlessui/react';
import { SpinnerCircular } from "spinners-react";
import { ProfileContext } from '../context/ProfileContext'
import { getParsedJsonObj } from "../utils/getParsedJsonObj";
import { shortenAddress } from "../utils/shortenAddress";
import { getVotesBySignature, postVote } from "../services/keezBackend";
import { votingDelayItems } from '../constants/votingPeriodItems';
import { DaoProposalContext } from "../context/DaoProposalContext";
import dayjs from 'dayjs';
import { toast } from "react-toastify";
import {ethers} from 'ethers';

export default function ProposalVotingModal(props:{setShowModal:any, showModal:boolean, proposal:any, daoSelected:any}) {
    const {setShowModal, showModal, proposal, daoSelected} = props;
    const { 
        getProposalHash,
        registerVotes,
        executeProposal
        } = useContext(DaoProposalContext);
    const { accountAddress } = useContext(ProfileContext);

    const [open, setOpen] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [votes, setVotes] = useState<any>([]);
    const [userCanVote, setUserCanVote] = useState<boolean>(false);
    const [userCanRegister, setUserCanRegister] = useState<boolean>(false);
    const [userCanExecute, setUserCanExecute] = useState<boolean>(false);
    const [hasVoted, setHasVoted] = useState<boolean>(false);
    const [voterChoice, setVoterChoice] = useState<number>(10);
    const [voters, setVoters] = useState<string[]>([]);
    const [signatureArray, setSignatureArray] = useState<string[]>([]);
    const [addressArray, setAddressArray] = useState<string[]>([]);
    const [choiceArray, setChoiceArray] = useState<string[]>([]);
    const [totalAbstained, setTotalAbstained] = useState<number>(0);
    const [totalApproved, setTotalApproved] = useState<number>(0);
    const [totalRejected, setTotalRejected] = useState<number>(0);

    const cancelButtonRef = useRef(null);

    const handleModel = () =>{
        setShowModal(false);
        setOpen(!open);
        // console.log("proposal",proposal)
    }
    toast.configure();

    const handleApprove = async () => {
        setIsLoading(true);
        const timestamp = dayjs().valueOf();
        const contractAddressObject = getParsedJsonObj(daoSelected.daoUpAddress);
        const choice = ethers.utils.hexZeroPad(ethers.utils.hexValue(1), 32);
        const proposalUrl = proposal.url.concat(proposal.CID);
        try {
            //************Contract Interaction ************* */
            const proposalSignature = proposal.identifier //proposalSignature get from backend proposals
            //@ts-ignore
            const hash = await getProposalHash(contractAddressObject,proposalSignature,choice);
            console.log("phash",hash.signature);
            //********************************************** */
            
            //************backend Interaction ************* */
            const VoteMetadata = {
                proposalContractAddress: contractAddressObject.daoProposals,
                proposalUrl: proposalUrl,
                proposalName: proposal.proposalName,
                VoterSignature: hash.signature,
                proposalSignature: proposalSignature,
                VoterChoice: choice,
                VoterAddress: accountAddress,
                createdAt: timestamp,
            };
           
            console.log(VoteMetadata);
            if (hash.signature){
                const result = await postVote(VoteMetadata);
                toast.success("Voted Successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            }   else {
                toast.error("Vote Submission Failed", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
            //********************************************** */

            setIsLoading(false);
        } catch (err) {
            console.log(err);
            toast.error("Vote Submission Failed", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            
        }
    }

    const handleReject = async () =>{
        setIsLoading(true);
        const timestamp = dayjs().valueOf();
        const contractAddressObject = getParsedJsonObj(daoSelected.daoUpAddress);
        const choice = ethers.utils.hexZeroPad(ethers.utils.hexValue(2), 32);
        const proposalUrl = proposal.url.concat(proposal.CID);
        try {
            //************Contract Interaction ************* */
            const proposalSignature = proposal.identifier //proposalSignature get from backend proposals
            //@ts-ignore
            const hash = await getProposalHash(contractAddressObject,proposalSignature,choice);
            console.log("phash",hash.signature);
            //********************************************** */
            
            //************backend Interaction ************* */
            const VoteMetadata = {
                proposalContractAddress: contractAddressObject.daoProposals,
                proposalUrl: proposalUrl,
                proposalName: proposal.proposalName,
                VoterSignature: hash.signature,
                proposalSignature: proposalSignature,
                VoterChoice: choice,
                VoterAddress: accountAddress,
                createdAt: timestamp,
            };
           
            console.log(VoteMetadata);
            if (hash.signature){
                const result = await postVote(VoteMetadata);
                toast.success("Voted Successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            }   else {
                toast.error("Vote Submission Failed", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
            //********************************************** */

            setIsLoading(false);
        } catch (err) {
            console.log(err);
            toast.error("Vote Submission Failed", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            
        }
    }
    
    const handleAbstain = async () =>{
        setIsLoading(true);
        const timestamp = dayjs().valueOf();
        const contractAddressObject = getParsedJsonObj(daoSelected.daoUpAddress);
        const choice = ethers.utils.hexZeroPad(ethers.utils.hexValue(0), 32);
        const proposalUrl = proposal.url.concat(proposal.CID);
        try {
            //************Contract Interaction ************* */
            const proposalSignature = proposal.identifier //proposalSignature get from backend proposals
            //@ts-ignore
            const hash = await getProposalHash(contractAddressObject,proposalSignature,choice);
            console.log("phash",hash.signature);
            //********************************************** */
            
            //************backend Interaction ************* */
            const VoteMetadata = {
                proposalContractAddress: contractAddressObject.daoProposals,
                proposalUrl: proposalUrl,
                proposalName: proposal.proposalName,
                VoterSignature: hash.signature,
                proposalSignature: proposalSignature,
                VoterChoice: choice,
                VoterAddress: accountAddress,
                createdAt: timestamp,
            };
           
            console.log(VoteMetadata);
            if (hash.signature){
                const result = await postVote(VoteMetadata);
                toast.success("Voted Successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            }   else {
                toast.error("Vote Submission Failed", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
            //********************************************** */

            setIsLoading(false);
            
        } catch (err) {
            console.log(err);
            toast.error("Vote Submission Failed", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            
        }
    }

    const handleRegister = async () =>{
        setIsLoading(true);
        const contractAddressObject = getParsedJsonObj(daoSelected.daoUpAddress);
        try {;
            //************Contract Interaction ************* */
            const signaturesArray: string[] = signatureArray;// get this data from new voting model at backend
            const addressesArray: string[] = addressArray;// get this data from new voting model at backend
            const choicesArray: string[] = choiceArray;// get this data from new voting model at backend
            const proposalSignature = proposal.identifier; // get this data from backend proposals
            const result = await registerVotes(contractAddressObject, proposalSignature, signaturesArray, addressesArray, choicesArray);
            console.log("result = ", result);
            // console.log(result)
            //********************************************** */
            if (result.hash){
                toast.success("Voters Registered Successfully", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }else {
                toast.error("Voter registeration Failed", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
            
            setIsLoading(false);

        } catch (err) {
            console.log(err);
            toast.error("Voter registeration Failed", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            
        }
    }

    const handleExecute = async() =>{
        
        setIsLoading(true);
        const contractAddressObject = getParsedJsonObj(daoSelected.daoUpAddress);
        try {
            const proposalSignature = proposal.identifier //proposalSignature get from backend
            //************Contract Interaction ************* */
            
            const result = await executeProposal(contractAddressObject,proposalSignature);
            console.log(result)
            //********************************************** */
            

            if (result.hash){
                toast.success("Executed Successfully", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }else {
                toast.error("Execution Failed", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            toast.error("Execution Failed", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            
        }
    }
    useEffect(() => {
        if (!open)
            setShowModal(false);
    }, [open])

    useEffect(() => {
        const fetchData = async () => {
            const result = await getVotesBySignature(proposal.identifier);
            //   console.log("doa selected set", result);
            setVotes(result);
            console.log("votes",result);
        };
        const getVoterDetails = () => {
            const _voters :string[] = [];
            for (var i = 0; i < permissionsObject.length; i++) {
                if (permissionsObject[i].upAddress == accountAddress) {
                    setUserCanVote(permissionsObject[i].keyPermissions.vote === "True");
                    setUserCanRegister(permissionsObject[i].keyPermissions.registerVotes === "True");
                    setUserCanExecute(permissionsObject[i].keyPermissions.execute === "True");
                }
                if (permissionsObject[i].keyPermissions.vote === "True"){
                    _voters.push(permissionsObject[i].upAddress);
                }
            }
            setVoters(_voters);
        };
        
        fetchData();
        getVoterDetails();
        // checkIfVoted();
    }, [isLoading, accountAddress])

    useEffect(() => {
        const checkIfVoted = () => {
            let total_approved:number = 0;
            let total_rejected:number = 0;
            let total_abstained:number = 0;
            const signature_array :string[] = [];
            const address_array :string[] = [];
            const choice_array :string[] = [];
            for (var i = 0; i < votes.length; i++) {
                if (Number(votes[i].VoterChoice) != 0){
                    signature_array.push(votes[i].VoterSignature);
                    choice_array.push(votes[i].VoterChoice)
                    address_array.push(votes[i].VoterAddress)
                }
                if (votes[i].VoterAddress === accountAddress) {
                    setHasVoted(true);
                    setVoterChoice(Number(votes[i].VoterChoice));
                } 
                if (Number(votes[i].VoterChoice) === 1){
                    total_approved ++;
                } else if (Number(votes[i].VoterChoice) === 2){
                    total_rejected ++;
                } else if (Number(votes[i].VoterChoice) === 0){
                    total_abstained ++;
                }
            }
            setTotalApproved(total_approved);
            setTotalRejected(total_rejected);
            setTotalAbstained(total_abstained);
            setSignatureArray(signature_array);
            setAddressArray(address_array);
            setChoiceArray(choice_array);
            // console.log("choice",choice_array);
            console.log(hasVoted);
            
        };
        checkIfVoted();
    }, [votes])

    const permissionsObject =
    daoSelected.length != ""
      ? getParsedJsonObj(daoSelected.keyPermissions)
      : "";
      
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
    
                <div className="flex flex-col justify-between items-center p-8 bg-[#8168ff]">
                    <div className="flex flex-row w-full justify-between items-center">
                        <h1 className="text-slate-100 text-sm font-semi">{daoSelected.daoName}</h1>
                        <AiOutlineClose fontSize={24} className="text-white hover:bg-[#8186ff] p-[2px] rounded-full cursor-pointer" onClick={handleModel}/>
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
                                        <h1 className="text-slate-300 text-sm font-normal">Proposed By</h1>
                                        <h1 className="text-white text-sm px-2 font-semibold">{shortenAddress(proposal.creator)}</h1>
                                    </div>
                                    {/* <div className="flex justify-start items-center">
                                        <MdLink className="px-1 w-6" color="#fff" fontSize={20}  />
                                        <MdShare className="px-1 w-6" color="#fff" fontSize={20}  />
                                    </div> */}
                                </div>
                            </div>
                            <div className="flex flex-col w-full h-full justify-between items-start ">
                                <div className="max-h-[200px] min-h-[200px] overflow-scroll md:overflow-auto pb-3">
                                    <h1 className="text-white  text-xs font-normal break-all">{proposal.description}</h1>
                                </div>
                                {proposal.proposalType != "General"&&
                                    <div className="flex flex-col w-full justify-between space-y-4 items-start p-2 bg-white rounded-md text-black">
                                        <h1 className="text-sm text-center font-bold">Proposal Details</h1>
            
                                        {proposal.proposalType === "Voting" && <VotingDetails proposalDetailsObject={proposalDetailsObject}/>}
                                        {proposal.proposalType === "Token Transfer" && <TokenTransferDetails proposalDetailsObject={proposalDetailsObject}/>}
                                        {proposal.proposalType === "Permission" && <PermissionDetails proposalDetailsObject={proposalDetailsObject}/>}
                                        {/* {proposal.proposalType === "General" && <GeneralDetails proposalDetailsObject={proposalDetailsObject}/>} */}
                                    </div>
                                }
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
                            <div className="flex flex-col justify-start items-start">
                            { (proposalStatus === "Active" || proposalStatus === "Closed" )&&
                                <>
                                    <h1 className="text-sm font-bold">Current Results</h1>
                                    <ProgressBar reject={((totalRejected/voters.length)*100)} approve={((totalApproved/voters.length)*100)} abstain={((totalAbstained/voters.length)*100)} />
                                    <div className="flex justify-start items-center">
                                        <h1 className="text-sm font-normal">Voted</h1>
                                        <h1 className="text-sm font-semibold px-2">{((votes.length/voters.length)*100).toFixed(0)}%</h1>
                                    </div>
                                    <div className="flex justify-start items-center">
                                        <h1 className="text-sm font-normal">Total Needed</h1>
                                        <h1 className="text-sm font-semibold px-2"> {votingParametersObject.votingMajority}%</h1>
                                    </div>
                                    <div className="flex justify-start items-center">
                                        <h1 className="text-sm font-normal">Participation Required</h1>
                                        <h1 className="text-sm font-semibold px-2"> {votingParametersObject.participationRate}%</h1>
                                    </div>
                                </>
                            }
                            </div>
                            <div className="flex flex-col w-full text-center space-y-1 justify-center items-center text-center">
                                {hasVoted && (
                                     <>
                                        <h1 className="text-sm font-bold">VOTE</h1>
                                        <div className={`flex justify-start items-center w-28 cursor-default ${voterChoice === 0 ? "bg-green-700 opacity-100" :"bg-blue-800 opacity-50"} rounded-full`}>
                                            <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">Approve</h1>
                                        </div>
                                        <div className={`flex justify-start items-center w-28 cursor-default ${voterChoice === 1 ? "bg-red-700 opacity-100" :"bg-blue-800 opacity-50"} rounded-full`}>
                                            <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">Reject</h1>
                                        </div>
                                        <div className={`flex justify-start items-center w-28 cursor-default ${voterChoice === 2 ? "bg-yellow-500 opacity-100" :"bg-blue-800 opacity-50"} rounded-full`}>
                                            <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">Abstain</h1>
                                        </div>
                                    </>
                                )}

                                {((proposalStatus === "Pending" || isLoading || !userCanVote) && proposalStatus != "Closed" && !hasVoted) &&
                                    <>
                                        <h1 className="text-sm font-bold">VOTE</h1>
                                        <div className="flex justify-start items-center w-28 opacity-50 cursor-default  bg-blue-800 rounded-full">
                                            <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">Approve</h1>
                                        </div>
                                        <div className="flex justify-start items-center w-28 opacity-50 cursor-default bg-blue-800 rounded-full">
                                            <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">Reject</h1>
                                        </div>
                                        <div className="flex justify-start items-center w-28 opacity-50 cursor-default bg-blue-800 rounded-full">
                                            <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">Abstain</h1>
                                        </div>
                                    </>
                                }

                                {(proposalStatus === "Active" && !isLoading && userCanVote && !hasVoted)&&
                                    <>
                                        <h1 className="text-sm font-bold">VOTE</h1>
                                        <div onClick={handleApprove} className="flex justify-start items-center w-28 cursor-pointer  active:bg-blue-600 hover:bg-blue-700 bg-blue-800 rounded-full">
                                            <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">Approve</h1>
                                        </div>
                                        <div onClick={handleReject} className="flex justify-start items-center w-28 cursor-pointer active:bg-blue-600 hover:bg-blue-700 bg-blue-800 rounded-full">
                                            <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">Reject</h1>
                                        </div>
                                        <div onClick={handleAbstain} className="flex justify-start items-center w-28 cursor-pointer active:bg-blue-600 hover:bg-blue-700 bg-blue-800 rounded-full">
                                            <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">Abstain</h1>
                                        </div>
                                    </>
                                }
                                
                                {(proposalStatus === "Closed" && !isLoading  ) &&
                                    <>
                                        <h1 className="text-sm font-bold">Actions</h1>
                                        {userCanRegister ?
                                            <div onClick={handleRegister} className="flex justify-start items-center w-28 cursor-pointer  active:bg-blue-600 hover:bg-blue-700 bg-blue-800 rounded-full">
                                                <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">Register</h1>
                                            </div>
                                            :
                                            <div className="flex justify-start items-center w-28 opacity-50 cursor-default  bg-blue-800 rounded-full">
                                                <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">Register</h1>
                                            </div>
                                        }
                                        {userCanExecute ?
                                            <div onClick={handleExecute} className="flex justify-start items-center w-28 cursor-pointer  active:bg-blue-600 hover:bg-blue-700 bg-blue-800 rounded-full">
                                                <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">Execute</h1>
                                            </div>
                                            :
                                             <div className="flex justify-start items-center w-28 opacity-50 cursor-default  bg-blue-800 rounded-full">
                                                <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">Execute</h1>
                                            </div>
                                        }
                                        {!userCanRegister && <h1 className="text-red-600 text-xs font-normal py-1 px-2" >You don't have Register Votes permission</h1>}
                                        {!userCanExecute && <h1 className="text-red-600 text-xs font-normal py-1 px-2" >You don't have Execute Votes permission</h1>}
                                    </>
                                } 
                                {isLoading &&
                                    <SpinnerCircular
                                        size={20}
                                        thickness={200}
                                        speed={118}
                                        color="rgba(153, 153, 153, 1)"
                                        secondaryColor="rgba(172, 5, 55, 1)"
                                        />
                                }
                            {!userCanVote && proposalStatus != "Closed" && <h1 className="text-red-600 text-xs font-normal py-1 px-2" >You don't have Vote permission</h1>}
                           
                            </div>
                            {/* {hasVoted ? <h1 className="text-red-600 text-xs font-normal py-1 px-2">already voted</h1>:"hello"} */}
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
    return (
        <div className="flex flex-col justify-start items-start">
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
                <h1 className="text-xs font-semibold px-2">{proposalDetailsObject.keyPermissions.keyPermissions.vote==="True"?"true":"false"}</h1>
            </div>
            <div className="flex justify-start items-center">
                <h1 className="text-xs font-normal">Propose:</h1>
                <h1 className="text-xs font-semibold px-2">{proposalDetailsObject.keyPermissions.keyPermissions.propose==="True"?"true":"false"}</h1>
            </div>
            <div className="flex justify-start items-center">
                <h1 className="text-xs font-normal">Execute:</h1>
                <h1 className="text-xs font-semibold px-2">{proposalDetailsObject.keyPermissions.keyPermissions.execute==="True"?"true":"false"}</h1>
            </div>

            <div className="flex justify-start items-center">
                <h1 className="text-xs font-normal">Register:</h1>
                <h1 className="text-xs font-semibold px-2">{proposalDetailsObject.keyPermissions.keyPermissions.registerVotes==="True"?"true":"false"}</h1>
            </div>
            <div className="flex justify-start items-center">
                <h1 className="text-xs font-normal">Add Permission:</h1>
                <h1 className="text-xs font-semibold px-2">{proposalDetailsObject.keyPermissions.keyPermissions.addPermission==="True"?"true":"false"}</h1>
            </div>
            <div className="flex justify-start items-center">
                <h1 className="text-xs font-normal">Remove Permission:</h1>
                <h1 className="text-xs font-semibold px-2">{proposalDetailsObject.keyPermissions.keyPermissions.removePermission==="True"?"true":"false"}</h1>
            </div>

            <div className="flex justify-start items-center">
                <h1 className="text-xs font-normal">Send Delegate:</h1>
                <h1 className="text-xs font-semibold px-2">{proposalDetailsObject.keyPermissions.keyPermissions.sendDelegate==="True"?"true":"false"}</h1>
            </div>
            <div className="flex justify-start items-center">
                <h1 className="text-xs font-normal">Receive Delegate:</h1>
                <h1 className="text-xs font-semibold px-2">{proposalDetailsObject.keyPermissions.keyPermissions.receiveDelegate==="True"?"true":"false"}</h1>
            </div>
        </div>
    );
  };

  const ProgressBar = (props: { reject:number, approve:number, abstain:number}) => {
    const { reject, approve, abstain } = props;
    const [widthApprove,setwidthApprove] = useState<string>("")
    const [widthReject,setwidthReject] = useState<string>("")
    const [widthAbstain,setwidthAbstain] = useState<string>("")
    useEffect(() => {
        setwidthApprove((approve.toString()).concat("%"));
        setwidthReject((reject.toString()).concat("%"));
        setwidthAbstain((abstain.toString()).concat("%"));
    }, [reject,approve,abstain])
    
    return (
        <div className="my-1 w-full">
            <div className={`flex justify-start items-center text-black`}>
                <span className="text-green-700 drop-shadow-md text-xs font-bold pr-1">{`${approve}%`} approved,</span>
                <span className="text-red-700 drop-shadow-md text-xs font-bold pr-1">{`${reject}%`} rejected,</span>
                <span className="text-yellow-500 drop-shadow-md text-xs font-bold">{`${abstain}%`} abstained</span>
            </div>
            <div  className="flex h-3 w-[100%] bg-gray-200 rounded-lg my-1 border-2 border-solid border-blue-600 drop-shadow-md">
                <div style={{ width:widthApprove, background: "repeating-linear-gradient(45deg,#15803D 0px,#15803D 10px, #60ad7d 10px, #60ad7d 20px)"}} 
                    className={`h-[100%] bg-green-700`}/>
                
                <div style={{ width:widthReject, background: "repeating-linear-gradient(45deg,#B91C1C 0px,#B91C1C 10px, #b85f5f 10px, #b85f5f 20px)"}}
                    className={`h-[100%] bg-red-700`}/>
                
                <div style={{ width:widthAbstain, background: "repeating-linear-gradient(45deg,#EAB308 0px,#EAB308 10px, #c2c071 10px, #c2c071 20px)"}}
                    className={`h-[100%]  bg-yellow-500`}/>
            </div>
      </div>
    );
  };