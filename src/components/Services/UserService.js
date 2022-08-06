/**********************************************
* Description: This function get data from API 
* 
*
**********************************************/
import axios from './CustomizeAxios';

const fetchAllUser = (page)=>{
    //Call API for data
    return axios.get(`/api/users?page=${page}`);
}

const postCreateUser =(name,job)=>{
    return axios.post("/api/users",{name,job});
}

const putupdateUser=(name,job)=>{
    return axios.put("/api/users/1",{name,job});
}

const deleteUser=(id)=>{
    return axios.delete(`/api/users/${id}`);
}

const loginApi =(email,password)=>{
    return axios.post("/api/login",{email,password});
}
export {fetchAllUser, postCreateUser, putupdateUser, deleteUser,loginApi};