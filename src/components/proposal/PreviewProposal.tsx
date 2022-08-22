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
import { votingDelayItems } from "../../constants/votingPeriodItems";
import dayjs from "dayjs";
import { getParsedJsonObj } from "../../utils/getParsedJsonObj";

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
    tokenAmount,
    receivingAddress,
    minVotingDelay,
    minVotingPeriod,
    minExecutionDelay,
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
  const votingParametersObject =
    daoSelected.length != ""
      ? getParsedJsonObj(daoSelected.votingParameters)
      : "";

  const min_voting_delay = votingParametersObject.minVotingDelay;
  const min_voting_period = votingParametersObject.minVotingPeriod;
  const min_execution_delay = votingParametersObject.minExecutionDelay;

  const now = dayjs();
  const startDay = now.add(min_voting_delay, "day");
  const endDay = startDay.add(min_voting_period, "day");
  const executionDay = startDay.add(
    min_execution_delay
      ? Number(min_voting_period) + Number(min_execution_delay)
      : min_voting_period,
    "day"
  );

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
              minExecutionDelay: minExecutionDelay,
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
              tokenAmount: tokenAmount,
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
        //   console.log("doa selected set", result);
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
    <div className="bg-welcome pt-28  min-h-[100vh] w-full px-5 md:px-[15%]">
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

        <div className="grid gap-x-6 gap-3 md:grid-cols-2 grid-cols-1 w-full text-white py-2">
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
            <div className="flex flex-col h-full w-full justify-between items-start">
              <h1 className="text-white pb-3 text-xs font-normal break-words">
                {description}
              </h1>
              <div className="flex flex-col w-full justify-between space-y-4 items-start p-2 bg-white rounded-md text-black">
                <h1 className="text-sm text-center font-bold">
                  Proposal Details
                </h1>

                {proposalType === "Voting" && <VotingDetails />}
                {proposalType === "Token Transfer" && <TokenTransferDetails />}
                {proposalType === "Permission" && <PermissionDetails />}
                {proposalType === "General" && <GeneralDetails />}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-4 items-between p-4 bg-white rounded-md text-black">
            <div className="flex flex-col justify-between space-y-4 items-start">
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
                    {endDay.format("YYYY-MM-DD HH:mm")}
                  </h1>
                </div>
                <div className="flex justify-start items-center">
                  <h1 className="text-sm font-normal">Proposal Executes on:</h1>
                  <h1 className="text-sm font-semibold px-2">
                    {executionDay.format("YYYY-MM-DD HH:mm")}
                  </h1>
                </div>
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

