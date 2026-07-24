import { motion } from "framer-motion";
import {
  Camera,
  ShieldAlert,
  UserRound,
  ScanFace,
  Clock3,
  CircleAlert,
} from "lucide-react";

const events = [
  {
    id: 1,
    icon: <ScanFace size={18} />,
    title: "Face Recognized",
    location: "Main Entrance",
    time: "2 sec ago",
    confidence: "99%",
    color: "cyan",
  },
  {
    id: 2,
    icon: <ShieldAlert size={18} />,
    title: "Suspicious Activity",
    location: "Parking Zone",
    time: "18 sec ago",
    confidence: "94%",
    color: "red",
  },
  {
    id: 3,
    icon: <UserRound size={18} />,
    title: "Unauthorized Person",
    location: "Warehouse",
    time: "35 sec ago",
    confidence: "97%",
    color: "orange",
  },
  {
    id: 4,
    icon: <Camera size={18} />,
    title: "Camera Back Online",
    location: "Lobby",
    time: "1 min ago",
    confidence: "100%",
    color: "green",
  },
];

export default function LiveMonitoring() {
  return (
    <section id="monitoring" className="relative py-28">

      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >

          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-cyan-300 text-sm">

            LIVE AI MONITORING

          </span>

          <h2 className="mt-6 text-5xl font-semibold text-white">

            Real-Time Monitoring Timeline

          </h2>

          <p className="mt-5 max-w-2xl text-slate-400 leading-8">

            Every second, Sentinel AI analyzes multiple camera feeds,
            identifies threats, recognizes faces and instantly alerts
            security personnel.

          </p>

        </motion.div>

        {/* Content */}

        <div className="mt-16 grid lg:grid-cols-2 gap-8">

          {/* Timeline */}

          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-[#10151C] p-8"
          >

            <div className="flex items-center justify-between">

              <h3 className="text-2xl font-semibold text-white">

                Live Timeline

              </h3>

              <div className="flex items-center gap-2">

                <div className="h-3 w-3 rounded-full bg-red-500 animate-ping"/>

                <span className="text-red-400 text-sm">

                  LIVE

                </span>

              </div>

            </div>

            <div className="mt-10 space-y-6">

              {events.map((event) => (

                <TimelineItem
                  key={event.id}
                  event={event}
                />

              ))}

            </div>

          </motion.div>

          {/* Threat Panel */}

          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-[#10151C] p-8"
          >

            <h3 className="text-2xl font-semibold text-white">

              Threat Analysis

            </h3>

            <div className="mt-8 space-y-6">

              <ThreatCard
                title="AI Confidence"
                value="98%"
              />

              <ThreatCard
                title="Threat Level"
                value="LOW"
              />

              <ThreatCard
                title="Faces Today"
                value="2,483"
              />

              <ThreatCard
                title="Alerts Generated"
                value="147"
              />

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

function TimelineItem({ event }) {
  return (
    <div className="flex gap-5">

      <div className="flex flex-col items-center">

        <div className="h-12 w-12 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300">

          {event.icon}

        </div>

        <div className="flex-1 w-px bg-white/10 mt-3"/>

      </div>

      <div className="flex-1 rounded-2xl bg-white/5 border border-white/10 p-5">

        <div className="flex justify-between">

          <h4 className="text-white font-medium">

            {event.title}

          </h4>

          <span className="text-xs text-slate-500">

            {event.time}

          </span>

        </div>

        <p className="mt-2 text-slate-400">

          {event.location}

        </p>

        <div className="mt-4 flex justify-between">

          <span className="text-cyan-300">

            AI Confidence

          </span>

          <span className="text-white">

            {event.confidence}

          </span>

        </div>

      </div>

    </div>
  );
}

function ThreatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-400">

            {title}

          </p>

          <h2 className="mt-3 text-3xl font-semibold text-white">

            {value}

          </h2>

        </div>

        <div className="h-14 w-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">

          <CircleAlert className="text-cyan-300"/>

        </div>

      </div>

    </div>
  );
}