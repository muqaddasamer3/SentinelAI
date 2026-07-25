import { useEffect, useState } from "react";
import {
    Globe,
    Eye,
    Grid2x2,
    Circle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCameras } from "../../services/cameraService";

export default function FeedOverview() {

    const navigate = useNavigate();

    const [cameras, setCameras] = useState([]);
    const [loading, setLoading] = useState(true);

    const [active, setActive] = useState(0);

    useEffect(() => {

        const loadCameras = async () => {

            try {

                const data = await getCameras();

                setCameras(data);

            } catch (error) {

                console.error("Failed to load cameras", error);

            } finally {

                setLoading(false);

            }

        };

        loadCameras();

    }, []);

    if (loading) {

        return (

            <div className="text-center text-white text-2xl mt-20">

                Loading Cameras...

            </div>

        );

    }

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

                        <button
                            onClick={() => navigate("/incident-dashboard")}
                            className="flex items-center gap-3 rounded-3xl bg-white/5 border border-white/10 px-8 py-5 text-slate-400 hover:text-white transition"
                        >

                            <Grid2x2 size={20} />

                            <span>Incident Dashboard</span>

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

                                {cameras.length} / {cameras.length} Live

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

                {/* CAMERA LIST */}

                <div className="mt-8 flex gap-4 overflow-x-auto pb-3">

                    <button
                        onClick={() => setActive(0)}
                        className={`flex items-center gap-3 rounded-full px-9 py-4 whitespace-nowrap transition ${
                            active === 0
                                ? "bg-cyan-400 text-black"
                                : "bg-[#11161D] border border-white/10 text-slate-300"
                        }`}
                    >

                        <Globe size={18} />

                        All Feeds Overview

                    </button>

                    {cameras.map((camera, index) => (

                        <button
                            key={camera.id}
                            onClick={() => setActive(index + 1)}
                            className={`flex items-center gap-3 rounded-full px-9 py-4 whitespace-nowrap transition ${
                                active === index + 1
                                    ? "bg-cyan-400 text-black"
                                    : "bg-[#11161D] border border-white/10 text-slate-300"
                            }`}
                        >

                            <Circle
                                size={12}
                                fill="#22c55e"
                                color="#22c55e"
                            />

                            {camera.camera_name}

                        </button>

                    ))}

                </div>

                {/* FEED */}

                <div className="mt-8 rounded-[30px] border border-white/10 bg-[#11161D] p-5">

                    {active === 0 ? (

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                            {cameras.map((camera, index) => (

                                <div
                                    key={camera.id}
                                    className="overflow-hidden rounded-2xl border border-white/10 bg-black"
                                >

                                    <img
                                        src={`https://picsum.photos/600/400?random=${index}`}
                                        alt={camera.camera_name}
                                        className="h-52 w-full object-cover"
                                    />

                                    <div className="flex items-center justify-between p-4">

                                        <div>

                                            <p className="text-white">

                                                {camera.camera_name}

                                            </p>

                                            <p className="text-slate-400 text-sm">

                                                {camera.location}

                                            </p>

                                        </div>

                                        <span className="flex items-center gap-2 text-green-400 text-sm">

                                            <Circle
                                                size={8}
                                                fill="#22c55e"
                                            />

                                            {camera.status}

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
                                    alt={cameras[active - 1].camera_name}
                                    className="h-[550px] w-full object-cover"
                                />

                            </div>

                            <div className="mt-6 flex justify-between">

                                <div>

                                    <h2 className="text-3xl font-semibold text-white">

                                        {cameras[active - 1].camera_name}

                                    </h2>

                                    <p className="mt-2 text-slate-400">

                                        {cameras[active - 1].location}

                                    </p>

                                </div>

                                <div className="rounded-2xl bg-green-500/10 px-6 py-4 text-green-400 font-semibold">

                                    {cameras[active - 1].status}

                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </section>

    );

}