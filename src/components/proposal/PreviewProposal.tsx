import React, { useContext, useState, useEffect } from "react";
import { MdLink, MdShare } from "react-icons/md";
import { CreateProposalContext } from "../../context/CreateProposalContext";
import { ProfileContext } from "../../context/ProfileContext";
// import { create, IPFSHTTPClient } from "ipfs-http-client";
import { IPFS_DWEB_URL } from "../../constants/globals";
import { toast } from "react-toastify";
import { shortenAddress } from "../../utils/shortenAddress";
import { SpinnerCircular } from "spinners-react";
import { postJsonToIPFS, postImageToIPFS } from "../../services/web3Storage";
import { getDaoByCID, postProposal } from "../../services/keezBackend";
import dayjs from "dayjs";

const GeneralTemplate = (props: { handleComponent: any }) => {
  const { handleComponent } = props;
  const {
    proposalName,
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
    vaultPermissions,
    daoCid,
  } = useContext(CreateProposalContext);
  const { accountAddress } = useContext(ProfileContext);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [metalink, setMetalink] = useState<string>("");
  const [daoSelected, setDaoSelected] = useState<any>([]);

  toast.configure();
  const now = dayjs();
  const startDay = now.add(minVotingDelay, "day");
  const endDay = startDay.add(minVotingPeriod, "day");

  const handleSubmit = async (event: React.FormEvent) => {
    setSubmitLoading(true);
    const timestamp = dayjs().valueOf();

    try {
      let ProposalMetadata = {};
      switch (proposalType) {
        case "Voting":
          ProposalMetadata = {
            proposalProfile: {
              proposalType: proposalType,
              proposalName: proposalName,
              categories: categories,
              description: description,
              creator: accountAddress,
            },
            forDaoDetails: {
              daoName: daoSelected.daoName,
              url: daoSelected.url,
              CID: daoSelected.CID,
            },
            proposalDetails: {
              participationRate: participationRate,
              votingMajority: votingMajority,
              minVotingDelay: minVotingDelay,
              minVotingPeriod: minVotingPeriod,
            },
            createdAt: timestamp,
          };
          break;
        case "Token Transfer":
          ProposalMetadata = {
            proposalProfile: {
              proposalType: proposalType,
              proposalName: proposalName,
              categories: categories,
              description: description,
              creator: accountAddress,
            },
            forDaoDetails: {
              daoName: daoSelected.daoName,
              url: daoSelected.url,
              CID: daoSelected.CID,
            },
            proposalDetails: {
              selectedVault: selectedVault,
              selectedToken: selectedToken,
              receivingAddress: receivingAddress,
            },
            createdAt: timestamp,
          };
          break;
        case "Permission":
          if (membersOrVault === "Members") {
            ProposalMetadata = {
              proposalProfile: {
                proposalType: proposalType,
                proposalName: proposalName,
                categories: categories,
                description: description,
                creator: accountAddress,
              },
              forDaoDetails: {
                daoName: daoSelected.daoName,
                url: daoSelected.url,
                CID: daoSelected.CID,
              },
              proposalDetails: { keyPermissions: keyPermissions },
              createdAt: timestamp,
            };
          } else if (membersOrVault === "Vault") {
            ProposalMetadata = {
              proposalProfile: {
                proposalType: proposalType,
                proposalName: proposalName,
                categories: categories,
                description: description,
                creator: accountAddress,
              },
              forDaoDetails: {
                daoName: daoSelected.daoName,
                url: daoSelected.url,
                CID: daoSelected.CID,
              },
              proposalDetails: { vaultPermissions: vaultPermissions },
              createdAt: timestamp,
            };
          }
          break;
        case "General":
          // let path:string = "";
          let resultLogoMetadata: any = "";
          if (coverImageFile) {
            resultLogoMetadata = await postImageToIPFS(coverImageFile);
          }
          ProposalMetadata = {
            proposalProfile: {
              proposalType: proposalType,
              proposalName: proposalName,
              categories: categories,
              description: description,
              creator: accountAddress,
            },
            forDaoDetails: {
              daoName: daoSelected.daoName,
              url: daoSelected.url,
              CID: daoSelected.CID,
            },
            proposalDetails: {
              proposalCoverImage: {
                hash: resultLogoMetadata.cid,
                url: IPFS_DWEB_URL,
              },
              votingOptions: votingOptions,
            },
            createdAt: timestamp,
          };
          break;
      }
      const resultDaoMetadata = await postJsonToIPFS(ProposalMetadata); //
      const metalink: string = IPFS_DWEB_URL.concat(resultDaoMetadata.cid); //

      //@ts-ignore
      ProposalMetadata.proposalProfile["CID"] = resultDaoMetadata.cid;
      //@ts-ignore
      ProposalMetadata.proposalProfile["url"] = IPFS_DWEB_URL;
      //@ts-ignore
      ProposalMetadata.proposalProfile["identifier"] = "";

      console.log("ProposalMetadata = ", JSON.stringify(ProposalMetadata));

      console.log(metalink);
      setMetalink(metalink);
      window.open(metalink, "_blank");
      const result = await postProposal(ProposalMetadata);
      setSubmitLoading(false);
      toast.success("Proposal Created", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (err) {
      console.log(err);
      toast.error("Proposal Creation Unsuccessful", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setSubmitLoading(false);
    }
  };

  const handleEdit = async () => {
    switch (proposalType) {
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
  };

  useEffect(() => {
    if (daoCid) {
      const fetchData = async () => {
        const result = await getDaoByCID(daoCid);
        console.log("doa selected set", result);
        setDaoSelected(result);
      };
      fetchData();
    }
  }, [daoCid]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  toast.configure();
  return (
    <div className="bg-welcome pt-28  min-h-[100vh] w-full px-5 md:px-[20%]">
      <h1 className="text-white text-center text-lg pb-2 font-bold">
        Preview Proposal
      </h1>
      <div className="flex flex-col justify-between items-center p-8 bg-black">
        <div className="flex flex-row w-full justify-between items-center">
          <h1 className="text-slate-100 text-sm font-semi">
            {daoSelected.daoName}
          </h1>
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
        <div className="grid gap-x-6 gap-y-5 md:grid-cols-2 w-full text-white py-2">
          <div className="flex flex-col space-y-2 justify-start items-start">
            <h1 className="text-white text-md font-semibold">{proposalName}</h1>

            <div className="flex justify-start items-center bg-blue-800 rounded-full">
              <h1 className="text-slate-100 text-xs font-normal py-1 px-2">
                In Making
              </h1>
            </div>
            <div className="flex flex-col w-full justify-start items-start">
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex justify-start items-center">
                  <h1 className="text-slate-400 text-sm font-normal">
                    Proposed By
                  </h1>
                  <h1 className="text-white text-sm px-2 font-semibold">
                    {shortenAddress(proposer)}
                  </h1>
                </div>
                {/* <div className="flex justify-start items-center">
                                    <MdLink className="px-1 w-6" color="#fff" fontSize={20}  />
                                    <MdShare className="px-1 w-6" color="#fff" fontSize={20}  />
                                </div> */}
              </div>
            </div>
            <h1 className="text-white pr-1 overflow-y-auto text-sm font-normal">
              {description}
            </h1>
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
                <h1 className="text-sm font-semibold px-2">
                  {startDay.format("YYYY-MM-DD HH:mm")}
                </h1>
              </div>
              <div className="flex justify-start items-center">
                <h1 className="text-sm font-normal">Voting Ends on:</h1>
                <h1 className="text-sm font-semibold px-2">
                  {endDay.format("YYYY-MM-DD HH:mm a")}
                </h1>
              </div>
            </div>

            <div className="flex flex-col w-full text-center space-y-1 justify-center items-center text-center">
              <h1 className="text-sm font-bold">VOTE</h1>
              <div className="flex justify-start items-center w-28 bg-blue-800 rounded-full">
                <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">
                  For
                </h1>
              </div>
              <div className="flex justify-start items-center w-28 bg-blue-800 rounded-full">
                <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">
                  Against
                </h1>
              </div>
              <div className="flex justify-start items-center w-28 bg-blue-800 rounded-full">
                <h1 className="text-slate-100 w-full text-sm text-center font-normal py-1 px-5">
                  Abstain
                </h1>
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
        ) : (
          <button
            disabled
            type="submit"
            className="flex justify-center rounded-md item-center mb-10 mt-[12px]
                        border border-transparent shadow-sm px-4 py-2 bg-[#C3073F]
                        text-base font-medium text-white opacity-50"
          >
            <SpinnerCircular
              size={20}
              thickness={200}
              speed={118}
              color="rgba(153, 153, 153, 1)"
              secondaryColor="rgba(172, 5, 55, 1)"
            />
          </button>
        )}
        ;
      </div>
    </div>
  );
};

export default GeneralTemplate;
