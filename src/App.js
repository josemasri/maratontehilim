import React from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Box,
  useTheme,
} from "@material-ui/core";
import "normalize.css/normalize.css";
import { makeStyles } from "@material-ui/styles";
import { Form } from "./Form";
import logoPink from "./assets/logoPink.png";
import logoCuarentena from "./assets/logoCuarentena.png";

const useStyles = makeStyles({
  title: {
    margin: "0 auto",
  },
  logo: {
    height: "10rem",
    width: "10rem",
  },
  grid: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1rem",
  },
  navbar: {
    overflow: "hidden",
    position: "fixed",
    bottom: 0,
    width: "100%",
    color: "white",
    padding: "0.5rem",
    fontSize: "0.8rem",
    textAlign: "center"
  },
});

function App() {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Maratón de Tehilim
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <div className={classes.grid}>
          <img
            className={classes.logo}
            src={logoPink}
            alt="logo tora cuarentena"
          />

          <img
            className={classes.logo}
            src={logoCuarentena}
            alt="logo tora cuarentena"
          />
        </div>
        <Form />
      </Container>
      <div
        style={{ backgroundColor: theme.palette.primary.main }}
        className={classes.navbar}
      >
        Desarrollado por Jose Masri
      </div>
    </>
  );
}

export default App;
