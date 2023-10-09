import { useState } from 'react'
const Signup = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async(e) =>{
        e.preventDefault()

    }
    return (
        <form onSubmit={handleSubmit}> 
            <h3>Sign Up</h3>
            <label>Email: </label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <label>Full Name: </label>
            <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
            <label>Password: </label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button>Sign Up</button>
        </form>
    )
}

export default Signup