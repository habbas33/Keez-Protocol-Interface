import React, {useContext, useState,useEffect} from 'react'
import { ConnectProfileModal } from '../modals/';
import { ProfileContext } from '../context/ProfileContext'
import { MdNavigateNext } from "react-icons/md";
import { MultiSelect } from "../components";
import { FileUploader } from "../components";
import {toast} from 'react-toastify';

const Create: React.FC = () => {
  const { accountAddress } = useContext(ProfileContext);
  const [createForm, setCreateForm] = useState<string>('CreateDAO');
  
  
  const handleSubmitCreate = (NextForm:string) => {
    // e.preventDefault();
    console.log(NextForm);
    // setCreateForm(NextForm);
  }

  // useEffect(() => {
  //   setCreateForm("CreateDAO")
  // }, []);

  return (
    <div className="min-h-screen">
        { !accountAddress ? (
        <div className="bg-welcome flex min-h-[100vh] w-full justify-center items-center px-5 lg:px-40 md:px-20">
          <ConnectProfileModal/>
            <h1 className="text-white">Connect your user profile</h1>
        </div>
        ):(
          <>
          { (createForm === "CreateDAO") && (<CreateDAO handleSubmitCreate={handleSubmitCreate}/>)}
          { (createForm === "CreateMasterKey") && (<CreateMasterKey handleSubmitCreate={handleSubmitCreate}/>)}
          </>
        )}
    </div>
  );
}

export default Create;

const CreateMasterKey = (props: {handleSubmitCreate:any}) => {
  const {handleSubmitCreate} = props;
  return(
    <div className="bg-welcome pt-28  min-h-[100vh] w-full px-5 md:px-60">
      <h1 className="text-white text-sm py-2">Step 2</h1>
      <h1 className="text-white text-lg font-bold">Create Master Key</h1>
      <form >
        <div className="pl-32 py-4 pr-80">
          <label className="block text-slate-200 text-sm font-medium" htmlFor="keyTitle">
            Key Title
          </label>
          <Input placeholder="" name="key_title" type="text" handleChange={()=>{}} />

          <label className="block pt-4 text-slate-200 text-sm font-medium" htmlFor="categories">
            Categories
          </label>
          <MultiSelect/>

          <label className="block pt-4 text-slate-200 text-sm font-medium" htmlFor="description">
            Description
          </label>
          <textarea className="my-1 h-28 w-full rounded-sm p-2 outline-none text-white border-2 border-[#999999] focus:border-red-400 text-sm text-gray-700 leading-tight" placeholder="" name="description" onChange={(e) =>{}} />

          <button
            type="button"
            className="flex justify-center rounded-md item-center
              border border-transparent shadow-sm px-4 py-2 bg-[#C3073F]
              text-base font-medium text-white hover:bg-[#ac0537] 
                 sm:w-auto sm:text-sm"
            // onClick={handleSubmitCreate("CreateDAO")}
            onClick={()=>console.log("goto next page")}
          >
            Next
            <MdNavigateNext className="pl-[2px] w-6" color="#fff" fontSize={20}  />
          </button>
        </div>
      </form>
    </div>
  );
}

const CreateDAO = (props: {handleSubmitCreate:any}) => {
  const {handleSubmitCreate} = props;
  const [daoName, setDaoName] = useState<string>('');
  // const [daoLogo, setDaoLogo] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [categories, setCategories] = useState<string[]>([]);

  toast.configure();

  useEffect(() => {
    console.log(daoName);
    // console.log(daoLogo);
    console.log(categories);
  }, [daoName]);

  function handleSubmit(event: any) {
    event.preventDefault();
    console.log("goto create masterkey");
  }

  return(
    <div className="bg-welcome pt-28  min-h-[100vh] w-full px-5 md:px-60">
      <h1 className="text-white text-sm py-2">Step 1</h1>
      <h1 className="text-white text-lg font-bold">Create your DAO</h1>
      <form onSubmit={handleSubmit}>
        <div className="pl-32 py-4 pr-80">
          <label className="block text-slate-200 text-sm font-medium" htmlFor="daoName">
            DAO Name
          </label>
          <Input placeholder="" name="dao_name" type="text" handleChange={(e:any) => setDaoName(e.target.value)} />

          <label className="block pt-4 text-slate-200 text-sm font-medium" htmlFor="daoLogo">
            DAO Logo
          </label>
          {/* <Input placeholder="" name="dao_logo" type="text" handleChange={(e:any) => setDaoLogo(e.target.value)} /> */}
          <FileUploader
            onFileSelectSuccess={(file:any) => setSelectedFile(file)}
            onFileSelectError={(error:string) => toast.error(error,
            {position: toast.POSITION.BOTTOM_RIGHT})}
          />
          <label className="block pt-4 text-slate-200 text-sm font-medium" htmlFor="categories">
            Categories
          </label>
          <MultiSelect/>

          <label className="block pt-4 text-slate-200 text-sm font-medium" htmlFor="description">
            Description
          </label>
          <textarea className="my-1 h-28 w-full rounded-sm p-2 outline-none text-white border-2 border-[#999999] focus:border-red-400 text-sm text-gray-700 leading-tight" placeholder="" name="description" onChange={(e) =>{}} />
          <button
            type="submit"
            className="flex justify-center rounded-md item-center
              border border-transparent shadow-sm px-4 py-2 bg-[#C3073F]
              text-base font-medium text-white hover:bg-[#ac0537] 
                 sm:w-auto sm:text-sm"
              // onClick={handleSubmitCreate("CreateMasterKey")}
              // onClick={()=>console.log("goto create masterkey")}
            >
            Next
            <MdNavigateNext className="pl-[2px] w-6" color="#fff" fontSize={20}  />
          </button>
        </div>
      </form>
    </div>
  );
}

const Input = (props:{ placeholder:string, name:string, type:string, handleChange:any }) => {
  const {placeholder, name, type, handleChange } = props;

  return (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      onChange={(e) => handleChange(e, name)}
      className="my-1 w-full rounded-sm p-2 outline-none text-white border-2 border-[#999999] focus:border-red-400 text-sm text-gray-700 leading-tight"
    />
  );
}