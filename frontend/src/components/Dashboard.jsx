import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/useAuth.jsx";
import { apiFetch } from "../services/api";

function Dashboard() {

    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const {logout} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("accessToken");

        if (!token) {
            navigate("/login");
            return;
        }

        apiFetch("/api/profile")
            .then(response => {

                if (!response.ok) {
                    throw new Error("Authentication failed");
                }

                return response.json();
            })
            .then(data => {

                setUser(data);
            })
            .catch(error => {

                console.error(error);

                setError("Could not load profile");

                localStorage.removeItem("accessToken");

                navigate("/login");
            });

    }, [navigate]);

    const handleLogout = () => {
        logout();

        navigate("/login");
    };

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>

            <h1>Welcome to AuthGuard</h1>

            <h2>Dashboard</h2>

            <p>
                <strong>Name:</strong> {user.name}
            </p>

            <p>
                <strong>Email:</strong> {user.email}
            </p>

            <button onClick={handleLogout}>
                Logout
            </button>

        </div>
    );
}

export default Dashboard;