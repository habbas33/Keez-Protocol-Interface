import { WEB3_STORAGE_CLIENT } from "../constants/globals";

const apiToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEM0QTg2YkQyMDEzQzU2OEJiMmE4RTllODNFN0U0NzQzMTU1MTQwM2YiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjAyMTg0MDUwMjYsIm5hbWUiOiJrZWV6In0.yNXLjFZWFFATHbiNoQiYLEjxbN_gx8-qxr78tRiqH2I"
const token = process.env.WEB3STORAGE_TOKEN

export const makeFileObjects = (jsontext : string) => {
    const obj = jsontext;
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
  
    const files = 
      new File([blob], 'dao.json')
    
    return files
  }

export const postJsonToIPFS = async (jsontext : any) => {
    console.log(token)
    try {
      const response = await fetch(WEB3_STORAGE_CLIENT, {
        method: 'POST',
        headers: {
          'Authorization': apiToken,
        },
        body: makeFileObjects(jsontext),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }

  }

export const postImageToIPFS = async (imageFile:File) => {
    try {
      const response = await fetch(WEB3_STORAGE_CLIENT, {
        method: 'POST',
        headers: {
          'Authorization': apiToken,
        },
        body: imageFile,
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
  }

  
