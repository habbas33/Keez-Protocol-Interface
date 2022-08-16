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

const DaoTransferTokenTemplate = (props: { handleComponent: any }) => {
  const { handleComponent } = props;
  const {
    proposalName,
    setProposalName,
    categories,
    setCategories,
    description,
    setDescription,
    selectedVault,
    setSelectedVault,
    selectedToken,
    setSelectedToken,
    receivingAddress,
    setReceivingAddress,
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

    if (!receivingAddress || receivingAddress.length === 0) {
      return "Please enter a receiving address";
    }
    if (
      receivingAddress.length !== 42 ||
      receivingAddress.slice(0, 2) !== "0x"
    ) {
      return "Invalid Address";
    }
    return "success";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationResult = formSubmitValidations();
    if (validationResult !== "success") {
      return toast.error(validationResult, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    handleComponent("PreviewProposal");
  };

  const handleSelectVault = (selectedOption: string) => {
    // const selection = votingDelayItems.find(element => element.label === selectedOption) || { value:0 , label:'instant' };
    setSelectedVault("0");
  };

  const handleSelectToken = (selectedOption: string) => {
    // const selection = votingPeriodItems.find(element => element.label === selectedOption) || { value:1 , label:'24 hrs' };
    setSelectedToken("0");
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
    <div className="bg-welcome pt-28  min-h-[100vh] w-full px-5 md:px-[10%]">
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="flex justify-between items-center">
          <h1 className="text-white text-lg font-bold">Create your Proposal</h1>
          <button
            type="button"
            onClick={(event) => handleBack(event)}
            className="flex justify-center rounded-md item-center 
                        border border-transparent shadow-sm px-4 py-2 bg-[#C3073F]
                        text-base font-medium text-white hover:bg-[#ac0537] 
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
        <p className="block text-slate-400 text-center py-2 text-md font-semibold">
          Send Tokens From DAO
        </p>
        <div className="flex flex-col justify-center items-center py-2 ">
          <div className="w-full md:w-1/2">
            <label
              className="block text-slate-400 text-sm font-normal"
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
              className="block pt-4 text-slate-400 text-sm font-normal"
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
              className="block pt-4 text-slate-400 text-sm font-normal"
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
              className="block pt-4 text-slate-400 text-sm font-normal"
              htmlFor="minVotingPeriod"
            >
              Vault
            </label>
            <SingleSelect
              handleChange={handleSelectVault}
              name={"minVotingPeriod"}
              listItems={[]}
            />

            <label
              className="block pt-4 text-slate-400 text-sm font-normal"
              htmlFor="minVotingPeriod"
            >
              Token
            </label>
            <SingleSelect
              handleChange={handleSelectToken}
              name={"minVotingPeriod"}
              listItems={[]}
            />

            <label
              className="block pt-4 text-slate-400 text-sm font-normal"
              htmlFor="receiving Address"
            >
              Receiving Address
            </label>
            <Input
              value={receivingAddress}
              name="receiving_address"
              type="text"
              handleChange={(e: any) => setReceivingAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end items-center">
          <button
            type="submit"
            className="flex justify-center rounded-md item-center mb-10 mt-[12px]
                        border border-transparent shadow-sm px-4 py-2 bg-[#C3073F]
                        text-base font-medium text-white hover:bg-[#ac0537] 
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

export default DaoTransferTokenTemplate;
