import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, User, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000";

export default function Register() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("Security Officer");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (
            !fullName ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            alert("Please fill all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        full_name: fullName,
                        email: email,
                        password: password,
                        role: role,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.detail || "Registration failed");
                return;
            }

            alert("Registration Successful!");

            navigate("/login");

        } catch (error) {
            console.error(error);
            alert("Cannot connect to backend.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#07111A] flex items-center justify-center px-6">

            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .8 }}
                className="w-full max-w-md rounded-3xl border border-cyan-400/10 bg-[#0B111A]/90 backdrop-blur-xl p-10 shadow-[0_0_50px_rgba(0,255,255,.08)]"
            >

                <div className="flex justify-center">
                    <div className="h-16 w-16 rounded-full bg-cyan-400/20 flex items-center justify-center">
                        <Shield
                            size={32}
                            className="text-cyan-300"
                        />
                    </div>
                </div>

                <h2 className="mt-6 text-center text-3xl font-semibold text-white">
                    Create Account
                </h2>

                <p className="mt-2 text-center text-slate-400">
                    Join SentinelAI Surveillance Platform
                </p>

                <form
                    onSubmit={handleRegister}
                    className="mt-8 space-y-5"
                >

                    <Input
                        icon={<User size={18} />}
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) =>
                            setFullName(e.target.value)
                        }
                    />

                    <Input
                        icon={<Mail size={18} />}
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <Input
                        icon={<Lock size={18} />}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <Input
                        icon={<Lock size={18} />}
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                    />

                    <div className="rounded-xl border border-white/10 bg-[#121923] px-4 py-4">

                        <select
                            value={role}
                            onChange={(e) =>
                                setRole(e.target.value)
                            }
                            className="w-full bg-transparent text-white outline-none"
                        >

                            <option
                                value="Security Officer"
                                className="text-black"
                            >
                                Security Officer
                            </option>

                            <option
                                value="Manager"
                                className="text-black"
                            >
                                Manager
                            </option>

                            <option
                                value="Administrator"
                                className="text-black"
                            >
                                Administrator
                            </option>

                            <option
                                value="User"
                                className="text-black"
                            >
                                User
                            </option>


                        </select>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-cyan-400 py-4 font-semibold text-black hover:scale-[1.02] transition"
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                </form>

                <p className="mt-8 text-center text-slate-400">

                    Already have an account?

                    <Link
                        to="/login"
                        className="ml-2 text-cyan-300 hover:text-cyan-200"
                    >
                        Login
                    </Link>

                </p>

            </motion.div>

        </div>
    );
}

function Input({
    icon,
    type,
    placeholder,
    value,
    onChange,
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#121923] px-4 py-4">

            <div className="text-cyan-300">
                {icon}
            </div>

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full bg-transparent outline-none text-white placeholder:text-slate-500"
            />

        </div>
    );
}