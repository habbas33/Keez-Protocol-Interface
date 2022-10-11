import React, { useState } from "react";

interface CreateProposalContextInterface {
  proposalName: string;
  setProposalName: any;
  categories: { value: string; label: string }[];
  setCategories: any;
  description: string;
  setDescription: any;
  participationRate: number;
  setParticipationRate: any;
  votingMajority: number;
  setVotingMajority: any;
  minVotingDelay: number;
  setMinVotingDelay: any;
  minVotingPeriod: number;
  setMinVotingPeriod: any;
  minExecutionDelay: number;
  setMinExecutionDelay: any;

  selectedVault: string;
  setSelectedVault: any;
  selectedToken: string;
  setSelectedToken: any;
  tokenAmount: number;
  setTokenAmount: any;
  receivingAddress: string;
  setReceivingAddress: any;

  coverImageFile: File | undefined;
  setCoverImageFile: any;
  votingOptions: string[];
  setVotingOptions: any;

  keyPermissions: {
    upAddress: string;
    action: string;
    keyPermissions: {
      vote: boolean;
      propose: boolean;
      execute: boolean;
      addPermission: boolean;
      removePermission: boolean;
      registerVotes: boolean;
      sendDelegate: boolean;
      receiveDelegate: boolean;
    };
  };
  setKeyPermissions: any;

  vaultPermissions: { vaultAddress: string; action: string };
  setVaultPermissions: any;

  membersOrVault: string;
  setMembersOrVault: any;

  proposer: string;
  setProposer: any;
  proposalType: string;
  setProposalType: any;
  daoCid: string;
  setDaoCid: any;
  daoUpAddress: string;
  setDaoUpAddress: any;
  formComponent: string;
  setFormComponent?: any;
}

export const CreateProposalContext =
  React.createContext<CreateProposalContextInterface>({
    proposalName: "",
    setProposalName: () => {},
    categories: [
      { value: "DAO", label: "DAO" },
      { value: "Social", label: "Social" },
    ],
    setCategories: () => {},
    description: "",
    setDescription: () => {},
    participationRate: 0,
    setParticipationRate: () => {},
    votingMajority: 0,
    setVotingMajority: () => {},
    minVotingDelay: 0,
    setMinVotingDelay: () => {},
    minVotingPeriod: 1,
    setMinVotingPeriod: () => {},
    minExecutionDelay: 0,
    setMinExecutionDelay: () => {},

    selectedVault: "",
    setSelectedVault: () => {},
    selectedToken: "",
    setSelectedToken: () => {},
    tokenAmount: 0,
    setTokenAmount: () => {},
    receivingAddress: "",
    setReceivingAddress: () => {},

    coverImageFile: null as any,
    setCoverImageFile: () => {},
    votingOptions: [],
    daoUpAddress: "",
    setDaoUpAddress: () => {},
    setVotingOptions: () => {},

    keyPermissions: {
      upAddress: "",
      action: "",
      keyPermissions: {
        vote: false,
        propose: false,
        execute: false,
        addPermission: false,
        removePermission: false,
        registerVotes: false,
        sendDelegate: false,
        receiveDelegate: false,
      },
    },
    setKeyPermissions: () => {},
    vaultPermissions: { vaultAddress: "", action: "" },
    setVaultPermissions: () => {},
    membersOrVault: "",
    setMembersOrVault: () => {},

    proposer: "",
    setProposer: () => {},
    proposalType: "",
    setProposalType: () => {},
    daoCid: "",
    setDaoCid: () => {},
    formComponent: "",
    setFormComponent: () => {},
  });

export const CreateProposalContextProvider = ({ children }: any) => {
  const [proposalName, setProposalName] = useState<string>("");
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([
    { value: "DAO", label: "DAO" },
    { value: "Social", label: "Social" },
  ]);
  const [description, setDescription] = useState<string>("");
  const [participationRate, setParticipationRate] = useState<number>(0);
  const [votingMajority, setVotingMajority] = useState<number>(0);
  const [minVotingDelay, setMinVotingDelay] = useState<number>(0);
  const [minVotingPeriod, setMinVotingPeriod] = useState<number>(1);
  const [minExecutionDelay, setMinExecutionDelay] = useState<number>(0);

  const [selectedVault, setSelectedVault] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<string>("");
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [receivingAddress, setReceivingAddress] = useState<string>("");

  const [coverImageFile, setCoverImageFile] = useState<File>();
  const [formComponent, setFormComponent] = useState<string>("ChooseDao");
  const [votingOptions, setVotingOptions] = useState<string[]>([
    "For",
    "Against",
    "Abstain",
  ]);

  const [keyPermissions, setKeyPermissions] = useState<{
    upAddress: string;
    action: string;
    keyPermissions: {
      vote: boolean;
      propose: boolean;
      execute: boolean;
      addPermission: boolean;
      removePermission: boolean;
      registerVotes: boolean;
      sendDelegate: boolean;
      receiveDelegate: boolean;
    };
  }>({
    upAddress: "",
    action: "",
    keyPermissions: {
      vote: false,
      propose: false,
      execute: false,
      addPermission: false,
      removePermission: false,
      registerVotes: false,
      sendDelegate: false,
      receiveDelegate: false,
    },
  });
  const [vaultPermissions, setVaultPermissions] = useState<{
    vaultAddress: string;
    action: string;
  }>({ vaultAddress: "", action: "" });
  const [membersOrVault, setMembersOrVault] = useState<string>("Members");

  const [proposer, setProposer] = useState<string>("");
  const [proposalType, setProposalType] = useState<string>("");
  const [daoCid, setDaoCid] = useState<string>("");
  const [daoUpAddress, setDaoUpAddress] = useState<string>("");

  return (
    <CreateProposalContext.Provider
      value={{
        proposalName: proposalName,
        categories: categories,
        description: description,
        participationRate: participationRate,
        votingMajority: votingMajority,
        minVotingDelay: minVotingDelay,
        minExecutionDelay: minExecutionDelay,
        minVotingPeriod: minVotingPeriod,
        setProposalName: setProposalName,
        setCategories: setCategories,
        setDescription: setDescription,
        setParticipationRate: setParticipationRate,
        setVotingMajority: setVotingMajority,
        setMinVotingDelay: setMinVotingDelay,
        setMinVotingPeriod: setMinVotingPeriod,
        setMinExecutionDelay: setMinExecutionDelay,

        selectedVault: selectedVault,
        selectedToken: selectedToken,
        tokenAmount: tokenAmount,
        receivingAddress: receivingAddress,
        setSelectedVault: setSelectedVault,
        setSelectedToken: setSelectedToken,
        setTokenAmount: setTokenAmount,
        setReceivingAddress: setReceivingAddress,

        coverImageFile: coverImageFile,
        setCoverImageFile: setCoverImageFile,
        votingOptions: votingOptions,
        setVotingOptions: setVotingOptions,

        keyPermissions: keyPermissions,
        setKeyPermissions: setKeyPermissions,
        vaultPermissions: vaultPermissions,
        setVaultPermissions: setVaultPermissions,
        membersOrVault: membersOrVault,
        setMembersOrVault: setMembersOrVault,

        proposer: proposer,
        setProposer: setProposer,

        proposalType: proposalType,
        setProposalType: setProposalType,
        daoCid: daoCid,
        setDaoCid: setDaoCid,
        daoUpAddress: daoUpAddress,
        setDaoUpAddress: setDaoUpAddress,
        formComponent: formComponent,
        setFormComponent: setFormComponent,
      }}
    >
      {children}
    </CreateProposalContext.Provider>
  );
};
