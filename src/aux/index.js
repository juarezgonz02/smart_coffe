import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material/'; // Grid version 2

    /**
     * Graph Container
     */
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
    marginRight: 0,

    [theme.breakpoints.down('md')]: {
      width: "90%",
      minWidth: "90%",
    },
    [theme.breakpoints.up('md')]: {
      width: "30%",
      minWidth: "30%",

    },
    [theme.breakpoints.up('lg')]: {
      width: "49%",
      minWidth: "49%",

    },

    paddingBottom: "1em",
    borderRadius: "1.5em",
    marginTop: "0",
    width: "50%",
    height: "auto",
    color: theme.palette.text.primary,
  }));

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


    [theme.breakpoints.down('md')]: {
      width: "90%",
      minWidth: "90%",
    },
    [theme.breakpoints.up('md')]: {
      width: "30%",
      minWidth: "30%",

    },
    [theme.breakpoints.up('lg')]: {
      width: "20%",
      minWidth: "20%",

    },


    height: "auto",
    color: theme.palette.text.primary,
  }));

  const Header = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    display: "flex",
    flexDirection: "row", 
    flexWrap: "wrap",
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

  export {Header, Item, Graph, SideBar}