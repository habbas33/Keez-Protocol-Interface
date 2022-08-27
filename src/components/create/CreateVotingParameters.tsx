import React, { useContext, useState, useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";
import { Input, SingleSelect } from "../../components";
import { toast } from "react-toastify";
import { CreateDaoContext } from "../../context/CreateDaoContext";
import {
  votingPeriodItems,
  votingDelayItems,
} from "../../constants/votingPeriodItems";
import { VALIDATORS } from "../../constants/globals";
import { MdOutlineHelp }  from "react-icons/md";
import Popover from '@material-ui/core/Popover';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
  }),
);

const CreateVotingParameters = (props: { handleSubmitCreate: any }) => {
  const classes = useStyles();
  const [anchorEl1, setAnchorEl1] = React.useState<HTMLElement | null>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<HTMLElement | null>(null);
  const [anchorEl3, setAnchorEl3] = React.useState<HTMLElement | null>(null);
  const [anchorEl4, setAnchorEl4] = React.useState<HTMLElement | null>(null);
  const [anchorEl5, setAnchorEl5] = React.useState<HTMLElement | null>(null);
  const [anchorEl6, setAnchorEl6] = React.useState<HTMLElement | null>(null);

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

  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);
  const open4 = Boolean(anchorEl4);
  const open5 = Boolean(anchorEl5);
  const open6 = Boolean(anchorEl6);
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
    setMinExecutionDelay,
  } = useContext(CreateDaoContext);

  toast.configure();

  const handleMinVotingDelay = (selectedOption: any) => {
    const selection = votingDelayItems.find(
      (element) => element.label === selectedOption.label
    ) || { value: 0, label: "instant" };
    setMinVotingDelay(selection.value); 
    // console.log(selectedOption);
    // console.log(selection);
  };

  const handleMinVotingPeriod = (selectedOption: any) => {
    const selection = votingPeriodItems.find(
      (element) => element.label === selectedOption.label
    ) || { value: 1, label: "24 hrs" };
    setMinVotingPeriod(selection.value);
    // console.log(selectedOption);
    // console.log(selection);
  };

  const handleMinExecutionDelay = (selectedOption: any) => {
    const selection = votingDelayItems.find(
      (element) => element.label === selectedOption.label
    ) || { value: 0, label: "instant" };
    setMinExecutionDelay(selection.value);
    // console.log(selectedOption);
    // console.log(selection);
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
    if (VALIDATORS) {
      const validationResult = formSubmitValidations();
      if (validationResult !== "success") {
        return toast.error(validationResult, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
    handleSubmitCreate("CreateDaoSummary");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-other w-full px-5 md:px-[20%]">
      <h1 className="text-white text-3xl py-2">Step 4</h1>
      <div className="flex justify-left  w-full">
      <h1 className="text-white text-4xl font-bold">
        Create your Default Voting Parameters
      </h1>
      <p aria-owns={open1 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen1} onMouseLeave={handlePopoverClose1}>
                  <MdOutlineHelp className="text-white text-lg"/>
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
                  Here you will create your default governance parameters you'd like your DAO to follow.</div>
              </Popover></div>
      <form onSubmit={handleSubmit}>
        <div className=" py-4 md:w-[70%] md:mx-auto">
        <div className="flex justify-left w-full">
          <label
            className="block text-white text-sm font-normal"
            htmlFor="participationRate"
          >
            Participation rate
          </label>
          <p aria-owns={open2 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen2} onMouseLeave={handlePopoverClose2}>
                  <MdOutlineHelp className="text-white text-lg"/>
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
                  Please enter a number from 0-100. This number will reflect the percentage of DAO members needed to vote on a proposal for the result to be valid. 
                  The average participation rate for DAO voting is less than 15%.</div>
              </Popover></div>
          <div className="flex items-center text-white text-sm font-normal">
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
          <div className="flex justify-left pt-4 w-full">
          <label
            className="block  text-white text-sm font-normal"
            htmlFor="votingMajority"
          >
            Majority
          </label>
          <p aria-owns={open3 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen3} onMouseLeave={handlePopoverClose3}>
                  <MdOutlineHelp className="text-white text-lg"/>
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
                  Please enter a number from 0-100. This number will reflect the percentage of votes needed on a specific decision (i.e., for, against, abstain) for the result to 
                  be executed. It is recommended to enter a number over 51% to ensure a majority. The higher the number, the more agreement is needed within the community.</div>
              </Popover></div>
          <div className="flex items-center text-white text-sm font-normal">
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
          <div className="flex justify-left pt-4 w-full">
          <label
            className="block  text-white text-sm font-normal"
            htmlFor="MinVotingDelay"
          >
            Minimum Voting Delay
          </label>
          <p aria-owns={open4 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen4} onMouseLeave={handlePopoverClose4}>
                  <MdOutlineHelp className="text-white text-lg"/>
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
                  This parameter describes the minimum period in which a proposal is viewable but unable to be voted on. This will give the community time to think and discuss
                   before solidifying a vote.</div>
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
          <p aria-owns={open5 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen5} onMouseLeave={handlePopoverClose5}>
                  <MdOutlineHelp className="text-white text-lg"/>
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
                   This parameter describes the minimum period for which a proposal can be voted on. Giving the community multiple days at least to vote on the 
                   proposal is recommended.</div>
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
            htmlFor="minVotingPeriod"
          >
            Minimum Execution Delay
          </label>
          <p aria-owns={open6 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen6} onMouseLeave={handlePopoverClose6}>
                  <MdOutlineHelp className="text-white text-lg"/>
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
                  This parameter describes the minimum delay period for which a proposal will be executed after the voting period has ended.</div>
              </Popover></div>
          <div className="w-1/2">
            <SingleSelect
              handleChange={handleMinExecutionDelay}
              name={"minExecutionDelay"}
              listItems={votingDelayItems}
            />
          </div>

          <button
            type="submit"
            className="flex justify-center rounded-full item-center mt-[16px]
                border border-transparent shadow-sm px-4 py-2 bg-[#6341ff]
                text-base font-medium text-white hover:bg-[#8168ff] 
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
