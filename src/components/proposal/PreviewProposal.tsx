import React, { useContext, useState, useEffect } from 'react'
import { MdLink, MdShare} from "react-icons/md";
import { MultiSelect, FileUploader, Input } from "../../components";
import { CreateProposalContext } from '../../context/CreateProposalContext'
import { daoCategoryItems } from '../../constants/daoCategoryItems';
import { votingPeriodItems, votingDelayItems } from '../../constants/votingPeriodItems';
import { create, IPFSHTTPClient } from "ipfs-http-client";
import { IPFS_INFURA_URL } from '../../constants/globals';
import {toast} from 'react-toastify';
import { shortenAddress } from "../../utils/shortenAddress";
import { SpinnerCircular } from 'spinners-react';
import dayjs from 'dayjs';

const GeneralTemplate = (props: {handleComponent:any}) => {
    const {handleComponent} = props;
    const { proposalName,
        categories,
        coverImageFile,
        description,
        participationRate,
        votingMajority,
        selectedVault,
        selectedToken,
        receivingAddress,
        minVotingDelay,
        minVotingPeriod,
        votingOptions,
        proposer,
        proposalType,
        membersOrVault,
        keyPermissions,
        vaultPermissions 
        } = useContext(CreateProposalContext);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [metalink, setMetalink] = useState<string>('');

    const createIpfsClient = () => {
        let ipfs: IPFSHTTPClient | undefined;
        try {
            ipfs = create({
            url: "https://ipfs.infura.io:5001/api/v0",
        
            });
        } catch (error) {
            console.error("IPFS error ", error);
            ipfs = undefined;
        }
        return ipfs;
    }
    toast.configure();
    const now = dayjs();
    const startDay = now.add(minVotingDelay, 'day');
    const endDay = startDay.add(minVotingPeriod, 'day');

    const handleSubmit = async (event: React.FormEvent) => {
        setSubmitLoading(true);
        const ipfsHttpClient: IPFSHTTPClient | undefined = createIpfsClient();

        
        try {
            let ProfileMetadata = {};
            switch(proposalType) {
                case "Voting":
                    ProfileMetadata = {"proposalProfile":{'proposalType':proposalType,'proposalName':proposalName,'categories':categories,'description':description},
                        "votingParameters":{'participationRate':participationRate, 'votingMajority':votingMajority, 'minVotingDelay':minVotingDelay,'minVotingPeriod':minVotingPeriod}
                    };
                    break;
                case "Token Transfer":
                    ProfileMetadata = {"proposalProfile":{'proposalType':proposalType,'proposalName':proposalName,'categories':categories,'description':description},
                    "transferParameters":{'selectedVault':selectedVault, 'selectedToken':selectedToken, 'receivingAddress':receivingAddress}
                    };
                    break;
                case "Permission":
                    if (membersOrVault === "Members"){
                        ProfileMetadata = {"proposalProfile":{'proposalType':proposalType,'proposalName':proposalName,'categories':categories,'description':description},
                        "Permissions":keyPermissions };
                      } else if (membersOrVault === "Vault"){
                        ProfileMetadata = {"proposalProfile":{'proposalType':proposalType,'proposalName':proposalName,'categories':categories,'description':description},
                        "Permission":vaultPermissions };
                      }
                    break;
                case "General":
                    let path:string = "";
                    if (coverImageFile) {
                        const result = await (ipfsHttpClient as IPFSHTTPClient).add(coverImageFile);
                        path = result.path;
                        console.log("path",path)
                        console.log("result.path =",result.path)
                    }
                    ProfileMetadata = {"proposalProfile":{'proposalType':proposalType,'proposalName':proposalName,'categories':categories,'description':description, 'proposalCoverImage':{hash:path,url:IPFS_INFURA_URL}},
                        "votingOptions":votingOptions };
                        
                        console.log(ProfileMetadata)
                    break;
            }
            console.log(membersOrVault);
            console.log(ProfileMetadata);
            const resultProfileMetadata = await (ipfsHttpClient as IPFSHTTPClient).add(JSON.stringify(ProfileMetadata));
            setSubmitLoading(false);
            toast.success("Proposal Created",
                {position: toast.POSITION.BOTTOM_RIGHT});
            console.log(IPFS_INFURA_URL.concat(resultProfileMetadata.path));
            setMetalink(IPFS_INFURA_URL.concat(resultProfileMetadata.path));
            window.open(IPFS_INFURA_URL.concat(resultProfileMetadata.path),'_blank');
        } catch (err) {
            toast.error("Proposal Creation Unsuccessful",
            {position: toast.POSITION.BOTTOM_RIGHT});
            setSubmitLoading(false);
        }
        
    }

    const handleEdit = async () => {
        switch(proposalType) {
            case "Voting":
                handleComponent("VotingTemplate");
                break;
            case "Token Transfer":
                handleComponent("DaoTransferTokenTemplate");
                break;
            case "Permission":
                handleComponent("PermissionTemplate");
                break;
            case "General":
                handleComponent("GeneralTemplate");
                break;
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
 
    toast.configure();
    return(
      <div className="bg-welcome pt-28  min-h-[100vh] w-full px-5 md:px-80">
        <h1 className="text-white text-center text-lg pb-2 font-bold">Preview Proposal</h1>
            <div className="flex flex-col justify-between items-center p-8 bg-black">
                <div className="flex flex-row w-full justify-between items-center">
                    <h1 className="text-slate-100 text-sm font-semi">DAO Name</h1>
                    <button
                        type="button"
                        onClick={handleEdit}
                        className="flex justify-center rounded-md item-center ml-auto 
                        border border-transparent shadow-sm px-3 py-1 bg-[#C3073F]
                        text-base font-medium text-white hover:bg-[#ac0537] 
                            w-auto text-sm"
                        >
                        Edit
                    </button>
                </div>
                
                <div className="grid gap-x-6 gap-y-0 grid-cols-2 w-full text-white py-2">
                    <div className="flex flex-col space-y-2 justify-start items-start">
                        <h1 className="text-white text-md font-semibold">{proposalName}</h1>
                        
                        <div className="flex justify-start items-center bg-blue-800 rounded-full">
                            <h1 className="text-slate-100 text-xs font-normal py-1 px-2">In Making</h1>
                        </div>
                        <div className="flex flex-col w-full justify-start items-start">
                            <div className="flex flex-row w-full justify-between items-center">
                                <div className="flex justify-start items-center">
                                    <h1 className="text-slate-400 text-sm font-normal">Proposed By</h1>
                                    <h1 className="text-white text-sm font-semibold">{shortenAddress(proposer)}</h1>
                                </div>
                                <div className="flex justify-start items-center">
                                    <MdLink className="px-1 w-6" color="#fff" fontSize={20}  />
                                    <MdShare className="px-1 w-6" color="#fff" fontSize={20}  />
                                </div>
                            </div>
                        </div>
                        <h1 className="text-white h-[250px] pr-1 overflow-y-auto text-sm font-normal">{description}</h1>
                    </div>
                    <div className="flex flex-col justify-between space-y-4 items-start p-4 bg-white rounded-md text-black">
                        <h1 className="text-sm font-bold">Information</h1>
                        <div className="flex flex-col justify-start items-start">
                            <div className="flex justify-start items-center">
                                <h1 className="text-sm font-normal">Proposal Type:</h1>
                                <h1 className="text-sm font-semibold px-2">{proposalType}</h1>
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
                                <h1 className="text-sm font-semibold px-2">{endDay.format('YYYY-MM-DD HH:mm a')}</h1>
                            </div>
                        </div>

                        <div className="flex flex-col w-full text-center space-y-1 justify-center items-center text-center">
                            <h1 className="text-sm font-bold">VOTE</h1>
                            <div className="flex justify-start items-center w-28 bg-blue-800 rounded-full">
                                <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">For</h1>
                            </div>
                            <div className="flex justify-start items-center w-28 bg-blue-800 rounded-full">
                                <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">Against</h1>
                            </div>
                            <div className="flex justify-start items-center w-28 bg-blue-800 rounded-full">
                                <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">Abstain</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end items-center">
                {/* <button
                    type="submit"
                    className="flex justify-center rounded-md item-center mb-10 mt-[12px]
                        border border-transparent shadow-sm px-4 py-2 bg-[#C3073F]
                        text-base font-medium text-white hover:bg-[#ac0537] 
                        sm:w-auto sm:text-sm"
                    >
                    <p> Submit</p>
                </button> */}

                {!submitLoading ? (
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="flex justify-center rounded-md item-center mb-10 mt-[12px]
                    border border-transparent shadow-sm px-4 py-2 bg-[#C3073F]
                    text-base font-medium text-white hover:bg-[#ac0537] 
                    sm:w-auto sm:text-sm"
                    >
                    Submit
                </button>
             ):(
                <button
                    disabled
                    type="submit"
                    className="flex justify-center rounded-md item-center mb-10 mt-[12px]
                        border border-transparent shadow-sm px-4 py-2 bg-[#C3073F]
                        text-base font-medium text-white opacity-50"
                    ><SpinnerCircular size={20} thickness={200} speed={118} color="rgba(153, 153, 153, 1)" secondaryColor="rgba(172, 5, 55, 1)" /></button>
                )};
            </div>
      </div>
    );
  }
  
  
export default GeneralTemplate;


