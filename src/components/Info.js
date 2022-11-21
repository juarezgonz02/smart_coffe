import React from 'react'
import { Chip, Box } from '@mui/material'

function Info() {
    return (
        <Box style={{ display: "flex", flexDirection: "row" }}>
            <Box style={{ display: "flex", flexDirection: "column" }}>
                <h3>
                    Estado conexión a la cafetera:
                </h3>
                <Chip label="Conectado" size='big' color='success' variant="outlined" />
            </Box>

            <Box style={{ marginLeft: "1em", display: "flex", flexDirection: "column" }}>
                <h3>
                    Ultima conexión
                </h3>
                <Chip label="Conectado" size='big' color='default' variant="outlined" />
            </Box>

            <Box style={{ marginLeft: "1em", display: "flex", flexDirection: "column" }}>
                <h3>
                    Ultimo dato recibido
                </h3>
                <Chip label="12/09/22 12:35" size='big' color='default' variant="outlined" />
            </Box>
        </Box>
    )
}

export default Info