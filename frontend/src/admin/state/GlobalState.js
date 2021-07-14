import React, {  useState } from 'react'
import { GlobalContextProvider } from "./GlobalContext";

 function GlobalState(props) {
    const [userName,setUserName] =useState("")
    const [isLoggedIn,setIsLoggedIn] =useState(false)
    const [Token,setToken] = useState('')
    const [id,setId]=useState('')
    const getGlobalState=(key)=> {
        var returnvalue 
        switch (key) {
            case "id":
                returnvalue=id
                break;
            case "userName":
                returnvalue=userName
                break;
            case "isLoggedIn":
                returnvalue=isLoggedIn  
                break;  
            case "token":
                returnvalue=Token  

                break;     
            default:
                break;
        }
        return returnvalue
    }
    const setGlobalState=(key,value)=> {
        switch (key) {
            case 'id':
                setId(value)
                break;
            case "userName":
                setUserName(value)
                break;
            case "isLoggedIn":
                setIsLoggedIn(value)
                break;  
            case "token":
                setToken(value)
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
        }else{
            return false
        }
    }
   
        return (
            <GlobalContextProvider value={action}>
             {props.children}
            </GlobalContextProvider>)
        
    
}

export default GlobalState
