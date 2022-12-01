import './App.css';
import React, { createContext, useEffect, useState } from 'react';
import { Box } from '@mui/material/' // Grid version 2
import { Header, SideBar, Graph as GraphBar, HorizontalBox, Item } from "./aux"
import { Temp, CofeeStatus, Controllers, Alarm, Counter, WeekCounter, Level, Info } from './components'
import mqtt from "mqtt"


const counterTopic = "Juarez00/feeds/counter"
const makerStateTopic = "Juarez00/feeds/makerstate"
const makerAlarmTopic = "Juarez00/feeds/makeralarm"
const controllerTopic = "Juarez00/feeds/makercontrollers"
const tempTopic = "Juarez00/feeds/tempambiente"
const tankTopic = "Juarez00/feeds/niveltanque"
//const tankTopic = "Juarez00/feeds/niveltanque"5

function App() {
  const [client, setClient] = useState(null);
  const [tanklevel, setTankLevel] = useState(0.0);
  const [makerState, setMakerState] = useState("Disconnected");
  const [lastData, setlastData] = useState("--/--/-- ----");
  const [alarmData, setAlarmData] = useState("--/--/-- ----");
  
  const [counter, setCounter] = useState(0);
  const [cupsAvainable, setCups] = useState(0);
  const [allData, setAllData] = useState([0,3,0,2,4,0,0].reverse());

  const [temp, setTempActual] = useState(0);
  const [controllerState, setControllerState] = useState("OFF");

  const [connectStatus, setConnectStatus] = useState('Connect');
  
  useEffect(() => { 
    
    let cups = 0

    if(tanklevel>0.4){
      cups = 1
    }

    if(tanklevel > 0.9){
      cups = 2
    }

    setCups(cups)

   }, [tanklevel]
   )
  const publishToTopic = async (topic, message) => {
      client.publish(topic, message, { qos: 0, retain: false },async (error) => {
        if (error) {
          console.error(error)
          
        }else{
          console.log(`Message Sent ${message}`)
          setlastData(new Date().toUTCString())
          
        }})
  }
  const getLastData = () => {

    let state = "OFF"
    let color = "#ff0202"
    let blocked = false

    if(controllerState == "ON"){
      state = "ON"
      color = "#0cff0c"
      blocked = true
    }

    return {state: state , color: color, blocked: blocked}
  } 
  const getActualValues = async () => {
    let [res, res2, res3, res4, res5] =  await Promise.all(
      [ fetch(`https://io.adafruit.com/api/v2/${counterTopic}/data`, {
      method: 'GET',
      headers: {
        "X-AIO-Key": process.env.REACT_APP_AIO_KEY
      }}), 

      fetch(`https://io.adafruit.com/api/v2/${controllerTopic}/data`, {
      method: 'GET',
      headers: {
        "X-AIO-Key": process.env.REACT_APP_AIO_KEY
      }}),

      fetch(`https://io.adafruit.com/api/v2/${tempTopic}/data`,{
        method: 'GET',
        headers: {
          "X-AIO-Key": process.env.REACT_APP_AIO_KEY
        }}),

      fetch(`https://io.adafruit.com/api/v2/${tankTopic}/data`,{
        method: 'GET',
        headers: {
          "X-AIO-Key": process.env.REACT_APP_AIO_KEY
        }}),

      fetch(`https://io.adafruit.com/api/v2/${makerAlarmTopic}/data`,{
        method: 'GET',
        headers: {
          "X-AIO-Key": process.env.REACT_APP_AIO_KEY
        }})
    
    ])

    console.log(res)

    let json = await res.json()
    
    let json2 = await res2.json()
    
    let json3 = await res3.json()
    
    let json4 = await res4.json()
    
    let json5 = await res5.json()

    calculateCups(json)
    setControllerState(json2[0].value)
    setTempActual(json3[0].value)
    setTankLevel(json4[0].value)

    //console.log(json[])
    setAlarmData(json5[0].value)
  

  }
  const calculateCups = (data) => { 
    let thisDate = new Date(Date.now())

    let thisDay = thisDate.getDate()
    let thisMonth = thisDate.getMonth()+1

    let today = `${thisDay}-${thisMonth}`
    console.log(today)
    
    let processData = [0,3,0,2,4,0,0]
    /*Filtrar datos */
    let temp = thisDay, counter = 0;

    data.forEach((e) => { 

      let date = new Date(e.created_at)
      let day = date.getDate()
      let month = date.getMonth()+1 
      let fullDate = `${day}-${month}`
      console.log(fullDate)
    

      if(thisDay - day > 7 ){
          return
      }

      if(fullDate == today){
        counter += parseInt(e.value)
        temp = day
      }
      else{
        console.log("Dif"+(thisDay-day).toString())
        processData[thisDay-temp] = counter
        today = fullDate

        counter = parseInt(e.value)
      }
     })

     console.log(processData)
     setCounter(processData[0])
     setAllData(processData.reverse())
    //setAllData()
    
  }
  const connectToMQTT=()=>{

    const host = process.env.REACT_APP_HOST
    const port = '443'
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
  
    const connectUrl = `wss://${host}:${port}`
    const client = mqtt.connect(connectUrl, {
      clientId,
      protocolId: 'MQIsdp',
      protocolVersion: 3,
      clean: true,
      connectTimeout: 4000,
      username: process.env.REACT_APP_AIO_USER,
      password: process.env.REACT_APP_AIO_KEY,
      reconnectPeriod: 0,
    })
    console.log({
      clientId,
      protocolId: 'MQIsdp',
      protocolVersion: 3,
      clean: true,
      connectTimeout: 4000,
      username: process.env.REACT_APP_AIO_USER,
      password: process.env.REACT_APP_AIO_KEY,
      reconnectPeriod: 0,
    })
    client.on('connect', () => {

      setClient(client)
      setConnectStatus("Connected")
      console.log('Connected')
      console.log(client)

      client.subscribe([counterTopic], () => {
        console.log(`Subscribe to topic '${counterTopic}'`)
      })

      client.subscribe([tankTopic], () => {
        console.log(`Subscribe to topic '${tankTopic}'`)
      })

      client.subscribe([makerStateTopic], () => {
        console.log(`Subscribe to topic '${makerStateTopic}'`)
      })

      client.subscribe([controllerTopic], () => {
        console.log(`Subscribe to topic '${controllerTopic}'`)
      })

      client.subscribe([tempTopic], () => {
        console.log(`Subscribe to topic '${tempTopic}'`)
      })



    })

    client.on('message', (topic, payload) => {

      switch(topic){
        case makerStateTopic: 
          setMakerState(payload.toString())
        break;

        case counterTopic:
          let newData = allData
          newData[6] = parseInt(newData[6]) + parseInt(payload.toString())
          console.log(newData)
          setCounter(newData[6])
          setAllData(newData)
          
        break;

        case tankTopic: 
          setTankLevel(payload.toString())
        break;

        case tempTopic: 
          setTempActual(payload.toString())
        break;

        case controllerTopic: 
          setControllerState(payload.toString())
        break;
      }

      setlastData(new Date().toUTCString())
      console.log('Received Message:', topic, payload.toString())
    })
  }

  useEffect(() => {
    console.log("HELL")

    if(connectStatus == "Connect"){
      connectToMQTT();
    } 
    else{
      (async ()=> {  
       await getActualValues();
      })()
    }

  }, [connectStatus]);

  return (
    <div className="App">
      <Header style={{ marginTop: "1em" }}>

        <div style={{
          width: "max(200px, 20%)",
          flexGrow: "1",
        }}>
          <h1> My Smart Coffee Maker ☕</h1>
        </div>

        
        <div style={{
          width: "80%",
          flexGrow: "1",
        }}>
          <h2> Información </h2>
          <Info
            lastData={parseInt(alarmData)}
            lastConection={lastData}
            makerState={makerState}
            serverState={connectStatus} />
        </div>

      </Header>

      <div className='SUB'>
        <SideBar>
          <h2> Controles </h2>
          <Controllers getLastData={getLastData} controlState={controllerState} action={publishToTopic} />

          <br></br>

          <h2> Programación </h2>
          <Alarm getLastData={getLastData} setData={setAlarmData} action={publishToTopic} />



        </SideBar>

        <SideBar>
          <Item>
            <h2> Temperatura </h2>
            <Box style={{height: "150px" }} display={"flex"} justifyContent={"center"} >
              <Temp temp={temp}></Temp>
            </Box>
          </Item>

          <Item>
            <h2> Nivel del tanque </h2>
            <Box display={"flex"} justifyContent={"center"} >
              <Level tanklevel={tanklevel}></Level>
            </Box>
          </Item>


        </SideBar>

        
        <GraphBar>
          <WeekCounter allData={allData}></WeekCounter>

          <HorizontalBox>

            <Item>
              <h2> Tazas Disponibles </h2>
              <Box style={{ margin: "auto", height: "150px" }} display={"flex"} justifyContent={"center"} >
                <Counter icon="tank" label="Con el nivel actual" count={cupsAvainable}></Counter>
              </Box>
            </Item>

            <Item>
              <h2> Tazas hechas </h2>
              <Box style={{ margin: "auto", height: "150px" }} display={"flex"} justifyContent={"center"} >
                <Counter icon="cup" label="Hoy" count={counter}></Counter>
              </Box>
            </Item>


          </HorizontalBox>
        
        </GraphBar>
      </div>

    </div>
  );
}

export default App;
