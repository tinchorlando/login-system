import axios from "axios";
import jwt_decode from "jwt-decode";
const API_URL = import.meta.env.VITE_APP_API_URL
export const API_ENDPOINTS = {
  LOGIN: '/user/login',
  LOGIN_GOOGLE: '/user/login/google',
  LOGOUT: '/user/logout',
  REGISTER: '/user/register',
  REGISTER_GOOGLE:'/user/register/google',
  RESET_PASSWORD_REQUEST: '/user/reset_password/request/',
  RESET_PASSWORD_VALIDATION: '/user/reset_password/validate/',
  RESET_PASSWORD_CHANGE: '/user/reset_password/change',
  CHANGE_PASSWORD: '/user/changePassword/'
}

export async function getData (url){
    const { data } = await axios.get(url);
    return data
}
export async function getDataWithCredentials (url, credentials){
    const data = await axios.get(url,{
        headers: {
            Accept: "appliucation/json",
            "Content-Type": "application/json",
          },
          withCredentials: credentials,
    })
    return data
}
export async function postData (url,credentials = false,info = null){
    if (info) {
      var data = await axios.post(url, JSON.stringify(info), {
        headers: {
          Accept: "appliucation/json",
          "Content-Type": "application/json",
        },
        withCredentials: credentials,
      });
    } else {
      var data = await axios.post(url, {
        headers: {
          Accept: "appliucation/json",
          "Content-Type": "application/json",
        },
        withCredentials: credentials,
      });
    }    
    return data 
}
export async function modifyData (url,credentials = false,info){
    const { data } = await axios.put(url,JSON.stringify(info),{
        headers: {
            Accept: "appliucation/json",
            "Content-Type":"application/json",        
        }, withCredentials: credentials
    })
    return data;
}
export function setLocalStorage (name,data){
    localStorage.setItem(name,JSON.stringify(data))
}
export function removeLocalStorage(name){
    localStorage.removeItem(name)
}
export async function validatePasswordReset(id, code) {
  try {
    const  data  = await getData(`${API_URL}${API_ENDPOINTS.RESET_PASSWORD_VALIDATION}${id}/${code}`);
    return data.msg;
  } catch (error) {
    return error.response.data.msg;
  }
}
export async function googleDecoder (res){
  const userObject = await jwt_decode(res.credential);
  return userObject
}
export const WITH_CREDENTIALS = true

