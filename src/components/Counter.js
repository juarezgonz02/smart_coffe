import React from 'react'
import { useState } from 'react'
import {Box, Chip} from "@mui/material/"
import cup from "../assets/coffe_cup.svg"


export default function Counter() {

  const [counter, updateCounter] = useState(0);
  
  return (
    <Box variant="outlined" sx={"height: 150px; width: 150px; text-align: center"}>
        <p>Hoy</p>
        <p>
            <Chip label={`${counter}`} size='big' color='default' variant="outlined" />
          </p> 
        <img src={cup} width="100px" color="red" height="50px" ></img>
    </Box>
  )
}
