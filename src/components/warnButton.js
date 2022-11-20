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
        variant="outlined" sx={`margin-top: 25px; background-color: ${color}; width: 150px; text-align: center`}>
                <h3>
                 {state}
                </h3>
 
        </Card>
  )
}

export default WarnButton