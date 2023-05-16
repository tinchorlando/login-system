import { useState } from "react";
import Form from "./Form";
import FormInput from "./FormInput";
import { useDispatch } from "react-redux";
import { resetPasswordChange } from "../redux/actions/authenticationActions";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordForm({userId}){
    const [ formData , setFormData] = useState(null)
    const [ formErrors , setFormErrors] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    return(
        <Form origin='forgot-password' handleSubmit={handleSubmit} submitText='Cambiar'>
            <FormInput origin='forgot-password' error={formErrors && formErrors.password ? 'input-error' : null} required={true} type='password' text='Contraseña:' handleChange={handleChange} />
            <FormInput origin='forgot-password' error={formErrors && formErrors.password ? 'input-error' : null} required={true} type='password' text='Repita su contraseña:' name='repeatedPassword' handleChange={handleChange} />
            {formErrors && formErrors.password ? <span>{formErrors.password}</span> : null}
        </Form>
    )
    function passwordValidation(data){
        let errors = {}
        if (data.password && data.repeatedPassword && data.password !== data.repeatedPassword){
            errors.password= "Las contraseñas deben coincidir"
        }
        return errors
    }
    function handleChange (event){
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
        setFormErrors(
            passwordValidation({
                ...formData,
                [event.target.name]: event.target.value
            })
        )
    }
    function handleSubmit (event){
        event.preventDefault();
        try{
            if (formData && !Object.keys(formErrors).length) dispatch(resetPasswordChange(userId,formData.password))
            navigate('/login')
        } catch(error){
            alert(error)
        }
    }
}