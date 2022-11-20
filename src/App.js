import './App.css';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {Box} from '@mui/material/'; // Grid version 2
import { Temp, Controllers, Counter, WeekCounter, Level, Info} from './components';
function App() {
  return (
    <div className="App">
      <h1> My Smart Coffe Maker ☕</h1>
      <Box sx={{ flexGrow: 1, margin: "1em" }}>

        <Grid container spacing={2}>
          
          <Grid xs={2}>
            <h2> Temperatura </h2>
            <Box style={{margin: "auto", height: "225px"}} display={"flex"} alignItems={"center"} >
              <Temp></Temp>
            </Box>
          </Grid>
          
          <Grid xs={6}>
            <h2> Tazas hoy </h2>
            <Box display={"flex"} alignItems={"center"} >
              <Counter></Counter>
              <WeekCounter></WeekCounter>
            </Box>
          </Grid>
          
          <Grid xs={3}>
            <h2> Nivel del tanque </h2>
            <Box display={"flex"} alignItems={"center"} >
              <Level></Level>
            </Box>
          </Grid>

          <Grid xs={3}>
            <h2> Controles </h2>
            <Controllers />
            
          </Grid>
          
          <Grid xs={4}>
            <h2> Información </h2>
            <Info></Info>
          </Grid>

          <Grid xs={4}>
            <h2> Tiempo activa </h2>
          </Grid>
        </Grid>
      </Box>

    </div>
  );
}

export default App;
