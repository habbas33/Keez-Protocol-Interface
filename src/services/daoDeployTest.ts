import UniversalReceiverDelegateUPJSON from '../contracts/artifacts/contracts/deps/UniversalReceiverDelegateUP.sol/UniversalReceiverDelegateUP.json';
import UniversalReceiverDelegateVaultJSON from '../contracts/artifacts/contracts/deps/UniversalReceiverDelegateVault.sol/UniversalReceiverDelegateVault.json';
import UniversalProfileJSON from '../contracts/artifacts/contracts/deps/UniversalProfile.sol/UniversalProfile.json';
import VaultJSON from '../contracts/artifacts/contracts/deps/Vault.sol/Vault.json';
import KeyManagerJSON from '../contracts/artifacts/contracts/deps/KeyManager.sol/KeyManager.json';
import DaoPermissionsJSON from '../contracts/artifacts/contracts/Dao/DaoPermissions.sol/DaoPermissions.json';
import DaoDelegatesJSON from '../contracts/artifacts/contracts/Dao/DaoDelegates.sol/DaoDelegates.json';
import DaoProposalsJSON from '../contracts/artifacts/contracts/Dao/DaoProposals.sol/DaoProposals.json';
import Web3 from 'web3';

import { ethers } from "ethers";

export const providerTest = async () => {
    const RPC_ENDPOINT = "https://rpc.l16.lukso.network";
    const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log("provider",provider);

    const signer = provider.getSigner();
    console.log("sighner",signer); 
    try {
        const owner = await signer.getAddress();
        console.log("owner",owner); 
    } catch (error) {
        console.log(error)
    }
}

