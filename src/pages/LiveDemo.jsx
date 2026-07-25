import {
    Camera,
    Users,
    AlertTriangle,
    Activity
} from "lucide-react";

import { useEffect, useState } from "react";


export default function LiveDemo(){


    const [people,setPeople] = useState(0);

    const [alerts,setAlerts] = useState(0);



    useEffect(()=>{


        // Temporary simulation
        // Later connect WebSocket/FastAPI


        const interval = setInterval(()=>{


            setPeople(
                Math.floor(Math.random()*20)
            );


            setAlerts(
                Math.floor(Math.random()*5)
            );


        },3000);



        return ()=>clearInterval(interval);


    },[]);



    return (

        <div className="min-h-screen bg-[#EEF3FA] p-10">


            <div className="
                bg-white
                rounded-3xl
                shadow
                p-8
            ">


                <h1 className="text-4xl font-bold">

                    Live CCTV Demo

                </h1>


                <p className="text-gray-500 mt-2">

                    Real-time AI surveillance monitoring

                </p>




                {/* Camera Feed */}


                <div className="
                    mt-8
                    h-[450px]
                    bg-black
                    rounded-3xl
                    flex
                    items-center
                    justify-center
                ">


                    <div className="text-center">


                        <Camera
                            size={80}
                            className="text-cyan-400 mx-auto"
                        />


                        <p className="text-white mt-5 text-xl">

                            Live Camera Stream

                        </p>


                    </div>


                </div>





                {/* Stats */}


                <div className="
                    mt-8
                    grid
                    grid-cols-4
                    gap-6
                ">



                    <Card

                        icon={<Activity/>}

                        title="Camera Status"

                        value="ONLINE"

                    />



                    <Card

                        icon={<Users/>}

                        title="People Detected"

                        value={people}

                    />



                    <Card

                        icon={<AlertTriangle/>}

                        title="Active Alerts"

                        value={alerts}

                    />



                    <Card

                        icon={<Camera/>}

                        title="Camera"

                        value="Camera 01"

                    />



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

        <div className="
            rounded-2xl
            bg-gray-100
            p-6
        ">


            <div className="text-cyan-600">

                {icon}

            </div>


            <p className="text-gray-500 mt-3">

                {title}

            </p>


            <h2 className="text-2xl font-bold mt-2">

                {value}

            </h2>


        </div>

    );

}