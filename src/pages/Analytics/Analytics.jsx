import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

import {
    Activity,
    Users,
    AlertTriangle,
    Camera,
    ArrowLeft
} from "lucide-react";

import { Link } from "react-router-dom";



export default function Analytics(){


    const detectionData = [

        {
            time:"08:00",
            detections:40
        },

        {
            time:"10:00",
            detections:75
        },

        {
            time:"12:00",
            detections:120
        },

        {
            time:"14:00",
            detections:90
        },

        {
            time:"16:00",
            detections:150
        },

        {
            time:"18:00",
            detections:100
        }

    ];



    const peopleTrend = [

        {
            day:"Mon",
            people:120
        },

        {
            day:"Tue",
            people:180
        },

        {
            day:"Wed",
            people:240
        },

        {
            day:"Thu",
            people:160
        },

        {
            day:"Fri",
            people:300
        },

        {
            day:"Sat",
            people:220
        }

    ];



    const incidents = [

        {
            name:"Normal",
            value:70
        },

        {
            name:"Suspicious",
            value:20
        },

        {
            name:"Critical",
            value:10
        }

    ];



    const cameraPerformance=[

        {
            camera:"Cam 01",
            uptime:98
        },

        {
            camera:"Cam 02",
            uptime:95
        },

        {
            camera:"Cam 03",
            uptime:70
        },

        {
            camera:"Cam 04",
            uptime:92
        }

    ];



    return (

        <div className="min-h-screen bg-[#EEF3FA] p-10">


            <div className="bg-white rounded-3xl shadow p-8">


                {/* Header */}

                <div className="flex justify-between items-center mb-10">


                    <div>


                        <div className="flex items-center gap-4">


                            <Link
                                to="/"
                                className="
                                border
                                rounded-xl
                                px-4
                                py-2
                                flex
                                gap-2
                                items-center
                                hover:bg-gray-100"
                            >

                                <ArrowLeft size={18}/>

                                Home

                            </Link>


                            <h1 className="text-4xl font-bold">

                                Analytics

                            </h1>


                        </div>


                        <p className="text-gray-500 mt-3">

                            AI monitoring statistics and system performance

                        </p>


                    </div>



                </div>





                {/* Summary Cards */}


                <div className="grid grid-cols-4 gap-6 mb-10">


                    <Card
                        icon={<Activity/>}
                        title="Detections"
                        value="12,450"
                    />


                    <Card
                        icon={<Users/>}
                        title="People Tracked"
                        value="3,240"
                    />


                    <Card
                        icon={<AlertTriangle/>}
                        title="Incidents"
                        value="84"
                    />


                    <Card
                        icon={<Camera/>}
                        title="Cameras"
                        value="24"
                    />


                </div>







                {/* Detection Graph */}


                <div className="grid grid-cols-2 gap-8">


                    <ChartBox title="Detection Activity">


                        <ResponsiveContainer width="100%" height={300}>


                            <LineChart data={detectionData}>


                                <CartesianGrid strokeDasharray="3 3"/>


                                <XAxis dataKey="time"/>


                                <YAxis/>


                                <Tooltip/>


                                <Line
                                    type="monotone"
                                    dataKey="detections"
                                    strokeWidth={3}
                                />


                            </LineChart>


                        </ResponsiveContainer>


                    </ChartBox>






                    {/* People Trend */}


                    <ChartBox title="People Count Trend">


                        <ResponsiveContainer width="100%" height={300}>


                            <BarChart data={peopleTrend}>


                                <CartesianGrid strokeDasharray="3 3"/>


                                <XAxis dataKey="day"/>


                                <YAxis/>


                                <Tooltip/>


                                <Bar
                                    dataKey="people"
                                />


                            </BarChart>


                        </ResponsiveContainer>


                    </ChartBox>





                    {/* Incident Statistics */}


                    <ChartBox title="Incident Statistics">


                        <ResponsiveContainer width="100%" height={300}>


                            <PieChart>


                                <Pie

                                    data={incidents}

                                    dataKey="value"

                                    nameKey="name"

                                    outerRadius={100}

                                    label

                                >

                                    {
                                        incidents.map(
                                            (entry,index)=>(

                                            <Cell key={index}/>

                                            )
                                        )
                                    }


                                </Pie>


                                <Tooltip/>


                            </PieChart>


                        </ResponsiveContainer>


                    </ChartBox>








                    {/* Camera Performance */}


                    <ChartBox title="Camera Performance">


                        <ResponsiveContainer width="100%" height={300}>


                            <BarChart data={cameraPerformance}>


                                <CartesianGrid strokeDasharray="3 3"/>


                                <XAxis dataKey="camera"/>


                                <YAxis/>


                                <Tooltip/>


                                <Bar
                                    dataKey="uptime"
                                />


                            </BarChart>


                        </ResponsiveContainer>


                    </ChartBox>



                </div>




            </div>


        </div>


    );

}





function Card({
    icon,
    title,
    value
}){

    return (

        <div
            className="
            rounded-2xl
            bg-[#11161D]
            text-white
            p-6"
        >

            <div className="text-cyan-400">

                {icon}

            </div>


            <p className="text-slate-400 mt-3">

                {title}

            </p>


            <h2 className="text-3xl font-bold mt-2">

                {value}

            </h2>


        </div>

    );

}





function ChartBox({
    title,
    children
}){

    return (

        <div
            className="
            rounded-3xl
            border
            p-6"
        >

            <h2 className="text-xl font-semibold mb-5">

                {title}

            </h2>


            {children}


        </div>

    );

}