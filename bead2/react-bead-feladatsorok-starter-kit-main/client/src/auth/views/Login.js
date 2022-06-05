import { useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useLoginMutation, useRegisterMutation } from "../state/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../state/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const [loginFn] = useLoginMutation();
  const [registerFn] = useRegisterMutation();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const [values, setValues] = useState({ usrname: "", password: "" });
  const handleChange = (event) =>
    setValues({ ...values, [event.target.name]: event.target.value });

  const { usrname, password } = values;

  return (
    <form>
      {/* <label htmlFor="usrname">Felhasználónév: </label> */}
      <TextField
        ref={usernameRef}
        id="usrname"
        name="usrname"
        value={usrname}
        onChange={handleChange}
        label="Felhasználónév"
        variant="standard"
      />
      <br />
      {/* <label htmlFor="password">Jelszó: </label> */}
      <TextField
        ref={passwordRef}
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handleChange}
        label="Jelszó"
        variant="standard"
      />
      <br />
      <Button variant="contained" onClick={async () => {
        try {
          const result = await loginFn({ strategy: 'local', email: usrname, password: password });
          if (result.data) {
              console.log(result.data)
            dispatch(setCredentials(result.data));
          }
        } catch (err) {
          console.log(err);
        }
      }}>
        Bejelentkezés
      </Button>
      <Button variant="contained" onClick={() => registerFn({ email: usrname, password: password })}>
        Regisztráció
      </Button>
    </form>
  );
};

export default Login;
