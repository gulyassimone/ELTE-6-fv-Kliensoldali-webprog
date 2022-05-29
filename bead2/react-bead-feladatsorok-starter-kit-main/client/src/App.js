import './App.css';
import Login from "./auth/views/Login";
import {  useSelector } from "react-redux";
import { selectCurrentUser } from "./auth/state/authSlice";


function App() {
  const user = useSelector(selectCurrentUser)


  console.log(user)
  if (!user)
    return (
      <Login/>
    );

  return
  ( <div> Hello </div>);
}

export default App;
