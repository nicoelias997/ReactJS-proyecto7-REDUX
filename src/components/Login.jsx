import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ingresoUsuarioAccion } from '../redux/usuarioDucks'
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const dispatch = useDispatch()

    const loading = useSelector(store => store.usuario.loading) 
    const activo = useSelector(store => store.usuario.activo) 
    console.log(loading)
    console.log(activo)

    const navigate = useNavigate()

    React.useEffect(() => { //este hook permanecera pendiente de los parametros activo loading
        if(activo){
            navigate("/")
        }
    }, [activo])

    return (
        <div className="mt-5 text-center">
            <h3>Ingreso de usuarios</h3>
            <hr/>
            <button 
            className="btn btn-dark"
            onClick={() => dispatch(ingresoUsuarioAccion())}
            disabled={loading}
            >Google</button>
        </div>
    )
}

export default Login