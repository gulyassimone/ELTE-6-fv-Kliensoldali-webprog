import { useEffect, useRef, useState } from "react";

const Login = ({ login }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [values, setValues] = useState({ username: '', password: '' });
  const handleChange = (event) => 
    setValues({...values, [event.target.name]: event.target.value});

  const { username, password } = values;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== "teszt") {
      alert("Hibas jelszo!");
      return;
    }
    login(username);
  };

  const canSubmit = username && password;

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Felhasználónév: </label>
      <input
        ref={usernameRef}
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={handleChange}
        label="Felhasználónév"
      />
      <br />
      <label htmlFor="password">Jelszó: </label>
      <input
        ref={passwordRef}
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handleChange}
        label="Jelszó"
      />
      <br />
      <button type="submit" disabled={!canSubmit}>
        Elküld
      </button>
    </form>
  );
};

export default Login;
