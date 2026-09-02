import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("accessToken");

        if (!token) {
            navigate("/login");
            return;
        }

        fetch("http://localhost:8080/api/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
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

        localStorage.removeItem("accessToken");

        localStorage.removeItem("refreshToken");

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