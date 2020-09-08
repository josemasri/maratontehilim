import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import ReactCountUp from "react-countup-v2";
import { Loading } from "./Loading";
import Axios from "axios";

const useStyles = makeStyles({
  card: {
    marginTop: "1rem",
    marginBottom: "3rem",
  },
  statsTitle: {
    textAlign: "center",
    marginTop: "1rem",
  },
});

export const Stats = () => {
  const [info, setInfo] = useState();
  const classes = useStyles();
  useEffect(() => {
    const getInfo = async () => {
      const res = await Axios.get(
        `${process.env.REACT_APP_APIURL}/tehilim/info`
      );
      setInfo(res.data);
    };
    getInfo();
  }, []);
  return (
    <Card className={classes.card}>
      {!info ? (
        <CardContent>
          <Loading />
        </CardContent>
      ) : (
        <CardContent>
          <div>
            <Typography className={classes.statsTitle} variant="h5" color="primary">
              Número de tehilim repartidos:
            </Typography>
            <Typography className={classes.statsTitle} variant="h5" color="secondary">
              <ReactCountUp delay={10} endVal={15043} />
            </Typography>
          </div>
          <div>
            <Typography className={classes.statsTitle} variant="h5" color="primary">
              Número de participantes:
            </Typography>
            <Typography className={classes.statsTitle} variant="h5" color="secondary">
              <ReactCountUp delay={10} endVal={1101} />
            </Typography>
          </div>
          <div>
            <Typography className={classes.statsTitle} variant="h5" color="primary">
              Veces que se completará el tehilim:
            </Typography>
            <Typography className={classes.statsTitle} variant="h5" color="secondary">
              <ReactCountUp delay={10} endVal={101} />
            </Typography>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
