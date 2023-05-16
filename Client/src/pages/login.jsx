import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";

import { loginGoogle } from "../redux/actions/authenticationActions";
import LoginForm from "../components/loginForm";
import GoogleComponent from "../components/GoogleComponent";
import AuthError from "../components/AuthError";
import { googleDecoder } from "../utils/dataHandlers";

import "../assets/global.css"
export default function Login (){
const auth = useSelector(state=>state.auth)
const dispatch = useDispatch()
const navigate = useNavigate()

useEffect(()=>{
    if (auth.isLoggedIn) navigate("/profile")
},[auth.isLoggedIn])

const handleLogin = async (res) => {
  const userObject = await googleDecoder(res)
  if (userObject) {
    dispatch(loginGoogle(userObject));
  } else {
    alert("error");
  }
};
    return (
      <div className="column" id="login">
        <h2 className="center">Iniciar sesión</h2>
        <LoginForm/>
        <GoogleComponent handleGoogleComponent={handleLogin}/>
        <AuthError status={auth.loginError}/>
        <div className="center">
          <p>¿Aún no tienes cuenta?</p>
          <Link className="linkbtn" to="/register">Crear cuenta</Link>
        </div>
      </div>
    );
}
