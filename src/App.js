import './App.css';
import React, { createContext, useEffect, useState } from 'react';
import { Box } from '@mui/material/' // Grid version 2
import { Header, SideBar, Graph, Item } from "./aux"
import { Temp, CofeeStatus, Controllers, Counter, WeekCounter, Level, Info } from './components'
import mqtt from "mqtt"


const counterTopic = "Juarez00/feeds/counter"
const makerStateTopic = "Juarez00/feeds/makerstate"
const controllerTopic = "Juarez00/feeds/makercontrollers"
const tempTopic = "Juarez00/feeds/tempambiente"
const tankTopic = "Juarez00/feeds/niveltanque"

function App() {
  const [client, setClient] = useState(null);
  const [tanklevel, setTankLevel] = useState(0.0);
  const [makerState, setMakerState] = useState("Disconnected");
  const [lastData, setlastData] = useState("--/--/-- ----");
  
  const [counter, setCounter] = useState(0);
  const [allData, setAllData] = useState([44,2,32,4,21,3,12]);

  const [temp, setTempActual] = useState(0);
  const [controllerState, setControllerState] = useState("OFF");

  const [connectStatus, setConnectStatus] = useState('Connect');
  
  const publishToTopic = (topic, message) => {
      client.publish(topic, message, { qos: 0, retain: false }, (error) => {
        if (error) {
          console.error(error)
        }else{
          console.log("Message Sent")
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
    let [res, res2, res3, res4] =  await Promise.all(
      [ fetch(`https://io.adafruit.com/api/v2/${counterTopic}/data`, {
      method: 'GET',
      headers: {
        "X-AIO-Key": "aio_OUqh91BGVENrRRHKCHlOcPJTLYVj"
      }}), 

      fetch(`https://io.adafruit.com/api/v2/${controllerTopic}/data`, {
      method: 'GET',
      headers: {
        "X-AIO-Key": "aio_OUqh91BGVENrRRHKCHlOcPJTLYVj"
      }}),

      fetch(`https://io.adafruit.com/api/v2/${tempTopic}/data`,{
        method: 'GET',
        headers: {
          "X-AIO-Key": "aio_OUqh91BGVENrRRHKCHlOcPJTLYVj"
        }}),

      fetch(`https://io.adafruit.com/api/v2/${tempTopic}/data`,{
        method: 'GET',
        headers: {
          "X-AIO-Key": "aio_OUqh91BGVENrRRHKCHlOcPJTLYVj"
        }})
    
    ])

    console.log(res)

    let json = await res.json()
    
    let json2 = await res2.json()
    
    let json3 = await res3.json()
    let json4 = await res4.json()

    calculateCups(json.map((a) => new Date(a.created_at)))
    setControllerState(json2[0].value)
    setTempActual(json3[0].value)
    setTankLevel(json4[0].value)
  }
  const calculateCups = (data) => { 
    
    console.log(data)

    /*Filtrar datos */
    let processedData = data
    //setAllData()
    
  }

  const connectToMQTT=()=>{

    const host = 'io.adafruit.com'
    const port = '443'
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
  
    const connectUrl = `mqtt://${host}:${port}`
    const client = mqtt.connect(connectUrl, {
      clientId,
      protocolId: 'MQIsdp',
      protocolVersion: 3,
      clean: true,
      connectTimeout: 4000,
      username: 'Juarez00',
      password: 'aio_OUqh91BGVENrRRHKCHlOcPJTLYVj',
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
          setCounter(counter + parseInt(payload.toString()))
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
  document.addEventListener("close",() => {
    if (client) {
      client.end(() => {
        setConnectStatus('Connect')
      })
    }
  })
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
            lastData={lastData}
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

          <Item>
            <h2> Nivel del tanque </h2>
            <Box display={"flex"} justifyContent={"center"} >
              <Level tanklevel={tanklevel}></Level>
            </Box>
          </Item>

        </SideBar>

        <SideBar>
          <Item>
            <h2> Temperatura </h2>
            <Box style={{height: "150px" }} display={"flex"} justifyContent={"center"} >
              <Temp temp={temp}></Temp>
            </Box>
          </Item>

          <Item>
            <h2> Tazas hechas </h2>
            <Box style={{ margin: "auto", height: "150px" }} display={"flex"} justifyContent={"center"} >
              <Counter count={counter}></Counter>
            </Box>
          </Item>

        </SideBar>

        <Graph>
          <WeekCounter allData={allData}></WeekCounter>
        </Graph>
      </div>

    </div>
  );
}

export default App;
