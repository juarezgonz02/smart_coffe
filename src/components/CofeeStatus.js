import {React, useState } from 'react'
import {Box} from '@mui/material'
import { styled } from '@mui/material/styles';


function CofeeStatus() {
    const [[state, color], changeState] = useState(["Café Listo", "#0cff0c"])
    const switchState = () => {

    }

    const CoffeLed = styled(Box)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#0cff0c',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.primary,
        height: "25px", 
        width: "25px",
      })); 

    const Info = styled(Box)(({ theme }) => ({
        fontSize: "2em", 
        justifyContent: "space-between", 
        fontWeight:"Bold", 
        display: "flex", 
        width: "180px",
        flexDirection: "row", 
        alignItems: "center"
    }))

  return (
    <Info>

        <CoffeLed onClick={switchState} borderRadius="2em" >
        </CoffeLed>
        
        <p>
            {state}
        </p>
    
    </Info>
  )
}

export default CofeeStatus