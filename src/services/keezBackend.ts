import { KEEZ_BACKEND_ENDPOINT } from "../constants/globals";

export const postDaoUp = async (jsontext : any) => {
    try {
      const response = await fetch(KEEZ_BACKEND_ENDPOINT.concat('daos/set'), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsontext),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
}

export const postProposal = async (jsontext : any) => {
    try {
      const response = await fetch(KEEZ_BACKEND_ENDPOINT.concat('proposals/set'), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsontext),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
}

export const postVote = async (jsontext : any) => {
    try {
      const response = await fetch(KEEZ_BACKEND_ENDPOINT.concat('votes/set'), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsontext),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
}

export const getVotesBySignature = async (signature: string) => {
  const url = `${KEEZ_BACKEND_ENDPOINT}votes/signature?format=json&info=${signature}`
  // console.log(url);
  try {
    const response = await fetch(url, {
      method: 'Get',
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export const getVotesByMember = async (address: string) => {
  const url = `${KEEZ_BACKEND_ENDPOINT}votes/voter?format=json&info=${address}`
  try {
    const response = await fetch(url, {
      method: 'Get',
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export const getDaoByMember = async (address: string) => {
    const url = `${KEEZ_BACKEND_ENDPOINT}daos/member?format=json&info=${address}`
    // console.log(url);
    try {
      const response = await fetch(url, {
        method: 'Get',
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
}

export const getDaoByCID = async (cid: string) => {
  const url = `${KEEZ_BACKEND_ENDPOINT}daos/cid?format=json&info=${cid}`
  // console.log(url);
  try {
    const response = await fetch(url, {
      method: 'Get',
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export const getAllDaos = async () => {
    const url = `${KEEZ_BACKEND_ENDPOINT}daos/?format=json`
    // console.log(url);
    try {
      const response = await fetch(url, {
        method: 'Get',
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
}

export const getAllProposals = async () => {
  const url = `${KEEZ_BACKEND_ENDPOINT}proposals/?format=json`
  // console.log(url);
  try {
    const response = await fetch(url, {
      method: 'Get',
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export const getProposalsByDaoCid = async (cid: string) => {
  const url = `${KEEZ_BACKEND_ENDPOINT}proposals/daocid?format=json&info=${cid}`
  try {
    const response = await fetch(url, {
      method: 'Get',
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}
