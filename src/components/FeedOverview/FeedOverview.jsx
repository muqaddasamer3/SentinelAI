import { useState } from "react";
import {
    Globe,
    Camera,
    Eye,
    Grid2x2,
    Circle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const feeds = [
    {
        id: 0,
        title: "All Feeds Overview",
        icon: <Globe size={18} />,
        count: "",
    },
    {
        id: 1,
        title: "Camera 1 - South Warehouse",
        icon: <Circle size={12} fill="#ef4444" color="#ef4444" />,
        count: 1,
    },
    {
        id: 2,
        title: "Camera 2 - Server Lab",
        icon: <Circle size={12} fill="#ec4899" color="#ec4899" />,
        count: 1,
    },
    {
        id: 3,
        title: "Camera 3 - Main Entrance",
        icon: <Circle size={12} fill="#22c55e" color="#22c55e" />,
        count: 0,
    },
    {
        id: 4,
        title: "Camera 4 - Office",
        icon: <Circle size={12} fill="#22c55e" color="#22c55e" />,
        count: 0,
    },
];

export default function FeedOverview() {
    const [active, setActive] = useState(0);
    const navigate = useNavigate();
    return (
        <section className="py-16">

            <div className="mx-auto w-[96%] max-w-[1700px]">

                {/* TOP BAR */}

                <div className="flex flex-wrap items-center justify-between gap-5">

                    <div className="flex gap-4">

                        <button className="flex items-center gap-3 rounded-3xl bg-[#11161D] border border-white/10 px-8 py-5 text-white">

                            <Eye size={20} />

                            Live CCTV Feeds

                        </button>

                        <button className="flex items-center gap-3 rounded-3xl bg-white/5 border border-white/10 px-8 py-5 text-slate-400 hover:text-white">

                            <Grid2x2 size={20} />

                            <button
                                onClick={() => navigate("/incident-dashboard")}
                                className="..."
                            >

                                Incident Dashboard

                            </button>

                            <span className="rounded-full bg-yellow-500 px-2 py-1 text-xs text-black">

                                3

                            </span>

                        </button>

                    </div>

                    <div className="flex gap-5">

                        <div className="rounded-2xl border border-white/10 bg-[#11161D] px-6 py-4">

                            <p className="text-slate-400 text-sm">

                                ACTIVE FEEDS

                            </p>

                            <h3 className="text-white font-semibold">

                                4 / 4 Live

                            </h3>

                        </div>

                        <div className="rounded-2xl border border-red-400/20 bg-red-500/5 px-6 py-4">

                            <p className="text-slate-400 text-sm">

                                THREAT STATUS

                            </p>

                            <h3 className="text-red-400 font-semibold">

                                HIGH RISK DETECTED

                            </h3>

                        </div>

                    </div>

                </div>

                {/* FEED LIST */}

                <div className="mt-8 flex gap-4 overflow-x-auto pb-3">

                    {feeds.map((feed) => (

                        <button
                            key={feed.id}
                            onClick={() => setActive(feed.id)}
                            className={`flex items-center gap-3 rounded-full px-9 py-4 whitespace-nowrap transition

              ${active === feed.id
                                    ? "bg-cyan-400 text-black"
                                    : "bg-[#11161D] border border-white/10 text-slate-300"
                                }`}
                        >

                            {feed.icon}

                            {feed.title}

                            {feed.count > 0 && (
                                <span className="rounded-full bg-gray-500 px-2 py-1 text-xs text-black">

                                    {feed.count}

                                </span>
                            )}

                        </button>

                    ))}

                </div>

                {/* FEED */}

                <div className="mt-8 rounded-[30px] border border-white/10 bg-[#11161D] p-5">

                    {active === 0 ? (

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                            {[1, 2, 3, 4].map((cam) => (

                                <div
                                    key={cam}
                                    className="overflow-hidden rounded-2xl border border-white/10 bg-black"
                                >

                                    <img
                                        src={`https://picsum.photos/600/400?random=${cam}`}
                                        className="h-52 w-full object-cover"
                                    />

                                    <div className="flex items-center justify-between p-4">

                                        <p className="text-white">

                                            Camera {cam}

                                        </p>

                                        <span className="flex items-center gap-2 text-green-400 text-sm">

                                            <Circle
                                                size={8}
                                                fill="#22c55e"
                                            />

                                            LIVE

                                        </span>

                                    </div>

                                </div>

                            ))}

                        </div>

                    ) : (

                        <div>

                            <div className="overflow-hidden rounded-2xl">

                                <img
                                    src={`https://picsum.photos/1400/700?random=${active}`}
                                    className="h-[550px] w-full object-cover"
                                />

                            </div>

                            <div className="mt-6 flex justify-between">

                                <div>

                                    <h2 className="text-3xl font-semibold text-white">

                                        {feeds[active].title}

                                    </h2>

                                    <p className="mt-2 text-slate-400">

                                        AI Monitoring Active

                                    </p>

                                </div>

                                <div className="rounded-2xl bg-green-500/10 px-6 py-4 text-green-400">

                                    LIVE

                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </section>
    );
}