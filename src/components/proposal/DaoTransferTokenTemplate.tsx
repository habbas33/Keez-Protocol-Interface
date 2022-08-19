import React, { useContext, useState, useEffect } from 'react'
import { MdNavigateNext, MdOutlineNavigateBefore} from "react-icons/md";
import { MultiSelect, SingleSelect, Input } from "../../components";
import { CreateProposalContext } from '../../context/CreateProposalContext'
import { daoCategoryItems } from '../../constants/daoCategoryItems';
import { getDaoByCID } from "../../services/keezBackend";
import {toast} from 'react-toastify';
import { VALIDATORS } from "../../constants/globals";
import { getParsedJsonObj } from "../../utils/getParsedJsonObj";

const DaoTransferTokenTemplate = (props: {handleComponent:any}) => {
    const {handleComponent} = props;
    const { proposalName,
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
        if (receivingAddress.length !== 42 || receivingAddress.slice(0,2) !== '0x'){
          return "Invalid Address"
        }
        return "success";
    }

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      if (VALIDATORS) {
        const validationResult = formSubmitValidations();
        if (validationResult !== "success") {
            return toast.error(validationResult,
            {position: toast.POSITION.BOTTOM_RIGHT});
        }
      }
      handleComponent("PreviewProposal");
    }

    const handleSelectVault = (selectedOption:any) => {
      const selection = vaultlist.find(element => element.label === selectedOption.label);
      if (selection)
        setSelectedVault(selection.label);
    }

    const handleSelectToken = (selectedOption:any) => {
      const selection = [{ value: "lyx", label: "LYX" }].find(element => element.label === selectedOption.label) || { value:0 , label:'none' };
      setSelectedToken(selection.label);
    }
    
    const handleBack = async (event: React.FormEvent) => {
        event.preventDefault();
        handleComponent("ChooseTemplate");
    }

 
    const handleCategoriesChange = (selectedOption:any) => {
        setCategories(selectedOption );
    }
 
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
  
    useEffect(() => {
      if (daoCid) {
        
          const fetchData = async () => {
            const result = await getDaoByCID(daoCid);
            console.log("doa selected set", result);
            setDaoSelected(result);
          }
          fetchData();
      }
    }, [])
    toast.configure();
// console.log(daoSelected.vaultDetails)
    const vaultObject = daoSelected.length!=""? getParsedJsonObj(daoSelected.vaultDetails):"";
// console.log(JSON.stringify(vaultObject.vaultName,null,4));
    const vaultlist = [{ value: vaultObject.vaultName, label: vaultObject.vaultName }];
    return(
      <div className="bg-welcome pt-28  min-h-[100vh] w-full px-5 md:px-60">
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
              Send Tokens From DAO
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
                  Vault
                </label>
                <SingleSelect handleChange={handleSelectVault} name={"vault"} listItems={vaultlist}/>

                <label className="block pt-4 text-slate-400 text-sm font-normal" htmlFor="minVotingPeriod">
                  Token
                </label>
                <SingleSelect handleChange={handleSelectToken} name={"token"} listItems={[{ value: "lyx", label: "LYX" }]}/>

                <label className="block pt-4 text-slate-400 text-sm font-normal" htmlFor="receiving Address">
                  Token Amount
                </label>
                <Input value={tokenAmount.toString()} name="token_amount" type="number" handleChange={(e:any) => setTokenAmount(e.target.value)} />

                <label className="block pt-4 text-slate-400 text-sm font-normal" htmlFor="receiving Address">
                  Receiving Address
                </label>
                <Input value={receivingAddress} name="receiving_address" type="text" handleChange={(e:any) => setReceivingAddress(e.target.value)} />
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
  
  
export default DaoTransferTokenTemplate;


  