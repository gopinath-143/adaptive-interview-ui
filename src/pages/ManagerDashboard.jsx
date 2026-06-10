import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LoadingScreen
from "../components/LoadingScreen";

import AppHeader
from "../components/AppHeader";

function LoginPage() {

    const navigate = useNavigate();

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleLogin =
        async (e) => {

            e.preventDefault();

            setLoading(true);

            try {

                const response =
                    await axios.post(
                        "https://adaptive-interview-backend.onrender.com/api/auth/login",
                        {
                            username: username,
                            password: password
                        }
                    );

                localStorage.setItem(
                    "token",
                    response.data.token
                );

                localStorage.setItem(
                    "role",
                    response.data.role
                );

                if (
                    response.data.role === "ADMIN"
                ) {

                    navigate(
                        "/manager-dashboard"
                    );

                } else if (
                    response.data.role === "MANAGER"
                ) {

                    navigate(
                        "/manager-dashboard"
                    );

                } else {

                    navigate(
                        "/upload"
                    );
                }

            } catch (error) {

                console.error(error);

                alert(
                    "Invalid Username or Password"
                );

            } finally {

                setLoading(false);
            }
        };

    return (

        <div className="container mt-5">

            {
                loading &&
                <LoadingScreen
                    message="Logging In..."
                />
            }

            <AppHeader />

            <div className="card p-4">

                <h3 className="mb-4 text-center">
                    Login
                </h3>

                <form onSubmit={handleLogin}>

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                    />

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Please Wait..."
                                : "Login"
                        }

                    </button>

                </form>

            </div>

        </div>
    );
}

export default LoginPage;