import './App.css';
import Login from "./auth/views/Login";
import {  useSelector } from "react-redux";
import { selectCurrentUser } from "./auth/state/authSlice";
import { useGetAllTasksQuery } from "./auth/state/tasklistSlice";


function App() {
  const user = useSelector(selectCurrentUser)
  const { data, isLoading } = useGetAllTasksQuery
  if (!user) {
    return <Login />
  }else{
    console.log(data);
  }
}

export default App;