const VotingDetails = () => {
  const {
    participationRate,
    votingMajority,
    minVotingDelay,
    minVotingPeriod,
    minExecutionDelay,
  } = useContext(CreateProposalContext);
  const votingDelay = votingDelayItems.find(
    (element) => element.value === minVotingDelay.toString()
  ) || { value: 0, label: "instant" };
  const votingPeriod = votingDelayItems.find(
    (element) => element.value === minVotingPeriod.toString()
  ) || { value: 1, label: "24 hrs" };
  const executionDelay = votingDelayItems.find(
    (element) => element.value === minExecutionDelay.toString()
  ) || { value: 0, label: "instant" };
  return (
    <div className="flex flex-col justify-start items-start">
      <div className="flex justify-start items-center">
        <h1 className="text-sm font-normal">Participation Rate:</h1>
        <h1 className="text-sm font-semibold px-2">{participationRate}%</h1>
      </div>
      <div className="flex justify-start items-center">
        <h1 className="text-sm font-normal">Majority:</h1>
        <h1 className="text-sm font-semibold px-2">{votingMajority}%</h1>
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

const GeneralDetails = (props: {}) => {
  // const {id, daoSelected, handleDaoSelection, daoDetail } = props;
  const { votingOptions } = useContext(CreateProposalContext);
  return (
    <div className="flex flex-col justify-start items-start">
      {/* <div className="flex justify-start items-center">
                <h1 className="text-sm font-normal">Proposal Type:</h1>
                <h1 className="text-sm font-semibold px-2"></h1>
            </div> */}
      <div className="flex flex-col justify-start items-start">
        <h1 className="text-sm font-normal">Voting Options:</h1>
        {votingOptions.map((value, index) => (
          <h1 key={index} className="text-sm font-semibold px-4">
            {value}
          </h1>
        ))}
      </div>
    </div>
  );
};

const TokenTransferDetails = (props: {}) => {
  // const {id, daoSelected, handleDaoSelection, daoDetail } = props;
  const { selectedVault, selectedToken, receivingAddress, tokenAmount } =
    useContext(CreateProposalContext);
  return (
    <div className="flex flex-col justify-start items-start">
      <div className="flex justify-start items-center">
        <h1 className="text-sm font-normal">Receiving Vault:</h1>
        <h1 className="text-sm font-semibold px-2">{selectedVault}</h1>
      </div>
      <div className="flex justify-start items-center">
        <h1 className="text-sm font-normal">Token Type:</h1>
        <h1 className="text-sm font-semibold px-2">{selectedToken}</h1>
      </div>
      <div className="flex justify-start items-center">
        <h1 className="text-sm font-normal">Number of Tokens:</h1>
        <h1 className="text-sm font-semibold px-2">{tokenAmount}</h1>
      </div>
      <div className="flex justify-start items-center">
        <h1 className="text-sm font-normal">Receiving Address:</h1>
        <h1 className="text-sm font-semibold px-2">
          {shortenAddress(receivingAddress)}
        </h1>
      </div>
    </div>
  );
};

const PermissionDetails = (props: {}) => {
  // const {id, daoSelected, handleDaoSelection, daoDetail } = props;
  const { keyPermissions } = useContext(CreateProposalContext);
  // console.log(keyPermissions.keyPermissions.masterKey)
  return (
    <div className="flex flex-col justify-start items-start">
      <div className="flex justify-start items-center">
        <h1 className="text-sm font-normal">
          Address:{shortenAddress(keyPermissions.upAddress)}
        </h1>
        <h1 className="text-sm font-semibold px-2"></h1>
      </div>

      <h1 className="text-sm font-normal">New Permissions</h1>
      <div className="flex justify-start items-center">
        <h1 className="text-xs font-normal">Vote:</h1>
        <h1 className="text-xs font-semibold px-2">
          {keyPermissions.keyPermissions.vote ? "true" : "false"}
        </h1>
      </div>
      <div className="flex justify-start items-center">
        <h1 className="text-xs font-normal">Propose:</h1>
        <h1 className="text-xs font-semibold px-2">
          {keyPermissions.keyPermissions.propose ? "true" : "false"}
        </h1>
      </div>
      <div className="flex justify-start items-center">
        <h1 className="text-xs font-normal">Execute:</h1>
        <h1 className="text-xs font-semibold px-2">
          {keyPermissions.keyPermissions.execute ? "true" : "false"}
        </h1>
      </div>

      <div className="flex justify-start items-center">
        <h1 className="text-xs font-normal">Register:</h1>
        <h1 className="text-xs font-semibold px-2">
          {keyPermissions.keyPermissions.registerVotes ? "true" : "false"}
        </h1>
      </div>
      <div className="flex justify-start items-center">
        <h1 className="text-xs font-normal">Add Permission:</h1>
        <h1 className="text-xs font-semibold px-2">
          {keyPermissions.keyPermissions.addPermission ? "true" : "false"}
        </h1>
      </div>
      <div className="flex justify-start items-center">
        <h1 className="text-xs font-normal">Remove Permission:</h1>
        <h1 className="text-xs font-semibold px-2">
          {keyPermissions.keyPermissions.removePermission ? "true" : "false"}
        </h1>
      </div>

      <div className="flex justify-start items-center">
        <h1 className="text-xs font-normal">Send Delegate:</h1>
        <h1 className="text-xs font-semibold px-2">
          {keyPermissions.keyPermissions.sendDelegate ? "true" : "false"}
        </h1>
      </div>
      <div className="flex justify-start items-center">
        <h1 className="text-xs font-normal">Receive Delegate:</h1>
        <h1 className="text-xs font-semibold px-2">
          {keyPermissions.keyPermissions.receiveDelegate ? "true" : "false"}
        </h1>
      </div>
    </div>
  );
};
