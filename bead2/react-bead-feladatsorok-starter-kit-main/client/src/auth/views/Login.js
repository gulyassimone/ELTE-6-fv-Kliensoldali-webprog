import { useEffect, useRef, useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import { useLoginMutation, useRegisterMutation } from "../state/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../state/authSlice";
import Box from "@mui/material/Box";

const Login = () => {
  const dispatch = useDispatch();

  const [loginFn] = useLoginMutation();
  const [registerFn] = useRegisterMutation();

  const usernameRef = useRef();
  const passwordRef = useRef();
  const registerUsernameRef = useRef();
  const registerPasswordRef = useRef();
  const registerFullNameRef = useRef();
  const registerEmailRef = useRef();

  const [values, setValues] = useState({ usrname: "", password: "" });
  const [registerValues, setRegisterValues] = useState({ usrname: "", password: "", fullname: "" , email: ""});
  const [registerModalOpen,setRegisterModalOpen] = useState(false)
  const handleChange = (event) =>
    setValues({ ...values, [event.target.name]: event.target.value });
  const handleRegChange = (event) =>
    setRegisterValues({ ...registerValues, [event.target.name]: event.target.value });
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
          <div className="ui big button" onClick={() => setRegisterModalOpen(true)}>
            <i className="signup icon"/>
            Sign Up
          </div>
        </div>
      </div>
      <div className="ui vertical divider">
        Or
      </div>
      <Modal
        open={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <div className="field">
            <label>Username</label>
            <div className="ui left icon input">
              <input ref={registerUsernameRef} type="text" value={registerValues.usrname} name="usrname"  id="usrname" onChange={handleRegChange} label="username"  placeholder="username"/>
              <i className="user icon"/>
            </div>
          </div>
          <div className="field">
            <label>Email</label>
            <div className="ui left icon input">
              <input ref={registerEmailRef} type="email" value={registerValues.email} name="email"  id="email" onChange={handleRegChange} label="email"  placeholder="email"/>
            </div>
          </div>
          <div className="field">
            <label>Password</label>
            <div className="ui left icon input">
              <input  ref={registerPasswordRef}
                      type="password"
                      id="registerPassword"
                      name="password"
                      value={registerValues.password}
                      onChange={handleRegChange}
                      label="password"
                      placeholder="password" />
              <i className="lock icon"/>
            </div>
          </div>
          <div className="field">
            <label>Fullname</label><b />
            <div className="ui left icon input">
              <input ref={registerFullNameRef} type="text" value={registerValues.fullName} name="fullname"  id="fullname" onChange={handleRegChange} label="fullname"  placeholder="fullname"/>
            </div>
          </div>
          <div className="ui big button" onClick={() => {
            registerFn(registerValues);
            setRegisterModalOpen(false);
          }}>
            <i className="signup icon"/>
            Register
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Login;
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};