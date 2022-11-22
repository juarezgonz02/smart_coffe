import React, { useEffect, useState } from 'react'
import {Box, Card} from '@mui/material'
import WarnButton from './warnButton'

function Controllers({getLastData, controlState, action}) {
    
    const controllerTopic = "Juarez00/feeds/makerControllers"
    const [{state, color, blocked}, turnOnOff] = useState(getLastData())

     useEffect(()=>{
            turnOnOff(getLastData());
        
     }, [controlState])

    

    /**
     * Esto funciona correctamente
     */
    const switchState =  () => {

        if("OFF" == state) {   
            action(controllerTopic, "ON")
            turnOnOff({state: "ON", color: "#0cff0c", blocked: true}) 
        }
        else {
            action(controllerTopic, "OFF")
            turnOnOff({state: "OFF", color: "#ff0202",  blocked: false})
        }
        
             
    }
  return (
    <Box sx={{ display: "flex", flexDirection:"column", alignItems: "center" }}>
        <Card onClick={switchState} variant="outlined" sx={{backgroundColor: color, width: "150px", textAlign: "center"}}>

               <h3>
                 {state}
                </h3>
 
        </Card>
        <WarnButton blocked={blocked}/>
    </Box>     
    )
}

export default Controllers