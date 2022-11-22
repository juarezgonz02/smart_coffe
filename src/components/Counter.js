import React, { useEffect } from 'react'
import { useState } from 'react'
import {Box, Chip} from "@mui/material/"
import cup from "../assets/coffe_cup.svg"


export default function Counter({count}) {

  const [counter, updateCounter] = useState(0)

  useEffect(() => { 
      updateCounter(count)
   }, [count])
  return (
    <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection:"column", width: "150px", textAlign: "center"}}>
        <p>Hoy</p>
        <div>
            <Chip label={`${counter}`} size='big' color='default' variant="outlined" />
          </div> 
        <img src={cup} width="100px" color="red" height="50px" ></img>
    </Box>
  )
}
