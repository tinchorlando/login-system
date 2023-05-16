import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function GoogleComponent ({handleGoogleComponent}){
    return(
        <div className="google-component">
            <GoogleLogin 
                size= "large"
                shape= "pill"
                logo_alignment= "right"
                onSuccess= {handleGoogleComponent}
                locale= "es"
                text= "Login"
                onError={()=>{
                    alert("Error")
                }}
            />
        </div>
    )
}