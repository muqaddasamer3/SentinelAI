import { motion } from "framer-motion";
import {
  Camera,
  ScanFace,
  BellRing,
  ShieldCheck,
  BrainCircuit,
  Activity,
} from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Live Camera Monitoring",
    desc: "Monitor unlimited CCTV cameras with AI-powered real-time analytics.",
  },
  {
    icon: ScanFace,
    title: "Face Recognition",
    desc: "Identify known persons instantly using deep learning models.",
  },
  {
    icon: BellRing,
    title: "Instant Alerts",
    desc: "Receive notifications whenever suspicious activity is detected.",
  },
  {
    icon: BrainCircuit,
    title: "AI Analytics",
    desc: "Generate intelligent insights from every surveillance feed.",
  },
  {
    icon: ShieldCheck,
    title: "Threat Detection",
    desc: "Automatically detect intrusions and dangerous situations.",
  },
  {
    icon: Activity,
    title: "24/7 Monitoring",
    desc: "Keep your premises protected day and night with AI automation.",
  },
];

export default function Features() {
  return (
    <section  id="features" className="relative py-32">

      <div className="mx-auto max-w-7xl px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >

          <p className="text-cyan-400 uppercase tracking-[6px] text-sm">
            FEATURES
          </p>

          <h2 className="mt-5 text-5xl font-medium text-white">
            Everything You Need
          </h2>

          <p className="mt-6 max-w-2xl text-slate-400 text-lg">
            Powerful AI tools designed for modern surveillance and
            intelligent monitoring systems.
          </p>

        </motion.div>

        <div className="mt-20 grid gap-7 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * .08 }}
                className="
                group
                rounded-3xl
                border
                border-white/5
                bg-[#10141B]
                p-8
                transition-all
                duration-500
                hover:border-cyan-400/20
                hover:-translate-y-2
                hover:shadow-[0_0_35px_rgba(0,255,255,.15)]"
              >

                <div
                  className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-cyan-400/10
                  text-cyan-400
                  transition
                  group-hover:rotate-6">

                  <Icon size={30} />

                </div>

                <h3 className="mt-7 text-2xl font-medium text-white">
                  {feature.title}
                </h3>

                <p className="mt-5 leading-8 text-slate-400">
                  {feature.desc}
                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}