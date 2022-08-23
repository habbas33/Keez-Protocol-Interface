import React, { useContext, useState, useEffect } from "react";
import { MdNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { MultiSelect, SingleSelect, Input } from "../../components";
import { CreateProposalContext } from "../../context/CreateProposalContext";
import { daoCategoryItems } from "../../constants/daoCategoryItems";
import {
  votingPeriodItems,
  votingDelayItems,
} from "../../constants/votingPeriodItems";
import { toast } from "react-toastify";
import { VALIDATORS } from "../../constants/globals";

const VotingTemplate = (props: { handleComponent: any }) => {
  const { handleComponent } = props;
  const {
    proposalName,
    setProposalName,
    categories,
    setCategories,
    description,
    setDescription,
    participationRate,
    setParticipationRate,
    votingMajority,
    setVotingMajority,
    minVotingDelay,
    setMinVotingDelay,
    minVotingPeriod,
    setMinVotingPeriod,
    setMinExecutionDelay,
  } = useContext(CreateProposalContext);

  toast.configure();

  const formSubmitValidations = () => {
    if (!proposalName || proposalName.length === 0) {
      return "Please enter a proposal title";
    }

    if (!categories || categories.length === 0) {
      return "Please select atleast one category for your proposal";
    }

    if (!description || description.length === 0) {
      return "Please add description for your proposal";
    }

    if (participationRate < 1 || participationRate > 100) {
      return "Invalid participation rate";
    }
    if (votingMajority < 1 || votingMajority > 100) {
      return "Invalid voting majority";
    }

    return "success";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (VALIDATORS) {
      const validationResult = formSubmitValidations();
      if (validationResult !== "success") {
        return toast.error(validationResult, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
    handleComponent("PreviewProposal");
  };

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
    console.log(selection);
  };

  const handleMinExecutionDelay = (selectedOption: any) => {
    const selection = votingDelayItems.find(
      (element) => element.label === selectedOption.label
    ) || { value: 0, label: "instant" };
    setMinExecutionDelay(selection.value);
    console.log(selection);
  };

  const handleBack = async (event: React.FormEvent) => {
    event.preventDefault();
    handleComponent("ChooseTemplate");
  };

  const handleCategoriesChange = (selectedOption: any) => {
    setCategories(selectedOption);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  toast.configure();

  return (
    <div className="bg-welcome pt-28  min-h-[100vh] w-full px-5 md:px-[15%]">
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="flex justify-between items-center">
          <h1 className="text-white text-lg font-bold">Create your Proposal</h1>
          <button
            type="button"
            onClick={(event) => handleBack(event)}
            className="flex justify-center rounded-md item-center 
                        border border-transparent shadow-sm px-4 py-2 bg-[#6341ff]
                        text-base font-medium text-white hover:bg-[#8168ff] 
                        sm:w-auto sm:text-sm"
          >
            <MdOutlineNavigateBefore
              className="-translate-x-1.5 w-6"
              color="#fff"
              fontSize={20}
            />
            <p className="-translate-x-1.5">Back</p>
          </button>
        </div>
        <p className="block text-white text-center py-2 text-md font-semibold">
          Voting Parameters Template
        </p>
        <div className="flex flex-col justify-center items-center py-2">
          <div className="w-full md:w-3/5">
            <label
              className="block text-white text-sm font-normal"
              htmlFor="proposalName"
            >
              Proposal Title
            </label>
            <Input
              value={proposalName}
              name="proposal_name"
              type="text"
              handleChange={(e: any) => setProposalName(e.target.value)}
            />

            <label
              className="block pt-4 text-white text-sm font-normal"
              htmlFor="categories"
            >
              Categories
            </label>
            <MultiSelect
              handleChange={handleCategoriesChange}
              listItems={daoCategoryItems}
              name={"proposalCategories"}
            />

            <label
              className="block pt-4 text-white text-sm font-normal"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="my-1 h-28 w-full rounded-sm p-2 outline-none text-white border-2 border-[#999999] focus:border-red-400 text-sm text-gray-700 leading-tight"
              value={description}
              name="description"
              onChange={(e: any) => setDescription(e.target.value)}
            />

            <label
              className="block text-white text-sm font-normal"
              htmlFor="participationRate"
            >
              Participation rate
            </label>
            <div className="flex items-center text-white text-sm font-normal">
              <Input
                value={participationRate.toString()}
                name="participation"
                type="number"
                min="0"
                max="100"
                size="w-1/4"
                handleChange={(e: any) => setParticipationRate(e.target.value)}
              />
              <p className="px-2">%</p>
            </div>

            <label
              className="block pt-4 text-white text-sm font-normal"
              htmlFor="votingMajority"
            >
              Majority
            </label>
            <div className="flex items-center text-white text-sm font-normal">
              <Input
                value={votingMajority.toString()}
                name="majority"
                type="number"
                min="0"
                max="100"
                size="w-1/4"
                handleChange={(e: any) => setVotingMajority(e.target.value)}
              />
              <p className="px-2">%</p>
            </div>

            <label
              className="block pt-4 text-white text-sm font-normal"
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
              className="block pt-4 text-white text-sm font-normal"
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

            <label
              className="block pt-4 text-white text-sm font-normal"
              htmlFor="minExecutionDelay"
            >
              Minimum Execution Delay
            </label>
            <div className="w-1/2">
              <SingleSelect
                handleChange={handleMinExecutionDelay}
                name={"minExecutionDelay"}
                listItems={votingDelayItems}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center">
          <button
            type="submit"
            className="flex justify-center rounded-md item-center mb-10 mt-[12px]
                        border border-transparent shadow-sm px-4 py-2 bg-[#6341ff]
                        text-base font-medium text-white hover:bg-[#8186ff] 
                        sm:w-auto sm:text-sm"
          >
            <p className="translate-x-1.5">Next</p>
            <MdNavigateNext
              className="translate-x-1.5 w-6"
              color="#fff"
              fontSize={20}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default VotingTemplate;
