import React, {  useState } from 'react'
import { GlobalContextProvider } from "./GlobalContext";

 function GlobalState(props) {
    const [userName,setUserName] =useState("")
    const [isLoggedIn,setIsLoggedIn] =useState(false)
    const [Token,setToken] = useState('')
    const [Operation,setOperation] = useState({})
    const getGlobalState=(key)=> {
        var returnvalue 
        switch (key) {
            case "userName":
                returnvalue=userName
                break;
            case "isLoggedIn":
                returnvalue=isLoggedIn  
                break;  
            case "token":
                returnvalue=Token  
                break;
            case "operation":
                returnvalue=Operation
                break;          
            default:
                break;
        }
        return returnvalue
    }
    const setGlobalState=(key,value)=> {
        switch (key) {
            case "userName":
                setUserName(value)
                break;
            case "isLoggedIn":
                setIsLoggedIn(value)
                break;  
            case "token":
                setToken(value)
                break;   
            case "operation":
                setOperation(value)
                break;  
            default:
                break;
        }
    }
    const action=(key,value)=>{
        if (key==="get") {
           return getGlobalState(value.key)
        }
        if(key==="set") {
            setGlobalState(value.key,value.value)
        }
    }
   
        return (
            <GlobalContextProvider value={action}>
             {props.children}
            </GlobalContextProvider>)
        
    
}

export default GlobalState
