import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER,
  REGISTER_FAIL,
  RESET_CODE_VALIDATION,
  RESET_EMAIL_STATUS,
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR,
} from "../../actions/actionTypes.js";
const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? {
      isLoggedIn: true,
      user,
      loginError: false,
      registerError: false,
      changePasswordError: false,
      modified: false,
      resetPasswordMailStatus: '',
      resetPasswordTokenStatus: '',
    } : 
    {
      isLoggedIn: false,
      user: null,
      loginError: false,
      registerError: false,
      changePasswordError: false,
      modified: false,
      resetPasswordMailStatus: '',
      resetPasswordTokenStatus: '',
    }

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.data,
        loginError: false,
        registerError: false,
        changePasswordError: false,
        modified: null,
        resetPasswordMailStatus: '',
        resetPasswordTokenStatus: '', 
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        loginError: false,
        registerError: false,
        changePasswordError: false,
        modified: null,        
      };
    case REGISTER_FAIL:
      return{
        ...state,
        user: null,
        isLoggedIn: false,
        registerError: payload,
        modified: null
      }
    case REGISTER:
      return {
        ...state,
        user: payload,
        isLoggedIn: true,
        loginError: false,
        registerError: false,
        changePasswordError: false,
        modified: null
      };
    case CHANGE_PASSWORD_ERROR:
      return{
        ...state,
        changePasswordError: payload,
        modified: null
      };
    case CHANGE_PASSWORD:
      return{
        ...state,
        loginError: false,
        registerError: false,
        changePasswordError: false,
        modified: true
      };
    case RESET_EMAIL_STATUS:
      return{
        ...state,
        resetPasswordMailStatus: payload,
        resetPasswordTokenStatus: '',         
      }
    case RESET_CODE_VALIDATION:
      return{
        ...state,
        resetPasswordMailStatus: '',
        resetPasswordTokenStatus: payload, 
      }
    case RESET_PASSWORD_ERROR:
      return{
        ...state,
        resetPasswordMailStatus: '',
        resetPasswordTokenStatus: '', 
        error: payload
      }
    case RESET_PASSWORD:
    default:
      return {
        ...state,
      resetPasswordMailStatus: '',
      resetPasswordTokenStatus: '', 
      };
  }
}
