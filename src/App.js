import Header from "./Components/Header";
import Cards from "./Components/Cards";
import { Route, Routes } from 'react-router-dom';
import AddMovie from "./Components/AddMovie";
import Detail from "./Components/Detail";
import { createContext, useState } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Footer from "./Components/Footer";

//video playback time is 1:54:31
const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <Appstate.Provider value={{ login, userName, setLogin, setUserName }}>
      <div className="App relative">
        <Header />
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/AddMovie" element={<AddMovie />} />
          <Route path="/Detail/:id" element={<Detail />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
        <Footer/>
      </div>
    </Appstate.Provider>
  );
}

export default App;
export { Appstate };
