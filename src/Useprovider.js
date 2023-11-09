import React ,{useEffect, useState} from "react";
import Mycontext from "./Context";
import axios from "axios";
import { verifylogin } from "./Components/utlis/Apis";

const UserProvider = ({children})=>{
    const[item,setitem]=useState([]);
    const[userdata,setuser]=useState({});
    
    useEffect( () => {
        
        const usertoken = {
            token: window.localStorage.getItem("admintoken")
       
        }
        if(!usertoken.token){
             usertoken.token=window.localStorage.getItem("usertoken")
        }
           console.log(usertoken)
           axios.post(verifylogin, usertoken)
            .then((res) => {
                const { data } = res
                setuser(data)
                console.log(data)
        })

            .catch((error) => {

                console.log(error)
            })
            
    }

, [])


    return(
    <Mycontext.Provider value={{item,setitem,userdata}}>{children}</Mycontext.Provider>
    )
}
export default UserProvider;