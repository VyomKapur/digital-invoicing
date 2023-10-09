import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'

const Login = () => {
    const { dispatch } = useAuthContext() 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const response = await fetch("http://localhost:3500/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                
            },
            body: JSON.stringify({email, password})
        })
        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            setIsLoading(false)
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type:'login', payload: json})
        }
    }
    return (
        <form onSubmit={handleSubmit}> 
            <h3>Login</h3>
            <label>Email: </label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <label>Password: </label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button disabled={isLoading}>Login</button>
            {error && <div>{error}</div>}
        </form>
    )
}

export default Login