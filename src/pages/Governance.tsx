import React, {useContext, useState,useEffect} from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { ConnectProfileModal } from '../modals';
import { CreateProposalContext } from '../context/CreateProposalContext'
import { ProfileContext } from '../context/ProfileContext'
import { ChooseDao, ChooseTemplate, GeneralTemplate, VotingTemplate, PermissionTemplate, DaoTransferTokenTemplate, PreviewProposal } from "../components/proposal";

type LocationProps = {
  state: {
    component: string;
    CID:string;
  };
};

const Governance: React.FC = () => {
  const location = useLocation() as unknown as LocationProps;
  const { accountAddress } = useContext(ProfileContext);
  const { setDaoCid } = useContext(CreateProposalContext);
  const [formComponent, setFormComponent] = useState<string>('ChooseDao');
  const [metalink, setMetalink] = useState<string>('');
  const component = location.state?.component;
  const CID = location.state?.CID;

  const handleComponent = (NextForm:string) => {
    console.log(NextForm);
    setFormComponent(NextForm);
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    if (component) {
      setFormComponent(component);
      setDaoCid(CID);
    }
  }, [])

  return (
    <div className="min-h-screen">
        { !accountAddress ? (
        <div className="bg-welcome flex min-h-[100vh] w-full justify-center items-center px-5 lg:px-40 md:px-20">
          <ConnectProfileModal/>
            <h1 className="text-white">Connect your user profile</h1>
        </div>
        ):(
          <>
          { (formComponent === "ChooseDao") && (<ChooseDao handleComponent={handleComponent}/>)}
          { (formComponent === "ChooseTemplate") && (<ChooseTemplate handleComponent={handleComponent}/>)}
          { (formComponent === "PermissionTemplate") && (<PermissionTemplate handleComponent={handleComponent}/>)}
          { (formComponent === "GeneralTemplate") && (<GeneralTemplate handleComponent={handleComponent}/>)}
          { (formComponent === "DaoTransferTokenTemplate") && (<DaoTransferTokenTemplate handleComponent={handleComponent}/>)}
          { (formComponent === "VotingTemplate") && (<VotingTemplate handleComponent={handleComponent}/>)}
          { (formComponent === "PreviewProposal") && (<PreviewProposal handleComponent={handleComponent}/>)}
          </>
        )}
    </div>
  );
}

export default Governance;
