import { useState , useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changePassword } from "../redux/actions/authenticationActions"
import Form from "./Form.jsx";
import FormInput from "./FormInput.jsx";
import AuthError from "./AuthError.jsx";
import "./styles/passwordChange.css"
export default function PasswordChange (){
    const [passwordForm,setPasswordForm] = useState(null)
    const [formError,setFormError]=useState({})
    const [success,setSuccess] = useState(null)
    const auth = useSelector(state=>state.auth)

    const dispatch = useDispatch()

    useEffect(() => {
      if (auth.error) setSuccess(auth.error);
      else setSuccess(null);
      if (auth.modified) setSuccess("Contraseña cambiada");
    }, [auth.error, auth.modified]);
    return (
      <div className="center">
        <label id="change-label" className="btn" htmlFor="change-password">
          {/* <button id="change-button" className="btn main-submit"> */}
            Change password
          {/* </button> */}
        </label>
        <input type="checkbox" id="change-password" />
        <div id="repassword-form">
          <Form
            handleSubmit={handleSubmit}
            submitText={"Cambiar contraseña"}
            origin={"change-password"}
          >
            <FormInput
              origin={"change"}
              handleChange={handleChange}
              required={true}
              type="password"
              name="oldPassword"
              text="Contraseña anterior:"
            />
            <FormInput
              origin={"change"}
              text="Contraseña nueva:"
              handleChange={handleChange}
              required={true}
              type="password"
              name="newPassword"
            />
            <div>
              <FormInput
                origin={"change"}
                text="Repita la nueva contraseña:"
                handleChange={handleChange}
                required={true}
                type="password"
                name="repeatedPassword"
                error={
                  formError && formError.newPassword ? "input-error" : null
                }
              />
              {formError && formError.newPassword ? (
                <span className="error-span">{formError.newPassword}</span>
              ) : null}
            </div>
            <AuthError status={auth.changePasswordError} />
          </Form>
        </div>
      </div>
    );
      function passwordValidation (data){
        let errors = {};
        if (data.newPassword && data.repeatedPassword) {
          if (data.newPassword !== data.repeatedPassword) {
            errors.newPassword = "Las contraseñas deben coincidir";
          }
        }
        return errors;
      };
      function handleChange (event){
        setPasswordForm({
          ...passwordForm,
          [event.target.name]: event.target.value,
        });
        setFormError(
          passwordValidation({
            ...passwordForm,
            [event.target.name]: event.target.value,
          })
        );
      };
      function handleSubmit (event){
        event.preventDefault();
        if (!Object.keys(formError).length && passwordForm) {
          dispatch(
            changePassword(
              auth.user.id,
              passwordForm.oldPassword,
              passwordForm.newPassword
            )
          );
        }
      };
}