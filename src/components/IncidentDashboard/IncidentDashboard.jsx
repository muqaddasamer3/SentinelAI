import {
    Shield,
    AlertTriangle,
    Clock3,
    CheckCircle2,
    Search,
    SlidersHorizontal,
    Download,
    Video,
} from "lucide-react";
import { Link } from "react-router-dom";
export default function IncidentDashboard() {

    return (

        <div className="min-h-screen bg-[#EEF3FA]">

            {/* HERO */}

            <section className="rounded-b-[40px] bg-gradient-to-r from-[#05171F] via-[#0B1D27] to-black px-10 py-12 text-white">

                <div className="flex justify-between items-center">

                    <div>

                        <div className="inline-flex items-center rounded-full border border-white/30 px-4 py-2">

                            Incident Command Center

                        </div>
                          <Link
        to="/"
        className="rounded-xl inline-flex items-center border border-white/30 px-4 py-2 flex items-center gap-2 hover:bg-white/10 transition"
    >
        Home
    </Link>

                        <h1 className="mt-6 text-6xl font-bold">

                            Incident Management Dashboard

                        </h1>

                        <p className="mt-5 max-w-3xl text-xl opacity-90">

                            Real-time chronological log of all incidents,
                            intruder alerts,
                            hazards,
                            AI detections and emergency events.

                        </p>

                    </div>

                    <div className="flex gap-4">
 
                        <button className="rounded-xl bg-white px-8 py-4 text-blue-700 font-semibold flex gap-2">

                            <Download />

                            Export CSV

                        </button>

                       <Link
    to="/feed-overview"   // Change this to your actual route
    className="rounded-xl border border-white/30 px-8 py-4 flex items-center gap-2 hover:bg-white/10 transition"
>
    <Video size={20} />
    Switch To Live Feed
</Link>

                    </div>

                </div>

            </section>

            {/* STATS */}

            <div className="grid grid-cols-4 gap-6 px-10 -mt-10">

                <Card
                    title="Total Incidents"
                    value="11"
                    color="text-slate-900"
                    icon={<Shield />}
                />

                <Card
                    title="Active Alerts"
                    value="3"
                    color="text-red-600"
                    icon={<AlertTriangle />}
                />

                <Card
                    title="In Progress"
                    value="2"
                    color="text-indigo-600"
                    icon={<Clock3 />}
                />

                <Card
                    title="Resolution Rate"
                    value="55%"
                    color="text-green-600"
                    icon={<CheckCircle2 />}
                />

            </div>

            {/* FILTER */}

            <div className="mt-10 px-10">

                <div className="rounded-3xl bg-gray-400 p-8 shadow">

                    <div className="flex justify-between">

                       <div className="flex gap-3 items-center text-slate-700">

    <SlidersHorizontal className="text-slate-600" />

    <h2 className="text-3xl font-bold text-slate-700">
        Incident Directory
    </h2>

</div>

                        <div className="flex items-center rounded-xl border px-5 py-3 w-96">

                            <Search />

                            <input
                                placeholder="Search..."
                                className="ml-3 w-full outline-none"
                            />

                        </div>

                    </div>

                    <table className="w-full mt-10">

                        <thead>

                            <tr className="text-left border-b">

                                <th>ID</th>

                                <th>Incident</th>

                                <th>Camera</th>

                                <th>Status</th>

                                <th>Time</th>

                            </tr>

                        </thead>

                        <tbody>

                            {[
                                {
                                    id: "INC-1001",
                                    type: "Unauthorized Person",
                                    cam: "Camera 2",
                                    status: "Open",
                                    time: "2 min ago"
                                },
                                {
                                    id: "INC-1002",
                                    type: "Fire Hazard",
                                    cam: "Camera 5",
                                    status: "Resolved",
                                    time: "18 min ago"
                                },
                                {
                                    id: "INC-1003",
                                    type: "Fall Detection",
                                    cam: "Camera 1",
                                    status: "In Progress",
                                    time: "35 min ago"
                                }
                            ].map(item => (

                                <tr
                                    key={item.id}
                                    className="border-b h-16">

                                    <td>{item.id}</td>

                                    <td>{item.type}</td>

                                    <td>{item.cam}</td>

                                    <td>{item.status}</td>

                                    <td>{item.time}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

function Card({ title, value, icon, color }) {

    return (

        <div className="rounded-3xl bg-white p-8 shadow">

            <div className="flex justify-between">

                <div>

                    <p className="text-slate-500">

                        {title}

                    </p>

                    <h2 className={`mt-4 text-5xl font-bold ${color}`}>

                        {value}

                    </h2>

                </div>

                <div className="text-blue-600">

                    {icon}

                </div>

            </div>

        </div>

    );

}