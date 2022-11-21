import './App.css';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box, Paper } from '@mui/material/'; // Grid version 2
import { styled } from '@mui/material/styles';

import { Temp, CofeeStatus, Controllers, Counter, WeekCounter, Level, Info } from './components';
function App() {

  const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    justifyContent: "center", 

    color: theme.palette.text.secondary,
  }));

  const SideBar = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    margin: "1.5em",
    paddingBottom: "1em",
    borderRadius: "1.5em",
    marginTop: "0",
    width: "20%",
    height: "auto",
    color: theme.palette.text.primary,
  }));

  const Header = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    display: "flex",
    flexDirection: "row", 
    padding: theme.spacing(1),
    textAlign: 'left',
    margin: "1.5em",
    paddingBottom: "1em",
    borderRadius: "1.5em",
    marginTop: "0",
    width: "96%",
    height: "auto",
    color: theme.palette.text.primary,
  }));

  const Graph = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center", 
    padding: theme.spacing(1),
    textAlign: 'left',
    margin: "1.5em",
    paddingBottom: "1em",
    borderRadius: "1.5em",
    marginTop: "0",
    width: "50%",
    height: "auto",
    color: theme.palette.text.primary,
  }));

  return (
    <div className="App">

      <Header style={{marginTop: "1em"}}>

      <div>
        <h1> My Smart Coffee Maker ☕</h1>
      </div>
      
      <div>
        <h2> Información </h2>
        <Info />
      </div>

      <Box display={"flex"} width="60%" marginLeft={"2em"} justifyContent={"center"} >
        <CofeeStatus></CofeeStatus>
      </Box>
      

      </Header>

      <div className='SUB'>
        <SideBar>

            

            <h2> Controles </h2>
            <Controllers />

            <br></br>

            <Item>
                <h2> Nivel del tanque </h2>
                <Box display={"flex"} justifyContent={"center"} >
                  <Level></Level>
                </Box>
              </Item>

        </SideBar>

        <SideBar>
        <Item>
                <h2> Temperatura </h2>
                <Box style={{ margin: "auto", height: "150px" }} display={"flex"} justifyContent={"center"} >
                  <Temp></Temp>
                </Box>
              </Item>

              <Item>
                <h2> Tazas hechas </h2>
                <Box style={{ margin: "auto", height: "150px" }} display={"flex"} justifyContent={"center"} >
                  <Counter></Counter>
                </Box>
              </Item>

        </SideBar>

        <Graph>
              <WeekCounter></WeekCounter>
        </Graph>
      </div>

    </div>
  );
}

export default App;
