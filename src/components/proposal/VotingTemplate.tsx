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
import { MdOutlineHelp }  from "react-icons/md";
import Popover from '@material-ui/core/Popover';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { StyledPopover } from "../../styles";


const VotingTemplate = (props: { handleComponent: any }) => {
  const classes = StyledPopover();
  const [anchorEl1, setAnchorEl1] = React.useState<HTMLElement | null>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<HTMLElement | null>(null);
  const [anchorEl3, setAnchorEl3] = React.useState<HTMLElement | null>(null);
  const [anchorEl4, setAnchorEl4] = React.useState<HTMLElement | null>(null);
  const [anchorEl5, setAnchorEl5] = React.useState<HTMLElement | null>(null);
  const [anchorEl6, setAnchorEl6] = React.useState<HTMLElement | null>(null);
  const [anchorEl7, setAnchorEl7] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen1 = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl1(event.currentTarget);
  };
  const handlePopoverClose1 = () => {
    setAnchorEl1(null);
  };

  const handlePopoverOpen2 = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handlePopoverClose2 = () => {
    setAnchorEl2(null);
  };

  const handlePopoverOpen3 = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl3(event.currentTarget);
  };
  const handlePopoverClose3 = () => {
    setAnchorEl3(null);
  };

  const handlePopoverOpen4 = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl4(event.currentTarget);
  };
  const handlePopoverClose4 = () => {
    setAnchorEl4(null);
  };

  const handlePopoverOpen5 = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl5(event.currentTarget);
  };

  const handlePopoverClose5 = () => {
    setAnchorEl5(null);
  };
  const handlePopoverOpen6 = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl6(event.currentTarget);
  };
  const handlePopoverClose6 = () => {
    setAnchorEl6(null);
  };

  const handlePopoverOpen7 = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl7(event.currentTarget);
  };

  const handlePopoverClose7 = () => {
    setAnchorEl7(null);
  };

  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);
  const open4 = Boolean(anchorEl4);
  const open5 = Boolean(anchorEl5);
  const open6 = Boolean(anchorEl6);
  const open7 = Boolean(anchorEl7);
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
          <div className="flex justify-left pt-4 w-full">
            <label
              className="block text-white text-sm font-normal"
              htmlFor="proposalName"
            >
              Proposal Title
            </label>
            <p className="px-1" aria-owns={open1 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen1} onMouseLeave={handlePopoverClose1}>
                  <MdOutlineHelp className="text-white text-md"/>
                </p>
              <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open1}
                  anchorEl={anchorEl1}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  onClose={handlePopoverClose1}
                  disableRestoreFocus
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-black text-center">
                  This title will be displayed at the top of the proposal and should reflect the contents of the proposal.</div>
              </Popover></div>
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
            <p className="px-1" aria-owns={open2 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen2} onMouseLeave={handlePopoverClose2}>
                  <MdOutlineHelp className="text-white text-md"/>
                </p>
              <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open2}
                  anchorEl={anchorEl2}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  onClose={handlePopoverClose2}
                  disableRestoreFocus
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-black text-center">
                  This description will be displayed on the proposal card and should describe its contents and why it is being proposed. This is your chance to provide the
                   reasoning behind this proposal. </div>
              </Popover></div>
            <textarea
              className="my-1 h-28 w-full rounded-lg p-2 outline-none text-white border-2 border-[#999999] focus:border-red-400 text-sm text-gray-700 leading-tight"
              value={description}
              name="description"
              onChange={(e: any) => setDescription(e.target.value)}
            />

            <div className="flex justify-left pt-4 w-full">
            <label
              className="block text-white text-sm font-normal"
              htmlFor="participationRate"
            >
              Participation rate
            </label>
            <p className="px-1" aria-owns={open3 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen3} onMouseLeave={handlePopoverClose3}>
                  <MdOutlineHelp className="text-white text-md"/>
                </p>
              <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open3}
                  anchorEl={anchorEl3}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  onClose={handlePopoverClose3}
                  disableRestoreFocus
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-black text-center">
                   By entering a value, you are proposing to change the participation rate from the current rate that was set upon DAO creation. Enter a number from 0-100 ideally
                    under 20% but over 5%.</div>
              </Popover></div>
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
            <p className="px-1" aria-owns={open4 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen4} onMouseLeave={handlePopoverClose4}>
                  <MdOutlineHelp className="text-white text-md"/>
                </p>
              <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open4}
                  anchorEl={anchorEl4}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  onClose={handlePopoverClose4}
                  disableRestoreFocus
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-black text-center">
                  By entering a value, you propose changing the percentage of votes needed to execute a proposal decision from its current default to this value. The value is
                   recommended to be greater than 50% to ensure a majority decision.</div>
              </Popover></div>
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
              Minimum Voting Delay
            </label>
            <p className="px-1" aria-owns={open5 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen5} onMouseLeave={handlePopoverClose5}>
                  <MdOutlineHelp className="text-white text-md"/>
                </p>
              <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open5}
                  anchorEl={anchorEl5}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  onClose={handlePopoverClose5}
                  disableRestoreFocus
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-black text-center">
                   By selecting a value, you are proposing to change the minimum time in which a proposal is viewable but unable to be voted on. </div>
              </Popover></div>
            <div className="w-1/2">
              <SingleSelect
                handleChange={handleMinVotingDelay}
                name={"MinVotingDelay"}
                listItems={votingDelayItems}
              />
            </div>

            <div className="flex justify-left pt-4 w-full">
            <label
              className="block  text-white text-sm font-normal"
              htmlFor="minVotingPeriod"
            >
              Minimum Voting Period
            </label>
            <p className="px-1" aria-owns={open6 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen6} onMouseLeave={handlePopoverClose6}>
                  <MdOutlineHelp className="text-white text-md"/>
                </p>
              <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open6}
                  anchorEl={anchorEl6}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  onClose={handlePopoverClose6}
                  disableRestoreFocus
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-black text-center">
                   By selecting a value, you propose changing the minimum time a proposal can be voted on.</div>
              </Popover></div>
            <div className="w-1/2">
              <SingleSelect
                handleChange={handleMinVotingPeriod}
                name={"minVotingPeriod"}
                listItems={votingPeriodItems}
              />
            </div>

            <div className="flex justify-left pt-4 w-full">
            <label
              className="block  text-white text-sm font-normal"
              htmlFor="minExecutionDelay"
            >
              Minimum Execution Delay
            </label>
            <p className="px-1" aria-owns={open7 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen7} onMouseLeave={handlePopoverClose7}>
                  <MdOutlineHelp className="text-white text-md popover"/>
                </p>
              <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open7}
                  anchorEl={anchorEl7}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  onClose={handlePopoverClose7}
                  disableRestoreFocus
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-black text-center">
                  By selecting a value, you propose changing the minimum time a proposal can be executed after the voting period has ended. </div>
              </Popover></div>
            <div className="w-1/2">
              <SingleSelect
                handleChange={handleMinExecutionDelay}
                name={"minExecutionDelay"}
                listItems={votingDelayItems}
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
