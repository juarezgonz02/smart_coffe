import {React, useState, useEffect } from 'react'
import {Box} from '@mui/material'
import { styled } from '@mui/material/styles';


function CofeeStatus({makerState}) {
    const [[state, color], changeState] = useState(["Desconectada", "#cc1212"])
    
    useEffect(() => {
      switch(makerState){
        case "Connected":
          changeState(["Conectada", "#32a852"])
          break
        
        case "Disconected":
          changeState(["Desconectada", "#cc1212"])
          break;
        
        case "Ready":
          changeState(["Café Listo", "#53e053"])
          break;

        case "Warming":
          changeState(["Calentado... ", "#d3d61c"])
          break;
      }
    
    }, [makerState])
    

    const switchState = () => {

    }

    const CoffeLed = styled(Box)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : color,
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.primary,
        height: "25px", 
        minWidth: "25px",
        width: "25px",
        marginRight: "0.5em"
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