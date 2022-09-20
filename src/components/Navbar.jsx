import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
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
    const activo = useSelector(store => store.usuario.activo)

    return (
        <div className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Poke API</Link>
            <div>
                <div className="d-flex">
                    {
                        activo ? (
                            <>
                                <NavLink 
                                    className="btn btn-dark mr-2" 
                                    to="/"
                                >
                                    Pokemon
                                </NavLink>
                                <button
                                    className="btn btn-dark"
                                    onClick={() => cerrarSesion()}
                                >
                                    cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <NavLink 
                                className="btn btn-dark mr-2" 
                                to="/login"
                            >
                                Login
                            </NavLink>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar