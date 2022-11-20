import React, { useState } from 'react'
import {Box, Card} from '@mui/material'
import WarnButton from './warnButton'

function Controllers() {
    const [{state, color, blocked}, turnOnOff] = useState({state: "OFF", color: "Red", blocked: false})
    const switchState = () => {
        if("OFF" == state) {   
            turnOnOff({state: "ON", color: "#0cff0c", blocked: true}) 
        }
        else {
            turnOnOff({state: "OFF", color: "#ff0202",  blocked: false})
        }
             
}
  return (
    <Box>
        <Card onClick={switchState} variant="outlined" sx={`background-color: ${color}; width: 150px; text-align: center`}>

               <h3>
                 {state}
                </h3>
 
        </Card>
        <WarnButton blocked={blocked}/>
    </Box>     
    )
}

export default Controllers