import React, { useContext, useState, useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";
import { Input, SingleSelect } from "../../components";
import { toast } from "react-toastify";
import { CreateDaoContext } from "../../context/CreateDaoContext";
import {
  votingPeriodItems,
  votingDelayItems,
} from "../../constants/votingPeriodItems";

const CreateVotingParameters = (props: { handleSubmitCreate: any }) => {
  const { handleSubmitCreate } = props;
  const {
    participationRate,
    votingMajority,
    minVotingDelay,
    minVotingPeriod,
    setParticipationRate,
    setVotingMajority,
    setMinVotingDelay,
    setMinVotingPeriod,
  } = useContext(CreateDaoContext);

  toast.configure();

  const handleMinVotingDelay = (selectedOption: any) => {
    const selection = votingDelayItems.find(
      (element) => element.label === selectedOption.label
    ) || { value: 0, label: "instant" };
    setMinVotingDelay(selection.value); 
    console.log(selectedOption);
    console.log(selection);
  };

  const handleMinVotingPeriod = (selectedOption: any) => {
    const selection = votingPeriodItems.find(
      (element) => element.label === selectedOption.label
    ) || { value: 1, label: "24 hrs" };
    setMinVotingPeriod(selection.value);
    console.log(selectedOption);
    console.log(selection);
  };

  const formSubmitValidations = () => {
    if (participationRate < 1 || participationRate > 100) {
      return "Invalid participation rate";
    }
    if (votingMajority < 1 || votingMajority > 100) {
      return "Invalid voting majority";
    }
    return "success";
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const validationResult = formSubmitValidations();
    if (validationResult !== "success") {
      return toast.error(validationResult, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    handleSubmitCreate("CreateDaoSummary");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-welcome pt-28  min-h-[100vh] w-full px-5 md:px-[20%]">
      <h1 className="text-white text-sm py-2">Step 4</h1>
      <h1 className="text-white text-lg font-bold">
        Create your Default Voting Parameters
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="md:px-[10%] py-4">
          <label
            className="block text-slate-400 text-sm font-normal"
            htmlFor="participationRate"
          >
            Participation rate
          </label>
          <div className="flex items-center text-slate-400 text-sm font-normal">
            <Input
              value={participationRate.toString()}
              name="participation"
              type="number"
              min="0"
              max="100"
              size="w-1/4"
              className="flex-1"
              handleChange={(e: any) => setParticipationRate(e.target.value)}
            />
            <p className="px-2">%</p>
          </div>

          <label
            className="block pt-4 text-slate-400 text-sm font-normal"
            htmlFor="votingMajority"
          >
            Majority
          </label>
          <div className="flex items-center text-slate-400 text-sm font-normal">
            <Input
              value={votingMajority.toString()}
              name="majority"
              type="number"
              min="0"
              max="100"
              size="w-1/4"
              className="flex-1"
              handleChange={(e: any) => setVotingMajority(e.target.value)} 
            />
            <p className="px-2">%</p>
          </div>

          <label
            className="block pt-4 text-slate-400 text-sm font-normal"
            htmlFor="MinVotingDelay"
          >
            Minimum Voting Delay
          </label>
          <div className="w-1/2">
            <SingleSelect
              handleChange={handleMinVotingDelay}
              name={"MinVotingDelay"}
              listItems={votingDelayItems}
            />
          </div>

          <label
            className="block pt-4 text-slate-400 text-sm font-normal"
            htmlFor="minVotingPeriod"
          >
            Minimum Voting Period
          </label>
          <div className="w-1/2">
            <SingleSelect
              handleChange={handleMinVotingPeriod}
              name={"minVotingPeriod"}
              listItems={votingPeriodItems}
            />
          </div>

          <button
            type="submit"
            className="flex justify-center rounded-md item-center mt-[16px]
                border border-transparent shadow-sm px-4 py-2 bg-[#C3073F]
                text-base font-medium text-white hover:bg-[#ac0537] 
                   sm:w-auto sm:text-sm"
          >
            Next
            <MdNavigateNext
              className="pl-[2px] w-6"
              color="#fff"
              fontSize={20}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateVotingParameters;
