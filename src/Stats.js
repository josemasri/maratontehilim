import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import ReactCountUp from "react-countup-v2";
import { Loading } from "./Loading";
import Axios from "axios";

const useStyles = makeStyles({
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
    <Card>
      {!info ? (
        <CardContent>
          <Loading />
        </CardContent>
      ) : (
        <CardContent>
          <div>
            <Typography className={classes.statsTitle} variant="h5">
              Número de tehilims repartidos:
            </Typography>
            <Typography className={classes.statsTitle} variant="h5">
              <ReactCountUp delay={10} endVal={info.tehilimsReaded} />
            </Typography>
          </div>
          <div>
            <Typography className={classes.statsTitle} variant="h5">
              Número de participantes:
            </Typography>
            <Typography className={classes.statsTitle} variant="h5">
              <ReactCountUp delay={10} endVal={info.numberUsers} />
            </Typography>
          </div>
          <div>
            <Typography className={classes.statsTitle} variant="h5">
              Veces que se completará el tehilim:
            </Typography>
            <Typography className={classes.statsTitle} variant="h5">
              <ReactCountUp delay={10} endVal={info.rounds} />
            </Typography>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