export const daoDeployTest = async () => {

const RPC_ENDPOINT = "https://rpc.l16.lukso.network";
const providerx = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log("provider",provider);

    // const accountsRequest: string[] = await provider.send(
    //     'eth_requestAccounts',
    //     [],
    //   );
    // console.log(accountsRequest);

    const signer = provider.getSigner();
    const owner = "0x2aaddE1ff0d029f792FaBFE531F57f1C1856Ae1D";
    console.log("signer",signer); 

    const UniversalReceiverDelegateUP  = new ethers.ContractFactory(UniversalReceiverDelegateUPJSON.abi, UniversalReceiverDelegateUPJSON.bytecode, signer);
    const universalReceiverDelegateUP  = await UniversalReceiverDelegateUP.deploy();
    await universalReceiverDelegateUP.deployTransaction.wait();
    console.log("universalReceiverDelegateUP"," is deployed",universalReceiverDelegateUP.address); 
    const check = await providerx.getCode(universalReceiverDelegateUP.address)
    console.log("getcode = ", check);
    // const UniversalReceiverDelegateVault  = new ethers.ContractFactory(UniversalReceiverDelegateVaultJSON.abi, UniversalReceiverDelegateVaultJSON.bytecode, signer);
    // const universalReceiverDelegateVault  = await UniversalReceiverDelegateVault.deploy();
    // await universalReceiverDelegateVault.deployTransaction.wait();
    // console.log("universalReceiverDelegateVault"," is deployed",universalReceiverDelegateVault.address); 

    const UniversalProfile  = new ethers.ContractFactory(UniversalProfileJSON.abi, UniversalProfileJSON.bytecode, signer);
    const universalProfile  = await UniversalProfile.deploy(owner,universalReceiverDelegateUP.address);
    await universalProfile.deployTransaction.wait();
    console.log("universalProfile"," is deployed",universalProfile.address); 

    // const Vault  = new ethers.ContractFactory(VaultJSON.abi, VaultJSON.bytecode, signer);
    // const vault  = await Vault.deploy(owner,universalReceiverDelegateVault.address);
    // await vault.deployTransaction.wait();
    // console.log("vault"," is deployed",vault.address); 

    const KeyManager  = new ethers.ContractFactory(KeyManagerJSON.abi, KeyManagerJSON.bytecode, signer);
    const keyManager  = await KeyManager.deploy(universalProfile.address);
    await keyManager.deployTransaction.wait();
    console.log("keyManager"," is deployed",keyManager.address); 

    // const DaoPermissions  = new ethers.ContractFactory(DaoPermissionsJSON.abi, DaoPermissionsJSON.bytecode, signer);
    // const daoPermissions  = await DaoPermissions.deploy(universalProfile.address, keyManager.address);
    // await daoPermissions.deployTransaction.wait();
    // console.log("daoPermissions"," is deployed",daoPermissions.address); 

    // const DaoDelegates  = new ethers.ContractFactory(DaoDelegatesJSON.abi, DaoDelegatesJSON.bytecode, signer);
    // const daoDelegates  = await DaoDelegates.deploy(universalProfile.address, keyManager.address);
    // await daoDelegates.deployTransaction.wait();
    // console.log("daoDelegates"," is deployed",daoDelegates.address); 

    // const DaoProposals  = new ethers.ContractFactory(DaoProposalsJSON.abi, DaoProposalsJSON.bytecode, signer);
    // const daoProposals  = await DaoProposals.deploy(universalProfile.address, keyManager.address);
    // await daoProposals.deployTransaction.wait();
    // console.log("daoProposals"," is deployed",daoProposals.address); 



    console.log("daos loaded");
    // Initialize the dao with new members.
    try {
        await universalProfile.connect(signer).setDaoData(
            ethers.utils.hexlify(ethers.utils.toUtf8Bytes("https://somelink.com/")),
            ethers.utils.hexZeroPad(ethers.utils.hexValue(50), 32),//voting parameters
            ethers.utils.hexZeroPad(ethers.utils.hexValue(50), 32),//
            ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
            [
              owner,
              "0xD068de153Da11d1635efA93E6872E09d3a26b219",
              "0xCE49C5CD51B9a664a731bad461d2901F73B86ccb"
            ],
            [
              "0x00000000000000000000000000000000000000000000000000000000000000ff",
              "0x00000000000000000000000000000000000000000000000000000000000000ff",
              "0x00000000000000000000000000000000000000000000000000000000000000ff"
            ]
          );
          console.log("dataset");
    } catch (error) {
        console.log(error)
        
    }

    try {
        await universalProfile.giveOwnerPermissionToChangeOwner();
        console.log("giveOwnerPermissionToChangeOwner");
    } catch (error) {
        console.log(error)
    }   

    // try {
    //     await universalProfile.setControllerPermissionsForDao(
    //     daoPermissions.address,
    //     daoDelegates.address,
    //     daoProposals.address
    //     );
    //     console.log("setControllerPermissionsForDao", daoPermissions.address);
    // } catch (error) {
    //     console.log(error)
    // } 
    // // Giving the ownership of the Universal Profile to the Key Manager.
  
    try {
        await universalProfile.transferOwnership(keyManager.address); // this one does nothing and stops
        console.log("transferOwnership");
    } catch (error) {
        console.log(error)
    } 

    let ABI = ["function claimOwnership()"];
    let iface = new ethers.utils.Interface(ABI);

    try {
        await keyManager.execute(iface.encodeFunctionData("claimOwnership"));
        console.log("execute", universalReceiverDelegateUP.address);
    } catch (error) {
        console.log(error)
    } 
    const vault = new ethers.Contract("0x5BF732ECCB219666d5B1AF91df13269E859428F9", VaultJSON.abi, signer);
    // const keyManager = new ethers.Contract("0xF9bB27367b9F25C8744DcdE01E28DB5b3701AaC1", KeyManagerJSON.abi, signer);
    const daoPermissions = new ethers.Contract("0x039f2baAbDCA3E5A66b11b7fF9d45B458bbe29D1", DaoPermissionsJSON.abi, signer);
    const daoDelegates = new ethers.Contract("0x0a3C73AB9DD7431fc8cb7BE1E76b21C2EEa4b679", DaoDelegatesJSON.abi, signer);
    const daoProposals = new ethers.Contract("0xb9572A8B3838f8Ce787591C18bEe054567a7885f", DaoProposalsJSON.abi, signer);
    return {
        universalReceiverDelegateUP,
        universalProfile,
        vault,
        keyManager,
        daoPermissions,
        daoDelegates,
        daoProposals,
      };
}

