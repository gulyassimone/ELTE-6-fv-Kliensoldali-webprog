import "./App.css";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./auth/state/authSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import Login from "./auth/views/Login";
import Tasklists from "./tasklists/view/Tasklists";
import Home from "./auth/views/Home";
import { useState } from "react";
import Tasks from "./tasklists/view/Tasks";
import EditedTaskList from "./tasklists/view/EditedTaskList";


function App() {
  const user = useSelector(selectCurrentUser);
  const [selectedTask, setSelectedTask] = useState([]);
  const [editedTaskList, setEditedTaskList] = useState([]);

  const handleSelectedTask = (id, selected, userId) => {
    if (selected) {
      setSelectedTask([...selectedTask, { id: id, userId: userId }]);
    } else {
      setSelectedTask(selectedTask.filter((elem) => !(elem.id === id && elem.userId === userId)));
    }
  };
  const handleEditedTaskList = (id, selected, userId) => {
    if (selected) {
      setEditedTaskList([...editedTaskList, { id: id, userId: userId }]);
    } else {
      setEditedTaskList(editedTaskList.filter((elem) => !(elem.id === id && elem.userId === userId)));
    }
  };

  return <>{user ?
    <></> : <Login />}
    <BrowserRouter>
      <Layout editedTaskList={editedTaskList.find((elem) => (elem.userId === user.id))}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks handleSelectedTask={handleSelectedTask} selectedTask={selectedTask}
                                               editedTaskList={editedTaskList.find((elem) => (elem.userId === user.id))} />} />
          {user ? <>
            <Route path="/tasklists"
                   element={<Tasklists handleEditedTaskList={handleEditedTaskList}
                                       editedTaskList={editedTaskList.find((elem) => (elem.userId === user.id))} />} />
            <Route path="/editedTaskList"
                   element={<EditedTaskList editedTaskList={editedTaskList.find((elem) => (elem.userId === user.id))} />} />
          </> : <></>}
        </Routes>
      </Layout>
    </BrowserRouter></>;
}

export default App;
