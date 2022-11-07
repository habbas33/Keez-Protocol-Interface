export const getParsedJsonObj = (obj:any) => {
    if (obj){
      let keyPermissionObject = obj;
      keyPermissionObject =  keyPermissionObject.replace(/True/gm, "'True'")
      keyPermissionObject =  keyPermissionObject.replace(/False/gm, "'False'")
      const chars = {"'":'"','"':"'"};
      //@ts-ignore
      keyPermissionObject = keyPermissionObject.replace(/['"]/g, m => chars[m]);
      keyPermissionObject = JSON.parse(keyPermissionObject)
      return keyPermissionObject
    }
  };

export const getParsedJsonObj2 = (obj:any) => {
  if (obj){
    let keyPermissionObject = obj;
    keyPermissionObject =  keyPermissionObject.replace(/True/gm, "'True'")
    keyPermissionObject =  keyPermissionObject.replace(/False/gm, "'False'")
    keyPermissionObject =  keyPermissionObject.replace(/true/gm, 'True')
    keyPermissionObject =  keyPermissionObject.replace(/false/gm, 'False')
    const chars = {"'":'"','"':"'"};
    //@ts-ignore
    keyPermissionObject = keyPermissionObject.replace(/['"]/g, m => chars[m]);
    // keyPermissionObject = JSON.parse(keyPermissionObject)
    return keyPermissionObject
  }
};