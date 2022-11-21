import React from 'react'
import { useState } from 'react'
import {Box, Chip} from "@mui/material/"
import pot from "../assets/coffe_pot.svg"


export default function Temp() {

  const [actualTemp, updateTemp] = useState(0);
  
  return (
    <Box sx={"margin: auto; width: 150px; text-align: center"}>
        <p>Temperatura actual</p>
          <p>
            <Chip label={`${actualTemp}°C`} size='big' color='default' variant="outlined" />
          </p> 
        <img src={pot} width="100px" color="red" height="50px" ></img>
    </Box>
  )
}
