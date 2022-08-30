import React, { useContext, useState, useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";
import {
  AiOutlineUserAdd,
  AiFillDelete,
  AiOutlineUser,
  AiFillCheckCircle,
} from "react-icons/ai";
import { Input } from "../../components";
import { StyledTooltip } from "../../styles";
import { toast } from "react-toastify";
import { CreateDaoContext } from "../../context/CreateDaoContext";
import { shortenAddress } from "../../utils/shortenAddress";
import { fetchErc725Data } from "../../services/erc725";
import { VALIDATORS } from "../../constants/globals";
import { MdOutlineHelp }  from "react-icons/md";
import Popover from '@material-ui/core/Popover';
import { StyledPopover } from "../../styles";


const CreateKeyPermissions = (props: { handleSubmitCreate: any }) => {
  const classes = StyledPopover();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [anchorEl1, setAnchorEl1] = React.useState<HTMLElement | null>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<HTMLElement | null>(null);
  const [anchorEl3, setAnchorEl3] = React.useState<HTMLElement | null>(null);
  const [anchorEl4, setAnchorEl4] = React.useState<HTMLElement | null>(null);
  const [anchorEl5, setAnchorEl5] = React.useState<HTMLElement | null>(null);
  const [anchorEl6, setAnchorEl6] = React.useState<HTMLElement | null>(null);
  const [anchorEl7, setAnchorEl7] = React.useState<HTMLElement | null>(null);
  const [anchorEl8, setAnchorEl8] = React.useState<HTMLElement | null>(null);
  const [anchorEl9, setAnchorEl9] = React.useState<HTMLElement | null>(null);
  const [anchorEl10, setAnchorEl10] = React.useState<HTMLElement | null>(null);
  const [anchorEl11, setAnchorEl11] = React.useState<HTMLElement | null>(null);
 
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

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

  const handlePopoverOpen8 = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl8(event.currentTarget);
  };
  const handlePopoverClose8 = () => {
    setAnchorEl8(null);
  };

  const handlePopoverOpen9 = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl9(event.currentTarget);
  };
  const handlePopoverClose9 = () => {
    setAnchorEl9(null);
  };

  const handlePopoverOpen10 = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl10(event.currentTarget);
  };

  const handlePopoverClose10 = () => {
    setAnchorEl10(null);
  };
  const handlePopoverOpen11 = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl11(event.currentTarget);
  };

  const handlePopoverClose11 = () => {
    setAnchorEl11(null);
  };
  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);
  const open4 = Boolean(anchorEl4);
  const open5 = Boolean(anchorEl5);
  const open6 = Boolean(anchorEl6);
  const open7 = Boolean(anchorEl7);
  const open8 = Boolean(anchorEl8);
  const open9 = Boolean(anchorEl9);
  const open10 = Boolean(anchorEl10);
  const open11 = Boolean(anchorEl11);
  const { handleSubmitCreate } = props;
  const { keyPermissions, setKeyPermissions } = useContext(CreateDaoContext);
  const [upAddress, setUpAddress] = useState<string>("");
  const [executePermission, setExecutePermission] = useState<boolean>(false);
  const [registerVotesPermission, setRegisterVotesPermission] = useState<boolean>(false);
  const [votePermission, setVotePermission] = useState<boolean>(false);
  const [proposePermission, setProposePermission] = useState<boolean>(false);
  const [sendDelegatePermission, setSendDelegatePermission] =
    useState<boolean>(false);
  const [receiveDelegatePermission, setReceiveDelegatePermission] =
    useState<boolean>(false);
  const [addPermission, setAddPermission] = useState<boolean>(false);
  const [removePermission, setRemovePermission] = useState<boolean>(false);

  const handleAddKeyPermission = (event: any) => {
    event.preventDefault();
    const validationResult = addKeyPermissionValidations();
    if (validationResult !== "success") {
      return toast.error(validationResult, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    setKeyPermissions([
      ...keyPermissions,
      {
        upAddress: upAddress,
        keyPermissions: {
          vote: votePermission,
          propose: proposePermission,
          execute: executePermission,
          registerVotes: registerVotesPermission,
          addPermission: addPermission,
          removePermission: removePermission,
          sendDelegate: sendDelegatePermission,
          receiveDelegate: receiveDelegatePermission,
        },
      },
    ]);
    console.log(JSON.stringify(keyPermissions));
  };

  const handleDeleteKeyPermission = (event: any, id: number) => {
    event.preventDefault();
    let key_permissions: any = keyPermissions;
    key_permissions = key_permissions.splice(id, 1);

    var filtered = keyPermissions.filter(function (value, index, arr) {
      return value !== key_permissions;
    });
    setKeyPermissions(filtered);
  };

  const addKeyPermissionValidations = () => {
    let upAddressList: string[] = [];
    if (!upAddress || upAddress.length === 0) {
      return "Please enter a User Profile Address";
    }
    if (upAddress.length !== 42 || upAddress.slice(0, 2) !== "0x") {
      return "Invalid Address";
    }
    if (
      !executePermission &&
      !registerVotesPermission &&
      !votePermission &&
      !proposePermission &&
      !addPermission &&
      !removePermission &&
      !sendDelegatePermission &&
      !receiveDelegatePermission
    ) {
      return "No key permission provided";
    }

    Object.entries(keyPermissions).forEach(([key, value], index) => {
      upAddressList.push(value.upAddress);
    });
    if (upAddressList.includes(upAddress)) {
      return "UP address already exists";
    }
    // getUpName(upAddress);
    return "success";
  };

  const formSubmitValidations = () => {
    if (!keyPermissions || keyPermissions.length === 0) {
      return "Please add a User Profile with atleast one key permission";
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
    handleSubmitCreate("CreateVault");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-other w-full px-5 md:px-[20%]">
      <h1 className="text-white text-3xl py-2">Step 2</h1>
      <div className="flex justify-left  w-full">
      <h1 className="text-white text-4xl font-bold">
        Create your Key Permissions
      </h1>
      <p aria-owns={open1 ? 'mouse-over-popover' : undefined}
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
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-white text-center">
                  Here you will add the Universal Profiles of DAO members and 
                  assign them key permissions. </div>
              </Popover></div>

      <div className="flex flex-row justify-between w-full">
        <form onSubmit={handleSubmit} className="w-full md:w-[70%] md:mx-auto">
          <div className="py-4  grid xl:grid-cols-2 grid-cols-1">
            <div>
              <div className="flex justify-left w-full">
              <label
                className="block text-white text-sm font-normal"
                htmlFor="keyTitle"
              >
                UP Address
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
                  ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-white text-center">
                     Please enter the Universal Profile Address of any member 
                     in the DAO that you would like to assign key permissions to 
                     and then select the addition icon to the right of the input box.</div>
                </Popover>
                </div>
              <div className="flex flex-row items-center">
                <Input
                  placeholder=""
                  name="up_address"
                  type="text"
                  handleChange={(e: any) => setUpAddress(e.target.value)}
                />

                <button
                  type="button"
                  onClick={handleAddKeyPermission}
                  className="flex justify-center rounded-full items-center flex-none
                      border border-transparent shadow-sm px-2 mx-2 py-2 bg-[#6341ff]
                      text-base font-medium text-white hover:bg-[#8168ff] 
                        sm:w-auto sm:text-sm"
                >Add Member
                  <AiOutlineUserAdd className="w-6" color="#fff" fontSize={21} />
                </button>
                
              </div>

              <div className="flex justify-left pt-4 w-full">
              <label
                className="block  text-white text-sm font-normal"
                htmlFor="categories"
                >
                Key Permissions
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
                  ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-white text-center">
                    Key permissions are enabled by the LSP6 and allow other Universal
                    Profiles to access the DAO Universal Profile in various ways.</div>
                </Popover>
              </div>

              <div className="flex items-center my-3">
                <input
                  type="checkbox"
                  name="vote"
                  onClick={(e: any) => setVotePermission(e.target.checked)}
                  className="accent-[#6341ff] focus:accent-[#6341ff]"
                />
                <div className="flex justify-left  w-full">
                <label
                  htmlFor="vote"
                  className="px-2 text-white text-sm font-medium"
                >
                  Vote
                </label>
                <p aria-owns={open4 ? 'mouse-over-popover' : undefined}
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
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-white text-center">
                  The Vote Key will allow these DAO members to vote on proposals on the DAO profile page.</div>
              </Popover></div>
              </div>
              <div className="flex items-center my-3">
                <input
                  type="checkbox"
                  name="propose"
                  onClick={(e: any) => setProposePermission(e.target.checked)}
                  className="accent-[#6341ff] focus:accent-[#6341ff]"
                />
                <div className="flex justify-left  w-full">
                <label
                  htmlFor="propose"
                  className="px-2 text-white text-sm font-medium"
                >
                  Propose
                </label>
                <p aria-owns={open5 ? 'mouse-over-popover' : undefined}
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
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-white text-center">
                  The Propose Key will allow these DAO members to make proposals
                   on the DAO profile page and in the governance tab. </div>
              </Popover></div>
              </div>
              <div className="flex items-center my-3">
                <input
                  type="checkbox"
                  name="execute"
                  onClick={(e: any) => setExecutePermission(e.target.checked)}
                  className="accent-[#6341ff] focus:accent-[#6341ff]"
                />
                <div className="flex justify-left  w-full">
                <label
                  htmlFor="execute"
                  className="px-2 text-white text-sm font-medium"
                >
                  Execute
                </label>
                <p aria-owns={open6 ? 'mouse-over-popover' : undefined}
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
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-white text-center">
                  The Execute Key allows for members to push a proposal result that is executable. Meaning, after an UP with the Register Votes key registers the vote signatures, 
                  an UP with the execute key can execute the results of the proposal.</div>
              </Popover></div>
              </div>
              <div className="flex items-center my-3">
                <input
                  type="checkbox"
                  name="registerVotes"
                  onClick={(e: any) => setRegisterVotesPermission(e.target.checked)}
                  className="accent-[#6341ff] focus:accent-[#6341ff]"
                />
                <div className="flex justify-left  w-full">
                <label
                  htmlFor="registerVotes"
                  className="px-2 text-white text-sm font-medium"
                >
                  Register Votes
                </label>
                <p aria-owns={open7 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen7} onMouseLeave={handlePopoverClose7}>
                  <MdOutlineHelp className="text-white text-md"/>
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
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-white text-center">
                  The Register Votes Key allows the member to register the signatures received as votes on a proposal. When a proposal voting period has ended, the member with 
                  these permissions has to register the votes to find out the results.</div>
              </Popover></div>
              </div>
              <div className="flex items-center my-3">
                <input
                  type="checkbox"
                  name="add"
                  onClick={(e: any) => setAddPermission(e.target.checked)}
                  className="accent-[#6341ff] focus:accent-[#6341ff]"
                />
                <div className="flex justify-left  w-full">
                <label
                  htmlFor="add"
                  className="px-2 text-white text-sm font-medium"
                >
                  Add Permission
                </label>
                <p aria-owns={open8 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen8} onMouseLeave={handlePopoverClose8}>
                  <MdOutlineHelp className="text-white text-md"/>
                </p>
              <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open8}
                  anchorEl={anchorEl8}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  onClose={handlePopoverClose8}
                  disableRestoreFocus
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-white text-center">
                  The Add Permissions Key allows the member to add permissions to another UP. </div>
              </Popover></div>
              </div>
              <div className="flex items-center my-3">
                <input
                  type="checkbox"
                  name="remove"
                  onClick={(e: any) => setRemovePermission(e.target.checked)}
                  className="accent-[#6341ff] focus:accent-[#6341ff]"
                />
                
              <div className="flex justify-left  w-full">
                <label
                  htmlFor="remove"
                  className="px-2 text-white text-sm font-medium"
                >
                  Remove Permission
                </label>
                <p aria-owns={open9 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen9} onMouseLeave={handlePopoverClose9}>
                  <MdOutlineHelp className="text-white text-md"/>
                </p>
              <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open9}
                  anchorEl={anchorEl9}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  onClose={handlePopoverClose9}
                  disableRestoreFocus
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-white text-center">
                  The Revoke Permissions Key allows the member to take away permissions from another UP.</div>
              </Popover></div>
              </div>
              <div className="flex items-center my-3">
                <input
                  type="checkbox"
                  name="sendDeligate"
                  onClick={(e: any) =>
                    setSendDelegatePermission(e.target.checked)
                  }
                  className="accent-[#6341ff] focus:accent-[#6341ff]"
                />
                <div className="flex justify-left  w-full">
                <label
                  htmlFor="sendDeligate"
                  className="px-2 text-white text-sm font-medium"
                >
                  Send Delegate
                </label>
                <p aria-owns={open10 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen10} onMouseLeave={handlePopoverClose10}>
                  <MdOutlineHelp className="text-white text-md"/>
                </p>
              <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open10}
                  anchorEl={anchorEl10}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  onClose={handlePopoverClose10}
                  disableRestoreFocus
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-white text-center">
                  The Send Delegate Key will allow members to delegate their vote to other members of the DAO who have the Receive Delegate Key.</div>
              </Popover></div>
              </div>
              <div className="flex items-center my-3">
                <input
                  type="checkbox"
                  name="receiveDelegate"
                  onClick={(e: any) =>
                    setReceiveDelegatePermission(e.target.checked)
                  }
                  className="accent-[#6341ff] focus:accent-[#6341ff]"
                />
                <div className="flex justify-left  w-full">
                <label
                  htmlFor="receiveDelegate"
                  className="px-2 text-white text-sm font-medium"
                >
                  Receive Delegate
                </label>
                <p aria-owns={open11 ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={handlePopoverOpen11} onMouseLeave={handlePopoverClose11}>
                  <MdOutlineHelp className="text-white text-md"/>
                </p>
              <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open11}
                  anchorEl={anchorEl11}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  onClose={handlePopoverClose11}
                  disableRestoreFocus
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-white text-center">
                  The Receive Delegate Key will allow members to receive another DAO members voting power for a specific proposal. 
                  This permission should be given to high-ranking members of the DAO whose input is valued and trusted by the community.</div>
              </Popover></div>
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
            {keyPermissions && keyPermissions.length > 0 && (
            <div className="m-4 p-4 bg-[#4E4E50] overflow-auto max-h-[347.5px] rounded-md ">
              <h1 className="text-white text-center text-base font-semibold pb-1">
                Dao Members
              </h1>
              {keyPermissions.map((item, index) => (
                <PermittedDaoMembers
                  key={index}
                  id={index}
                  upAddress={item.upAddress}
                  keyPermissions={item.keyPermissions}
                  handleDeleteKeyPermission={handleDeleteKeyPermission}
                />
              ))}
            </div>
          )}
          </div>
          
        </form>
        
      </div>
    </div>
  );
};

export default CreateKeyPermissions;

export interface keyPermissionInterface {
  execute: boolean;
  registerVotes: boolean;
  vote: boolean;
  propose: boolean;
  addPermission: boolean;
  removePermission: boolean;
  sendDelegate: boolean;
  receiveDelegate: boolean;
}

const PermittedDaoMembers = (props: {
  keyPermissions: keyPermissionInterface;
  upAddress: string;
  id: number;
  handleDeleteKeyPermission: any;
}) => {
  const { upAddress, keyPermissions, id, handleDeleteKeyPermission } = props;
  const [upName, setUpName] = useState<string>("");

  const getUpName = async (upAddress: string) => {
    try {
      const profileData: any = await fetchErc725Data(upAddress);
      if (profileData.value.LSP3Profile) {
        const name = profileData?.value?.LSP3Profile?.name;
        setUpName(name);
        // console.log("profileName = ", name)
      }
    } catch (error) {
      setUpName(shortenAddress(upAddress));
      console.log(upAddress, "This is not an ERC725 Contract");
    }
  };

  useEffect(() => {
    getUpName(upAddress);
  }, []);

  return (
    <div className="flex justify-between items-center p-1 hover:bg-[#1A1A1D] hover:rounded-lg">
      <StyledTooltip
        title={<TooltipContainer keyPermissions={keyPermissions} />}
        placement="right"
        arrow
      >
        <div className="flex justify-between">
          <AiOutlineUser className="w-6" color="#fff" fontSize={21} />
          <h1 className="text-white text-sm">{upName}</h1>
        </div>
      </StyledTooltip>

      <button
        type="button"
        onClick={(event: any) => handleDeleteKeyPermission(event, id)}
        className="flex justify-center rounded-full items-center 
            border border-transparent shadow-sm px-1 mx-1 py-1 bg-[#1A1A1D]
            text-base font-medium text-white hover:bg-[#ac0537] 
              w-auto text-sm"
      >
        <AiFillDelete className="w-4" color="#fff" fontSize={18} />
      </button>
    </div>
  );
};

const TooltipContainer = (props: { keyPermissions: any }) => {
  const { keyPermissions } = props;
  return (
    <div className="py-1">
      <h1 className="text-white text-base font-semibold pb-1">
        Permissions
      </h1>
      <div>
     

        <div className="flex flex-row items-center py-[2px]">
          {keyPermissions.vote ? (
            <AiFillCheckCircle className="w-4" fill="#166534" fontSize={16} />
          ) : (
            <AiFillCheckCircle className="w-4" fill="#1A1A1D" fontSize={16} />
          )}
          <h1
            className={`${
              keyPermissions.vote
                ? "text-green-800 font-light"
                : "text-white font-light"
            } text-xs px-1`}
          >
            Vote
          </h1>
        </div>

        <div className="flex flex-row items-center py-[2px]">
          {keyPermissions.propose ? (
            <AiFillCheckCircle className="w-4" fill="#166534" fontSize={16} />
          ) : (
            <AiFillCheckCircle className="w-4" fill="#1A1A1D" fontSize={16} />
          )}
          <h1
            className={`${
              keyPermissions.propose
                ? "text-[#166534] font-bold"
                : "text-whtie font-light"
            } text-xs px-1`}
          >
            Propose
          </h1>
        </div>

        <div className="flex flex-row items-center py-[2px]">
          {keyPermissions.execute ? (
            <AiFillCheckCircle className="w-4" fill="#166534" fontSize={16} />
          ) : (
            <AiFillCheckCircle className="w-4" fill="#1A1A1D" fontSize={16} />
          )}
          <h1
            className={`${
              keyPermissions.execute
                ? "text-[#166534] font-bold"
                : "text-white font-light"
            } text-xs px-1 `}
          >
            Execute
          </h1>
        </div>

        <div className="flex flex-row items-center py-[2px]">
          {keyPermissions.registerVotes ? (
            <AiFillCheckCircle className="w-4" fill="#166534" fontSize={16} />
          ) : (
            <AiFillCheckCircle className="w-4" fill="#1A1A1D" fontSize={16} />
          )}
          <h1
            className={`${
              keyPermissions.registerVotes
                ? "text-[#166534] font-bold"
                : "text-white font-light"
            } text-xs px-1 `}
          >
            Register Votes
          </h1>
        </div>

        <div className="flex flex-row items-center py-[2px]">
          {keyPermissions.addPermission ? (
            <AiFillCheckCircle className="w-4" fill="#166534" fontSize={16} />
          ) : (
            <AiFillCheckCircle className="w-4" fill="#1A1A1D" fontSize={16} />
          )}
          <h1
            className={`${
              keyPermissions.addPermission
                ? "text-[#166534] font-bold"
                : "text-white font-light"
            } text-xs px-1 `}
          >
            Add Permission
          </h1>
        </div>

        <div className="flex flex-row items-center py-[2px]">
          {keyPermissions.removePermission ? (
            <AiFillCheckCircle className="w-4" fill="#166534" fontSize={16} />
          ) : (
            <AiFillCheckCircle className="w-4" fill="#1A1A1D" fontSize={16} />
          )}
          <h1
            className={`${
              keyPermissions.removePermission
                ? "text-[#166534] font-bold"
                : "text-white font-light"
            } text-xs px-1 `}
          >
            Remove Permission
          </h1>
        </div>

        <div className="flex flex-row items-center py-[2px]">
          {keyPermissions.sendDelegate ? (
            <AiFillCheckCircle className="w-4" fill="#166534" fontSize={16} />
          ) : (
            <AiFillCheckCircle className="w-4" fill="#1A1A1D" fontSize={16} />
          )}
          <h1
            className={`${
              keyPermissions.sendDelegate
                ? "text-[#166534] font-bold"
                : "text-white font-light"
            } text-xs px-1`}
          >
            Send Delegate
          </h1>
        </div>

        <div className="flex flex-row items-center py-[2px]">
          {keyPermissions.receiveDelegate ? (
            <AiFillCheckCircle className="w-4" fill="#166534" fontSize={16} />
          ) : (
            <AiFillCheckCircle className="w-4" fill="#1A1A1D" fontSize={16} />
          )}
          <h1
            className={`${
              keyPermissions.receiveDelegate
                ? "text-[#166534] font-bold"
                : "text-white font-light"
            } text-xs px-1`}
          >
            Receive Delegate
          </h1>
        </div>
      </div>
    </div>
  );
};
