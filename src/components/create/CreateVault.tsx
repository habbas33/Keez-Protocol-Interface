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
import { StyledPopover } from "../../styles";

const CreateVault = (props: { handleSubmitCreate: any }) => {
  const classes = StyledPopover();
  const [anchorEl1, setAnchorEl1] = React.useState<HTMLElement | null>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<HTMLElement | null>(null);
  const [anchorEl3, setAnchorEl3] = React.useState<HTMLElement | null>(null);
  const [anchorEl4, setAnchorEl4] = React.useState<HTMLElement | null>(null);;

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

  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);
  const open4 = Boolean(anchorEl4);
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
      <h1 className="text-white text-3xl py-2">Step 3</h1>
      <div className="flex justify-left w-full">
      <h1 className="text-white text-4xl font-bold">Create your Vault</h1>
      <p className="px-1" aria-owns={open4 ? 'mouse-over-popover' : undefined}
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
                  Here you will create a vault and add DAO members from the previous screen to have control over the multisig.</div>
              </Popover></div>
      <form onSubmit={handleSubmit}>
        <div className=" py-4 md:w-[70%] md:mx-auto">
        <div className="flex justify-left w-full">
          <label
            className="block text-white text-sm font-normal"
            htmlFor="vaultName"
          >
            Vault Name
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
                  Select a vault name for your DAO. For now, one vault will be created to hold the DAOs assets and data. In the future, you will have the option to add more 
                  vaults for subgroups.</div>
              </Popover></div>
          <Input
            value={vaultName}
            name="vault_name"
            type="text"
            handleChange={(e: any) => setVaultName(e.target.value)}
          />
          <div className="flex justify-left pt-4 w-full">
          <label className="block  text-white text-sm font-medium">
            Choose the DAO member(s) that you would like to give multisig
            permissions to:
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
                  Select DAO members that you added on the previous page that you would like to add to the multisig. The multisig is in place to control the UP, so only add
                   DAO members that are trustworthy and able to run a multisig properly.</div>
              </Popover></div>
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
          <div className="flex justify-left pt-4 w-full">
          <label
            className="block  text-white text-sm font-normal"
            htmlFor="majority"
          >
            Majority (recommended 50% +)
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
                ><div className="flex w-56 flex-col-3  justify-center items-center h-full px-2 text-white text-center">
                  The Majority is what percentage of multisig members that is needed to sign. It is recommended that it is above 50% to ensure a majority. </div>
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
