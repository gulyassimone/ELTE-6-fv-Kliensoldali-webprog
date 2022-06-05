import './App.css';
import Login from "./auth/views/Login";
import {  useSelector } from "react-redux";
import { selectCurrentUser } from "./auth/state/authSlice";
import Tasklist from "./tasklists/view/tasklist";


function App() {
  const user = useSelector(selectCurrentUser)

  if (!user) {
    return <Login />
  }else{
    return <Tasklist/>;
  }
}

export default App;
