import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard.jsx";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/login" />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route  path="/dashboard" element={<Dashboard />}
                    />
                <Route
                    path="/signup"
                    element={<Signup />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;