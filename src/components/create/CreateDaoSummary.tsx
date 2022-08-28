import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { SpinnerCircular } from "spinners-react";
import { CreateDaoContext } from "../../context/CreateDaoContext";
import { ProfileContext } from '../../context/ProfileContext'
import { DeployDaoContext } from '../../context/DeployDaoContext'
import { shortenAddress } from "../../utils/shortenAddress";
import { IPFS_DWEB_URL } from "../../constants/globals";
import { postJsonToIPFS, postImageToIPFS } from "../../services/web3Storage";
import { postDaoUp } from "../../services/keezBackend";
import {
  votingPeriodItems,
  votingDelayItems,
} from "../../constants/votingPeriodItems";
import { AiOutlineUser } from "react-icons/ai";
import { StyledTooltip } from "../../styles";
import { fetchErc725Data } from "../../services/erc725";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

const CreateDaoSummary = (props: {
  handleSubmitCreate: any;
  setMetalink: any;
}) => {
  const { handleSubmitCreate, setMetalink } = props;
  const {
    daoName,
    logoImageFile,
    categories,
    description,
    keyPermissions,
    vaultName,
    daoMembers,
    majority,
    participationRate,
    votingMajority,
    minVotingDelay,
    minVotingPeriod,
    minExecutionDelay,
  } = useContext(CreateDaoContext);
  const { executeDeployer } = useContext(DeployDaoContext);
  const {accountAddress} = useContext(ProfileContext);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [imageSize, setImageSize] = useState<{width:number, height:number}>({width:0, height:0})
  const navigate = useNavigate();

  //@ts-ignore
  console.log("height",logoImageFile)
  //@ts-ignore
  // console.log("width",logoImageFile)
  const handleSubmit = async () => {
    setSubmitLoading(true);
    const timestamp = dayjs().valueOf();
    console.log(timestamp)
    if (logoImageFile) {
      try {
        const resultLogoMetadata = await postImageToIPFS(logoImageFile);
        console.log("resultLogoMetadata",resultLogoMetadata)
        let DaoUpMetadata = {
          daoProfile: {
            daoName: daoName,
            profileImage: { hash: resultLogoMetadata.cid, url: IPFS_DWEB_URL },
            categories: categories,
            description: description,
            creator: accountAddress,
          },
          keyPermissions: keyPermissions,
          vaultDetails: {
            vaultName: vaultName,
            daoMembers: daoMembers,
            majority: majority,
          },
          votingParameters: {
            participationRate: participationRate,
            votingMajority: votingMajority,
            minVotingDelay: minVotingDelay,
            minVotingPeriod: minVotingPeriod,
            minExecutionDelay: minExecutionDelay,
          },
          createdAt: timestamp,
        };
        const resultDaoMetadata = await postJsonToIPFS(DaoUpMetadata);
        const metalink :string = IPFS_DWEB_URL.concat(resultDaoMetadata.cid)
        
 
        console.log(metalink);
        setMetalink(metalink);
        // window.open(metalink, "_blank");
        
      //************contract interaction ************* */
        
        const { hash, contractAddresses} = await executeDeployer(DaoUpMetadata,metalink);
        
      //******************************************* */

        //@ts-ignore
        DaoUpMetadata.daoProfile['CID'] = resultDaoMetadata.cid; 
        //@ts-ignore
        DaoUpMetadata.daoProfile['url'] = IPFS_DWEB_URL; 
        //@ts-ignore
        DaoUpMetadata.daoProfile['daoUpAddress'] = {
          universalReceiverDelegateUP: contractAddresses.UNIVERSALRECEIVER,
          universalProfile: contractAddresses.UNIVERSAL_PROFILE,
          keyManager: contractAddresses.KEY_MANAGER,
          daoPermissions: contractAddresses.DAO_PERMISSIONS,
          daoDelegates: contractAddresses.DAO_DELEGATES,
          daoProposals: contractAddresses.DAO_PROPOSALS,
          multisig: contractAddresses.MULTISIG,
        };

        const result = await postDaoUp(DaoUpMetadata);
        console.log(DaoUpMetadata)
        toast.success("Dao Profile Created", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setSubmitLoading(false);
        navigate("/Profile")

      } catch (err) {
        toast.error("Dao Profile Creation Unsuccessful", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setSubmitLoading(false);
      }
    }
  };
  

  useEffect(() => {
    if (logoImageFile) {
      const img =new Image();
      img.onload = function() {
        setImageSize({width:img.width, height:img.height});
      }
      img.src = URL.createObjectURL(logoImageFile);
    }
  }, [logoImageFile]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-other w-full md:px-[10%] xl:px-[20%] px-5">
      <h1 className="text-white text-center text-4xl my-6 ">DAO Summary</h1>
      {/* <div className="flex-column justify-center items-center mx-auto w-[90%] rounded-lg order border border-slate-300"> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-0 mx-auto w-[90%] rounded-lg ">
        {/* <div className="flex flex-col md:flex-row flex-wrap justify-center h-1/2"> */}
          <div className="border rounded-lg md:border-b border-solid bg-[#382c71] md:rounded-none md:rounded-tl-lg border-slate-300 ">
            <DaoDetails
              daoName={daoName}
              logoImageFile={logoImageFile}
              categories={categories}
              description={description}
              handleSubmitCreate={handleSubmitCreate}
            />
          </div>
          <div className="border rounded-lg md:border-l md:border-b border-solid bg-[#382c71] md:rounded-none md:rounded-tr-lg border-slate-300">
            <KeyPermissionDetails
              keyPermissions={keyPermissions}
              handleSubmitCreate={handleSubmitCreate}
            />
          </div>
        {/* </div> */}
        {/* <div className="border rounded-lg flex flex-col md:flex-row justify-center h-1/2 border-t rounded-lg bg-[#8168ff] rounded-bl-lg border-solid border-slate-300"> */}
          <div className="border rounded-lg border-solid bg-[#382c71] md:rounded-none md:rounded-bl-lg border-slate-300">
            <VaultDetails
              vaultName={vaultName}
              daoMembers={daoMembers}
              majority={majority}
              handleSubmitCreate={handleSubmitCreate}
            />
          </div>
          <div className="border rounded-lg md:border-l border-solid bg-[#382c71] md:rounded-none md:rounded-br-lg border-slate-300">
            <VotingParametersDetails
              participationRate={participationRate}
              votingMajority={votingMajority}
              minVotingDelay={minVotingDelay}
              minVotingPeriod={minVotingPeriod}
              minExecutionDelay={minExecutionDelay}
              handleSubmitCreate={handleSubmitCreate}
            />
          </div>
        {/* </div> */}
      </div>
      <div className="w-[90%] py-6 mx-auto">
        {!submitLoading ? (
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex justify-center rounded-full item-center
                    border border-transparent shadow-sm px-4 py-2 bg-[#6341ff]
                    text-base font-medium text-white hover:bg-[#8168ff] 
                        sm:w-auto sm:text-sm ml-auto"
          >
            Submit
          </button>
        ) : (
          <button
            disabled
            type="submit"
            className="flex justify-center rounded-md item-center 
                        border border-transparent shadow-sm px-4 w-[82px] py-2 bg-[#6341ff]
                        text-base font-medium text-white opacity-50 ml-auto"
          >
            <SpinnerCircular
              size={20}
              thickness={200}
              speed={118}
              color="rgba(153, 153, 153, 1)"
              secondaryColor="rgba(172, 5, 55, 1)"
            />
          </button>
        )}
        
      </div>
    </div>
  );
};

export default CreateDaoSummary;

const DaoDetails = (props: {
  daoName: string;
  logoImageFile: any;
  categories: any;
  description: string;
  handleSubmitCreate: any;
}) => {
  const {
    daoName,
    logoImageFile,
    categories,
    description,
    handleSubmitCreate,
  } = props;
  const fileURL = logoImageFile ? URL.createObjectURL(logoImageFile) : "";

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between items-center pb-2">
        <h1 className="text-white text-3xl ">Your DAO</h1>
        <button
          type="button"
          onClick={() => handleSubmitCreate("CreateDAO")}
          className="flex justify-center rounded-full item-center ml-auto 
                border border-transparent shadow-sm px-3 py-1 bg-[#6341ff]
                text-base font-medium text-white hover:bg-[#8168ff] 
                    w-auto text-sm"
        >
          Edit
        </button>
      </div>
      <div className="flex justify-between px-2">
        <div className="flex-column justify-between items-center w-1/2">
          <h1 className="text-slate-300 text-xs font-normal">DAO Name</h1>
          <h1 className="text-white text-2xl font-bold break">{daoName}</h1>
        </div>
        <div className="flex-column justify-between items-center w-1/2">
          <h1 className="text-slate-300 text-xs font-normal">Categories</h1>
          {categories.map((item: any, index: string) => (
            <h1 key={index} className="text-white text-xs font-normal">
              {item.value}
            </h1>
          ))}
        </div>
      </div>

      <div className="flex justify-between px-2 pt-2">
        <div className="flex-column justify-between items-center w-1/2">
          <h1 className="text-slate-300 text-xs font-normal">DAO Logo</h1>
          {fileURL && <img src={fileURL} className="py-2 max-w-[60%] rounded-full" />}
        </div>
        <div className="flex-column justify-between items-center w-1/2">
          <h1 className="text-slate-300 text-xs font-normal">
            Dao Description
          </h1>
          <h1 className="text-white text-xs font-normal">{description}</h1>
        </div>
      </div>
    </div>
  );
};

const KeyPermissionDetails = (props: {
  keyPermissions: any;
  handleSubmitCreate: any;
}) => {
  const { keyPermissions, handleSubmitCreate } = props;
  const [upNameDict, setUpNameDict] = useState(() => new Map<string, string>());
  const permissions: string[] = [
    "Vote",
    "Propose",
    "Execute",
    "Register Votes",
    "Add Permission",
    "Remove Permission",
    "Send Delegate",
    "Receive Delegate",
  ];
  let permissionDict: any = {
    "Vote": [],
    "Propose": [],
    "Execute": [],
    "Register Votes": [],
    "Add Permission": [],
    "Remove Permission": [],
    "Send Delegate": [],
    "Receive Delegate": [],
  };

  Object.keys(keyPermissions).forEach((item) => {
    keyPermissions[item].keyPermissions.vote &&
      permissionDict["Vote"].push(keyPermissions[item].upAddress);
    keyPermissions[item].keyPermissions.propose &&
      permissionDict["Propose"].push(keyPermissions[item].upAddress);
    keyPermissions[item].keyPermissions.execute &&
      permissionDict["Execute"].push(keyPermissions[item].upAddress);
    keyPermissions[item].keyPermissions.registerVotes &&
      permissionDict["Register Votes"].push(keyPermissions[item].upAddress);
    keyPermissions[item].keyPermissions.addPermission &&
      permissionDict["Add Permission"].push(keyPermissions[item].upAddress);
    keyPermissions[item].keyPermissions.removePermission &&
      permissionDict["Remove Permission"].push(keyPermissions[item].upAddress);
    keyPermissions[item].keyPermissions.sendDelegate &&
      permissionDict["Send Delegate"].push(keyPermissions[item].upAddress);
    keyPermissions[item].keyPermissions.receiveDelegate &&
      permissionDict["Receive Delegate"].push(keyPermissions[item].upAddress);
  });

  const getUpName = async (upAddress: string) => {
    try {
      const profileData: any = await fetchErc725Data(upAddress);
      if (profileData.value.LSP3Profile) {
        const name: string = profileData?.value?.LSP3Profile?.name;
        setUpNameDict(upNameDict.set(upAddress, name));
        return name;
      }
    } catch (error) {
      console.log(upAddress, "This is not an ERC725 Contract");
      setUpNameDict(upNameDict.set(upAddress, shortenAddress(upAddress)));
      return;
    }
  };

  useEffect(() => {
    Object.keys(keyPermissions).forEach((item) => {
      getUpName(keyPermissions[item].upAddress);
    });
  }, []);

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between items-center pb-2">
        <h1 className="text-white text-3xl ">Key Permissions</h1>
        <button
          type="button"
          onClick={() => handleSubmitCreate("CreateKeyPermissions")}
          className="flex justify-center rounded-full item-center ml-auto 
                    border border-transparent shadow-sm px-3 py-1 bg-[#6341ff]
                    text-base font-medium text-white hover:bg-[#8168ff] 
                        w-auto text-sm"
        >
          Edit
        </button>
      </div>
      <div className="flex justify-between pb-2">
        <div className="flex-column justify-between items-center w-full">
          {permissions.map((item: any, index: number) => (
            <DaoPermissions
              key={index}
              permission={item}
              permissionDict={permissionDict}
              upNameDict={upNameDict}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const DaoPermissions = (props: {
  permissionDict: any;
  permission: string;
  upNameDict: Map<string, string>;
}) => {
  const { permissionDict, permission, upNameDict } = props;
  const length = permissionDict[permission].length;

  return (
    <div className="flex justify-between px-2 py-1 ">
      <h1 className="text-slate-300 text-sm font-normal w-1/2">{permission}</h1>
      <div className="flex justify-start w-1/2">
        {permissionDict[permission].map((item: string, index: number) => (
          <>
            {index < 3 && (
              <StyledTooltip
                key={index}
                title={
                  <TooltipContainerUpName
                    upAddress={item}
                    upNameDict={upNameDict}
                  />
                }
                placement="top"
                arrow
              >
                <div
                  key={index}
                  className={`flex ${
                    index > 0
                      ? "-translate-x-".concat((index * 2).toString())
                      : ""
                  } justify-between rounded-full border hover:z-50 hover:border-[#8168ff] border-solid bg-[#4E4E50]`}
                >
                  <AiOutlineUser color="#fff" fontSize={16} />
                </div>
              </StyledTooltip>
            )}
          </>
        ))}

        {length > 3 && (
          <StyledTooltip
            title={
              <TooltipContainerUpNames
                upNames={permissionDict[permission]}
                upNameDict={upNameDict}
              />
            }
            placement="right"
            arrow
          >
            <h1 className="text-white px-2 text-sm font-normal -translate-x-4">
              +{length - 3} more
            </h1>
          </StyledTooltip>
        )}
      </div>
    </div>
  );
};

const TooltipContainerUpName = (props: {
  upAddress: string;
  upNameDict: Map<string, string>;
}) => {
  const { upAddress, upNameDict } = props;
  return (
    <div className="py-1">
      <h1 className="text-slate-300 text-xs font-normal">
        {upNameDict.get(upAddress)}
      </h1>
    </div>
  );
};

const TooltipContainerUpNames = (props: {
  upNames: string[];
  upNameDict: Map<string, string>;
}) => {
  const { upNames, upNameDict } = props;
  return (
    <div className="py-1">
      {upNames.map((item: any, index: number) => (
        <h1 className="text-slate-300 text-xs font-normal">
          {upNameDict.get(item)}
        </h1>
      ))}
    </div>
  );
};

const VaultDetails = (props: {
  vaultName: string;
  daoMembers: string[];
  majority: number;
  handleSubmitCreate: any;
}) => {
  const { vaultName, daoMembers, majority, handleSubmitCreate } = props;

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between items-center pb-2">
        <h1 className="text-white text-3xl">Your Vault</h1>
        <button
          type="button"
          onClick={() => handleSubmitCreate("CreateVault")}
          className="flex justify-center rounded-full item-center ml-auto 
                    border border-transparent shadow-sm px-3 py-1 bg-[#6341ff]
                    text-base font-medium text-white hover:bg-[#8168ff] 
                        w-auto text-sm"
        >
          Edit
        </button>
      </div>
      <div className="flex justify-between px-2">
        <div className="flex-column justify-between items-center w-1/2">
          <h1 className="text-slate-300 text-xs font-normal">Vault Name</h1>
          <h1 className="text-white text-2xl font-bold">{vaultName}</h1>
        </div>
      </div>

      <div className="flex justify-between px-2 pt-2">
        <div className="flex-column justify-between items-center w-1/2">
          <h1 className="text-slate-300 text-xs font-normal">
            Multisig Allowances
          </h1>
          {daoMembers.map((item, index) => (
                <DaoMembers
                  key={index}
                  upAddress={item}
                />
              ))}
        </div>
        <div className="flex-column justify-between items-center w-1/2">
          <h1 className="text-slate-300 text-xs font-normal">Majority</h1>
          <h1 className="text-white text-2xl font-bold">{majority}%</h1>
        </div>
      </div>
    </div>
  );
};

const DaoMembers = (props: {
  upAddress: string;
}) => {
  const { upAddress } = props;
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
        <h1 className="text-white text-sm">{upName}</h1>
  );
};

const VotingParametersDetails = (props: {
  participationRate: number;
  votingMajority: number;
  minVotingDelay: number;
  minVotingPeriod: number;
  minExecutionDelay:number;
  handleSubmitCreate: any;
}) => {
  const {
    participationRate,
    votingMajority,
    minVotingDelay,
    minVotingPeriod,
    minExecutionDelay,
    handleSubmitCreate,
  } = props;
  const votingPeriod = votingPeriodItems.find(
    (element) => element.value === minVotingPeriod.toString()
  );
  const votingDelay = votingDelayItems.find(
    (element) => element.value === minVotingDelay.toString()
  );
  const executionDelay = votingDelayItems.find(
    (element) => element.value === minExecutionDelay.toString()
  );

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between items-center pb-2">
        <h1 className="text-white text-3xl ">Voting Parameters</h1>
        <button
          type="button"
          onClick={() => handleSubmitCreate("CreateVotingParameters")}
          className="flex justify-center rounded-full item-center ml-auto 
                    border border-transparent shadow-sm px-3 py-1 bg-[#6341ff]
                    text-base font-medium text-white hover:bg-[#8168ff] 
                        w-auto text-sm"
        >
          Edit
        </button>
      </div>

      <div className="flex justify-between px-2 pt-2">
        <div className="flex-column justify-between items-center w-1/2">
          <h1 className="text-slate-300 text-xs font-normal">
            Participation Rate
          </h1>
          <h1 className="text-white text-2xl font-bold">
            {participationRate}%
          </h1>
        </div>
        <div className="flex-column justify-between items-center w-1/2">
          <h1 className="text-slate-300 text-xs font-normal">
            Min. Voting Delay
          </h1>
          <h1 className="text-white text-2xl font-bold">
            {votingDelay ? votingDelay.label : ""}
          </h1>
        </div>
      </div>
      {/* minExecutionDelay */}
      <div className="flex justify-between px-2 pt-2">
        <div className="flex-column justify-between items-center w-1/2">
          <h1 className="text-slate-300 text-xs font-normal">Majority</h1>
          <h1 className="text-white text-2xl font-bold">{votingMajority}%</h1>
        </div>
        <div className="flex-column justify-between items-center w-1/2">
          <h1 className="text-slate-300 text-xs font-normal">
            Min. Voting Period
          </h1>
          <h1 className="text-white text-2xl font-bold">
            {votingPeriod ? votingPeriod.label : ""}
          </h1>
        </div>
      </div>
      <div className="flex justify-end px-2 pt-2">
        <div className="flex-column justify-between items-center w-1/2">
          <h1 className="text-slate-300 text-xs font-normal">
            Min. Execution Delay
          </h1>
          <h1 className="text-white text-2xl font-bold">
            {executionDelay ? executionDelay.label : ""}
          </h1>
        </div>
      </div>
    </div>
  );
};

