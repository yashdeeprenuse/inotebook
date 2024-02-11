import React, { useContext } from 'react'
import contextforAlert from '../Context/alerts/AlertContext'

const Alert = (props) => {
  const av = useContext(contextforAlert);

  return (
 <>
{
 av.alert &&   <div id ="alertid" className={`alert alert-${av.alert.Type}`} style={{height:"60px", borderRadius:"0px"}} role="alert">
{`${(av.alert.Type ==="danger")?"Error":av.alert.Type}: ${av.alert.Message}`}
</div> 

}
  
 </>
  )
}

export default Alert
