import React from 'react'

import {useSelector, useDispatch} from 'react-redux'
import {actualizarDisplayNameAccion} from '../redux/usuarioDucks'

const Perfil = () => {
    const dispatch = useDispatch()

    const usuario = useSelector(store => store.usuario.user)
    const loading = useSelector(store => store.usuario.loading)
    // console.log(usuario)

    const [displayName, setDisplayName] = React.useState(usuario.displayName)
    const [editarNombre, setEditarNombre] = React.useState(false)

    const botonEditarNombre = () => {
        if(!displayName.trim()){
            console.log('nombre vacío')
            return
        }
        dispatch(actualizarDisplayNameAccion(displayName))
        setEditarNombre(false)
    }

    return (
        <div className="mt-5 text-center">
            <div className="card">
                <div className="card-body">
                    <img src={usuario.photoURL} width="100" className="img-fluid rounded" alt="foto de perfil"/>
                    <h5 className="card-title">Nombre: {usuario.displayName}</h5>
                    <p className="card-text">Email: {usuario.email}</p>
                    <button 
                        className='btn btn-dark' 
                        onClick={() => setEditarNombre(true)}
                    >
                        Editar Nombre
                    </button>
                </div>
                {
                    loading && 
                    <div className="card-body">
                        <div className="d-flex justify-content-center my-2">
                            <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                    </div>
                }
                {
                    editarNombre && 
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <div className="col-md-5">
                                <div className="input-group mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        aria-label="Recipient's username" 
                                        value={displayName}  
                                        onChange={ e => setDisplayName(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <button 
                                            className="btn btn-outline-secondary" 
                                            type="button" 
                                            onClick={() => botonEditarNombre()}
                                        >
                                            Editar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Perfil