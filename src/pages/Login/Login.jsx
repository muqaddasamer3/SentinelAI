import { Link } from "react-router-dom";
import { Shield, Mail, Lock, ArrowRight } from "lucide-react";
import "./Login.css";

export default function Login() {
    return (
        <div className="login-page">

            {/* Background Glow */}
            <div className="login-glow glow1"></div>
            <div className="login-glow glow2"></div>

            <div className="login-container">

                {/* Left Side */}

                <div className="login-left">

                    <div className="logo">

                        <div className="logo-icon">
                            <Shield size={30} />
                        </div>

                      <Link
  to="/"
  style={{
    zIndex: 9999,
    position: "relative",
    display: "block",
    pointerEvents: "auto",
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

                    <h2>
                        Welcome Back
                    </h2>

                    <p className="subtitle">
                        Login to monitor live CCTV feeds, manage incidents
                        and access your intelligent surveillance dashboard.
                    </p>

                </div>

                {/* Right Side */}

                <div className="login-card">

                    <h3>Sign In</h3>

                    <div className="input-group">

                        <Mail size={18} />

                        <input
                            type="email"
                            placeholder="Email Address"
                        />

                    </div>

                    <div className="input-group">

                        <Lock size={18} />

                        <input
                            type="password"
                            placeholder="Password"
                        />

                    </div>

                    <div className="options">

                        <label>

                            <input type="checkbox" />

                            Remember me

                        </label>

                        <a href="#">
                            Forgot Password?
                        </a>

                    </div>

                    <button className="login-btn">

                        Login

                        <ArrowRight size={18} />

                    </button>

                    <p className="divider">

                        OR

                    </p>

                    <button className="google-btn">

                        Continue with Google

                    </button>

                    <p className="register-link">

                        Don't have an account?

                        <Link to="/register">

                            Register

                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}