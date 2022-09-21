import {auth,firebase, db} from "../firebase"
import { signInWithPopup } from "firebase/auth";

//data iniciales
const dataInicial = {
    loading: false, //para deshabilitar botones
    activo: false //para decir si un usuario esta activo o no
}

//type
const INGRESO_USUARIO_EXITO = "INGRESO_USUARIO_EXITO"
const INGRESO_USUARIO_ERROR = "NGRESO_USUARIO_ERROR"
const LOADING = "LOADING" 
const USUARIO_CERRAR_SESION = "USUARIO_CERRAR_SESION"

//reducer
export default function usuarioReducer(state = dataInicial, action){
    switch(action.type){
        case LOADING:
            return {
                ...state, loading: true //independiente del usuario si se registro o no, estara pensando...
            }
        case INGRESO_USUARIO_ERROR: 
        return {
            ...dataInicial
        }
        case INGRESO_USUARIO_EXITO: 
        return {
            ...state, loading: false, user: action.payload, activo: true
        }
        case USUARIO_CERRAR_SESION:
            return {
            ...dataInicial
            }
        default: 
        return state
    }
}


//acciones
export const ingresoUsuarioAccion = () => async(dispatch) => {
    dispatch({
        type: LOADING //independiente de si ingresa al usuario o no
    })
    try{
        const provider = new firebase.auth.GoogleAuthProvider(); //declaramos el provider, que sera una nueva autenticacion con google(sacada desde firebase)
        const res = await signInWithPopup(auth, provider); //signIn nos pide una uutenticacion

        const objetoUsuario = {
            uid: res.user.uid,
            email: res.user.email,
            photoURL: res.user.photoURL,
            displayName: res.user.displayName
        }
        
        const usuarioDB = await db.collection('usuarios').doc(res.user.email).get()
        if(usuarioDB.exists){//cuando exista, no necesitamos guardarlo, direc el dispatch y localstorage
            console.log(usuarioDB.data())//data() nos trae el objeto de la base de datos
            dispatch({
                type: INGRESO_USUARIO_EXITO,
                payload: usuarioDB.data()
            })
            localStorage.setItem('usuario', JSON.stringify(usuarioDB.data()))
        }else{//Si no existe el usuario en firestore
            console.log('no existe')
            await db.collection('usuarios').doc(res.user.email).set(objetoUsuario)
            dispatch({
                type: INGRESO_USUARIO_EXITO,
                payload: objetoUsuario
            })
            localStorage.setItem('usuario', JSON.stringify(objetoUsuario))
        }

        
    } catch (error) {
        console.log(error)
        dispatch({
            type: INGRESO_USUARIO_ERROR 
        })
    }
}
export const leerUsuarioActivoAccion = () => (dispatch) => {
    if(localStorage.getItem("usuario")){
        dispatch({
            type: INGRESO_USUARIO_EXITO,
            payload: JSON.parse(localStorage.getItem("usuario"))
        })
    }
}

export const cerraSesionAccion = () => (dispatch) => {
    auth.signOut()
    localStorage.removeItem("usuario")
    dispatch({
        type: USUARIO_CERRAR_SESION,
    })
}

export const actualizarDisplayNameAccion = (nuevoNombre) => async (dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    const {user} = getState().usuario
    console.log(user)
    try {
        await db.collection('usuarios').doc(user.email).update({
            displayName: nuevoNombre
        })
        const usuarioEditado = {
            ...user,
            displayName: nuevoNombre
        }
        dispatch({
            type: INGRESO_USUARIO_EXITO,
            payload: usuarioEditado
        })
        localStorage.setItem('usuario', JSON.stringify(usuarioEditado))
    } catch (error) {
        console.log(error)
    }
}