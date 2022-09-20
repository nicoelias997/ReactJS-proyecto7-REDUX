import React from "react";
import Pokemones from "./components/Pokemones";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";



function App() {
  return (
    <Router>
      <div className="container mt-3">
        <Navbar>

        </Navbar>
        <Routes>
          <Route element={<Pokemones></Pokemones>} path="/" exact>
          </Route>

          <Route element={<Login></Login>} path="/" exact>
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
