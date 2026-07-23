import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Camera,
    Bell,
    Activity,
    Settings,
    Search,
} from "lucide-react";

export default function DashboardPreview() {
    return (
        <section id="dashboard" className="py-24">
        <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .3, duration: .9 }}
            className="relative mx-auto mt-20 w-[100%] max-w-[1700px]"
        >

            {/* Glow */}

            <div className="absolute -inset-2 rounded-[36px] bg-cyan-400/20 blur-3xl" />

            {/* Main Card */}

            <div
                className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-cyan-400/10
        bg-[#0B0E13]/95
        backdrop-blur-3xl
        shadow-[0_0_80px_rgba(0,255,255,.08)]"
            >

                <div className="grid grid-cols-12">

                    {/* Sidebar */}

                    <aside className="col-span-2 border-r border-white/5 p-8">

                        <h2 className="flex items-center gap-3 text-lg font-semibold">

                            <LayoutDashboard className="text-cyan-400" />

                            Dashboard

                        </h2>

                        <div className="mt-10 space-y-3">

                            {[
                                "Dashboard",
                                "Surveillance",
                                "Alerts",
                                "Analytics",
                                "Persons",

                                "Settings",
                            ].map((item, index) => (

                                <button
                                    key={item}
                                    className={`
      w-full
      rounded-xl
      px-4
      py-3
      text-left
      transition-all
      duration-300

      ${index === 0
                                            ? "bg-cyan-400/10 text-cyan-300 border border-cyan-400/20"
                                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                                        }
    `}
                                >
                                    {item}
                                </button>

                            ))}

                        </div>

                    </aside>

                    {/* Main */}

                    <div className="col-span-6 p-8">

                        {/* Top */}

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-3xl font-semibold text-white">
                                    Dashboard Overview
                                </h2>

                                <p className="mt-2 text-slate-500">
                                    Customize your monitoring view
                                </p>

                            </div>

                            <div
                                className="
flex
items-center
gap-3
rounded-xl
border
border-white/5
bg-[#11161D]
px-5
py-4
w-[260px]
">

                                <Search size={18} className="text-slate-500" />

                                <input
                                    placeholder="Search widgets"
                                    className="
bg-transparent
outline-none
text-slate-400
placeholder:text-slate-600
w-full"
                                />

                            </div>

                        </div>

                        {/* Widgets */}

                        <div className="mt-8 grid grid-cols-4 gap-4">
                            <Widget
                                icon={<Camera />}
                                title="Online Cameras"
                                value="24"
                            />

                            <Widget
                                icon={<Bell />}
                                title="Alerts"
                                value="08"
                            />

                            <Widget
                                icon={<Activity />}
                                title="Detection"
                                value="98%"
                            />

                            <Widget
                                icon={<Settings />}
                                title="System Health"
                                value="99%"
                            />

                        </div>

                        {/* Camera */}

                        <div className="mt-8">

                            <div className="mb-4 flex items-center justify-between">

                                <div>

                                    <h3 className="text-xl font-semibold text-white">
                                        Live CCTV Feed
                                    </h3>

                                    <p className="text-slate-400 text-sm">
                                        Camera 01 • Main Entrance
                                    </p>

                                </div>

                                <div className="flex items-center gap-2">

                                    <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>

                                    <span className="text-red-400 text-sm">
                                        LIVE
                                    </span>

                                </div>

                            </div>

                            <div
                                className="
    overflow-hidden
    rounded-3xl
    border
    border-white/10
    bg-black">

                                <img
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600"
                                    className="h-[350px] w-full object-cover"
                                    alt=""
                                />


                            </div> 
                            <div className="mt-4 grid grid-cols-4 gap-4">

                                <SmallInfo title="Status" value="Online" />

                                <SmallInfo title="FPS" value="30" />

                                <SmallInfo title="Objects" value="12" />

                                <SmallInfo title="Confidence" value="98%" />

                            </div>
                            
                        </div>


                    </div>
<div className="col-span-4">

  <div
    className="
    rounded-3xl
    border
    border-white/10
    bg-[#11161D]
    p-6
    sticky
    top-28">

    <h3 className="text-xl font-semibold text-white">

      Add Widgets

    </h3>

    <p className="mt-2 text-sm text-slate-500">

      Drag and drop widgets onto your dashboard

    </p>

    <input
      placeholder="Search widgets..."
      className="
      mt-6
      w-full
      rounded-xl
      border
      border-white/5
      bg-[#0F141A]
      px-4
      py-3
      outline-none
      text-slate-300
      placeholder:text-slate-600"
    />

    <div className="mt-8 space-y-4">

      <DashboardWidget
        title="Online Cameras"
        subtitle="System"
        size="4 x 2"
      />

      <DashboardWidget
        title="Offline Cameras"
        subtitle="System"
        size="4 x 2"
      />

      <DashboardWidget
        title="Storage Server"
        subtitle="System"
        size="4 x 2"
      />

      <DashboardWidget
        title="Network Usage"
        subtitle="System"
        size="4 x 2"
      />

    </div>

  </div>

</div>

                </div>

            </div>

        </motion.div>
        </section>
    );
}

function Widget({ icon, title, value }) {
    return (
        <div
            className="
rounded-2xl
border
border-white/5
bg-[#12161E]
p-4
hover:border-cyan-400/20
hover:-translate-y-1
hover:shadow-[0_0_35px_rgba(0,255,255,.12)]">

            <div className="text-cyan-300">

                {icon}

            </div>

            <p className="mt-3 text-sm text-slate-400">

                {title}

            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">

                {value}

            </h2>

        </div>

    );
}

function SmallInfo({ title, value }) {
    return (
        <div
            className="
      rounded-xl
      border
      border-white/5
      bg-[#12161E]
      p-4"
        >
            <p className="text-xs text-slate-500">
                {title}
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
                {value}
            </h3>
        </div>
    );
}
function DashboardWidget({ title, subtitle, size }) {
    return (
        <div
            className="
      rounded-2xl
      border
      border-white/5
      bg-[#161C24]
      p-5
      transition-all
      duration-300
      hover:border-cyan-400/20
      hover:bg-[#1A222D]
      cursor-pointer"
        >

            <div className="flex items-center justify-between">

                <div>

                    <h4 className="text-white font-medium">
                        {title}
                    </h4>

                    <p className="mt-1 text-xs text-slate-500">
                        {subtitle}
                    </p>

                </div>

                <div
                    className="
          h-9
          w-9
          rounded-lg
          bg-cyan-400/10
          flex
          items-center
          justify-center
          text-cyan-400
          text-lg"
                >
                    +
                </div>

            </div>

            <div className="mt-5 flex items-center justify-between">

                <span className="text-xs text-slate-500">
                    {size}
                </span>

                <span className="text-xs text-cyan-400">
                    Default Size
                </span>

            </div>

        </div>
    );
}