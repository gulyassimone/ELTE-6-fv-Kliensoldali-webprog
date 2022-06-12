import "./App.css";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./auth/state/authSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import Login from "./auth/views/Login";
import Tasklist from "./tasklists/view/tasklist";
import Home from "./auth/views/Home";
import { useGetAllTasksQuery } from "./tasklists/state/tasklistSlice";
import { useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";



function App() {
  const user = useSelector(selectCurrentUser);
  const { data } = useGetAllTasksQuery();
  const [tasklist, setTasklist] = useState([]);
  const [selectedTask, setSelectedTask] = useState(undefined);
  const handleSelectedTask = (id, selected) => {
    if(selected) {
      setSelectedTask({ id:id, selected:selected });
    }else{
      setSelectedTask(undefined);
    }
  };

  useEffect(() => {
    setTasklist(data);
  }, [data]);
  return <>{user ?
    <></> : <Login />}
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasklist" element={<Tasklist data={tasklist} handleSelectedTask={handleSelectedTask} selectedTask={selectedTask} />}/>
          {user ?
            <Route path="/myTrack"
                   element={<Tasklist data={tasklist.filter((elem) => elem.userId === user.id)} handleSelectedTask={handleSelectedTask} selectedTask={selectedTask}  />} /> : <></>}
        </Routes>
      </Layout>
    </BrowserRouter></>;
}

export default App;
