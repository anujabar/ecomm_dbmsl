import { useAuthContext } from "./useAuthContext.js";
import { useState } from "react";

export const useLogin=()=>{
    const [error,setError]=useState(null)
    const [isLoading,setIsLoading]=useState(null)
    const {dispatch}=useAuthContext()

    const login=async (email,password)=>{
        setIsLoading(true)
        setError(null)
        const response=await fetch("http://localhost:3000/api/users/login",{
            method:"POST",
            body:JSON.stringify({email:email,password:password}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const result=await response.json()
        console.log("RES:",result)
        if(!response.ok){
            setError(result.error)
            setIsLoading(false)
        }
        if(response.ok){
            localStorage.setItem("user",JSON.stringify(result))
            dispatch({type:"LOGIN",payload:result})
            setIsLoading(false)
        }
    }
    return {login,error,isLoading} 
}