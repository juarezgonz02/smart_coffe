import React, { useEffect, useState } from 'react'
import {Box, Card} from '@mui/material'
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function FeedBack({show, error}){
    if(show){
        if(error){
            return <Box> <p>Se ha establecido una alarma</p> </Box>
        }else{
            return <Box> <p>Hubo un error</p> </Box>
        }
    }  
}

function Alarm({getLastData, setData, action}) {

    const [feedStatus, setFeedStatus] = useState(false);
    const [showFeed, setShowFeed] = useState(false);

    const setAlarm = async () => { 

        let alarm = (new Date(value)).getTime()
        let isSent = action(makerAlarmTopic, (alarm/1000).toString())
        //console.log(isSent)
        
        setFeedStatus(true)
        setShowFeed(true)
        setData(alarm)
    
    }
    const actualDate = Date.now()
    const [value, setValue] = useState(dayjs(actualDate));
    const makerAlarmTopic = "Juarez00/feeds/makeralarm"

    const [{state, color, blocked}, turnOnOff] = useState({state: "Set", color: "#32a852", blocked: false})
   
  return (
    <Box sx={{ display: "flex", flexDirection:"column", justifyContent: "space-between", alignItems: "center" }}>

        <Box sx={{ display: "flex", width: "200px", margin: "1em", flexDirection:"column", alignItems: "center" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker 
                renderInput={(props) => <TextField sx={{ fontSize: "smaller"}} {...props} />}
                label="Hora de cafe"
                value={value}
                minDateTime={dayjs(actualDate)}
                onChange={(newValue) => {
                setValue(newValue);
                }}
            />
            </LocalizationProvider>
        </Box>

        <Card variant="outlined" onClick={setAlarm} sx={{backgroundColor: color, width: "150px", textAlign: "center"}}>

               <h3>
                 {state}
                </h3>
 
        </Card>

        <FeedBack show={showFeed} error={feedStatus} />
    </Box>     
    )
}

export default Alarm



