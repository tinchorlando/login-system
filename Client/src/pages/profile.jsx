import {useDispatch, useSelector} from "react-redux";
import { logoutFunction } from "../redux/actions/authenticationActions";
import PasswordChange from "../components/passwordChange";

export default function Profile(){
    const dispatch = useDispatch()
    const logout = ()=>{
        dispatch(logoutFunction())
    }
    const auth = useSelector(state=>state.auth);
    return(<div className="center">
        <h2>Profile</h2>
        <div>            
                {
                    auth && auth.user ? (<section>
                        <p>{auth.user.email}</p>
                        <p>{auth.user.admin}</p>
                    </section>) : (<h1>loading</h1>)
                }
        </div>
        <PasswordChange/>        
        <button className="btn main-submit" onClick={logout}>Logout</button>
    </div>)
}