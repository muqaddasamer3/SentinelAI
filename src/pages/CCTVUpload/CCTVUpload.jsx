import { motion } from "framer-motion";
import {
  UploadCloud,
  Video,
  Camera,
  Brain,
  User,
  ShieldAlert,
  Flame,

} from "lucide-react";

const uploads = [
  {
    name: "office_camera.mp4",
    status: "Completed",
    accuracy: "98%",
    date: "Today",
  },
  {
    name: "parking_area.mp4",
    status: "Processing",
    accuracy: "--",
    date: "Today",
  },
  {
    name: "warehouse.mp4",
    status: "Completed",
    accuracy: "99%",
    date: "Yesterday",
  },
];

const detections = [
  {
    icon: <User size={20} />,
    title: "Person Detection",
  },
  {
    icon: <Camera size={20} />,
    title: "Face Recognition",
  },
  
  {
    icon: <ShieldAlert size={20} />,
    title: "Weapon Detection",
  },
  {
    icon: <Flame size={20} />,
    title: "Fire Detection",
  },
  {
    icon: <Brain size={20} />,
    title: "AI Behavior",
  },
];

export default function CCTVUpload() {
  return (
    <section className="min-h-screen bg-[#070B10] p-8 text-white">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >

          <h1 className="text-5xl font-semibold">
            Upload CCTV Footage
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Upload recorded surveillance footage for AI-powered incident
            detection, face recognition, vehicle tracking and threat analysis.
          </p>

        </motion.div>

        {/* Top */}

        <div className="mt-12 grid gap-8 lg:grid-cols-3">

          {/* Upload */}

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="lg:col-span-2 rounded-3xl border border-white/10 bg-[#10151D] p-8"
          >

            <div className="rounded-3xl border-2 border-dashed border-cyan-400/30 p-14 text-center">

              <UploadCloud
                size={60}
                className="mx-auto text-cyan-400"
              />

              <h2 className="mt-6 text-2xl font-semibold">
                Drag & Drop CCTV Video
              </h2>

              <p className="mt-3 text-slate-400">
                MP4 • AVI • MOV • MKV
              </p>

              <button className="mt-8 rounded-xl bg-cyan-400 px-8 py-4 font-semibold text-black hover:bg-cyan-300">
                Browse Files
              </button>

            </div>

          </motion.div>

          {/* Stats */}

          <div className="space-y-5">

            <StatCard title="Today's Uploads" value="18" />
            <StatCard title="Processed" value="320" />
            <StatCard title="AI Accuracy" value="98.6%" />
            <StatCard title="Storage Used" value="74%" />

          </div>

        </div>

        {/* Detection */}

        <div className="mt-10 rounded-3xl border border-white/10 bg-[#10151D] p-8">

          <h2 className="text-2xl font-semibold">
            Detection Modules
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {detections.map((item) => (

              <motion.div
                key={item.title}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                }}
                className="rounded-2xl border border-white/10 bg-[#151B24] p-5"
              >

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                    {item.icon}
                  </div>

                  <div>

                    <h3 className="font-medium">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-400">
                      Enabled
                    </p>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

        {/* Recent Uploads */}

        <div className="mt-10 rounded-3xl border border-white/10 bg-[#10151D] p-8">

          <h2 className="mb-8 text-2xl font-semibold">
            Recent Uploads
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-white/10 text-left text-slate-400">

                  <th className="pb-4">Video</th>

                  <th>Status</th>

                  <th>Accuracy</th>

                  <th>Date</th>

                </tr>

              </thead>

              <tbody>

                {uploads.map((video) => (

                  <tr
                    key={video.name}
                    className="border-b border-white/5"
                  >

                    <td className="py-6 flex items-center gap-3">

                      <Video className="text-cyan-400" />

                      {video.name}

                    </td>

                    <td>

                      <StatusBadge status={video.status} />

                    </td>

                    <td>

                      {video.accuracy}

                    </td>

                    <td>

                      {video.date}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </section>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#10151D] p-6">
      <p className="text-slate-400">{title}</p>
      <h2 className="mt-3 text-4xl font-bold">{value}</h2>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm ${
        status === "Completed"
          ? "bg-green-500/20 text-green-400"
          : "bg-yellow-500/20 text-yellow-400"
      }`}
    >
      {status}
    </span>
  );
}