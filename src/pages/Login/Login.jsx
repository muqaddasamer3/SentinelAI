import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Mail, Lock, ArrowRight } from "lucide-react";
import api from "../../api/api";
import "./Login.css";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem(
    "access_token",
    response.data.access_token
);

localStorage.setItem(
    "token_type",
    response.data.token_type
);

            navigate("/");
        } catch (err) {
            if (err.response) {
                setError(err.response.data.detail);
            } else {
                setError("Cannot connect to backend.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            {/* Background Glow */}

            <div className="login-glow glow1"></div>
            <div className="login-glow glow2"></div>

            <div className="login-container">

                {/* LEFT SIDE */}

                <div className="login-left">

                    <div className="logo">

                        <div className="logo-icon">
                            <Shield size={30} />
                        </div>

                        <Link
                            to="/"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            <h1>SentinelAI</h1>
                            <p>AI Surveillance Platform</p>
                        </Link>

                    </div>

                    <span className="badge">
                        AI Powered Security
                    </span>

                    <h2>Welcome Back</h2>

                    <p className="subtitle">
                        Login to monitor live CCTV feeds,
                        manage incidents and access your
                        intelligent surveillance dashboard.
                    </p>

                </div>

                {/* RIGHT SIDE */}

                <form
                    className="login-card"
                    onSubmit={handleLogin}
                >

                    <h3>Sign In</h3>

                    {/* EMAIL */}

                    <div className="input-group">

                        <Mail size={18} />

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            disabled={loading}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>

                    {/* PASSWORD */}

                    <div className="input-group">

                        <Lock size={18} />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            disabled={loading}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    {/* OPTIONS */}

                    <div className="options">

                        <label>

                            <input type="checkbox" />

                            Remember me

                        </label>

                        <Link to="/forgot-password">
                            Forgot Password?
                        </Link>

                    </div>

                    {/* ERROR */}

                    {error && (
                        <p
                            style={{
                                color: "#ef4444",
                                marginBottom: "15px",
                                textAlign: "center",
                            }}
                        >
                            {error}
                        </p>
                    )}

                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >

                        {loading ? "Logging in..." : "Login"}

                        <ArrowRight size={18} />

                    </button>

                    <p className="divider">
                        OR
                    </p>

                    {/* GOOGLE */}

                    <button
                        type="button"
                        className="google-btn"
                    >
                        Continue with Google
                    </button>

                    {/* REGISTER */}

                    <p className="register-link">

                        Don't have an account?

                        <Link to="/register">
                            Register
                        </Link>

                    </p>

                </form>

            </div>

        </div>
    );
}