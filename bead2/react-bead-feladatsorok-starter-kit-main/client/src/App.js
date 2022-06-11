import "./App.css";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./auth/state/authSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import Login from "./auth/views/Login";
import Tasklist from "./tasklists/view/tasklist";


function App() {
  const user = useSelector(selectCurrentUser);
  return <>{user ?
    <></> : <Login />}
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<div> HOME </div>} />
          <Route path="/tasklist" element={<Tasklist />} />
          <Route path="/myTask" element={<div> my Task </div>} />
        </Routes>
      </Layout>
    </BrowserRouter></>;
}

export default App;
