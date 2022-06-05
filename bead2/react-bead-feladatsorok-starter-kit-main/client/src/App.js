import './App.css';
import {  useSelector } from "react-redux";
import { selectCurrentUser } from "./auth/state/authSlice";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Layout } from "./Layout/Layout";


function App() {
  const user = useSelector(selectCurrentUser)

  return <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element = {<div> HOME </div>}/>
        <Route path="/tasklists" element = {<div> Tasklist </div>}/>
        <Route path="/myTask" element = {<div> my Task </div>}/>
      </Routes>
    </Layout>
  </BrowserRouter>
}

export default App;
