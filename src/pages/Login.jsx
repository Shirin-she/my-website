import "./login.css"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { InfinitySpin } from "react-loader-spinner"
import {z} from "zod"

const loginSchema = z.object({
    email: z.string().min(1,"Email is required").email("Please eneter a valid email address"),
    password: z.string().min(1,"password is required")
})

function Login() {
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [message, setMessage] = useState("")
const [loading, setLoading] = useState(false)
const navigate = useNavigate()


const handleLogin = async () => {
    if (!username || !password) {
        setMessage("❌ Please enter username and password")
        return
    }
    const Result = loginSchema.safeParse({ email: username, password })

    if (!Result.success) {
        setMessage(Result.error.issues[0].message)
        return
    }

    setLoading(true)
    setMessage("")
    const startTime = Date.now()

    try {
        const response = await fetch(
            "https://sample-e-1.onrender.com/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: username,
                    password: password,
                }),
            }
        )

        const data = await response.json()

        if (response.ok) {
            if (data.token) {
                localStorage.setItem("token", data.token)
            }
            navigate("/Dashboard")
        } else {
            setMessage(data.message || "❌ Login Failed")
        }
    } catch (error) {
        console.error(error)
        setMessage("❌ Server error. Please try again.")
    } finally {
        const elapsed = Date.now() - startTime
        if (elapsed < 400) {
            await new Promise((resolve) => setTimeout(resolve, 400 - elapsed))
        }
        setLoading(false)
    }
}

if (loading) {
    return (
        <div className="container">
            <div className="spinner-fullpage">
                <InfinitySpin width="200" color="#4fa94d" />
            </div>
        </div>
    )
}

return (
    <div className="container">
        <div className="login-box">
            <h1>Login</h1>

            <input
                type="text"
                placeholder="Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
            />

            {loading ? (
                <div className="spinner-wrapper">
                    <InfinitySpin width="200" color="#4fa94d" />
                </div>
            ) : (
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            )}

            <p>{message}</p>

            <p>
                Don't have an account?{" "}
                <Link to="/Home">Sign Up</Link>
            </p>
        </div>
    </div>
)


}

export default Login

