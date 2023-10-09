import { createContext, useReducer, useContext, useEffect } from 'react'

export const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const authReducer = (state, action) => {
    switch(action.type){
        case 'login':
            return { user: action.payload }
        case 'logout':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type: 'login', payload: user })
        }
    }, [])
    console.log(state)
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}