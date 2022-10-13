import React, { useEffect, useState, useCallback } from "react";
import { SingleSelect } from "../../components";
import { getProposalsByDaoCid } from "../../services/keezBackend";
import { ProposalVotingModal } from "../../modals";
import Skeleton from "@material-ui/lab/Skeleton";
import { getParsedJsonObj } from "../../utils/getParsedJsonObj";
import dayjs from "dayjs";
import { universalProfileContract } from "../../services/web3";

const Proposals = (props: { daoDetail: any; votingParameters: any }) => {
  const { daoDetail, votingParameters } = props;
  const [proposals, setProposals] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filterStr, setFilter] = useState("");
  const [filterActivity, setFilterActivity] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const result = await getProposalsByDaoCid(daoDetail.CID);
      console.log(result);
      setProposals(result);
      setIsLoading(false);
    };
    fetchData();
  }, [daoDetail.CID]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    "All",
    "Voting",
    "Permission",
    "General",
    "Token Transfer",
  ];
  const filterByCategory = (category: string) => {
    if (category === "All") {
      setFilter("");
    } else {
      setFilter(category);
    }
  };
  const state = [
    {
      value: "",
      label: "All",
    },
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Closed",
      label: "Closed",
    },
    {
      value: "Pending",
      label: "Pending",
    },
  ];

  return (
    <div className="flex-col md:py-4 justify-start items-start w-full">
      <div className="flex w-full flex-wrap justify-between items-center md:py-4 my-1">
        <div className="flex flex-wrap items-center border-solid border-[#999999] border-2 rounded-lg bg-white text-[#7f7f81] px-2 text-sm font-bold">
          {categories.map((category, index) => {
            return (
              <p
                key={index}
                onClick={() => filterByCategory(category)}
                className={`hover:border-[#1A1A1D] border-b-2 cursor-pointer  px-2 hover:text-[#1A1A1D] py-2 ${
                  category === filterStr
                    ? "text-[#1A1A1D] border-[#1A1A1D]"
                    : ""
                }`}
              >
                {category}
              </p>
            );
          })}
        </div>
        <div className="w-1/3">
          <SingleSelect
            handleChange={(e: any) => {
              setFilterActivity(e.value);
            }}
            name={"MinVotingDelay"}
            placeholder={"Select your state"}
            listItems={state}
          />
        </div>
      </div>

      {proposals.length !== 0 && !isLoading ? (
        <div className="grid sm:grid-cols-2 gap-5 md:grid-cols-3 lg-grid-cols-4">
          {[...proposals]
            .filter((proposal) => proposal.proposalType.includes(filterStr))
            .filter((proposal) => {
              const createdAt = dayjs(Number(proposal.createdAt));
              // let details = getParsedJsonObj(proposal.forDaoDetails);
              // let votingParameters = getParsedJsonObj(
              //   daoDetail.votingParameters
              // );
              const min_voting_delay = votingParameters.minVotingDelay;
              const min_voting_period = votingParameters.minVotingPeriod;
              const startDay = createdAt.add(min_voting_delay, "day");
              const endDay = startDay.add(min_voting_period, "day");
              const proposalStatus =
                startDay > dayjs()
                  ? "Pending"
                  : startDay <= dayjs() && endDay >= dayjs()
                  ? "Active"
                  : "Closed";
              return proposalStatus?.includes(filterActivity);
            })
            .reverse()
            .map((proposal, i) => (
              <ProposalCard
                key={i}
                daoDetail={daoDetail}
                proposal={proposal}
                defaultVotingParams={votingParameters}
                setIsLoading={setIsLoading}
              />
            ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5 md:grid-cols-3 lg-grid-cols-4">
          {[1, 1, 1].reverse().map((daoDetail, i) => (
            <Skeleton
              key={i}
              animation="wave"
              className="w-full h-60 rounded-lg pb-1"
              variant="rect"
              height={240}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Proposals;

const ProposalCard = (props: {
  daoDetail: any;
  proposal: any;
  setIsLoading: any;
  defaultVotingParams: any;
}) => {
  const { daoDetail, proposal, setIsLoading, defaultVotingParams } = props;
  const proposalSignature = proposal.identifier;
  const [votingParameters, setVotingParams] = useState<any>({});
  const universalProfile = getParsedJsonObj(
    daoDetail.daoUpAddress
  ).universalProfile;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [daoSelected, setDaoSelected] = useState<any>([]);
  const [proposalStatus, setProposalStatus] = useState<string>("");

  useEffect(() => {
    if (daoDetail) {
      setIsLoading(true);
      setDaoSelected(daoDetail);
    }
  }, [daoDetail]);
  const getProfile = useCallback(async () => {
    let contract = await universalProfileContract(universalProfile)
      ["getData(bytes32[])"]([
        // DAO Settings
        proposalSignature + "0000cc713dffc839645a02779745d6e8e8cca753795c",
        proposalSignature + "00006ebe389303905e56ea48aecac1536207791d0e67",
        proposalSignature + "0000164526a330a273b37abc4c89336a3042182a3910",
        proposalSignature + "0000e5dd8acc7154a678a0a3fa3fe2d65b8700bf702c",
        proposalSignature + "00002d53f22395ee464559c1d5b27661145933a15e8f",
      ])
      .call();
    // let contract1 = await universalProfileContract(universalProfile)
    //   ["getData(bytes32[])"]([
    //     // DAO Settings
    //     "0xdf30dba06db6a30e65354d9a64c60986" +
    //       "00000000000000000000000000000002",
    //   ])
    //   .call();
    // // console.log("prop", contract1);
    const Params: any = {
      minVotingDelay: parseInt(contract[0]),
      minVotingPeriod: parseInt(contract[1]) / (24 * 3600),
      minExecutionDelay: parseInt(contract[2]),
      votingMajority: defaultVotingParams.votingMajority,
      participationRate: defaultVotingParams.participationRate,
    };
    console.log(Params);
    setVotingParams(Params);
  }, [universalProfile, defaultVotingParams, proposalSignature]);

  useEffect(() => {
    if (daoSelected) {
      const createdAt = dayjs(Number(proposal.createdAt));
      getProfile();

      const votingParametersObject =
        daoSelected.length !== 0 ? votingParameters : "";
      const min_voting_delay = votingParametersObject.minVotingDelay;
      const min_voting_period = votingParametersObject.minVotingPeriod;
      const startDay = createdAt.add(min_voting_delay, "day");
      const endDay = startDay.add(min_voting_period, "day");
      const proposal_status =
        startDay > dayjs()
          ? "Pending"
          : startDay <= dayjs() && endDay >= dayjs()
          ? "Active"
          : "Closed";
      setProposalStatus(proposal_status);
      setIsLoading(false);
    }
  }, [daoSelected, getProfile]);

  return (
    <div
      onClick={() => setShowModal(true)}
      className="w-full h-60 flex flex-1 flex-col cursor-pointer rounded-lg border-2 border-white bg-slate-300 pb-1"
    >
      <div className="flex flex-col justify-start items-start h-full p-5">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-gray-800 font-bold">{daoDetail.daoName}</h1>
          {proposalStatus === "Active" && (
            <div className="flex justify-start items-center bg-green-800 rounded-full">
              <h1 className="text-slate-100 text-xs font-normal py-1 px-2">
                Active
              </h1>
            </div>
          )}
          {proposalStatus === "Closed" && (
            <div className="flex justify-start items-center bg-red-800 rounded-full">
              <h1 className="text-slate-100 text-xs font-normal py-1 px-2">
                Closed
              </h1>
            </div>
          )}
          {proposalStatus === "Pending" && (
            <div className="flex justify-start items-center bg-yellow-800 rounded-full">
              <h1 className="text-slate-100 text-xs font-normal py-1 px-2">
                Pending
              </h1>
            </div>
          )}
        </div>

        <div className="flex w-full flex-col mt-3 justify-start overflow-y-auto items-center h-full ">
          <h1 className="text-black text-lg w-[100%] text-center break-words font-bold ">
            {proposal.proposalName}
          </h1>
          <h1 className="text-black text-xs w-[100%] break-words  pr-2 mb-1">
            {proposal.description}
          </h1>
        </div>
      </div>
      {showModal && (
        <ProposalVotingModal
          showModal={showModal}
          setShowModal={setShowModal}
          proposal={proposal}
          votingParameters={votingParameters}
          daoSelected={daoSelected}
        />
      )}
    </div>
  );
};
