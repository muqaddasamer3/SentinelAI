import {
    Search,
    MapPin,
    User,
    CheckCircle,
    XCircle,
    ArrowLeft
} from "lucide-react";

import { useEffect, useState } from "react";
import { getTrackingLogs } from "../../services/trackingLogService";
import { Link } from "react-router-dom";


// Format timestamp
function formatDateTime(timestamp) {

    if (!timestamp) {
        return {
            date: "N/A",
            time: "N/A"
        };
    }


    const date = new Date(timestamp);


    return {

        date: date.toLocaleDateString(),

        time: date.toLocaleTimeString()

    };

}



export default function TrackingLogs() {


    const [logs, setLogs] = useState([]);

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        loadLogs();

    }, []);




    async function loadLogs() {


        try {


            const data = await getTrackingLogs();


            console.log("TRACKING LOG DATA:", data);


            setLogs(data);


        }

        catch(error) {


            console.error(
                "Failed to load tracking logs:",
                error
            );


        }

        finally {


            setLoading(false);


        }


    }





    if(loading) {


        return (

            <div className="min-h-screen flex items-center justify-center text-3xl">

                Loading Tracking Logs...

            </div>

        );


    }





    return (

        <div className="min-h-screen bg-[#EEF3FA] p-10">


            <div className="bg-white rounded-3xl shadow p-8">



                <div className="flex justify-between items-center mb-8">



                    <div>


                        <div className="flex items-center gap-4">


                            <Link
                                to="/"
                                className="rounded-xl border px-4 py-2 flex items-center gap-2 hover:bg-gray-100"
                            >

                                <ArrowLeft size={18}/>

                                Home

                            </Link>



                            <h1 className="text-4xl font-bold">

                                Person Tracking Logs

                            </h1>


                        </div>



                        <p className="text-gray-500 mt-2">

                            AI detection and movement history

                        </p>


                    </div>





                    <div className="border rounded-xl px-5 py-3 flex gap-3">


                        <Search />


                        Search


                    </div>



                </div>






                <table className="w-full table-fixed">


                    <thead>


                        <tr className="border-b text-left">


                            <th className="w-32">
                                Person
                            </th>


                            <th className="w-48">
                                Camera
                            </th>


                            <th>
                                Event
                            </th>


                            <th>
                                Confidence
                            </th>


                            <th>
                                Face Match
                            </th>


                            <th>
                                Time
                            </th>


                        </tr>


                    </thead>





                    <tbody>


                    {

                    logs.length === 0 ?


                    (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center py-10 text-gray-500"
                            >

                                No Tracking Logs Found

                            </td>


                        </tr>


                    )

                    :


                    logs.map((log)=>(



                        <tr
                            key={log.id}
                            className="border-b h-20"
                        >




                            <td>


                                <div className="flex gap-2 items-center font-semibold">


                                    <User size={18}/>


                                    {log.person_code || "Unknown"}


                                </div>


                            </td>







                            <td>


                                <div className="font-semibold">


                                    {log.camera_name || "Unknown Camera"}


                                </div>




                                <div className="text-sm text-gray-500 flex gap-1">


                                    <MapPin size={14}/>


                                    {log.camera_location || "Unknown"}


                                </div>


                            </td>







                            <td>


                                {log.event_type || "Detection"}


                            </td>







                            <td>


                                {

                                    log.confidence

                                    ?

                                    Math.round(
                                        log.confidence * 100
                                    )

                                    :

                                    0

                                }%



                            </td>








                            <td>



                                {

                                    log.face_matched ?


                                    <span className="text-green-600 flex gap-2">


                                        <CheckCircle size={18}/>


                                        Matched


                                    </span>


                                    :


                                    <span className="text-red-600 flex gap-2">


                                        <XCircle size={18}/>


                                        Unknown


                                    </span>


                                }


                            </td>









                            <td className="py-4">


                                <div className="font-medium text-gray-900">


                                    {
                                        formatDateTime(log.timestamp).date
                                    }


                                </div>



                                <div className="text-sm text-gray-500">


                                    {
                                        formatDateTime(log.timestamp).time
                                    }


                                </div>


                            </td>





                        </tr>



                    ))


                    }





                    </tbody>



                </table>




            </div>


        </div>


    );


}