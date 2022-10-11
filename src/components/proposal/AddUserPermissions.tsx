import React, { useContext, useState, useEffect, useCallback } from "react";
import { MdNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { SingleSelect, Input } from "../../components";
import { CreateProposalContext } from "../../context/CreateProposalContext";
// import { daoCategoryItems } from "../../constants/daoCategoryItems";
import Switch from "@material-ui/core/Switch";
import { toast } from "react-toastify";
import { VALIDATORS } from "../../constants/globals";
import { getDaoByCID } from "../../services/keezBackend";
import { getParsedJsonObj } from "../../utils/getParsedJsonObj";
// import { StyledPopover } from "../../styles";
import InfoPopOver from "../InfoPopOver";
import {
  permissionContract,
  universalProfileContract,
} from "../../services/web3";
import Select from "../Select";
import { useLocation } from "react-router-dom";

const AddUserPermission = () => {
  // const classes = StyledPopover();

  // const { handleComponent } = props;
  const {
    proposalName,
    setProposalName,
    categories,
    // setCategories,
    description,
    setDescription,
    setKeyPermissions,
    // setVaultPermissions,
    keyPermissions,
    // vaultPermissions,
    membersOrVault,
    // setMembersOrVault,
    // daoCid,
  } = useContext(CreateProposalContext);

  const location = useLocation() as any;
  const daoCid = location.state.CID;
  const [executePermission, setExecutePermission] = useState<any>(false);
  const [registerVotesPermission, setRegisterVotesPermission] =
    useState<any>(false);
  const [addPermission, setAddPermission] = useState<any>(false);
  const [removePermission, setRemovePermission] = useState<any>(false);
  const [votePermission, setVotePermission] = useState<any>(false);
  const [proposePermission, setProposePermission] = useState<any>(false);
  const [sendDelegatePermission, setSendDelegatePermission] =
    useState<any>(false);
  const [receiveDelegatePermission, setReceiveDelegatePermission] =
    useState<any>(false);
  const [memberAddress, setMemberAddress] = useState<string>("");
  // const [addOrRevoke, setAddOrRevoke] = useState<string>("Add"); // true -> Add / false -> revoke
  const daoSelected = location.state.dao;
  const [memberExist, setMemberExists] = useState<boolean>(false);

  toast.configure();

  const formSubmitValidations = () => {
    if (!memberAddress || memberAddress.length === 0) {
      return "Please enter an address";
    }
    if (memberExist) {
      return "Member already exists";
    }

    // if (!categories || categories.length === 0) {
    //   return "Please select atleast one category for your proposal";
    // }

    // if (!description || description.length === 0) {
    //   return "Please add description for your proposal";
    // }

    return "success";
  };
  const universalProfile = getParsedJsonObj(
    daoSelected?.daoUpAddress
  )?.universalProfile;
  const getPermissions = useCallback(async () => {
    if (memberAddress) {
      try {
        let contract1 = await universalProfileContract(universalProfile)
          ["getData(bytes32[])"]([
            "0x4b80742de2bfb3cc0e490000" + memberAddress.substring(2),
          ])
          .call();
        const permissionBin = parseInt(contract1[0], 16).toString(2);
        setRegisterVotesPermission(permissionBin[0] === "1");
        setRemovePermission(permissionBin[1] === "1");
        setAddPermission(permissionBin[2] === "1");
        setReceiveDelegatePermission(permissionBin[3] === "1");
        setSendDelegatePermission(permissionBin[4] === "1");
        setExecutePermission(permissionBin[5] === "1");
        setProposePermission(permissionBin[6] === "1");
        setVotePermission(permissionBin[7] === "1");
      } catch {
        toast.error("An error ocurred, check your connection", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
  }, [universalProfile, memberAddress]);
  const verifyExistence = useCallback(async () => {
    try {
      const contract1 = await universalProfileContract(universalProfile)[
        "getData(bytes32[])"
      ](["0x4b80742de2bfb3cc0e490000" + memberAddress.substring(2)]);
      if (contract1) {
        setMemberExists(true);
      } else {
        setMemberExists(false);
      }
    } catch {
      setMemberExists(false);
    }
  }, [memberAddress]);

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
    // if (membersOrVault === "Members"){
    const permissionbyte =
      (registerVotesPermission << 7) +
      (removePermission << 6) +
      (addPermission << 5) +
      (receiveDelegatePermission << 4) +
      (sendDelegatePermission << 3) +
      (executePermission << 2) +
      (proposePermission << 1) +
      votePermission;
    await permissionContract(universalProfile, memberAddress, permissionbyte);
    setKeyPermissions({
      upAddress: memberAddress,
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
    });
    // } else if (membersOrVault === "Vault"){
    //   setVaultPermissions({vaultAddress:"", action:addOrRevoke});
    // }
    // console.log(membersOrVault);
    // console.log(addOrRevoke);
    console.log("kp= ", keyPermissions);
    // console.log(vaultPermissions);
  };

  const handleBack = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  // const handleCategoriesChange = (selectedOption: any) => {
  //   setCategories(selectedOption);
  // };

  // const handleMemberChange = (selectedOption: any) => {
  //   const selection = membersList.find(
  //     (element: any) => element.label === selectedOption.label
  //   );
  //   if (selection) setMemberAddress(selection.label);
  // };

  //   const handleMasterKeyChange = () => {
  //     console.log(masterKeyPermission);
  //     setMasterKeyPermission(!masterKeyPermission);
  // }

  // const onChangeAddOrRevoke = (event: any) => {
  //   console.log(event.target.value);
  //   setAddOrRevoke(event.target.value)
  // }

  // const onChangeMembersOrVault = (event: any) => {
  //   console.log(event.target.value);
  //   setMembersOrVault(event.target.value)
  // }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (memberAddress) {
      verifyExistence();
    }
  }, [memberAddress, verifyExistence]);

  useEffect(() => {
    if (daoCid) {
      const fetchData = async () => {
        const result = await getDaoByCID(daoCid);
        console.log("doa selected set", result);
      };
      fetchData();
    }
  }, [daoCid]);

  useEffect(() => {
    if (memberAddress) {
      getPermissions();
    }
    // for (var i = 0; i < permissionsObject.length; i++) {
    //   if (permissionsObject[i].upAddress == memberAddress) {
    //     setVotePermission(permissionsObject[i].keyPermissions.vote === "True");
    //     setProposePermission(
    //       permissionsObject[i].keyPermissions.propose === "True"
    //     );
    //     setSendDelegatePermission(
    //       permissionsObject[i].keyPermissions.sendDelegate === "True"
    //     );
    //     setReceiveDelegatePermission(
    //       permissionsObject[i].keyPermissions.receiveDelegate === "True"
    //     );
    //     setRegisterVotesPermission(
    //       permissionsObject[i].keyPermissions?.registerVotes === "True"
    //     );
    //     setAddPermission(
    //       permissionsObject[i].keyPermissions?.addPermission === "True"
    //     );
    //     setRemovePermission(
    //       permissionsObject[i].keyPermissions?.removePermission === "True"
    //     );
    //     setExecutePermission(
    //       permissionsObject[i].keyPermissions?.execute === "True"
    //     );
    //   }
    // }
    // console.log("member changes");
    // console.log(permissionsObject);
    // console.log(daoSelected);
  }, [memberAddress, getPermissions]);

  const permissionsObject =
    daoSelected.length !== ""
      ? getParsedJsonObj(daoSelected?.keyPermissions)
      : "";
  // console.log(JSON.stringify(permissionsObject));
  const membersList: any = [];

  Object.keys(permissionsObject).forEach(function (key, index) {
    membersList[key] = {
      value: permissionsObject[key].upAddress,
      label: permissionsObject[key].upAddress,
    };
  });

  toast.configure();
  return (
    <div className="bg-other pt-10 min-h-[100vh] w-full px-5 md:px-[15%]">
      {/* <h1 className="text-white text-sm py-2">Step 1</h1> */}
      <form onSubmit={(event) => handleSubmit(event)}>
        {/* <div className="flex justify-between items-center">
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
        </div> */}
        <p className="block text-white text-center py-2 text-3xl">
          Add Member Permission
        </p>
        <div className="flex flex-col justify-center items-center py-2">
          <div className="w-full md:w-3/5">
            <>
              <div className="flex justify-left pt-4 w-full">
                <label
                  className="block  text-white text-sm font-normal"
                  htmlFor="minVotingPeriod"
                >
                  Add new Member
                </label>
                <InfoPopOver info="enter the Universal Profile address to which you would like to add or revoke permissions." />
              </div>

              <Input
                type="text"
                name="member"
                value={memberAddress}
                handleChange={(e: any) => {
                  setMemberAddress(e.target.value);
                }}
              />
            </>
            <>
              <div className="flex justify-left pt-4 w-full">
                <label
                  className="block  text-white text-sm font-normal"
                  htmlFor="minVotingPeriod"
                >
                  Choose Permissions to Add:
                </label>
                <InfoPopOver info="Select which permissions you want to add or revoke from the Universal Profile address selected." />
              </div>
              <div className="grid gap-x-4 gap-y-0 grid-cols-2 text-white">
                <div className="flex items-center my-3">
                  {/* <input type="checkbox" name="vote" onClick ={(e:any) => setVotePermission(e.target.checked)} className="accent-[#C3073F] focus:accent-[#ac0537]"/> */}
                  <Switch
                    checked={votePermission}
                    onChange={(e: any) => setVotePermission(!votePermission)}
                    name="maskerkey"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  <label
                    htmlFor="vote"
                    className="px-2 text-white text-sm font-medium"
                  >
                    Vote
                  </label>
                </div>
                <div className="flex items-center my-3">
                  {/* <input type="checkbox" name="propose" onClick ={(e:any) => setProposePermission(e.target.checked)} className="accent-[#C3073F] focus:accent-[#ac0537]"/> */}
                  <Switch
                    checked={proposePermission}
                    onChange={(e: any) =>
                      setProposePermission(!proposePermission)
                    }
                    name="propose"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  <label
                    htmlFor="propose"
                    className="px-2 text-white text-sm font-medium"
                  >
                    Propose
                  </label>
                </div>
                <div className="flex items-center my-3">
                  {/* <input type="checkbox" name="receiveDelegate" onClick ={(e:any) => setReceiveDelegatePermission(e.target.checked)} className="accent-[#C3073F] focus:accent-[#ac0537]"/> */}
                  <Switch
                    checked={executePermission}
                    onChange={(e: any) =>
                      setExecutePermission(!executePermission)
                    }
                    name="executePermission"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  <label
                    htmlFor="execute"
                    className="px-2 text-white text-sm font-medium"
                  >
                    Execute
                  </label>
                </div>
                <div className="flex items-center my-3">
                  {/* <input type="checkbox" name="receiveDelegate" onClick ={(e:any) => setReceiveDelegatePermission(e.target.checked)} className="accent-[#C3073F] focus:accent-[#ac0537]"/> */}
                  <Switch
                    checked={registerVotesPermission}
                    onChange={(e: any) =>
                      setRegisterVotesPermission(!registerVotesPermission)
                    }
                    name="registerVotesPermission"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  <label
                    htmlFor="registerVotes"
                    className="px-2 text-white text-sm font-medium"
                  >
                    RegisterVotes
                  </label>
                </div>
                <div className="flex items-center my-3">
                  {/* <input type="checkbox" name="receiveDelegate" onClick ={(e:any) => setReceiveDelegatePermission(e.target.checked)} className="accent-[#C3073F] focus:accent-[#ac0537]"/> */}
                  <Switch
                    checked={addPermission}
                    onChange={(e: any) => setAddPermission(!addPermission)}
                    name="addPermission"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  <label
                    htmlFor="add"
                    className="px-2 text-white text-sm font-medium"
                  >
                    Add
                  </label>
                </div>
                <div className="flex items-center my-3">
                  {/* <input type="checkbox" name="receiveDelegate" onClick ={(e:any) => setReceiveDelegatePermission(e.target.checked)} className="accent-[#C3073F] focus:accent-[#ac0537]"/> */}
                  <Switch
                    checked={removePermission}
                    onChange={(e: any) =>
                      setRemovePermission(!removePermission)
                    }
                    name="removePermission"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  <label
                    htmlFor="remove"
                    className="px-2 text-white text-sm font-medium"
                  >
                    Remove
                  </label>
                </div>
                <div className="flex items-center my-3">
                  {/* <input type="checkbox" name="sendDeligate" onClick ={(e:any) => setSendDelegatePermission(e.target.checked)} className="accent-[#C3073F] focus:accent-[#ac0537]"/> */}
                  <Switch
                    checked={sendDelegatePermission}
                    onChange={(e: any) =>
                      setSendDelegatePermission(!sendDelegatePermission)
                    }
                    name="sendDelegatePermission"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  <label
                    htmlFor="sendDeligate"
                    className="px-2 text-white text-sm font-medium"
                  >
                    Send Delegate
                  </label>
                </div>
                <div className="flex items-center my-3">
                  {/* <input type="checkbox" name="receiveDelegate" onClick ={(e:any) => setReceiveDelegatePermission(e.target.checked)} className="accent-[#C3073F] focus:accent-[#ac0537]"/> */}
                  <Switch
                    checked={receiveDelegatePermission}
                    onChange={(e: any) =>
                      setReceiveDelegatePermission(!receiveDelegatePermission)
                    }
                    name="receiveDelegatePermission"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  <label
                    htmlFor="receiveDelegate"
                    className="px-2 text-white text-sm font-medium"
                  >
                    Receive Delegate
                  </label>
                </div>
              </div>
            </>
            <div className="flex justify-end items-center">
              <button
                type="submit"
                className="flex justify-center rounded-full item-center mb-10 mt-[12px]
                            border border-transparent shadow-sm px-4 py-2 bg-[#6341ff]
                            text-base font-medium text-white hover:bg-[#8168ff] 
                            sm:w-auto sm:text-sm"
              >
                <p className="translate-x-1.5">Add Member</p>
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

export default AddUserPermission;
