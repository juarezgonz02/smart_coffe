import React from 'react'
import { Chip, Box } from '@mui/material'

function Info() {
    return (
        <Box>
            <h3>
                Estado conexión a la cafetera:
            </h3>
            <Chip label="Conectado" size='big' color='success' variant="outlined" />

            <h3>
                Ultima conexión
            </h3>
            <Chip label="Conectado" size='big' color='default' variant="outlined" />


        </Box>
    )
}

export default Info