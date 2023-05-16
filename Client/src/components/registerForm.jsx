import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { registerLocal } from "../redux/actions/authenticationActions";
import Form from "./Form";
import FormInput from "./FormInput";

export default function RegisterForm({auth}){
    const [registerForm,setRegisterForm] = useState(null);
    const [registerError,setRegisterError] = useState(null);
    const [submitError,setSubmitError] = useState(null)
    
    useEffect(()=>{
        if (auth.error) setSubmitError(auth.error)
        else setSubmitError(null)
    },[auth.error])

    const dispatch = useDispatch();


    return(
        <div id='register-form'>
            <Form origin='register' handleSubmit={handleSubmit} submitText={'Registrarse'}>
                <FormInput origin='register' type={'email'} text='Email:' required={true} handleChange={handleChange} error={registerError && registerError.email ? 'input-error':null}/>
                <FormInput origin='register' type={'password'} text='Contraseña:' required={true} handleChange={handleChange} error={registerError && registerError.password ? 'input-error':null}/>
                <FormInput origin='register' type={'password'} text='Repita su contraseña:' name={'repeatedPassword'} required={true} handleChange={handleChange} error={registerError && registerError.password ? 'input-error':null}/>
                {registerError ? <span className="error-span">{registerError.password}</span>: null}
            </Form>
        </div>

    )
    
    function passwordValidation (data){
        let errors = {}
        if (data.password && data.repeatedPassword && data.password !== data.repeatedPassword){
            errors.password= "Las contraseñas deben coincidir"
        }
    return errors
    }
    function handleChange (event){
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value
        })
        setRegisterError(
            passwordValidation({
                ...registerForm,
                [event.target.name]: event.target.value
            })
        )
    }
    function handleSubmit (event){
    event.preventDefault();
        if (registerForm) dispatch(registerLocal(registerForm))
    }
}