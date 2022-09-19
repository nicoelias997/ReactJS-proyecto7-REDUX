import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unPokeDetalle } from '../redux/pokeDucks'

const PokeDetalle = () => {

    const dispatch = useDispatch()

    React.useEffect(()=> {
        const fetchData = () => {
            dispatch(unPokeDetalle())
        }
        fetchData()
    } , [dispatch])

    const pokemon = useSelector(store => store.pokemones.unPokemon)

  return pokemon ? (
    <div className='card text-center mt-5'>
        <div className="card-body">
            <img src={pokemon.imagen} alt={pokemon.nombre} className="img-fluid" />
            <div className="card-title">
                {
                pokemon.nombre.toUpperCase()
                }
            </div>
            <p className="card-text">Alto: {pokemon.alto} | Peso: {pokemon.peso} </p>
        </div>
    </div>
  ) : null
}

export default PokeDetalle