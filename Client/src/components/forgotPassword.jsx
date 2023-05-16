import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordRequest } from "../redux/actions/authenticationActions";

import "./styles/forgotPassword.css"
export default function ForgotPassword ({id}){
const [recoveryEmail,setRecoveryEmail] = useState(null);
const [mailingState,setMailingState] = useState(null);
const auth = useSelector(state => state.auth)
const dispatch = useDispatch();

useEffect(()=>{
    setMailingState(auth.resetPasswordMailStatus)
},[auth.resetPasswordMailStatus])
const handleChange = event =>{
    event.preventDefault()
    setRecoveryEmail(event.target.value)

}
const handleSubmit = event =>{
    event.preventDefault()
    if (recoveryEmail) dispatch(resetPasswordRequest(recoveryEmail))
}

    return(
        <div id={`${id}`}>
            <div id="forgot_box">
                <label id="forgot-btn" className="btn secondary close_modal" htmlFor="forgot_checkbox">X</label>
                <div id="forgot-box-content">
                    <label className="input-label secondary">Ingrese su dirección de email:<input className="form-input secondary" type="email" name="email" onChange={handleChange}/></label>
                    <p>Le enviaremos un correo electrónico para reestablecer su contraseña</p>
                    <button type="submit" className="btn secondary" onClick={handleSubmit}>Enviar</button>
                    {
                        mailingState ? <span className="error-span">{mailingState}</span> : null
                    }
                </div>
            </div>
        </div>
    )
}