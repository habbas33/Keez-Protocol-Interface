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
    <div className="bg-welcome pt-28  min-h-[100vh] w-full px-5 md:px-[10%]">
      <h1 className="text-white text-sm py-2">Step 1</h1>
      <form onSubmit={(event) => handleSubmit(event, templateSelected)}>
        <div className="py-2 ">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-lg font-bold">
              Choose a DAO to create a proposal for
            </h1>
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

          <label
            className="block text-slate-400 text-sm pb-4 font-normal"
            htmlFor="daoName"
          >
            You have permission to create proposals for the following DAOs
          </label>
          <div className="grid gap-4 md:grid-cols-2 text-white mx-20">
            <div
              onClick={(event) => handleTemplateSelection(event, 0)}
              className={`flex-col justify-start p-6 cursor-pointer items-center bg-[#292d46] ${
                templateSelected === 0
                  ? "outline outline-offset-2 outline-1 outline-green-500"
                  : ""
              }`}
            >
              <p className="text-xl h-2/6 text-center pb-4 text-bold">
                Voting Parameters Template
              </p>
              <p className="text-sm h-4/6 text-light">
                Praesent pulvinar pretium suscipit. Donec maximus ultrices nibh
                eget vestibulum. Donec accumsan eget augue sit amet tincidunt.
                Nam hendrerit efficitur risus, sed sollicitudin sem semper a
              </p>
            </div>
            <div
              onClick={(event) => handleTemplateSelection(event, 1)}
              className={`flex-col justify-start p-6 cursor-pointer items-center bg-[#292d46] ${
                templateSelected === 1
                  ? "outline outline-offset-2 outline-1 outline-green-500"
                  : ""
              }`}
            >
              <p className="text-xl h-2/6 text-center pb-4 text-bold">
                Send Tokens From DAO Template
              </p>
              <p className="text-sm text-light">
                Praesent pulvinar pretium suscipit. Donec maximus ultrices nibh
                eget vestibulum. Donec accumsan eget augue sit amet tincidunt.
                Nam hendrerit efficitur risus, sed sollicitudin sem semper a
              </p>
            </div>
            <div
              onClick={(event) => handleTemplateSelection(event, 2)}
              className={`flex-col justify-start p-6 cursor-pointer items-center bg-[#292d46] ${
                templateSelected === 2
                  ? "outline outline-offset-2 outline-1 outline-green-500"
                  : ""
              }`}
            >
              <p className="text-xl h-2/6 text-center pb-4 text-bold">
                Add & Revoke Permissions Template
              </p>
              <p className="text-sm text-light">
                Praesent pulvinar pretium suscipit. Donec maximus ultrices nibh
                eget vestibulum. Donec accumsan eget augue sit amet tincidunt.
                Nam hendrerit efficitur risus, sed sollicitudin sem semper a
              </p>
            </div>
            <div
              onClick={(event) => handleTemplateSelection(event, 3)}
              className={`flex-col justify-start p-6 cursor-pointer items-center bg-[#292d46] ${
                templateSelected === 3
                  ? "outline outline-offset-2 outline-1 outline-green-500"
                  : ""
              }`}
            >
              <p className="text-xl h-2/6 text-center pb-4 text-bold">
                General Template
              </p>
              <p className="text-sm text-light">
                Praesent pulvinar pretium suscipit. Donec maximus ultrices nibh
                eget vestibulum. Donec accumsan eget augue sit amet tincidunt.
                Nam hendrerit efficitur risus, sed sollicitudin sem semper a
              </p>
            </div>
          </div>

          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="flex justify-center rounded-md item-center mb-4 mt-4
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
        </div>
      </form>
    </div>
  );
};

export default ChooseTemplate;
