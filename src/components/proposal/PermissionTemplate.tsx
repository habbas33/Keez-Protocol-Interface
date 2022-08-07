import React, { useContext, useState, useEffect } from 'react'
import { MdNavigateNext, MdOutlineNavigateBefore, MdAdd, MdRemove} from "react-icons/md";
import { MultiSelect, SingleSelect, Input } from "../../components";
import { CreateProposalContext } from '../../context/CreateProposalContext'
import { daoCategoryItems } from '../../constants/daoCategoryItems';
import { votingPeriodItems, votingDelayItems } from '../../constants/votingPeriodItems';
import {toast} from 'react-toastify';

const PermissionsTemplate = (props: {handleComponent:any}) => {
    const {handleComponent} = props;
    const { proposalName,
      setProposalName,
      categories,
      setCategories,
      description,
      setDescription,
      setKeyPermissions,
      setVaultPermissions,
      keyPermissions,
      vaultPermissions,
      membersOrVault,
      setMembersOrVault
    } = useContext(CreateProposalContext);

    const [masterKeyPermission, setMasterKeyPermission] = useState<boolean>(false);
    const [hrKeyPermission, setHrKeyPermission] = useState<boolean>(false);
    const [votePermission, setVotePermission] = useState<boolean>(false);
    const [proposePermission, setProposePermission] = useState<boolean>(false);
    const [sendDelegatePermission, setSendDelegatePermission] = useState<boolean>(false);
    const [receiveDelegatePermission, setReceiveDelegatePermission] = useState<boolean>(false);
    const [addOrRevoke, setAddOrRevoke] = useState<string>("Add"); // true -> Add / false -> revoke

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

        return "success";
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const validationResult = formSubmitValidations();

        if (validationResult !== "success") {
            return toast.error(validationResult,
            {position: toast.POSITION.BOTTOM_RIGHT});
        }

        if (membersOrVault === "Members"){
          setKeyPermissions({upAddress:"", action: addOrRevoke, keyPermissions:{masterKey:masterKeyPermission, hrKey:hrKeyPermission, vote:votePermission, propose:proposePermission, sendDelegate:sendDelegatePermission, receiveDelegate:receiveDelegatePermission}});
        } else if (membersOrVault === "Vault"){
          setVaultPermissions({vaultAddress:"", action:addOrRevoke});
        }
        console.log(membersOrVault);
        console.log(addOrRevoke);
        console.log(keyPermissions);
        console.log(vaultPermissions);
        handleComponent("PreviewProposal");
    }
    
    const handleBack = async (event: React.FormEvent) => {
        event.preventDefault();
        handleComponent("ChooseTemplate");
    }
 
    const handleCategoriesChange = (selectedOption:any) => {
        setCategories(selectedOption );
    }

    const onChangeAddOrRevoke = (event: any) => {
      console.log(event.target.value);
      setAddOrRevoke(event.target.value)
    }

    const onChangeMembersOrVault = (event: any) => {
      console.log(event.target.value);
      setMembersOrVault(event.target.value)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
 
    toast.configure();
    return(
      <div className="bg-welcome pt-28  min-h-[100vh] w-full px-5 md:px-60">
        {/* <h1 className="text-white text-sm py-2">Step 1</h1> */}
        <form onSubmit={(event) => handleSubmit(event)}>
            <div className="flex justify-between items-center">
                <h1 className="text-white text-lg font-bold">Create your Proposal</h1>
                <button
                    type="button"
                    onClick={(event) => handleBack(event)}
                    className="flex justify-center rounded-md item-center 
                        border border-transparent shadow-sm px-4 py-2 bg-[#C3073F]
                        text-base font-medium text-white hover:bg-[#ac0537] 
                        sm:w-auto sm:text-sm"
                    >
                    <MdOutlineNavigateBefore className="-translate-x-1.5 w-6" color="#fff" fontSize={20}  />
                    <p className="-translate-x-1.5">Back</p>
                </button>
            </div>
            <p className="block text-slate-400 text-center py-2 text-md font-semibold">
              Add & Revoke Permissions Template
            </p>
            <div className="flex flex-col justify-center items-center py-2 px-32">
              <div className= " w-1/2">
                <label className="block text-slate-400 text-sm font-normal" htmlFor="proposalName">
                  Proposal Title
                </label>
                <Input value={proposalName} name="proposal_name" type="text" handleChange={(e:any) => setProposalName(e.target.value)} />

                <label className="block pt-4 text-slate-400 text-sm font-normal" htmlFor="categories">
                  Categories
                </label>
                <MultiSelect handleChange={handleCategoriesChange} listItems={daoCategoryItems} name={'proposalCategories'}/>

                <label className="block pt-4 text-slate-400 text-sm font-normal" htmlFor="description">
                  Description
                </label>
                <textarea className="my-1 h-28 w-full rounded-sm p-2 outline-none text-white border-2 border-[#999999] focus:border-red-400 text-sm text-gray-700 leading-tight" value={description} name="description" onChange={(e:any) => setDescription(e.target.value)} />
              
                <label className="block pt-4 text-slate-400 text-sm font-normal" htmlFor="minVotingPeriod">
                  UP or Vault?
                </label>
                <div onChange={onChangeMembersOrVault} className="flex justify-between items-center">
                  <div className="flex justify-start items-center w-1/2">
                    <input checked={membersOrVault === "Members"} type="radio" value="Members" name="membersOrVault" className="accent-[#C3073F] focus:accent-[#ac0537]"/>
                    <label htmlFor="Members" className="block text-white text-sm px-2 font-normal">Dao Members</label>
                  </div>
                  
                  <div className="flex justify-start items-center w-1/2">
                    <input checked={membersOrVault === "Vault"} value="Vault" type="radio" name="membersOrVault" className="accent-[#C3073F] focus:accent-[#ac0537]"/>
                    <label htmlFor="Vault" className="block text-white text-sm px-2 font-normal">Vault</label>
                  </div>
                </div>

                <label className="block pt-4 text-slate-400 text-sm font-normal" htmlFor="minVotingPeriod">
                  Add or Revoke?
                </label>
                <div onChange={onChangeAddOrRevoke} className="flex justify-between items-center">
                  <div className="flex justify-start items-center w-1/2">
                    <input checked={addOrRevoke === "Add"} type="radio" value="Add" name="addOrRevoke" className="accent-[#C3073F] focus:accent-[#ac0537]"/>
                    <label htmlFor="add" className="block text-white text-sm px-2 font-normal">Add</label>
                  </div>
                  
                  <div className="flex justify-start items-center w-1/2">
                    <input checked={addOrRevoke === "Revoke"} value="Revoke" type="radio" name="addOrRevoke" className="accent-[#C3073F] focus:accent-[#ac0537]"/>
                    <label htmlFor="revoke" className="block text-white text-sm px-2 font-normal">Revoke</label>
                  </div>
                </div>

                <label className="block pt-4 text-slate-400 text-sm font-normal" htmlFor="minVotingPeriod">
                  Choose {membersOrVault === "Members" ? "Address" : "Vault"} from List
                </label>
                <SingleSelect handleChange={() => console.log("handleSelectAddress")} name={"address"} listItems={[]}/>

                

                {membersOrVault === "Members" && 
                <>
                  <label className="block pt-4 text-slate-400 text-sm font-normal" htmlFor="minVotingPeriod">
                    Choose Permissions to Add/Revoke:
                  </label>
                  <div className="grid gap-x-4 gap-y-0 grid-cols-2 text-white">
                    <div className="flex items-center my-3">
                      <input type="checkbox" name="masterKey" onClick ={(e:any) => setMasterKeyPermission(e.target.checked)} className="accent-[#C3073F] focus:accent-[#ac0537]"/>
                      <label htmlFor="masterKey" className="px-2 text-white text-sm font-medium">Master Key</label>
                    </div>
                    <div className="flex items-center my-3">
                        <input type="checkbox" name="hrKey" onClick ={(e:any) => setHrKeyPermission(e.target.checked)} className="accent-[#C3073F] focus:accent-[#ac0537]"/>
                        <label htmlFor="hrKey" className="px-2 text-white text-sm font-medium">HR Key</label>
                    </div>
                    <div className="flex items-center my-3">
                        <input type="checkbox" name="vote" onClick ={(e:any) => setVotePermission(e.target.checked)} className="accent-[#C3073F] focus:accent-[#ac0537]"/>
                        <label htmlFor="vote" className="px-2 text-white text-sm font-medium">Vote</label>
                    </div>
                    <div className="flex items-center my-3">
                        <input type="checkbox" name="propose" onClick ={(e:any) => setProposePermission(e.target.checked)} className="accent-[#C3073F] focus:accent-[#ac0537]"/>
                        <label htmlFor="propose" className="px-2 text-white text-sm font-medium">Propose</label>
                    </div>
                    <div className="flex items-center my-3">
                        <input type="checkbox" name="sendDeligate" onClick ={(e:any) => setSendDelegatePermission(e.target.checked)} className="accent-[#C3073F] focus:accent-[#ac0537]"/>
                        <label htmlFor="sendDeligate" className="px-2 text-white text-sm font-medium">Send Delegate</label>
                    </div>
                    <div className="flex items-center my-3">
                        <input type="checkbox" name="receiveDelegate" onClick ={(e:any) => setReceiveDelegatePermission(e.target.checked)} className="accent-[#C3073F] focus:accent-[#ac0537]"/>
                        <label htmlFor="receiveDelegate" className="px-2 text-white text-sm font-medium">Receive Delegate</label>
                    </div>
                  </div>
                </>
                }

              </div>
            </div>

            <div className="flex justify-end items-center">
                <button
                    type="submit"
                    className="flex justify-center rounded-md item-center mb-10 mt-[12px]
                        border border-transparent shadow-sm px-4 py-2 bg-[#C3073F]
                        text-base font-medium text-white hover:bg-[#ac0537] 
                        sm:w-auto sm:text-sm"
                    >
                    <p className="translate-x-1.5">Next</p>
                    <MdNavigateNext className="translate-x-1.5 w-6" color="#fff" fontSize={20}  />
                </button>
            </div>
        </form>
      </div>
    );
  }
  
  
export default PermissionsTemplate;