export const daoReadTest = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log("provider",provider);


    const signer = provider.getSigner();
    console.log("signer",signer.getAddress()); 
    console.log("signeraddress",await signer.getChainId()); 
    
    // const universalReceiverDelegateUP = new ethers.Contract("0x26Be0700a45eB157B746781c78a0acf63691bE15", UniversalReceiverDelegateUPJSON.abi, signer); 
    // const universalReceiverDelegateVault = new ethers.Contract("0xaeDf8489Ceda262AC180214d5C994C4265272E7b", UniversalReceiverDelegateVaultJSON.abi, signer);
    const universalProfile = new ethers.Contract("0x390aAf74B416617Ff80aF598Fe113E8B3a88A7c4", UniversalProfileJSON.abi, signer);
    // const vault = new ethers.Contract("0x5BF732ECCB219666d5B1AF91df13269E859428F9", VaultJSON.abi, signer);
    // const keyManager = new ethers.Contract("0xF9bB27367b9F25C8744DcdE01E28DB5b3701AaC1", KeyManagerJSON.abi, signer);
    // const daoPermissions = new ethers.Contract("0x039f2baAbDCA3E5A66b11b7fF9d45B458bbe29D1", DaoPermissionsJSON.abi, signer);
    // const daoDelegates = new ethers.Contract("0x0a3C73AB9DD7431fc8cb7BE1E76b21C2EEa4b679", DaoDelegatesJSON.abi, signer);
    // const daoProposals = new ethers.Contract("0xb9572A8B3838f8Ce787591C18bEe054567a7885f", DaoProposalsJSON.abi, signer);

    const keys = [
        "0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47",
        "0xeafec4d89fa9619884b60000abe425d64acd861a49b8ddf5c0b6962110481f38"
      ];


    try {
        const get_data = await universalProfile["getData(bytes32[])"](keys); // this one gives error
        console.log("this",get_data)
    } catch (error) {
       console.log(error) 
    }  
}




