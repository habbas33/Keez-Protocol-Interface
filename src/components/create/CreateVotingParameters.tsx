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
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
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
      <h1 className="text-white text-sm py-2">Step 4</h1>
      <h1 className="text-white text-lg font-bold">
        Create your Default Voting Parameters
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="md:px-[10%] py-4">
        <div className="flex justify-left  w-full">
          <label
            className="block text-white text-sm font-normal"
            htmlFor="participationRate"
          >
            Participation rate
          </label>
          <p aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                  <MdOutlineHelp className="text-white text-lg"/>
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
                  i used popover
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
          <div className="flex justify-left  w-full">
          <label
            className="block  text-white text-sm font-normal"
            htmlFor="votingMajority"
          >
            Majority
          </label>
          <p aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                  <MdOutlineHelp className="text-white text-lg"/>
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
                  i used popover
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
          <div className="flex justify-left  w-full">
          <label
            className="block  text-white text-sm font-normal"
            htmlFor="MinVotingDelay"
          >
            Minimum Voting Delay
          </label>
          <p aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                  <MdOutlineHelp className="text-white text-lg"/>
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
                  i used popover
              </Popover></div>
          <div className="w-1/2">
            <SingleSelect
              handleChange={handleMinVotingDelay}
              name={"MinVotingDelay"}
              listItems={votingDelayItems}
            />
          </div>
          <div className="flex justify-left  w-full">
          <label
            className="block  text-white text-sm font-normal"
            htmlFor="minVotingPeriod"
          >
            Minimum Voting Period
          </label>
          <p aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                  <MdOutlineHelp className="text-white text-lg"/>
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
                  i used popover
              </Popover></div>
          <div className="w-1/2">
            <SingleSelect
              handleChange={handleMinVotingPeriod}
              name={"minVotingPeriod"}
              listItems={votingPeriodItems}
            />
          </div>
          <div className="flex justify-left  w-full">
          <label
            className="block  text-white text-sm font-normal"
            htmlFor="minVotingPeriod"
          >
            Minimum Execution Delay
          </label>
          <p aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                  <MdOutlineHelp className="text-white text-lg"/>
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
                  i used popover
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
