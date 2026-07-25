import {
    Camera,
    MapPin,
    Users,
    Activity,
    Circle
} from "lucide-react";

import { Link } from "react-router-dom";


export default function Surveillance() {


    const cameras = [
        {
            id: 1,
            name: "Camera 01",
            location: "Main Entrance",
            status: "Online",
            persons: 12,
            activity: "High"
        },

        {
            id: 2,
            name: "Camera 02",
            location: "Parking Area",
            status: "Online",
            persons: 5,
            activity: "Normal"
        },

        {
            id: 3,
            name: "Camera 03",
            location: "Warehouse",
            status: "Offline",
            persons: 0,
            activity: "No Signal"
        },

        {
            id: 4,
            name: "Camera 04",
            location: "Lobby",
            status: "Online",
            persons: 8,
            activity: "Medium"
        }
    ];



    return (

        <div className="min-h-screen bg-[#EEF3FA] p-10">


            <div className="bg-white rounded-3xl shadow p-8">


                <div className="flex justify-between items-center mb-8">


                    <div>

                        <h1 className="text-4xl font-bold">
                            Surveillance
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Live AI powered CCTV monitoring
                        </p>

                    </div>


                    <Link
                        to="/"
                        className="border px-5 py-3 rounded-xl hover:bg-gray-100"
                    >
                        Dashboard
                    </Link>


                </div>



                <div className="grid grid-cols-2 gap-8">


                    {
                        cameras.map((camera)=>(


                            <div
                                key={camera.id}
                                className="
                                rounded-3xl
                                border
                                overflow-hidden
                                bg-[#11161D]
                                text-white"
                            >



                                {/* Video Area */}

                                <div className="
                                h-64
                                bg-black
                                flex
                                items-center
                                justify-center
                                ">


                                    <Camera
                                        size={70}
                                        className="text-cyan-400"
                                    />


                                </div>




                                <div className="p-6">



                                    <div className="flex justify-between">


                                        <h2 className="text-xl font-semibold">

                                            {camera.name}

                                        </h2>



                                        <div className="flex items-center gap-2">


                                            <Circle
                                                size={12}
                                                fill={
                                                    camera.status === "Online"
                                                    ?
                                                    "green"
                                                    :
                                                    "red"
                                                }
                                            />


                                            {camera.status}


                                        </div>


                                    </div>





                                    <div className="mt-4 space-y-3 text-slate-300">



                                        <div className="flex gap-2 items-center">

                                            <MapPin size={18}/>

                                            {camera.location}

                                        </div>





                                        <div className="flex gap-2 items-center">

                                            <Users size={18}/>

                                            Persons Detected:

                                            <b>
                                                {camera.persons}
                                            </b>

                                        </div>





                                        <div className="flex gap-2 items-center">


                                            <Activity size={18}/>


                                            Activity:

                                            <b>
                                                {camera.activity}
                                            </b>


                                        </div>



                                    </div>


                                </div>



                            </div>


                        ))

                    }



                </div>


            </div>


        </div>

    );

}