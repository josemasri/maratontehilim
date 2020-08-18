import React, { useState } from "react";
import {
  TextField,
  makeStyles,
  Card,
  CardContent,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles({
  form: {
    width: "100%",
    marginTop: "1rem",
  },
  textCenter: {
    textAlign: "center",
  },
  w100: {
    width: "100%",
    marginTop: "1rem",
  },
});

export const Form = () => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    email: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("click");
    console.log(formState);
  };

  return (
    <Card>
      <CardContent>
        <Typography className={classes.textCenter} variant="h5">
          Inscribete al Maratón!!!
        </Typography>
        <form noValidate className={classes.form} onSubmit={handleSubmit}>
          <TextField
            className={classes.w100}
            type="email"
            label="Tu email"
            name="email"
            helperText="Ingresa tu email para recibir tus tehilim"
            value={formState.email}
            onChange={handleChange}
          />
          <FormControl className={classes.w100}>
            <InputLabel id="quantity">Cantidad de Tehilims</InputLabel>
            <Select
              labelId="quantity"
              id="quantitySelect"
              name="quantity"
              value={formState.quantity}
              onChange={handleChange}
            >
              <MenuItem value={1}>1 </MenuItem>
              <MenuItem value={5}>5 </MenuItem>
              <MenuItem value={10}>10 </MenuItem>
              <MenuItem value={20}>20 </MenuItem>
            </Select>
          </FormControl>
          <Button
            className={classes.w100}
            type="submit"
            variant="contained"
            color="primary"
          >
            Inscribirme
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
