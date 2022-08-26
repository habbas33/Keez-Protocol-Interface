import React, { useContext, useState, useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";
import { Input } from "../../components";
import { toast } from "react-toastify";
import { CreateDaoContext } from "../../context/CreateDaoContext";
import { keyPermissionInterface } from "./CreateKeyPermissions";
import { shortenAddress } from "../../utils/shortenAddress";
import { fetchErc725Data } from "../../services/erc725";
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

const CreateVault = (props: { handleSubmitCreate: any }) => {
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
    keyPermissions,
    vaultName,
    setVaultName,
    daoMembers,
    setDaoMembers,
    majority,
    setMajority,
  } = useContext(CreateDaoContext);

  const handleDaoMemberToggle = (
    event: any,
    address: string,
    value: boolean
  ) => {
    // event.preventDefault();
    let dao_members: string[] = daoMembers;

    if (dao_members.includes(address)) {
      if (!value) {
        dao_members = dao_members.filter(function (member_address, index, arr) {
          return member_address !== address;
        });
      }
    } else {
      value && dao_members.push(address);
    }
    setDaoMembers(dao_members);
  };

  const formSubmitValidations = () => {
    if (!vaultName || vaultName.length === 0) {
      return "Please enter a vault name";
    }
    if (!daoMembers || daoMembers.length === 0) {
      return "Please select a DAO member";
    }
    if (!majority) {
      return "Please enter a majority for your vault";
    }
    if (majority < 0 || majority > 100) {
      return "Invalid majority";
    }
    console.log("daoMembers", daoMembers);
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
    handleSubmitCreate("CreateVotingParameters");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-other md:px-[20%] px-5">
      <h1 className="text-white text-sm py-2">Step 3</h1>
      <div className="flex justify-left  w-full">
      <h1 className="text-white text-lg font-bold">Create your Vault</h1>
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
      <form onSubmit={handleSubmit}>
        <div className="py-4 md:w-[60%] ml-10">
        <div className="flex justify-left  w-full">
          <label
            className="block text-white text-sm font-normal"
            htmlFor="vaultName"
          >
            Vault Name
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
          <Input
            value={vaultName}
            name="vault_name"
            type="text"
            handleChange={(e: any) => setVaultName(e.target.value)}
          />
          <label className="block  text-white text-sm font-medium">
            Choose the DAO member(s) that you would like to give multisig
            permissions to:
          </label>
          <label
            className="block  text-white text-sm font-normal"
            htmlFor="categories"
          >
            DAO Members
          </label>
          {keyPermissions && keyPermissions.length > 0 ? (
            <div className="">
              {keyPermissions.map((item, index) => (
                <DaoMembers
                  key={index}
                  upAddress={item.upAddress}
                  keyPermissions={item.keyPermissions}
                  handleDaoMemberToggle={handleDaoMemberToggle}
                />
              ))}
            </div>
          ) : (
            <h1 className="text-white text-sm">----</h1>
          )}
          <div className="flex justify-left  w-full">
          <label
            className="block  text-white text-sm font-normal"
            htmlFor="majority"
          >
            Majority (recommended 50% +)
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
          <div className="flex items-center text-slate-400 text-sm font-normal">
            <Input
              value={majority.toString()}
              name="majority"
              type="number"
              min="0"
              max="100"
              size="w-1/4"
              handleChange={(e: any) => setMajority(e.target.value)}
            />
            <p className="px-2">%</p>
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

export default CreateVault;

const DaoMembers = (props: {
  keyPermissions: keyPermissionInterface;
  upAddress: string;
  handleDaoMemberToggle: any;
}) => {
  const { upAddress, keyPermissions, handleDaoMemberToggle } = props;
  const [upName, setUpName] = useState<string>("");

  const getUpName = async (upAddress: string) => {
    try {
      const profileData: any = await fetchErc725Data(upAddress);
      if (profileData.value.LSP3Profile) {
        const name = profileData?.value?.LSP3Profile?.name;
        setUpName(name);
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
    <div className="flex justify-between items-center p-1 hover:bg-[#8168ff] hover:rounded-lg">
      <div className="flex justify-between items-center">
        <input
          type="checkbox"
          onClick={(event: any) =>
            handleDaoMemberToggle(event, upAddress, event.target.checked)
          }
          className="accent-[#6341ff] focus:accent-[#6341ff]"
        />
        <h1 className="text-white px-2 text-sm">{upName}</h1>
      </div>
    </div>
  );
};
