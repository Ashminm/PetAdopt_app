import { BASE_URL } from "./baseUel";
import { commonApi } from "./commnApi";


export const registerApi=async(data)=>{
    return await commonApi("POST",`${BASE_URL}/user/register`,data,"")
}

export const loginApi=async(data)=>{
    return await commonApi("POST",`${BASE_URL}/user/login`,data,"")
}

export const addPetApi=async(data,headers)=>{
    return await commonApi("POST",`${BASE_URL}/pet/addpet`,data,headers)
}


export const userPets=async(header)=>{
    return await commonApi("GET",`${BASE_URL}/user/petlist`,"",header)
}

export const getAllPetss=async(headers,search)=>{
    return await commonApi("GET",`${BASE_URL}/pet/pets?search=${search}`,"",headers)
}

export const getHistory=async(headers)=>{
    return await commonApi("GET",`${BASE_URL}/pet/history`,"",headers)
}


export const profileUpdateApi=async(headers,data,id)=>{
    return await commonApi("PUT",`${BASE_URL}/user/updateprofile/${id}`,data,headers)
}

export const profileUpdateAdminApi=async(headers,data,id)=>{
    return await commonApi("PUT",`${BASE_URL}/admin/updateprofileAdmin/${id}`,data,headers)
}

export const deletePetApi=async(headers,id)=>{
    return await commonApi("DELETE",`${BASE_URL}/pet/deletepet/${id}`,{},headers)
}

export const editPetApi=async(headers,body,id)=>{
    return await commonApi("PUT",`${BASE_URL}/pet/editpet/${id}`,body,headers)
}






// export const addCatagory=async(data)=>{
//     return await commonApi("POST",`${BASE_URL}/pet/addcatagories`,data,"")
// }


