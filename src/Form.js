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
import Swal from "sweetalert2";
import Axios from "axios";
import { Loading } from "./Loading";

const useStyles = makeStyles({
  form: {
    width: "100%",
    marginTop: "1rem",
  },
  textCenter: {
    textAlign: "center",
    fontWeight: "bold",
  },
  w100: {
    width: "100%",
    marginTop: "1rem",
  },
  list: {
    margin: "2rem 0",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export const Form = () => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    email: "",
    quantity: "",
  });

  const [tehilims, setTehilims] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    if (formState.email.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El correo es obligatorio",
      });
      return;
    }
    if (formState.quantity === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La cantidad es obligatoria",
      });
      return;
    }
    if (
      // eslint-disable-next-line
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        formState.email.trim().toLowerCase()
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingresa un email válido",
      });
      return;
    }
    try {
      setLoading(true);
      const res = await Axios.post(`${process.env.REACT_APP_APIURL}/tehilim`, {
        mail: formState.email,
        quantity: formState.quantity,
      });
      console.log(res.data);
      setTehilims(res.data.tehilims);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: JSON.stringify(error.response),
      });
      setLoading(false);
    }
  };

  return (
    <Card>
      {tehilims.length === 0 ? (
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
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10 </MenuItem>
                <MenuItem value={20}>20 </MenuItem>
                <MenuItem value={20}>30</MenuItem>
                <MenuItem value={20}>50</MenuItem>
              </Select>
            </FormControl>
            {loading ? (
              <Loading />
            ) : (
              <Button
                className={classes.w100}
                type="submit"
                variant="contained"
                color="primary"
              >
                Inscribirme
              </Button>
            )}
          </form>
        </CardContent>
      ) : (
        <CardContent>
          <Typography className={classes.textCenter} variant="h5">
            Felicidades, ya eres parte de este maratón!!!
          </Typography>
          <Typography className={classes.textCenter} variant="h5">
            Tus tehilims asignados son:
          </Typography>
          <div className={classes.list}>
            {tehilims.map((tehilim) => (
              <span key={tehilim}>{tehilim}, </span>
            ))}
          </div>
          <Typography className={classes.textCenter} variant="h5">
            Recibiras un correo de confirmación con está información
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};
