import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  ShieldCheck,
} from "lucide-react";

import DashboardPreview from "../DashboardPreview/DashboardPreview";

export default function Hero() {
  return (
    <section id="home" className="relative z-10 flex min-h-screen flex-col items-center justify-start pt-36 px-6">

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-44 text-center">

        {/* Badge */}

        <motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="mx-auto max-w-5xl text-center"
>

  {/* Badge */}

  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-6 py-2 backdrop-blur-xl">

    <ShieldCheck size={18} className="text-cyan-300" />

    <span className="text-cyan-300 text-sm tracking-wide">
      AI Powered Surveillance
    </span>

  </div>

  {/* Heading */}

  <h1
    className="
    mt-8
    text-5xl
    md:text-6xl
    xl:text-7xl
    font-light
    leading-tight
    tracking-tight
    text-white"
  >

    AI-Powered Surveillance

    <br />

    <span className="font-normal">
      & Smart Analytics Platform
    </span>

  </h1>

  {/* Subtitle */}

  <p
    className="
    mx-auto
    mt-8
    max-w-3xl
    text-lg
    leading-8
    text-slate-400"
  >

    Transform your cameras into intelligent security systems with
    real-time detection, face recognition, tracking and actionable insights.

  </p>

  {/* Buttons */}

  <div className="mt-10 flex flex-wrap justify-center gap-5">

    <button
      className="
      rounded-lg
      bg-cyan-400
      px-8
      py-4
      font-medium
      text-black
      transition
      hover:scale-105">

      Request Demo

    </button>

    <button
      className="
      rounded-lg
      border
      border-cyan-400/40
      bg-transparent
      px-8
      py-4
      text-cyan-300
      transition
      hover:bg-cyan-400/10">

      Watch Live Demo

    </button>

  </div>

</motion.div>

        {/* Dashboard */}

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .7 }}
          className="mt-24 w-full"
        >

          <DashboardPreview />

        </motion.div>

      </div>

    </section>
  );
}