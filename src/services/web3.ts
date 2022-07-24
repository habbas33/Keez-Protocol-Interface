import Web3 from 'web3';

export const getAccountBalance = async (web3: Web3, account: string) => {
  return parseFloat(web3.utils.fromWei(await web3.eth.getBalance(account)));
};


export const requestAccount = async (web3: Web3) => {
  const accountsRequest: string[] = await web3.eth.requestAccounts();
  console.log(accountsRequest);
  return accountsRequest[0];
};