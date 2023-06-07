const { BASE_URL } = require("./base_url");
const { commonRequest } = require("./commonRqst");


// register
export const empRegister = async (body,headers)=>{
    return commonRequest("POST",`${BASE_URL}/employee/register`,body,headers)
}

// getallusers api
export const getusersapi = async(searchKey)=>{
 return   await commonRequest("GET",`${BASE_URL}/employee/get-all-employee-details?search=${searchKey}`,"")
}

// viewprofile
export const viewprofile = async (id) =>{
    return await commonRequest("GET",`${BASE_URL}/employee/view-profile/${id}`,"")
}

// removeUser
export const removeUser = async (id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/employee/delete-user/${id}`,{})
}

// ediUser
export const updateUser = async (id,body,headers)=>{
    return commonRequest("PUT",`${BASE_URL}/employee/update/${id}`,body,headers)
}