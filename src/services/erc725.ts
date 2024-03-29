import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import erc725schema from '@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';

import Web3 from 'web3';
import { RPC_URL, IPFS_GATEWAY } from '../constants/globals';

export const fetchErc725Data = async (erc725ContractAddress: string) => {
  const SAMPLE_PROFILE_ADDRESS = '0x5ccaE84718869e08F6C64E74e52a7B70D48044B0';
  // Part of LSP3-UniversalProfile Schema
  // https://github.com/lukso-network/LIPs/blob/master/LSPs/LSP-3-UniversalProfile.md
  // const schema1: ERC725JSONSchema[] = erc725schema;
  const schema: ERC725JSONSchema[] = [
    {
      "name": "SupportedStandards:LSP3UniversalProfile",
      "key": "0xeafec4d89fa9619884b60000abe425d64acd861a49b8ddf5c0b6962110481f38",
      "keyType": "Mapping",
      "valueType": "bytes4",
      "valueContent": "0xabe425d6"
    },
    {
      "name": "LSP3Profile",
      "key": "0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5",
      "keyType": "Singleton",
      "valueType": "bytes",
      "valueContent": "JSONURL"
    },
    {
      "name": "LSP12IssuedAssets[]",
      "key": "0x7c8c3416d6cda87cd42c71ea1843df28ac4850354f988d55ee2eaa47b6dc05cd",
      "keyType": "Array",
      "valueType": "address",
      "valueContent": "Address"
    },
    {
      "name": "LSP12IssuedAssetsMap:<address>",
      "key": "0x74ac2555c10b9349e78f0000<address>",
      "keyType": "Mapping",
      "valueType": "(bytes4,bytes8)",
      "valueContent": "(Bytes4,Number)"
    },
    {
      "name": "LSP5ReceivedAssetsMap:<address>",
      "key": "0x812c4334633eb816c80d0000<address>",
      "keyType": "Mapping",
      "valueType": "(bytes4,bytes8)",
      "valueContent": "(Bytes4,Number)"
    },
    {
      "name": "LSP5ReceivedAssets[]",
      "key": "0x6460ee3c0aac563ccbf76d6e1d07bada78e3a9514e6382b736ed3f478ab7b90b",
      "keyType": "Array",
      "valueType": "address",
      "valueContent": "Address"
    },
    {
      "name": "LSP1UniversalReceiverDelegate",
      "key": "0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47",
      "keyType": "Singleton",
      "valueType": "address",
      "valueContent": "Address"
    }
  ];
  

  const provider = new Web3.providers.HttpProvider(RPC_URL);
  const config = {
    ipfsGateway: IPFS_GATEWAY,
  };

  const erc725 = new ERC725(schema, erc725ContractAddress, provider, config);

  const data = await erc725.fetchData('LSP3Profile');

  return data;
};
