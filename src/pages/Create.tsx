import React, {useContext, useState,useEffect} from 'react'
import { ConnectProfileModal } from '../modals/';
import { ProfileContext } from '../context/ProfileContext'
import { CreateDao, CreateDaoSummary, CreateKeyPermissions, CreateVault, CreateVotingParameters } from "../components";
import {createDao as createDaoService} from "../services/createDao"

const Create: React.FC = () => {
  const { accountAddress } = useContext(ProfileContext);
  const [createForm, setCreateForm] = useState<string>('CreateDAO');
  const [metalink, setMetalink] = useState<string>('');
  
  const handleSubmitCreate = (NextForm:string) => {
    console.log(NextForm);
    setCreateForm(NextForm);
    // createDaoService(accountAddress);
  }

  return (
    <div className="min-h-screen">
        { !accountAddress ? (
        <div className="bg-welcome flex min-h-[100vh] w-full justify-center items-center px-5 lg:px-40 md:px-20">
          <ConnectProfileModal/>
            <h1 className="text-white">Connect your user profile</h1>
        </div>
        ):(
          <>
          { (createForm === "CreateDAO") && (<CreateDao handleSubmitCreate={handleSubmitCreate}/>)}
          { (createForm === "CreateKeyPermissions") && (<CreateKeyPermissions handleSubmitCreate={handleSubmitCreate}/>)}
          { (createForm === "CreateVault") && (<CreateVault handleSubmitCreate={handleSubmitCreate}/>)}
          { (createForm === "CreateVotingParameters") && (<CreateVotingParameters handleSubmitCreate={handleSubmitCreate}/>)}
          { (createForm === "CreateDaoSummary") && (<CreateDaoSummary handleSubmitCreate={handleSubmitCreate} metalink={metalink} setMetalink={setMetalink}/>)}
          </>
        )}
    </div>
  );
}

export default Create;

