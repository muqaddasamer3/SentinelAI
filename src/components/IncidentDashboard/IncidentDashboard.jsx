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
import { useEffect, useState } from "react";
import { getIncidents } from "../../services/incidentService";
import { User } from "lucide-react";

function formatDateTime(timestamp) {
    const date = new Date(timestamp);

    return {
        date: date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }),

        time: date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        }),
    };
}

export default function IncidentDashboard() {

    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadIncidents();

    }, []);


    async function loadIncidents() {

        try {

            const data = await getIncidents();

            setIncidents(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }


    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center text-3xl">

                Loading Incidents...

            </div>

        );

    }


    const total = incidents.length;


    const highAlerts = incidents.filter(
        i => i.severity?.toLowerCase() === "high"
    ).length;


    const mediumAlerts = incidents.filter(
        i => i.severity?.toLowerCase() === "medium"
    ).length;


    const resolutionRate = total === 0
        ? 0
        : Math.round(((total - highAlerts) / total) * 100);



    return (

        <div className="min-h-screen bg-[#EEF3FA]">


            <section className="rounded-b-[40px] bg-gradient-to-r from-[#05171F] via-[#0B1D27] to-black px-10 py-12 text-white">


                <div className="flex justify-between items-center">


                    <div>


                        <div className="inline-flex items-center rounded-full border border-white/30 px-4 py-2">

                            Incident Command Center

                        </div>


                        <Link
                            to="/"
                            className="ml-3 rounded-xl inline-flex items-center border border-white/30 px-4 py-2 hover:bg-white/10 transition"
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
                            to="/feed-overview"
                            className="rounded-xl border border-white/30 px-8 py-4 flex items-center gap-2 hover:bg-white/10 transition"
                        >

                            <Video size={20} />

                            Switch To Live Feed

                        </Link>

                        <Link
    to="/tracking-logs"
    className="rounded-xl border border-white/30 px-8 py-4 flex items-center gap-2 hover:bg-white/10 transition"
>
    <User size={20}/>
    Tracking Logs
</Link>


                    </div>


                </div>


            </section>



            <div className="grid grid-cols-4 gap-6 px-10 -mt-10">


                <Card
                    title="Total Incidents"
                    value={total}
                    color="text-slate-900"
                    icon={<Shield />}
                />


                <Card
                    title="High Alerts"
                    value={highAlerts}
                    color="text-red-600"
                    icon={<AlertTriangle />}
                />


                <Card
                    title="Medium Alerts"
                    value={mediumAlerts}
                    color="text-indigo-600"
                    icon={<Clock3 />}
                />


                <Card
                    title="Resolution Rate"
                    value={`${resolutionRate}%`}
                    color="text-green-600"
                    icon={<CheckCircle2 />}
                />


            </div>




            <div className="mt-10 px-10">


                <div className="rounded-3xl bg-white p-8 shadow">


                    <div className="flex justify-between">


                        <div className="flex gap-3 items-center">

                            <SlidersHorizontal />

                            <h2 className="text-3xl font-bold">

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





                    <table className="w-full mt-10 table-fixed">


                        <thead>


                            <tr className="border-b text-left">


                                <th className="w-32">
                                    ID
                                </th>


                                <th className="w-40">
                                    Type
                                </th>


                                <th className="w-48">
                                    Camera
                                </th>


                                <th className="w-28">
                                    Severity
                                </th>


                                <th className="w-96">
                                    Summary
                                </th>


                                <th className="w-48">
                                    Time
                                </th>


                            </tr>


                        </thead>




                        <tbody>


                            {incidents.map((incident) => (


                                <tr
                                    key={incident.id}
                                    className="border-b h-20 align-top"
                                >



                                    <td className="pt-5 font-semibold">

                                        INC-{incident.id.slice(0,6).toUpperCase()}

                                    </td>




                                    <td className="pt-5">

                                        {incident.incident_type}

                                    </td>




                                    <td className="pt-5">


                                        <div className="font-semibold">

                                            {incident.camera_name || "Unknown Camera"}

                                        </div>


                                        <div className="text-xs text-gray-500 mt-1">

                                            {incident.camera_location || "Unknown Location"}

                                        </div>


                                    </td>





                                    <td className="pt-5">


                                        <span
                                            className={`
                                                px-3 py-1 rounded-full text-sm font-semibold

                                                ${
                                                    incident.severity?.toLowerCase() === "high"
                                                    ? "bg-red-100 text-red-700"
                                                    :
                                                    incident.severity?.toLowerCase() === "medium"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    :
                                                    "bg-green-100 text-green-700"
                                                }
                                            `}
                                        >

                                            {incident.severity}

                                        </span>


                                    </td>





                                    <td className="pt-5">

    <div className="line-clamp-3 text-sm text-gray-700">

        {formatSummary(incident.summary)}

    </div>

</td>





                                    <td className="py-4">
    <div className="font-medium text-gray-900">
        {formatDateTime(incident.timestamp).date}
    </div>

    <div className="text-sm text-gray-500">
        {formatDateTime(incident.timestamp).time}
    </div>
</td>



                                </tr>


                            ))}


                        </tbody>


                    </table>


                </div>


            </div>


        </div>


    );

}

function formatSummary(summary) {

    if (!summary) {
        return "No summary available";
    }


    return summary
        // Remove markdown symbols
        .replace(/[#*`|]/g, "")

        // Remove multiple spaces/new lines
        .replace(/\s+/g, " ")

        // Remove AI assistant opening sentences
        .replace(
            /It appears you are sharing a system log or a security alert notification\.?/i,
            ""
        )
        .replace(
            /It looks like you are sharing a log entry from a security or surveillance monitoring system\.?/i,
            ""
        )
        .replace(
            /Based on the text provided, here is the parsed breakdown of the event:?/i,
            ""
        )
        .replace(
            /Here is a structured breakdown of that information:?/i,
            ""
        )

        // Trim
        .trim()

        // Limit length
        .slice(0, 160)
        + "...";
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