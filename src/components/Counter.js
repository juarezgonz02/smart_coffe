import React, { useEffect } from 'react'
import { useState } from 'react'
import {Box, Chip} from "@mui/material/"
import cup from "../assets/coffe_cup.svg"
import tank from "../assets/coffe_tank.png"

export default function Counter({label, icon, count}) {


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
        { 
          (()=>{

            if(icon == "tank"){
              return <img src={tank} width="auto" color="red" height="50px" ></img>
                
            }
            else{
                return <img src={cup} width="100px" color="red" height="50px" ></img>
            
            }
            })()
        }
    </Box>
  )
}
