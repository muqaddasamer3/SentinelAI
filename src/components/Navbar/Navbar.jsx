import { Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const links = [
    {
        title: "Features",
        href: "#features",
    },
    {
        title: "Solutions",
        href: "#monitoring",
    },
    {
        title: "Dashboard",
        href: "#dashboard",
    },
   
    {
        title: "About",
        href: "#about",
    },
];

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 px-8 pt-8">

            <motion.nav
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: .8 }}
                className="mx-auto
        flex
        max-w-7xl
        items-center
        justify-between
        rounded-full
        border border-white/10
        bg-white/[0.05]
        backdrop-blur-2xl
        px-8
        py-4
        shadow-[0_0_40px_rgba(0,255,255,.08)]"
            >

                {/* Logo */}

                <div className="flex items-center gap-4">

                    <div
                        className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-cyan-400/15
            ring-1
            ring-cyan-400/20">

                        <Shield
                            size={26}
                            className="text-cyan-300"
                        />

                    </div>

                    <div>

                        <h2 className="text-2xl font-bold text-white">
                            SentinelAI
                        </h2>

                        <p className="text-sm text-slate-400">
                            Surveillance Platform
                        </p>

                    </div>

                </div>

                {/* Links */}

                <div className="hidden lg:flex items-center gap-12">

                    {links.map((item) => (

                        <a
                            key={item.title}
                            href={item.href}
                            className="
    text-[17px]
    text-slate-300
    transition-all
    duration-300
    hover:text-cyan-300"
                        >
                            {item.title}
                        </a>

                    ))}

                </div>

                {/* CTA */}

                <Link
                    to="/login"
                    className="
  rounded-full
  bg-cyan-400
  px-8
  py-4
  text-lg
  font-semibold
  text-black
  transition
  duration-300
  hover:scale-105"
                >
                    Get Started
                </Link>

            </motion.nav>

        </header>
    );
}