"use client"
import { useReducer,createContext,useEffect } from "react";

export const AuthContext=createContext()

export const authReducer=(state,action)=>{
    switch (action.type){
        case "LOGIN":
            return {user:action.payload}
        case "LOGOUT":
            return {user:null}
        default:
            return state
    }
}

const AuthContextProvider=({children})=>{
    const [state,dispatch]=useReducer(authReducer,{user:null})

    console.log("Auth State",state)

    useEffect(()=>{
        const user=localStorage.getItem("user")
        if(user){
            dispatch({type:"LOGIN",payload:JSON.parse(user)})
        }
    },[])

    return (<AuthContext.Provider value={{...state,dispatch}}>
                {children}
            </AuthContext.Provider>)
}

export default AuthContextProvider