import React, { useContext, useState, useEffect } from "react";
import { MdNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { MultiSelect, SingleSelect, Input } from "../../components";
import { CreateProposalContext } from "../../context/CreateProposalContext";
import { daoCategoryItems } from "../../constants/daoCategoryItems";
import { getDaoByCID } from "../../services/keezBackend";
import { toast } from "react-toastify";
import { VALIDATORS } from "../../constants/globals";
import { getParsedJsonObj } from "../../utils/getParsedJsonObj";
import { StyledPopover } from "../../styles";
import InfoPopOver from "../InfoPopOver";

const DaoTransferTokenTemplate = (props: { handleComponent: any }) => {
  const classes = StyledPopover();
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
    tokenAmount,
    setTokenAmount,
    receivingAddress,
    setReceivingAddress,
    daoCid,
  } = useContext(CreateProposalContext);
  const [daoSelected, setDaoSelected] = useState<any>([]);

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

  const handleSelectVault = (selectedOption: any) => {
    const selection = vaultlist.find(
      (element) => element.label === selectedOption.label
    );
    if (selection) setSelectedVault(selection.label);
  };

  const handleSelectToken = (selectedOption: any) => {
    const selection = [{ value: "lyx", label: "LYX" }].find(
      (element) => element.label === selectedOption.label
    ) || { value: 0, label: "none" };
    setSelectedToken(selection.label);
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

  useEffect(() => {
    if (daoCid) {
      const fetchData = async () => {
        const result = await getDaoByCID(daoCid);
        console.log("doa selected set", result);
        setDaoSelected(result);
      };
      fetchData();
    }
  }, []);
  toast.configure();
  // console.log(daoSelected.vaultDetails)
  const vaultObject =
    daoSelected.length != "" ? getParsedJsonObj(daoSelected.vaultDetails) : "";
  // console.log(JSON.stringify(vaultObject.vaultName,null,4));
  const vaultlist = [
    { value: vaultObject.vaultName, label: vaultObject.vaultName },
  ];
  return (
    <div className="bg-other pt-10 min-h-[100vh] w-full px-5 md:px-[15%]">
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
        <p className="block text-white text-center py-2 text-3xl">
          Send Tokens From DAO
        </p>
        <div className="flex flex-col justify-center items-center py-2">
          <div className="w-full md:w-3/5">
            <div className="flex justify-left pt-4 w-full">
              <label
                className="block text-white text-sm font-normal"
                htmlFor="proposalName"
              >
                Proposal Title
              </label>
              <InfoPopOver
                info="This title will be displayed at the top of the proposal and
                  should reflect the contents."
              />
            </div>
            <Input
              value={proposalName}
              name="proposal_name"
              type="text"
              handleChange={(e: any) => setProposalName(e.target.value)}
            />
            {/* <div className="flex justify-left pt-4 w-full">
            <label
              className="block  text-white text-sm font-normal"
              htmlFor="categories"
            >
              Categories
            </label>
            <p className="px-1" aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                  <MdOutlineHelp className="text-white text-md"/>
                </p>
              <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  
              </Popover></div>
            <MultiSelect
              handleChange={handleCategoriesChange}
              listItems={daoCategoryItems}
              name={"proposalCategories"}
            /> */}
            <div className="flex justify-left pt-4 w-full">
              <label
                className="block  text-white text-sm font-normal"
                htmlFor="description"
              >
                Description
              </label>
              <InfoPopOver
                info="This description will be displayed on the proposal card and 
                  should describe the proposal. 200 word-limit."
              />
            </div>
            <textarea
              className="my-1 h-28 w-full rounded-lg p-2 outline-none text-white border-2 border-[#999999] focus:border-red-400 text-sm text-gray-700 leading-tight"
              value={description}
              name="description"
              onChange={(e: any) => setDescription(e.target.value)}
            />
            <div className="flex justify-left pt-4 w-full">
              <label
                className="block  text-white text-sm font-normal"
                htmlFor="minVotingPeriod"
              >
                Vault
              </label>
              <InfoPopOver
                info="By selecting an option, you choose which vault you want to
                  send tokens from."
              />
            </div>
            <SingleSelect
              handleChange={handleSelectVault}
              name={"vault"}
              listItems={vaultlist}
            />
            <div className="flex justify-left pt-4 w-full">
              <label
                className="block  text-white text-sm font-normal"
                htmlFor="minVotingPeriod"
              >
                Token
              </label>
              <InfoPopOver
                info="Select the token you want to send from the previously selected
                  vault."
              />
            </div>
            <SingleSelect
              handleChange={handleSelectToken}
              name={"token"}
              listItems={[{ value: "lyx", label: "LYX" }]}
            />
            <div className="flex justify-left pt-4 w-full">
              <label
                className="block  text-white text-sm font-normal"
                htmlFor="receiving Address"
              >
                Token Amount
              </label>
              <InfoPopOver
                info="Please enter the number of tokens you would like to send from
                  the vault."
              />
            </div>
            <Input
              value={tokenAmount.toString()}
              name="token_amount"
              type="number"
              handleChange={(e: any) => setTokenAmount(e.target.value)}
            />
            <div className="flex justify-left pt-4 w-full">
              <label
                className="block  text-white text-sm font-normal"
                htmlFor="receiving Address"
              >
                Receiving Address
              </label>
              <InfoPopOver
                info="Please enter the Universal Profile address you would like to
                  send tokens to."
              />
            </div>
            <Input
              value={receivingAddress}
              name="receiving_address"
              type="text"
              handleChange={(e: any) => setReceivingAddress(e.target.value)}
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

export default DaoTransferTokenTemplate;
