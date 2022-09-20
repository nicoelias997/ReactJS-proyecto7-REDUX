import React from "react";
import Pokemones from "./components/Pokemones";

import { auth } from "./firebase";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";



function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => { //esta peticion viene de firebase, del back end
    const fetchUser = () => {
      auth.onAuthStateChanged(user => {
        if(user){
          setFirebaseUser(user)
        } else {
          setFirebaseUser(null)
        }
      })
    }  
    fetchUser()  
  }, [])

  const RutaPrivada = ({element: Component, authenticated}) => { //creamos esta funcion, porque reemplazaremos esta ruta, en todas las rutas que sean privadas!! Reemplazamos el route por la ruta privada
      if(localStorage.getItem("usuario")){
        //otra validacion seria que un user malo  no cree desde informacion desde su pc directamente al local storage
        const usuarioStorage = JSON.parse(localStorage.getItem("usuario"))        
        if(usuarioStorage.uid === firebaseUser.uid){
        return authenticated ? <Component></Component> : Navigate("/login")
        }
    }
  }
    
    

  return firebaseUser !== false ? (
    <Router>
      <div className="container mt-3">
        <Navbar>

        </Navbar>
        <Routes>
          <Route element={<RutaPrivada authenticated={true} element={Pokemones}></RutaPrivada>} path="/" exact="true">
          </Route>

          <Route element={<Login></Login>} path="/login">
          </Route>

        </Routes>
      </div>
    </Router>
  ) :  
  <div>
    <h6>Cargando...</h6>
  </div>;
}

export default App;
