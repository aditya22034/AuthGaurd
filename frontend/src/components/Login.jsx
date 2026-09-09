import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth} from "../context/useAuth.jsx";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleLogin = async (event) => {


        event.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:8080/api/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (response.ok && data.accessToken) {

                login(
                    data.accessToken,
                    data.refreshToken
                );

                navigate("/dashboard");

            } else {

                console.log(data);
            }
        } catch (error) {

            console.error("Login failed:", error);
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1 className="logo">AuthGuard</h1>

                <h2>Sign in</h2>

                <form onSubmit={handleLogin}>

                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        placeholder="Enter your email"
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        placeholder="Enter your password"
                        required
                    />

                    <button type="submit">
                        Sign in
                    </button>

                </form>

                <p className="switch-text">
                    New to AuthGuard?
                </p>

                <Link to="/signup">
                    <button  className="secondary-button">
                        Create your AuthGaurd account
                    </button>

                </Link>

            </div>

        </div>
    );
}

export default Login;