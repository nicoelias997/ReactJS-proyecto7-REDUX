import React from 'react'
import { useDispatch } from 'react-redux'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import { cerraSesionAccion } from '../redux/usuarioDucks'


const Navbar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    //esta fc aparte de la del pato es para empujar el cierre al login
    const cerrarSesion =  () => {
        dispatch(cerraSesionAccion())
        navigate("/login")
    }

    return (
        <div className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand" exact>Poke API</Link>
            <div>
                <div className="d-flex">
                    <NavLink 
                        className="btn btn-dark mr-2" 
                        to="/"
                        exact
                    >
                        Inicio
                    </NavLink>
                    <NavLink 
                        className="btn btn-dark mr-2" 
                        to="/login"
                        exact
                    >
                        Login
                    </NavLink>
                    <button
                        className="btn btn-dark"
                        onClick={() => cerrarSesion()}
                    >
                        cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar