import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (event) => {

        event.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:8080/api/signup",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            console.log(data);

        } catch (error) {

            console.error("Signup failed:", error);
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1 className="logo">AuthGuard</h1>

                <h2>Create account</h2>

                <form onSubmit={handleSignup}>

                    <label>Your name</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        placeholder="Enter your name"
                        required
                    />

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
                        placeholder="At least 6 characters"
                        required
                    />

                    <button type="submit">
                        Create account
                    </button>

                </form>

                <p className="switch-text">
                    Already have an account?
                </p>



                <Link to="/login" >
                    <button className="secondary-button">
                        Sign in
                    </button>
                </Link>

            </div>

        </div>
    );
}

export default Signup;