export const daoDeployWeb3Test = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const owner = await signer.getAddress();
    const web3 = new Web3(window.ethereum);

    //@ts-ignore
    const UniversalReceiverDelegateUP  = new web3.eth.Contract(UniversalReceiverDelegateUPJSON.abi)
    const universalReceiverDelegateUP = UniversalReceiverDelegateUP.deploy({
        data: UniversalReceiverDelegateUPJSON.bytecode,
        arguments: []
    })
    const universalReceiverDelegateUPInstance = await universalReceiverDelegateUP.send({
        from: owner,
        gas: 1500000
    })
    console.log("universalReceiverDelegateUP is deployed",universalReceiverDelegateUPInstance.options.address); 

    // const UniversalReceiverDelegateUP  = new ethers.ContractFactory(UniversalReceiverDelegateUPJSON.abi, UniversalReceiverDelegateUPJSON.bytecode, signer);
    // const universalReceiverDelegateUP  = await UniversalReceiverDelegateUP.deploy();
    // await universalReceiverDelegateUP.deployTransaction.wait();
    // console.log("universalReceiverDelegateUP"," is deployed",universalReceiverDelegateUP.address); 
    // const check = await providerx.getCode(universalReceiverDelegateUP.address)
    // console.log("getcode = ", check);
    // const UniversalReceiverDelegateVault  = new ethers.ContractFactory(UniversalReceiverDelegateVaultJSON.abi, UniversalReceiverDelegateVaultJSON.bytecode, signer);
    // const universalReceiverDelegateVault  = await UniversalReceiverDelegateVault.deploy();
    // await universalReceiverDelegateVault.deployTransaction.wait();
    // console.log("universalReceiverDelegateVault"," is deployed",universalReceiverDelegateVault.address); 

    //@ts-ignore
    const UniversalProfile  = new web3.eth.Contract(UniversalProfileJSON.abi)
    const universalProfile = UniversalProfile.deploy({
        data: UniversalProfileJSON.bytecode,
        arguments: [owner,universalReceiverDelegateUPInstance.options.address]
    })
    const universalProfileInstance = await universalProfile.send({
        from: owner,
        gas: 1500000
    })
    console.log("universalProfile is deployed",universalProfileInstance.options.address); 
    // const UniversalProfile  = new ethers.ContractFactory(UniversalProfileJSON.abi, UniversalProfileJSON.bytecode, signer);
    // const universalProfile  = await UniversalProfile.deploy(owner,universalReceiverDelegateUP.address);
    // await universalProfile.deployTransaction.wait();
    // console.log("universalProfile"," is deployed",universalProfile.address); 

    // const Vault  = new ethers.ContractFactory(VaultJSON.abi, VaultJSON.bytecode, signer);
    // const vault  = await Vault.deploy(owner,universalReceiverDelegateVault.address);
    // await vault.deployTransaction.wait();
    // console.log("vault"," is deployed",vault.address); 

    //@ts-ignore
    const KeyManager  = new web3.eth.Contract(KeyManagerJSON.abi)
    const keyManager = KeyManager.deploy({
        data: KeyManagerJSON.bytecode,
        arguments: [universalProfileInstance.options.address]
    })
    const keyManagerInstance = await keyManager.send({
        from: owner,
        gas: 1500000
    })
    console.log("keyManager is deployed",keyManagerInstance.options.address); 
    // const KeyManager  = new ethers.ContractFactory(KeyManagerJSON.abi, KeyManagerJSON.bytecode, signer);
    // const keyManager  = await KeyManager.deploy(universalProfile.address);
    // await keyManager.deployTransaction.wait();
    // console.log("keyManager"," is deployed",keyManager.address); 

    // const DaoPermissions  = new ethers.ContractFactory(DaoPermissionsJSON.abi, DaoPermissionsJSON.bytecode, signer);
    // const daoPermissions  = await DaoPermissions.deploy(universalProfile.address, keyManager.address);
    // await daoPermissions.deployTransaction.wait();
    // console.log("daoPermissions"," is deployed",daoPermissions.address); 

    // const DaoDelegates  = new ethers.ContractFactory(DaoDelegatesJSON.abi, DaoDelegatesJSON.bytecode, signer);
    // const daoDelegates  = await DaoDelegates.deploy(universalProfile.address, keyManager.address);
    // await daoDelegates.deployTransaction.wait();
    // console.log("daoDelegates"," is deployed",daoDelegates.address); 

      //@ts-ignore
      const DaoProposals  = new web3.eth.Contract(DaoProposalsJSON.abi)
      const daoProposals = DaoProposals.deploy({
          data: DaoProposalsJSON.bytecode,
          arguments: [universalProfileInstance.options.address,keyManagerInstance.options.address]
      })
      const daoProposalsInstance = await daoProposals.send({
          from: owner,
          gas: 1500000
      })
      console.log("daoProposalsInstance is deployed",daoProposalsInstance.options.address); 

    // const DaoProposals  = new ethers.ContractFactory(DaoProposalsJSON.abi, DaoProposalsJSON.bytecode, signer);
    // const daoProposals  = await DaoProposals.deploy(universalProfile.address, keyManager.address);
    // await daoProposals.deployTransaction.wait();
    // console.log("daoProposals"," is deployed",daoProposals.address); 



    console.log("daos deployed");
    const universalProfile_i = new ethers.Contract(universalProfileInstance.options.address, UniversalProfileJSON.abi, signer);
    // Initialize the dao with new members.
    try {
       const result = await universalProfile_i.connect(signer).setDaoData(
            ethers.utils.hexlify(ethers.utils.toUtf8Bytes("https://somelink.com/")),
            ethers.utils.hexZeroPad(ethers.utils.hexValue(50), 32),//voting parameters
            ethers.utils.hexZeroPad(ethers.utils.hexValue(50), 32),//
            ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
            [
                owner,
                "0xD068de153Da11d1635efA93E6872E09d3a26b219",
                "0xCE49C5CD51B9a664a731bad461d2901F73B86ccb"
            ],
            [
                "0x00000000000000000000000000000000000000000000000000000000000000ff",
                "0x00000000000000000000000000000000000000000000000000000000000000ff",
                "0x00000000000000000000000000000000000000000000000000000000000000ff"
            ]
            );
            console.log("result", result);
    } catch (error) {
        console.log(error)
        
    }

    // try {
    //     await universalProfile.giveOwnerPermissionToChangeOwner();
    //     console.log("giveOwnerPermissionToChangeOwner");
    // } catch (error) {
    //     console.log(error)
    // }   

    // try {
    //     await universalProfile.setControllerPermissionsForDao(
    //     daoPermissions.address,
    //     daoDelegates.address,
    //     daoProposals.address
    //     );
    //     console.log("setControllerPermissionsForDao", daoPermissions.address);
    // } catch (error) {
    //     console.log(error)
    // } 
    // // Giving the ownership of the Universal Profile to the Key Manager.
    
    // try {
    //     await universalProfile.transferOwnership(keyManager.address); // this one does nothing and stops
    //     console.log("transferOwnership");
    // } catch (error) {
    //     console.log(error)
    // } 

    // let ABI = ["function claimOwnership()"];
    // let iface = new ethers.utils.Interface(ABI);

    // try {
    //     await keyManager.execute(iface.encodeFunctionData("claimOwnership"));
    //     console.log("execute", universalReceiverDelegateUP.address);
    // } catch (error) {
    //     console.log(error)
    // } 

    console.log("reading..........")
    const keys = [
        "0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47",
        "0xeafec4d89fa9619884b60000abe425d64acd861a49b8ddf5c0b6962110481f38"
      ];

    // try {
    //     const get_data = await universalProfile_i["getData(bytes32[])"](keys); // this one gives error
    //     console.log("this",get_data)
    // } catch (error) {
    //    console.log(error) 
    // }  
    }
    
    
