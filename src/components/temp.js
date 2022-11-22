import React from 'react'
import { useState, useEffect } from 'react'
import {Box, Chip} from "@mui/material/"
import pot from "../assets/coffe_pot.svg"


export default function Temp({temp}) {

  const [actualTemp, updateTemp] = useState(temp);
  
  useEffect(() => {
      updateTemp(temp)
  
  }, [temp])
  
  return (
    <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection:"column", width: "150px", textAlign: "center"}}>
        <p>Temperatura actual</p>
          <div>
            <Chip label={`${actualTemp}°C`} size='big' color='default' variant="outlined" />
          </div> 
        <img src={pot} width="100px" color="red" height="50px" ></img>
    </Box>
  )
}
