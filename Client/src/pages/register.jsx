import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerGoogle } from "../redux/actions/authenticationActions";
import RegisterForm from "../components/registerForm";
import GoogleComponent from "../components/GoogleComponent";
import AuthError from "../components/AuthError";
import { googleDecoder } from "../utils/dataHandlers";

export default function Register() {
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isLoggedIn) navigate("/profile");
  }, [auth.isLoggedIn]);

  const handleRegister = async (res) => {
    try {
      const userObject = await googleDecoder(res);
      if (userObject) {
        dispatch(registerGoogle(userObject));
      }
    } catch (error) {
      alert(error);
    }
  };
  
  return (
    <div id="register" className="column">
      <h2 className="center">¡Bienvenido!</h2>
      <RegisterForm auth={auth} />
      <AuthError status = {auth.registerError}/>
      <GoogleComponent handleGoogleComponent={handleRegister} key='registerComponent' />
      <Link className="linkbtn" to="/login">Ya tengo cuenta</Link>
    </div>
  );
}
