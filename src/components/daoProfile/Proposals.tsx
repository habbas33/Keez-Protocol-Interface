import React, { useEffect, useState, useContext } from "react";
import { SingleSelect } from "../../components";
import { getProposalsByDaoCid } from "../../services/keezBackend";
import { ProposalVotingModal } from "../../modals";
import Skeleton from "@material-ui/lab/Skeleton";
import { getParsedJsonObj } from "../../utils/getParsedJsonObj";
import dayjs from "dayjs";
import { json } from "stream/consumers";

const Proposals = (props: { daoDetail: any }) => {
  const { daoDetail } = props;
  const [proposals, setProposals] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filterStr, setFilter] = useState("");
  const [filterActivity, setFilterActivity] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const result = await getProposalsByDaoCid(daoDetail.CID);
      setProposals(result);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ["All", "Voting", "Permission", "General", "Token Transfer"];
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
          {categories.map((category,index) => {
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

      {proposals.length != 0 && !isLoading ? (
        <div className="grid sm:grid-cols-2 gap-5 md:grid-cols-3 lg-grid-cols-4">
          {[...proposals]
            .filter((proposal) => proposal.proposalType.includes(filterStr))
            .filter((proposal) => {
              const createdAt = dayjs(Number(proposal.createdAt));
              let details = getParsedJsonObj(proposal.forDaoDetails);
              let votingParameters = getParsedJsonObj(
                daoDetail.votingParameters
              );
              const min_voting_delay = votingParameters.minVotingDelay;
              const min_voting_period = votingParameters.minVotingPeriod;
              const min_execution_delay = votingParameters.minExecutionDelay;
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
}) => {
  const { daoDetail, proposal, setIsLoading } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [daoSelected, setDaoSelected] = useState<any>([]);
  const [proposalStatus, setProposalStatus] = useState<string>("");

useEffect(() => {
  if (daoDetail){
    setIsLoading(true);
    setDaoSelected(daoDetail);
  }
}, [daoDetail])

useEffect(() => {
  if (daoSelected){
    const createdAt = dayjs(Number(proposal.createdAt));
    const votingParametersObject =
      daoSelected.length != 0
        ? getParsedJsonObj(daoSelected.votingParameters)
        : "";
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
}, [daoSelected])

  return (
    <div
      onClick={() => setShowModal(true)}
      className="w-full h-60 flex flex-1 flex-col cursor-pointer rounded-lg border-2 border-white bg-slate-300 pb-1"
    >
      <div className="flex flex-col justify-start items-start h-full p-5">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-gray-800 font-bold">
            {daoDetail.daoName}
          </h1>
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
          daoSelected={daoSelected}
        />
      )}
    </div>
  );
};
