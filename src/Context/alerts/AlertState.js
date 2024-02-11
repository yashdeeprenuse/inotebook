import contextforAlert from "./AlertContext";
import { useState } from "react";

const AlertState = (props)=>{

    const[alert, setalert]=useState(null)


    let alertfunc = (message, type)=>{
    setalert({
      Message: message,
      Type: type
    })
    
     setTimeout(() => {
      setalert(null)
     }, 1000);
    
    }
    

return(
    <contextforAlert.Provider value={{alert, alertfunc}}>
{props.children}
    </contextforAlert.Provider>
)
}


export default AlertState;
