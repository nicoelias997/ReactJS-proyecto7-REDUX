import axios from 'axios'

// constantes
const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results: [],
    offset: 0
}

// types
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO'
const ANTERIOR_POKEMONES_EXITO = 'ANTERIOR_POKEMONES_EXITO'
const DETALLE_POKEMONES_EXITO = 'DETALLE_POKEMONES_EXITO'


// reducer
export default function pokeReducer(state = dataInicial, action){
    switch(action.type){
        case OBTENER_POKEMONES_EXITO:
            return {...state, ...action.payload}
        case SIGUIENTE_POKEMONES_EXITO:
            return {...state, ...action.payload}
        case ANTERIOR_POKEMONES_EXITO:
            return {...state, ...action.payload}
        case DETALLE_POKEMONES_EXITO:
            return{
                ...state, unPokemon: action.payload
            }
        default:
            return state
    }
}

// acciones
 //en la 1ra fc de flacha, recibiremos los parametros que necesitara esta funcion, para ejecutar la 2da fc de flecha
//Otras acciones no necesitaran parametros iniciales, pero la 2da si 
//Utilizamos async porque utilizaremos una api
//1ra accion
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {

    if(localStorage.getItem("offset=0")){
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem("offset=0"))
        })
        return
    }

    try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data
        })
    localStorage.setItem("offset=0", JSON.stringify(res.data))

    } catch (error) {
        console.log(error)
    }
}
//2da accion
export const siguientePokemonAccion = () => async (dispatch, getState) => {
    

    const {next} = getState().pokemones // porque al obtener pokemones, una prop next nos brinda el siguinete url, de igual manera en previous

    if(localStorage.getItem(next)){

        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(next))
        })
        return
    }

    try {
        const res = await axios.get(next)

        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        })
    localStorage.setItem(next, JSON.stringify(res.data))

    } catch (error) {
        console.log(error)
    }
}
//3ra accion
export const anteriorPokemonAccion = () => async (dispatch, getState) => {

    const {previous} = getState().pokemones

    if(localStorage.getItem(previous)){

        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(previous))
        })
        return
    }

    try {
        const res = await axios.get(previous)

        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem(previous,JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
}

//4ta accion, pintando detalles de los pokemon
export const unPokeDetalle = (url = "https://pokeapi.co/api/v2/pokemon/1/") => async (dispatch, getState) => {

     try{
        const res = await axios.get(url)
        console.log(res.data)
        dispatch({
            type: DETALLE_POKEMONES_EXITO,
            payload: {
                nombre: res.data.name,
                peso: res.data.weight,
                alto: res.data.height,
                imagen: res.data.sprites.front_default
            }
        })
     } catch(error){
        console.log(error)
     }
}