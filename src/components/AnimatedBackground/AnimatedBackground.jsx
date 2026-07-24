import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#05070D]">

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* Top Glow */}
      <motion.div
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-0
        h-[500px]
        w-[500px]
        -translate-x-1/2
        rounded-full
        bg-cyan-500/20
        blur-[140px]"
      />

      {/* Right Glow */}
      <motion.div
        animate={{
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
        }}
        className="absolute
        right-[-180px]
        bottom-[-120px]
        h-[450px]
        w-[450px]
        rounded-full
        bg-blue-600/20
        blur-[160px]"
      />

      {/* Small floating particles */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-20, 20, -20],
            opacity: [.3, 1, .3],
          }}
          transition={{
            duration: 4 + Math.random() * 5,
            repeat: Infinity,
          }}
          className="absolute rounded-full bg-cyan-300"
          style={{
            width: 3,
            height: 3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}