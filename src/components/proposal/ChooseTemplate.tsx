import React, { useContext, useState, useEffect } from "react";
import { MdNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { CreateProposalContext } from "../../context/CreateProposalContext";
import { ProfileContext } from "../../context/ProfileContext";

const ChooseTemplate = (props: { handleComponent: any }) => {
  const { handleComponent } = props;
  const { setProposer, setProposalType, daoCid } = useContext(
    CreateProposalContext
  );

  const { accountAddress } = useContext(ProfileContext);
  const [templateSelected, setTemplateSelected] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent, templateId: number) => {
    event.preventDefault();
    // console.log(daoCid);

    setProposer(accountAddress);
    switch (templateId) {
      case 0:
        handleComponent("VotingTemplate");
        setProposalType("Voting");
        break;
      case 1:
        handleComponent("DaoTransferTokenTemplate");
        setProposalType("Token Transfer");
        break;
      case 2:
        handleComponent("PermissionTemplate");
        setProposalType("Permission");
        break;
      case 3:
        handleComponent("GeneralTemplate");
        setProposalType("General");
        break;
    }
  };

  const handleBack = async (event: React.FormEvent) => {
    event.preventDefault();
    handleComponent("ChooseDao");
  };

  const handleTemplateSelection = async (
    event: React.FormEvent,
    id: number
  ) => {
    event.preventDefault();
    setTemplateSelected(id);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-other pt-28  min-h-[100vh] w-full px-5 md:px-[15%]">
      {/* <h1 className="text-white text-lg py-2">Step 1</h1> */}
      <form onSubmit={(event) => handleSubmit(event, templateSelected)}>
        <div className="py-2 ">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-lg font-bold">
              Choose a DAO to create a proposal for
            </h1>
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

          <label
            className="block text-white text-sm pb-4 font-normal"
            htmlFor="daoName"
          >
            You have permission to create proposals for the following DAOs
          </label>
          <div className="grid gap-4 md:grid-cols-2 text-white mx-5 md:mx-20">
            <div
              onClick={(event) => handleTemplateSelection(event, 0)}
              className={`flex-col justify-start p-6 cursor-pointer rounded-lg items-center hover:bg-[#8168ff] bg-[#292d46] ${
                templateSelected === 0
                  ? "outline outline-offset-2 outline-4 outline-white"
                  : ""
              }`}
            >
              <p className="text-xl h-2/6 text-center pb-4 text-bold">
                Voting Parameters Template
              </p>
              <p className="text-sm h-4/6 text-light text-center">
              This template will allow you to propose new default voting parameters for the DAO. Voting parameters include participation rate, majority, minimum voting delay, 
              minimum voting period, and minimum execution delay. These parameters represent the minimum default values and can be extended in any proposal. These proposals will 
              auto execute the results when the voting period ends and after the execution delay.
              </p>
            </div>
            <div
              onClick={(event) => handleTemplateSelection(event, 1)}
              className={`flex-col justify-start p-6 cursor-pointer rounded-lg items-center hover:bg-[#8168ff] bg-[#292d46] ${
                templateSelected === 1
                  ? "outline outline-offset-2 outline-4 bg-[#8168ff] outline-white"
                  : ""
              }`}
            >
              <p className="text-xl h-2/6 text-center pb-4 text-bold">
                Send Tokens From DAO Template
              </p>
              <p className="text-sm text-light text-center">
              This proposal template will allow you to send tokens from a DAO’s vault to another address. This template may be used to relocate tokens from one vault 
              to another or from one vault to an individual's UP for, let's say, payment of service. These proposals will auto execute the results when the voting period 
              ends and after an execution delay.
              </p>
            </div>
            <div
              onClick={(event) => handleTemplateSelection(event, 2)}
              className={`flex-col justify-start p-6 cursor-pointer rounded-lg items-center hover:bg-[#8168ff] bg-[#292d46] ${
                templateSelected === 2
                  ? "outline outline-offset-2 outline-4 outline-white"
                  : ""
              }`}
            >
              <p className="text-xl h-2/6 text-center pb-4 text-bold">
                Add & Revoke Permissions Template
              </p>
              <p className="text-sm text-light text-center">
              This proposal template will allow you to add or revoke permissions to a DAO member's Universal Profile. This can be used to add new members to the DAO or 
              remove members who are not respecting the community. These proposals will auto execute the results when the voting period ends and after an execution delay.
              </p>
            </div>
            <div
              onClick={(event) => handleTemplateSelection(event, 3)}
              className={`flex-col justify-start p-6 cursor-pointer rounded-lg items-center hover:bg-[#8168ff] bg-[#292d46] ${
                templateSelected === 3
                  ? "outline outline-offset-2 outline-4 outline-white"
                  : ""
              }`}
            >
              <p className="text-xl h-2/6 text-center pb-4 text-bold">
                General Template
              </p>
              <p className="text-sm text-light text-center">
              This proposal template allows you to create a custom proposal. These proposals will not auto-execute when voting ends.
              </p>
            </div>
          </div>

          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="flex justify-center rounded-full item-center mb-4 mt-4
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
      </form>
    </div>
  );
};

export default ChooseTemplate;
