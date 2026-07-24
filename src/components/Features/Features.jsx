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
        <section id="features" className="relative py-32">

            <div className="mx-auto max-w-7xl px-8">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >


                    <div className="relative z-10 text-xs uppercase tracking-[4px] text-cyan-400">
                        AI FEATURE
                    </div>

                    <h2 className="mt-5 text-5xl font-medium text-white">
                        Everything You Need
                    </h2>

                    <p className="mt-6 max-w-2xl text-slate-400 text-lg">
                        Powerful AI tools designed for modern surveillance and
                        intelligent monitoring systems.
                    </p>

                </motion.div>

              <div className="mt-20 flex justify-end">
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
    {features.map((feature, index) => {

                        const Icon = feature.icon;

                        return (

                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                whileHover={{ y: -10 }}
                               className={`
group
relative
overflow-hidden
w-[290px]
rounded-[34px]
border border-white/10
bg-white/[0.03]
backdrop-blur-xl
p-8
transition-all
duration-500
${index % 2 === 0 ? "h-[330px]" : "h-[390px]"}
`}
                            >
                                {/* Background Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent" />

                                {/* Decorative Circle */}
                                <div className="absolute -right-20 -top-20 h-52 w-40 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:scale-125" />
                                <div className="relative z-10 mt-5 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10 text-cyan-400 transition-all duration-500 group-hover:scale-110">
                                    <Icon size={28} />
                                </div>

                                 <div className="mt-10">
                                    <h3 className="text-2xl font-semibold text-white leading-tight">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-5 text-slate-400 leading-7">
                                        {feature.desc}
                                    </p>

                                </div>
                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-cyan-400 transition-all duration-500 group-hover:w-full" />
                            </motion.div>

                        );

                    })}

                </div>
</div>
            </div>

        </section>
    );
}