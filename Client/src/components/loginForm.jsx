import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { loginFunction } from "../redux/actions/authenticationActions"

import "./styles/loginForm.css"
import Form from "./Form"
import FormInput from "./FormInput"
import ForgotPassword from "./forgotPassword"

export default function LoginForm(){
    const [formData,setFormData] = useState(null)
    const dispatch = useDispatch();
    return (
      <div id="login-form">
        <Form
          origin="login"
          handleSubmit={handleSubmit}
          submitText={"Iniciar Sesión"}
        >
          <FormInput
            origin="login"
            type="email"
            text="Email:"
            required={true}
            handleChange={handleChange}
          />
          <div>
            <FormInput
              origin="login"
              type="password"
              text="Contraseña:"
              required={true}
              handleChange={handleChange}
            //   error={submitError ? submitError : null}
            />
            <div className="center forgot-label">
              <label id="forgot_label" htmlFor="forgot_checkbox">
                Olvide mi contraseña
              </label>
              <input type="checkbox" id="forgot_checkbox" />
              <ForgotPassword id="forgot_modal" />
            </div>
          </div>
        </Form>
      </div>
    );
    function handleChange(event){
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })

    }

    function handleSubmit (event){
        event.preventDefault();
        if (formData) dispatch(loginFunction(formData))
    }

}
