import React, { useContext, useState, useEffect } from "react";
import { MdNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { Input } from "../../components";
import { FileUploader } from "../../components/create";
import { CreateProposalContext } from "../../context/CreateProposalContext";
import { toast } from "react-toastify";
import { VALIDATORS } from "../../constants/globals";
import { StyledPopover } from "../../styles";
import InfoPopOver from "../InfoPopOver";

const GeneralTemplate = (props: { handleComponent: any }) => {
  const classes = StyledPopover();

  const { handleComponent } = props;
  const {
    proposalName,
    setProposalName,
    categories,
    setCategories,
    description,
    setDescription,
    setCoverImageFile,
    votingOptions,
    setVotingOptions,
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

    if (!votingOptions || votingOptions.length === 0) {
      return "Add voting options";
    }

    let result;
    votingOptions.forEach((item) =>
      item === "" ? (result = "empty") : (result = "pass")
    );

    if (result === "empty") {
      return "Option is empty";
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

  const handleBack = async (event: React.FormEvent) => {
    event.preventDefault();
    handleComponent("ChooseTemplate");
  };

  const handleCategoriesChange = (selectedOption: any) => {
    setCategories(selectedOption);
  };

  const handleOptionsChange = (event: any, id: number) => {
    event.preventDefault();
    let options: any = votingOptions;
    // const text = event.target.value;
    options[id] = event.target.value;
    console.log(JSON.stringify(options, null, 4));
    setVotingOptions(options);
  };

  const handleAddOption = () => {
    setVotingOptions([...votingOptions, ""]);
  };

  const handleRemoveOption = (id: number) => {
    let options: any = votingOptions;
    options = options.splice(id, 1);

    console.log("options = ", options);
    var filtered = votingOptions.filter(function (
      value: any,
      index: any,
      arr: any
    ) {
      return value !== options;
    });
    console.log("filtered  = ", filtered);
    setVotingOptions(filtered);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  toast.configure();
  return (
    <div className="bg-other pt-10  min-h-[100vh] w-full px-5 md:px-[15%]">
      {/* <h1 className="text-white text-sm py-2">Step 1</h1> */}
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="flex justify-between items-center">
          <h1 className="text-white text-4xl">Create your Proposal</h1>
          <button
            type="button"
            onClick={(event) => handleBack(event)}
            className="flex justify-center rounded-full item-center 
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

        <p className="block text-white text-center py-2 text-3xl ">
          General Template
        </p>

        <div className="flex flex-col justify-center items-center py-2">
          <div className=" w-full md:w-3/5">
            <div className="flex justify-left pt-4 w-full">
              <label
                className="block text-white text-sm font-normal"
                htmlFor="proposalName"
              >
                Proposal Title
              </label>
              <InfoPopOver info="This title will be displayed at the top of the proposal and should reflect the contents of the proposal." />
            </div>
            <Input
              value={proposalName}
              name="proposal_name"
              type="text"
              handleChange={(e: any) => setProposalName(e.target.value)}
            />
            <div className="flex justify-left pt-4 w-full">
              <label
                className="block  text-white text-sm font-normal"
                htmlFor="daoLogo"
              >
                Upload a Photo [optional]
              </label>
              <InfoPopOver info="Add an image that will help describe the proposal in any way." />
            </div>
            <FileUploader
              // onFileSelectSuccess={(file:any) => setLogoImageFile(file)}
              onFileSelectSuccess={(file: any) => setCoverImageFile(file)}
              onFileSelectError={(error: string) =>
                toast.error(error, { position: toast.POSITION.BOTTOM_RIGHT })
              }
            />

            <div className="flex justify-left pt-4 w-full">
              <label
                className="block  text-white text-sm font-normal"
                htmlFor="description"
              >
                Description
              </label>
              <InfoPopOver
                info="This description will be displayed on the proposal card and
                  should describe the proposal."
              />
            </div>
            <textarea
              className="my-1 h-28 w-full rounded-lg p-2 outline-none text-white border-2 border-[#999999] focus:border-red-400 text-sm text-gray-700 leading-tight"
              value={description}
              name="description"
              onChange={(e: any) => setDescription(e.target.value)}
            />
            <div className="flex justify-end items-center">
              <button
                type="submit"
                className="flex justify-center rounded-full item-center mb-10 mt-[12px]
                            border border-transparent shadow-sm px-4 py-2 bg-[#6341ff]
                            text-base font-medium text-white hover:bg-[#8168ff] 
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default GeneralTemplate;
