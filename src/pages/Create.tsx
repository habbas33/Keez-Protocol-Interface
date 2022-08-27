import React, {useContext, useState,useEffect} from 'react'
import { ConnectProfileModal } from '../modals/';
import { ProfileContext } from '../context/ProfileContext'
import { CreateDao, CreateDaoSummary, CreateKeyPermissions, CreateVault, CreateVotingParameters } from "../components";
// import {createDao as createDaoService, testDao} from "../services/createDao"
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { MdCheck } from "react-icons/md";
import StepConnector from '@material-ui/core/StepConnector';
import { StepIconProps } from '@material-ui/core/StepIcon';
import { DeployDaoContext } from '../context/DeployDaoContext'
import { DeployerModal } from '../modals'
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';

const steps= {"CreateDAO":0,"CreateKeyPermissions":1,"CreateVault":2,"CreateVotingParameters":3,"CreateDaoSummary":4}

const Create: React.FC = () => {
  const { accountAddress } = useContext(ProfileContext);
  const [createForm, setCreateForm] = useState<string>('CreateDAO');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [metalink, setMetalink] = useState<string>('');
  const [allStepsValidated, setAllStepsValidated] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [daoUpMetadata, setDaoUpMetadata] = useState<any>([]);

  const handleSubmitCreate = (NextForm:string,DaoUpMetadata?:any) => {

    setCreateForm(NextForm);
    //@ts-ignore
    setActiveStep(steps[NextForm]);
    setDaoUpMetadata(DaoUpMetadata);
    if (NextForm==="CreateDaoSummary"){
      setAllStepsValidated(true)
    }
    // setActiveStep();
    if (NextForm==="DaoCreated"){
      if(DaoUpMetadata){
        setShowModal(true);
      }
    }
  }

  const handleDeployDao = (DaoUpMetadata?:any) => {
    setDaoUpMetadata(DaoUpMetadata);
      if(DaoUpMetadata){
        setShowModal(true);
      }
  }

  const handleDeploy = () => {
    console.log("creat");
    setShowModal(true);
    // deployUniversalReceiverDelegateUP();
  }

  const handleReview = (NextForm:string) => {
    //@ts-ignore
    if (allStepsValidated || steps[NextForm]<activeStep){
      // steps[NextForm]<activeStep
      setCreateForm(NextForm);
      //@ts-ignore
      setActiveStep(steps[NextForm]);
    }
  }

  return (
    <div className="min-h-screen">
        {showModal && <DeployerModal showModal={showModal} setShowModal={setShowModal} daoUpMetadata={daoUpMetadata} metalink={metalink}/>}
        { !accountAddress ? (
        <div className="bg-other flex min-h-[100vh] w-full justify-center items-center px-5 lg:px-40 md:px-20">
          <ConnectProfileModal/>
            <h1 className="text-white">Connect your user profile</h1>
            {/* <button
                      onClick={handleDeploy}
                      type="button"
                      className="flex justify-center rounded-md item-center 
                                  border border-transparent shadow-sm px-4 py-2 bg-[#C3073F]
                                  text-base font-medium text-white  ml-auto"
                    >
                      deploy
                    </button> */}
        </div>
        
        ):(
          <div className="bg-other min-h-[100vh] pt-24 w-full ">
            <div className="w-[100%] px-[12vw] mx-auto bg-other">
              <Stepper style={{backgroundColor:'transparent'}} activeStep={allStepsValidated?4:activeStep} alternativeLabel connector={<QontoConnector />}>
                  <Step>
                    <StepLabel onClick={()=>handleReview("CreateDAO")} StepIconComponent={QontoStepIcon}><p className={`${activeStep==0?"text-[#22c55e]":"text-white"} font-semibold text-xs ${allStepsValidated || activeStep > 0?"hover:text-[#ac0537] cursor-pointer":""} `}>Create Dao</p></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel onClick={()=>handleReview("CreateKeyPermissions")} StepIconComponent={QontoStepIcon}><p className={`${activeStep==1?"text-[#22c55e]":"text-white"} font-semibold text-xs ${allStepsValidated || activeStep > 1?"hover:text-[#ac0537] cursor-pointer":""} `}>Key Permissions</p></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel onClick={()=>handleReview("CreateVault")} StepIconComponent={QontoStepIcon}><p className={`${activeStep==2?"text-[#22c55e]":"text-white"} font-semibold text-xs ${allStepsValidated || activeStep > 2?"hover:text-[#ac0537] cursor-pointer":""} `}>Vault</p></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel onClick={()=>handleReview("CreateVotingParameters")} StepIconComponent={QontoStepIcon}><p className={`${activeStep==3?"text-[#22c55e]":"text-white"} font-semibold text-xs ${allStepsValidated || activeStep > 3?"hover:text-[#ac0537] cursor-pointer":""} `}>Voting Parameters</p></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel onClick={()=>handleReview("CreateDaoSummary")} StepIconComponent={QontoStepIcon}><p className={`${activeStep==4?"text-[#22c55e]":"text-white"} font-semibold text-xs ${allStepsValidated || activeStep > 4?"hover:text-[#ac0537] cursor-pointer":""} `}>Summary</p></StepLabel>
                  </Step>
              </Stepper>
              </div>
            { (createForm === "CreateDAO") && (<CreateDao handleSubmitCreate={handleSubmitCreate}/>)}
            { (createForm === "CreateKeyPermissions") && (<CreateKeyPermissions handleSubmitCreate={handleSubmitCreate}/>)}
            { (createForm === "CreateVault") && (<CreateVault handleSubmitCreate={handleSubmitCreate}/>)}
            { (createForm === "CreateVotingParameters") && (<CreateVotingParameters handleSubmitCreate={handleSubmitCreate}/>)}
            { (createForm === "CreateDaoSummary") && (<CreateDaoSummary handleSubmitCreate={handleSubmitCreate} handleDeployDao={handleDeployDao} metalink={metalink} setMetalink={setMetalink}/>)}
           
                {/* <button
                onClick={handleDeploy}
                type="button"
                className="flex justify-center rounded-md item-center 
                            border border-transparent shadow-sm px-4 py-2 bg-[#C3073F]
                            text-base font-medium text-white  ml-auto"
              >
                deploy
              </button> */}
          </div>
        )}
    </div>
  );
}

export default Create;

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#22c55e',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#22c55e',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#22c55e',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#22c55e',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props: StepIconProps) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <MdCheck className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

