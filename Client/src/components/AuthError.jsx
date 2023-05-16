import { useEffect, useState } from "react";


export default function AuthError({status}){
    const [error,setError] = useState(null);
    useEffect(()=>{
        if (status)setError(status)
    },[status])
    if (error){
        return (
            <span className="center spread error-span">{error}</span>
        )
    }
}   