export const daoReadWeb3Test = async () => {
    
    // const RPC_ENDPOINT = "https://rpc.l16.lukso.network";
    // const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
    // const PRIVATE_KEY = '0x0e9845dd4781fd697320f65a8dfc071424893b23786420576a6360463a69e436'; 
    // const myEOA = new ethers.Wallet(PRIVATE_KEY, provider);


    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const owner = await signer.getAddress();
    // const web3 = new Web3(window.ethereum);
    // const web3 = useWeb3();
    // const web3js = new Web3('https://rpc.l16.lukso.network');
    
    const ABI = ["function setData(bytes32 dataKey, bytes memory dataValue)"];
    const ERC725Yinterface = new ethers.utils.Interface(ABI);
    const payloads = [
      ERC725Yinterface.encodeFunctionData(
        "setData",
        [
          "0x4b80742de2bfb3cc0e490000" + "0x1817798BE2a0BFeB6737a1506d119baA9fCE5fd8".substring(2),
          "0x000000000000000000000000000000000000000000000000000000000000ffff"
        ]
      )
    ];

    console.log("daos deployed");
    // const universalProfile_i = new ethers.Contract("0x42E771dbc025aE18bF29FeADCf740600eC0c8B8D", UniversalProfileJSON.abi, signer);
    const daoProposals_i = new ethers.Contract("0x235E984F324e838332460b91202d06D2e950420b", DaoProposalsJSON.abi, signer);
    try {
        const create_proposal = await daoProposals_i.connect(signer).createProposal(
            "Som random title",
            "https://somerandomlink.sahs",
            ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
            payloads,
            ethers.utils.hexZeroPad(ethers.utils.hexValue(2), 32),
            ethers.utils.hexZeroPad(ethers.utils.hexValue(1), 32),
            {gasPrice: '1000000000', gasLimit: 5_000_000}
          );
          console.log("create_proposal",create_proposal)
    } catch (error) {
        console.log(error)
    }
    
    // let check = await provider.getCode("0x235E984F324e838332460b91202d06D2e950420b")
    // console.log("getcode = ", check);


//     const accounts = await web3js.eth.getAccounts()
    
    // await web3.eth.sign('message', "0x2aaddE1ff0d029f792FaBFE531F57f1C1856Ae1D");
    //@ts-ignore
    // const createProposal = new web3.eth.Contract(DaoProposalsJSON.abi,"0x235E984F324e838332460b91202d06D2e950420b", {
    //     gas: 5_000_000,
    //     gasPrice: '1000000000',
    //   });
    // console.log("create contract",createProposal)
    // const result = await createProposal.methods.createProposal(
    //     "Som random title",
    //     "https://somerandomlink.sahs",
    //     ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
    //     ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
    //     ethers.utils.hexZeroPad(ethers.utils.hexValue(60), 32),
    //     payloads,
    //     ethers.utils.hexZeroPad(ethers.utils.hexValue(2), 32),
    //     ethers.utils.hexZeroPad(ethers.utils.hexValue(1), 32)
    //     ).send({
    //         from: "0x2aaddE1ff0d029f792FaBFE531F57f1C1856Ae1D" }).on('receipt', function (receipt: any) {
    //             console.log(receipt)
    //           })
    //           .once('sending', (payload: any) => {
    //             console.log(JSON.stringify(payload, null, 2))
    //           });


   
    // const proposalSignature = (await create_proposal.wait(1)).logs[9].data.substring(0, 22);

    // console.log("proposalSignature",proposalSignature)

    }
    


    // function hex2bin(hex:string){
    //     return ((parseInt(hex, 16)).toString(2))
    // }

    // try {
    //     const get_data = await universalProfile_i["getData(bytes32[])"](keys); // this one gives error
    //     const metalink = get_data[0];
    //     const majority = get_data[1];
    //     const permission:string = get_data[6];
    //     console.log("metalink",ethers.utils.toUtf8String(ethers.utils.hexValue(metalink)))
    //     console.log("majority",ethers.BigNumber.from(majority).toNumber())
    //     console.log("permission",hex2bin(permission))
    // } catch (error) {
    //    console.log(error) 
    // }  