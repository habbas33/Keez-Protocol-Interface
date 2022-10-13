import React, { useCallback, useContext, useEffect, useState } from "react";
import { MdNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { Input } from "../../components";
import { CreateProposalContext } from "../../context/CreateProposalContext";
// import { daoCategoryItems } from "../../constants/daoCategoryItems";
import {
  votingPeriodItems,
  votingDelayItems,
  votingParams,
} from "../../constants/votingPeriodItems";
import { toast } from "react-toastify";
import { VALIDATORS } from "../../constants/globals";
import InfoPopOver from "../InfoPopOver";
import { universalProfileContract } from "../../services/web3";
import Select from "../Select";

const VotingTemplate = (props: { handleComponent: any }) => {
  const { handleComponent } = props;
  const {
    proposalName,
    setProposalName,
    categories,
    // setCategories,
    description,
    setDescription,
    participationRate,
    setParticipationRate,
    votingMajority,
    setVotingMajority,
    setMinVotingDelay,
    minVotingDelay,
    minExecutionDelay,
    minVotingPeriod,
    setMinVotingPeriod,
    setMinExecutionDelay,
    daoUpAddress,
  } = useContext(CreateProposalContext);

  toast.configure();
  const [votingParameters, setVotingParams] = useState<any>({});
  const [paramState, setParamState] = useState(true);
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

  // const handleMinVotingDelay = (selectedOption: any) => {
  //   const selection = votingDelayItems.find(
  //     (element) => element.label === selectedOption.label
  //   ) || { value: 0, label: "instant" };
  //   setMinVotingDelay(selection.value);
  //   console.log(selectedOption);
  //   console.log(selection);
  // };
  const handleMinVotingDelay1 = (e: any) => {
    setMinVotingDelay(parseInt(e.target.value));
    console.log(typeof e.target.value);
    console.log(e.target.value);
  };

  // const handleMinVotingPeriod = (selectedOption: any) => {
  //   const selection = votingPeriodItems.find(
  //     (element) => element.label === selectedOption.label
  //   ) || { value: 1, label: "24 hrs" };
  //   setMinVotingPeriod(selection.value);
  //   console.log(selection);
  // };
  const handleMinVotingPeriod1 = (e: any) => {
    setMinVotingPeriod(parseInt(e.target.value));
    console.log(typeof e.target.value);
    console.log(e.target.value);
  };
  // const handleParamChange = (selectedOption: any) => {
  //   console.log(selectedOption);
  //   setParamState(selectedOption.value);
  // };
  const handleParamChange1 = (e: any) => {
    setParamState((prev) => !prev);
    console.log(typeof Boolean(e.target.value));
    console.log(e.target.value);
  };

  // const handleMinExecutionDelay = (selectedOption: any) => {
  //   const selection = votingDelayItems.find(
  //     (element) => element.label === selectedOption.label
  //   ) || { value: 0, label: "instant" };
  //   setMinExecutionDelay(selection.value);
  //   console.log(selection);
  // };
  const handleMinExecutionDelay1 = (e: any) => {
    setMinExecutionDelay(parseInt(e.target.value));
    console.log(typeof e.target.value);
    console.log(e.target.value);
  };

  const handleBack = async (event: React.FormEvent) => {
    event.preventDefault();
    handleComponent("ChooseTemplate");
  };

  // const handleCategoriesChange = (selectedOption: any) => {
  //   setCategories(selectedOption);
  // };
  const getProfile = useCallback(async () => {
    let contract = await universalProfileContract(daoUpAddress)
      ["getData(bytes32[])"]([
        // DAO Settings
        "0xbc776f168e7b9c60bb2a7180950facd372cd90c841732d963c31a93ff9f8c127",
        "0xf89f507ecd9cb7646ce1514ec6ab90d695dac9314c3771f451fd90148a3335a9",
        "0x799787138cc40d7a47af8e69bdea98db14e1ead8227cef96814fa51751e25c76",
        "0xd3cf4cd71858ea36c3f5ce43955db04cbe9e1f42a2c7795c25c1d430c9bb280a",
        "0xb207580c05383177027a90d6c298046d3d60dfa05a32b0bb48ea9015e11a3424",
      ])
      .call();
    const Params = {
      votingMajority: parseInt(contract[0]),
      participationRate: parseInt(contract[1]),
      minVotingDelay: parseInt(contract[2]),
      minVotingPeriod: parseInt(contract[3]) / (24 * 3600),
      minExecutionDelay: parseInt(contract[4]) / (24 * 3600),
    };
    setVotingParams(Params);
  }, [daoUpAddress]);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(daoUpAddress);
    getProfile();
  }, [daoUpAddress, getProfile]);
  useEffect(() => {
    if (!paramState) {
      setParticipationRate(votingParameters?.participationRate);
      setVotingMajority(votingParameters?.votingMajority);
      setMinVotingDelay(votingParameters?.minVotingDelay);
      setMinExecutionDelay(votingParameters?.minExecutionDelay);
      setMinVotingPeriod(votingParameters?.minVotingPeriod);
    }
    // else {
    //   setParticipationRate(0);
    //   setVotingMajority(0);
    //   setMinVotingDelay(0);
    //   setMinExecutionDelay(0);
    //   setMinVotingPeriod(0);
    // }
  }, [
    paramState,
    votingParameters,
    setParticipationRate,
    setVotingMajority,
    setMinVotingDelay,
    setMinExecutionDelay,
    setMinVotingPeriod,
  ]);
  console.log(votingParameters);

  toast.configure();

  return (
    <div className="bg-other pt-10  min-h-[100vh] w-full px-5 md:px-[15%]">
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
          Voting Parameters Template
        </p>
        <div className="flex flex-col justify-center items-center py-2">
          <div className="w-full md:w-3/5">
            <div className="flex  justify-left pt-4 w-full">
              <label
                className="block text-white text-sm font-normal"
                htmlFor="proposalName"
              >
                Proposal Title
              </label>
              <InfoPopOver
                info="This title will be displayed at the top of the proposal and 
                  should reflect the contents of the proposal."
              />
            </div>
            <Input
              value={proposalName}
              name="proposal_name"
              type="text"
              handleChange={(e: any) => setProposalName(e.target.value)}
            />

            {/* <div className="flex justify-left w-full">
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
                Do you want to edit the voting Parameters?
              </label>
              <InfoPopOver
                info="By selecting a value, you propose changing the minimum time a
                  proposal can be voted on."
              />
            </div>
            <div className="w-1/2">
              {/* <SingleSelect
                // value={{ value: true, label: "Custom Voting Parameters" }}
                handleChange={handleParamChange}
                name={"minVotingPeriod"}
                listItems={votingParams}
              /> */}
              <Select
                options={votingParams}
                value={paramState}
                placeholder="Select..."
                onChange={(e) => handleParamChange1(e)}
              />
            </div>

            <div className="flex justify-left pt-4 w-full">
              <label
                className="block text-white text-sm font-normal"
                htmlFor="participationRate"
              >
                Participation rate
              </label>
              <InfoPopOver
                info="By entering a value, you are proposing to change the
                  participation rate from the current rate that was set upon DAO
                  creation. Enter a number from 1-100 ideally under 20% but over
                  5%."
              />
            </div>
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

            <div className="flex justify-left pt-4 w-full">
              <label
                className="block  text-white text-sm font-normal"
                htmlFor="votingMajority"
              >
                Majority
              </label>
              <InfoPopOver
                info="By entering a value, you propose changing the percentage of
                  votes needed to execute a proposal decision from its current
                  default to this value. The value is recommended to be greater
                  than 50% to ensure a majority decision."
              />
            </div>
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

            <div className="flex justify-left pt-4 w-full">
              <label
                className="block  text-white text-sm font-normal"
                htmlFor="MinVotingDelay"
              >
                Voting Delay
              </label>
              <InfoPopOver
                info="By selecting a value, you are proposing to change the time in
                  which a proposal is viewable but unable to be voted on."
              />
            </div>
            <div className="w-1/2">
              {/* <SingleSelect
                handleChange={handleMinVotingDelay}
                name={"MinVotingDelay"}
                listItems={votingDelayItems}
              /> */}
              <Select
                options={votingDelayItems}
                value={minVotingDelay.toString()}
                placeholder="Select..."
                onChange={(e) => handleMinVotingDelay1(e)}
              />
            </div>

            <div className="flex justify-left pt-4 w-full">
              <label
                className="block  text-white text-sm font-normal"
                htmlFor="minVotingPeriod"
              >
                Voting Period
              </label>
              <InfoPopOver
                info="By selecting a value, you propose changing the minimum time a
                  proposal can be voted on."
              />
            </div>
            <div className="w-1/2">
              {/* <SingleSelect
                handleChange={handleMinVotingPeriod}
                name={"minVotingPeriod"}
                listItems={votingPeriodItems}
              /> */}
              <Select
                options={votingPeriodItems}
                value={minVotingPeriod.toString()}
                placeholder="Select..."
                onChange={(e) => handleMinVotingPeriod1(e)}
              />
            </div>

            <div className="flex justify-left pt-4 w-full">
              <label
                className="block  text-white text-sm font-normal"
                htmlFor="minExecutionDelay"
              >
                Execution Delay
              </label>
              <InfoPopOver
                info="By selecting a value, you propose changing the time a proposal
                  can be executed after the voting period has ended."
              />
            </div>
            <div className="w-1/2">
              {/* <SingleSelect
                handleChange={handleMinExecutionDelay}
                name={"minExecutionDelay"}
                listItems={votingDelayItems}
              /> */}
              <Select
                options={votingDelayItems}
                value={minExecutionDelay.toString()}
                placeholder="Select..."
                onChange={(e) => handleMinExecutionDelay1(e)}
              />
            </div>

            <div className="flex justify-end items-center">
              <button
                type="submit"
                className="flex justify-center rounded-full item-center mb-10 mt-[12px]
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default VotingTemplate;
