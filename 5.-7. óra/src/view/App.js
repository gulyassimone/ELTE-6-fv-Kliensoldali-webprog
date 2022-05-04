import './App.css';
import Playlists from "./Playlists/Playlists";
import Tracks from "./Tracks/Tracks";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./Layout/Layout";
import Home from "./Home/Home";

function App() {
  return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/playlists" element = {<Playlists></Playlists>}></Route>
            <Route path="/tracks" element = {<Tracks></Tracks>}></Route>
              <Route path="/" element = {<Home></Home>}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
  );
}

export default App;
