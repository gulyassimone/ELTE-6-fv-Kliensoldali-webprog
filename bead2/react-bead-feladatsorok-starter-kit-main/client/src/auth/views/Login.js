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
    <div className="ui placeholder segment">
      <div className="ui two column very relaxed stackable grid">
        <div className="column">
          <div className="ui form">
            <div className="field">
              <label>Username</label>
              <div className="ui left icon input">
                <input ref={usernameRef} type="text" value={usrname} name="usrname"  id="usrname" onChange={handleChange} label="username"  placeholder="username"/>
                  <i className="user icon"/>
              </div>
            </div>
            <div className="field">
              <label>Password</label>
              <div className="ui left icon input">
                <input  ref={passwordRef}
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        label="password"
                        placeholder="password" />
                  <i className="lock icon"/>
              </div>
            </div>
            <div className="ui blue submit button" onClick={async () => {
              try {
                const result = await loginFn({ strategy: "local", email: usrname, password: password });
                if (result.data) {
                  console.log(result.data);
                  dispatch(setCredentials(result.data));
                }
              } catch (err) {
                console.log(err);
              }
            }}>Login</div>
          </div>
        </div>
        <div className="middle aligned column">
          <div className="ui big button" onClick={() => registerFn({ email: usrname, password: password })}>
            <i className="signup icon"/>
            Sign Up
          </div>
        </div>
      </div>
      <div className="ui vertical divider">
        Or
      </div>
    </div>
  );
};

export default Login;
