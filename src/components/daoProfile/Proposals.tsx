import React, { useEffect, useState, useContext } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { SingleSelect } from "../../components";
import { getProposalsByDaoCid } from "../../services/keezBackend";
import { ProposalVotingModal } from "../../modals";
import Skeleton from "@material-ui/lab/Skeleton";
import { getParsedJsonObj } from "../../utils/getParsedJsonObj";
import { getDaoByCID } from "../../services/keezBackend";
import dayjs from "dayjs";
import { json } from "stream/consumers";

const Proposals = (props: { daoDetail: any }) => {
  const { daoDetail } = props;
  const { profileData, accountAddress } = useContext(ProfileContext);
  const [proposalCardView, setProposalCardView] = useState<number>(3);
  const [proposals, setProposals] = useState<any>([]);
  const [filterStr, setFilter] = useState("");
  const [filterActivity, setFilterActivity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProposalsByDaoCid(daoDetail.CID);
      setProposals(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const bg_imgfromurl = "url('".concat(backgroundImageUrl).concat("')");
  const categories = ["All", "Voting", "Permission", "General", "Send tokens"];
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

  const userProfiles = [0, 1, 2, 3, 4, 5];
  return (
    <div className="flex-col md:py-4 justify-start items-start w-full">
      <div className="flex w-full flex-wrap justify-between items-center md:py-4 my-1">
        <div className="flex flex-wrap items-center border-solid border-[#999999] border-2 rounded-lg bg-white text-[#7f7f81] px-2 text-sm font-bold">
          {categories.map((category) => {
            return (
              <p
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

      {proposals.length != [] ? (
        <div className="grid sm:grid-cols-2 gap-5 md:grid-cols-3 lg-grid-cols-4">
          {[...proposals]
            .filter((proposal) => proposal.proposalDetails.includes(filterStr))
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
                id={i}
                cardView={proposalCardView}
                proposal={proposal}
              />
            ))}
        </div>
      ) : (
        <div className="flex flex-wrap ">
          {[1, 1, 1].reverse().map((daoDetail, i) => (
            <Skeleton
              key={i}
              animation="wave"
              className="m-3 min-w-[30.5%] max-w-[30.5%] rounded-md"
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
  id: number;
  cardView: number;
  proposal: any;
}) => {
  const { id, cardView, proposal } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [daoSelected, setDaoSelected] = useState<any>([]);

  // const cardWidth:string = cardView === 2 ? "min-w-[40%]" : "min-w-[30%]";

  const daoDetailsObject = getParsedJsonObj(proposal.forDaoDetails);

  useEffect(() => {
    if (daoDetailsObject) {
      const fetchData = async () => {
        const result = await getDaoByCID(daoDetailsObject.CID);
        setDaoSelected(result);
      };
      fetchData();
    }
  }, [daoDetailsObject]);

  const createdAt = dayjs(Number(proposal.createdAt));
  const votingParametersObject =
    daoSelected.length != ""
      ? getParsedJsonObj(daoSelected.votingParameters)
      : "";
  const min_voting_delay = votingParametersObject.minVotingDelay;
  const min_voting_period = votingParametersObject.minVotingPeriod;
  const min_execution_delay = votingParametersObject.minExecutionDelay;
  const startDay = createdAt.add(min_voting_delay, "day");
  const endDay = startDay.add(min_voting_period, "day");
  const executionDay = startDay.add(
    min_execution_delay
      ? Number(min_voting_period) + Number(min_execution_delay)
      : min_voting_period,
    "day"
  );
  const proposalStatus =
    startDay > dayjs()
      ? "Pending"
      : startDay <= dayjs() && endDay >= dayjs()
      ? "Active"
      : "Closed";
  return (
    <div
      onClick={() => setShowModal(true)}
      className="w-full h-60 flex flex-1 flex-col cursor-pointer pb-1 rounded-md bg-[#b8a5a6]"
    >
      <div className="flex flex-col justify-start items-start h-full p-5">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-gray-800 font-bold">
            {daoDetailsObject.daoName}
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

        <div className="flex w-full flex-col mt-3 justify-start overflow-y-scroll items-center h-full ">
          <h1 className="text-black text-lg break-all font-bold ">
            {proposal.proposalName}
          </h1>
          <h1 className="text-black text-xs break-all  pr-2 mb-1">
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
    //   <div className={`bg-[#4b3132] ${cardWidth} h-80 my-2 flex flex-1 flex-col mx-3 p-3 rounded-md hover:shadow-2xl`}>
    //     {proposal.proposalName}
    //   </div>
  );
};
