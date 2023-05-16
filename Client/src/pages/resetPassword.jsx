import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ResetPasswordForm from "../components/ResetPasswordForm"
import { validatePasswordReset } from "../utils/dataHandlers"
export default function ResetPassword(){
const [ isValidated , setIsValidated ] = useState(null)
    const { id , code } = useParams()
    useEffect(()=>{
        if (id && code){
            (async function (){
                setIsValidated(await validatePasswordReset(id,code))
            })()
        }
    },[id,code])
    return(
        <div>            
            {
                isValidated ? isValidated === 'Validado' ? 
                <div>
                    <h3>Ingrese su nueva contraseña</h3>
                    <ResetPasswordForm userId={id}/>
                </div> : 
                <h1>
                    {isValidated}
                </h1> :
                <h1>Loading</h1>
            }
        </div>
    )
}
