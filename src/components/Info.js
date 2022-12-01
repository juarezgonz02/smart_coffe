import React from 'react'
import CofeeStatus from "./CofeeStatus"
import { Chip, Box } from '@mui/material'
import { styled } from '@mui/material/styles';

function Info({makerState, lastConection, serverState, lastData}) {

    const InfoHeader = styled(Box)(({ theme }) => ({
        display: "flex", 
        [theme.breakpoints.down('md')]: {
            flexWrap: "wrap"
          },
          [theme.breakpoints.up('md')]: {
            flexWrap: "wrap"      
          },
          [theme.breakpoints.up('lg')]: {
            flexWrap: "nowrap"      

          },
        flexDirection: "row", 
        justifyContent: "space-between"
    }))

    return (
        <InfoHeader>
            
            <Box style={{flexGrow: "1", maxWidth: "230px", marginLeft: "1em", display: "flex", flexDirection: "column", justifyContent: "end", alignItems: "baseline" }}>
                <h3 style={{width: "150px"}}>
                    Estado conexión a la cafetera:
                </h3>
                <Chip label={makerState} style={{
                    width: "100%"
                }} size='big' color='success' variant="outlined" />
            </Box>

            <Box style={{flexGrow: "1", maxWidth: "230px", marginLeft: "1em", display: "flex", flexDirection: "column", justifyContent: "end", alignItems: "baseline" }}>
                <h3 style={{width: "120px"}}>
                    Ultima conexión
                </h3>
                <Chip label={lastConection} size='big' color='default' variant="outlined" />
            </Box>

            <Box style={{flexGrow: "1", maxWidth: "230px", marginLeft: "1em", display: "flex", flexDirection: "column", justifyContent: "end", alignItems: "baseline"}}>
                <h3 style={{width: "150px"}}>

                    Estado conexion servidor
                </h3>
                <Chip label={serverState} style={{
                    width: "100%"
                }} size='big' color='default' variant="outlined" />
            </Box>

            <Box style={{flexGrow: "1", maxWidth: "230px", marginLeft: "1em", display: "flex", flexDirection: "column", justifyContent: "end", alignItems: "baseline" }}>
                <h3 style={{width: "120px"}}>
                    Alarma establecida para
                </h3>
                <Chip label={new Date(lastData).toUTCString()} size='big' color='warning' variant="outlined" />
            </Box>

            <Box style={{flexGrow: "1", maxWidth: "230px", marginLeft: "1em", display: "flex", flexDirection: "column", justifyContent: "end", alignItems: "baseline" }}>
                <CofeeStatus makerState={makerState}></CofeeStatus>
            </Box>
        </InfoHeader>
        )
    }

export default Info