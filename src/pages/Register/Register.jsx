import { motion } from "framer-motion";
import { Shield, User, Mail, Lock } from "lucide-react";

export default function Register() {
  return (
    <div className="min-h-screen bg-[#07111A] flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .8 }}
        className="w-full max-w-md rounded-3xl border border-cyan-400/10 bg-[#0B111A]/90 backdrop-blur-xl p-10 shadow-[0_0_50px_rgba(0,255,255,.08)]"
      >

        {/* Logo */}

        <div className="flex justify-center">

          <div className="h-16 w-16 rounded-full bg-cyan-400/20 flex items-center justify-center">

            <Shield size={32} className="text-cyan-300"/>

          </div>

        </div>

        <h2 className="mt-6 text-center text-3xl font-semibold text-white">
          Create Account
        </h2>

        <p className="mt-2 text-center text-slate-400">
          Join SentinelAI Surveillance Platform
        </p>

        {/* Form */}

        <form className="mt-8 space-y-5">

          <Input
            icon={<User size={18}/>}
            placeholder="Full Name"
            type="text"
          />

          <Input
            icon={<Mail size={18}/>}
            placeholder="Email Address"
            type="email"
          />

          <Input
            icon={<Lock size={18}/>}
            placeholder="Password"
            type="password"
          />

          <Input
            icon={<Lock size={18}/>}
            placeholder="Confirm Password"
            type="password"
          />

          <button
            className="w-full rounded-xl bg-cyan-400 py-4 font-semibold text-black transition hover:scale-[1.02]"
          >
            <a href="/register">Create Account</a>
          </button>

        </form>

        <p className="mt-8 text-center text-slate-400">

          Already have an account?

          <a
            href="/login"
            className="ml-2 text-cyan-300 hover:text-cyan-200"
          >
            Login
          </a>

        </p>

      </motion.div>

    </div>
  );
}

function Input({ icon, placeholder, type }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#121923] px-4 py-4">

      <div className="text-cyan-300">
        {icon}
      </div>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-white placeholder:text-slate-500"
      />

    </div>
  );
}