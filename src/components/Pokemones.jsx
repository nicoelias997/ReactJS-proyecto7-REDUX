import React from 'react'

import {useDispatch, useSelector} from 'react-redux'
import { obtenerPokemonesAccion,  siguientePokemonAccion, anteriorPokemonAccion, unPokeDetalle} from '../redux/pokeDucks'
import PokeDetalle from './PokeDetalle'

const Pokemones = () => {
    const dispatch = useDispatch() //dispara nuestra accion

    const pokemones = useSelector(store => store.pokemones.results)
    const next = useSelector(store => store.pokemones.next)
    const previous = useSelector(store => store.pokemones.previous)

    return (
        <div className='row'>
            <div className="col-md-6">
            <h3> Lista de pokemones </h3>
            <br />
            
            <div className="d-flex justify-content-between">
            {
                pokemones.length === 0 && <button className="btn btn-dark" onClick={() => dispatch(obtenerPokemonesAccion())}>Get Pokemones</button>
            }
            {
                next && <button className="btn btn-dark" onClick={() => dispatch(siguientePokemonAccion())} >Siguiente</button>
            }
            {
                previous && <button className="btn btn-dark"  onClick={() => dispatch(anteriorPokemonAccion())} >Anterior</button>
            } 
            </div>
            <ul className='list-group mt-3'>
                {
                    pokemones.map(item => (
                        <li key={item.name} className="list-group-item">
                            {item.name.toUpperCase()}
                            <button className='btn btn-secondary btn-sm float-end'
                            onClick={() => dispatch(unPokeDetalle(item.url))}>Info</button>
                        </li>
                    ))
                }
            </ul>
            </div>
            <div className="col-md-6">
                <h3>Detalle pokemon</h3>
                <PokeDetalle></PokeDetalle>
            </div>

        </div>
    )
}

export default Pokemones