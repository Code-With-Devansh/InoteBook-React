import "./App.css";
import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import NotesState from "./Context/notes/NotesState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
function App() {
  const [alert, setAlert] = useState({})
  let showAlert = (type, msg)=>{
    setAlert({type, msg});
    setTimeout(() => {
      setAlert({});
    }, 3000);
  }
  return (
    <>
      <NotesState>
        <Router>
          <NavBar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert = {showAlert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert = {showAlert}/>} />
              <Route exact path="/signup" element={<SignUp showAlert = {showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NotesState>
    </>
  );
}

export default App;
