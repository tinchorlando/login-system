import { CHANGE_PASSWORD, CHANGE_PASSWORD_ERROR, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT, REGISTER, REGISTER_FAIL, RESET_CODE_VALIDATION, RESET_EMAIL_STATUS, RESET_PASSWORD, RESET_PASSWORD_ERROR } from "./actionTypes.js";
import { getData , postData , modifyData , API_ENDPOINTS, WITH_CREDENTIALS, setLocalStorage, removeLocalStorage } from "../../utils/dataHandlers.js";

export const loginGoogle = (info) => async dispatch =>{
  try{
    const {data} = await postData(API_ENDPOINTS.LOGIN_GOOGLE,!WITH_CREDENTIALS,info)
    if (data.token) if (data.token) setLocalStorage("user",data)
    return dispatch({
      type: LOGIN_SUCCESS,
      payload: {data}
    })
  } catch (error){
    return dispatch({
      type: LOGIN_ERROR,
      payload: error.response.data.msg
    })
  }
}
export const loginFunction = (info) => async (dispatch) => {
  try {
    const {data} = await postData(API_ENDPOINTS.LOGIN,WITH_CREDENTIALS,info)
    if (data.token) setLocalStorage("user",data)
    return dispatch({
      type: LOGIN_SUCCESS,
      payload: { data },
    });
  } catch (error) {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error.response.data.msg
        })
    }    
};

export const logoutFunction = () => async (dispatch) => {
  try {
    await postData(API_ENDPOINTS.LOGOUT,WITH_CREDENTIALS)
    removeLocalStorage("user")
    return dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};

export const registerGoogle = info => async dispatch =>{
  try{
    const {data} = await postData(API_ENDPOINTS.REGISTER_GOOGLE,WITH_CREDENTIALS,info)
    if (data.token) setLocalStorage("user",data)
    return dispatch({
      type:REGISTER,
      payload: data
    })
  } catch (error){
    return dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.msg
    })
  }
}
export const registerLocal = (info) => async (dispatch) => {
  try {
    const { data } = await postData(API_ENDPOINTS.REGISTER,WITH_CREDENTIALS,info)
    if (data.token) setLocalStorage("user",data)
    return  dispatch ({
        type: REGISTER,
        payload: data
    })
  } catch (error) {
    return dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.msg
    })
  }
};


export const resetPasswordRequest = email=> async dispatch =>{
  try{
    const requestURL = API_ENDPOINTS.RESET_PASSWORD_REQUEST + email;
    const emailSent = await getData(requestURL)
    return dispatch({
      type: RESET_EMAIL_STATUS,
      payload: emailSent.msg
    })
  } catch (error){
    return dispatch({
      type: RESET_EMAIL_STATUS,
      payload: error.response.data.msg
    })
  }
}

export const resetPasswordCheckStatus = (id,code)=> async dispatch =>{
  try{
    const requestURL = `${API_ENDPOINTS.RESET_PASSWORD_VALIDATION}${id}/${code}`
    const checkStatus = await getData(requestURL)
    return dispatch({
      type: RESET_CODE_VALIDATION,
      payload: checkStatus.data.msg
    })
  } catch (error){
    return dispatch({
      type: RESET_CODE_VALIDATION,
      payload: error.response.data.msg
    })
  }
}

export const resetPasswordChange = (userId,newPassword)=>async dispatch =>{
  try{
    const data = {userId,newPassword};
    const changePassword = await modifyData(API_ENDPOINTS.RESET_PASSWORD_CHANGE,!WITH_CREDENTIALS,data)
    if (changePassword) return dispatch({
      type: RESET_PASSWORD,      
    })
  } catch (error){
    return dispatch({
      type: RESET_PASSWORD_ERROR,
      payload: error.response.data.msg
    })
  }
}


export const changePassword = ( id , oldPassword , newPassword ) => async dispatch=>{
  try{
    const data = {oldPassword,newPassword}
    const requestURL = API_ENDPOINTS.CHANGE_PASSWORD + id
    const change = await modifyData(requestURL,WITH_CREDENTIALS,data)
    if (change) return dispatch ({
      type: CHANGE_PASSWORD
    })
  } catch (error){
    return dispatch({
      type: CHANGE_PASSWORD_ERROR,
      payload: error.response.data.msg
    })
  }
}