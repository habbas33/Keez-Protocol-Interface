export const getParsedJsonObj = (obj:any) => {
    let keyPermissionObject = obj;
    keyPermissionObject =  keyPermissionObject.replace(/True/gm, "'True'")
    keyPermissionObject =  keyPermissionObject.replace(/False/gm, "'False'")
    const chars = {"'":'"','"':"'"};
    //@ts-ignore
    keyPermissionObject = keyPermissionObject.replace(/['"]/g, m => chars[m]);
    keyPermissionObject = JSON.parse(keyPermissionObject)
    return keyPermissionObject
  };