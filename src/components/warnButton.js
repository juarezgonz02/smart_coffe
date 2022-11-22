import React, { useState } from 'react'
import {Card} from '@mui/material'

function WarnButton({blocked}) {
 
 const [[state, color], warnSwitch] = useState(["Calentar","Grey"])

 const switchState = () => {
        if("Calentar" == state) {   
            warnSwitch(["Calentando", "Yellow"]) 
        }
        else {
            warnSwitch(["Calentar", "Grey"])
        }     
    }

  return (
    <Card onClick={
            ()=>{
                if(!blocked){
                    switchState()
                }else{
                    warnSwitch(["Calentar", "Grey"])
                }
            }
        } 
        variant="outlined" sx={{marginTop: "25px", backgroundColor: color, width: "150px", textAlign: "center"}}>
                <h3>
                 {state}
                </h3>
 
        </Card>
  )
}

export default WarnButton