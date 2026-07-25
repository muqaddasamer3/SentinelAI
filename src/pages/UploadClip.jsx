import { useState } from "react";
import {
    Upload as UploadIcon,
    Video,
    CheckCircle,
    AlertTriangle
} from "lucide-react";


export default function Upload(){

    const [file,setFile] = useState(null);

    const [uploading,setUploading] = useState(false);

    const [result,setResult] = useState(null);



    function handleFile(e){

        setFile(e.target.files[0]);

    }



    async function uploadVideo(){


        if(!file){

            alert("Please select CCTV clip");

            return;

        }


        setUploading(true);


        try{


            const formData = new FormData();


            formData.append(
                "file",
                file
            );


            /*
              Backend API will connect here later

              Example:

              await api.post(
                 "/upload-video/",
                 formData
              );

            */


            setTimeout(()=>{


                setResult({

                    persons:12,

                    incidents:2,

                    status:"Analysis Completed"

                });


                setUploading(false);


            },2000);



        }
        catch(error){

            console.error(error);

            setUploading(false);

        }


    }



    return (

        <div className="min-h-screen bg-[#EEF3FA] p-10">


            <div className="
                max-w-4xl
                mx-auto
                bg-white
                rounded-3xl
                shadow
                p-10
            ">


                <h1 className="text-4xl font-bold">

                    Upload CCTV Clip

                </h1>


                <p className="text-gray-500 mt-2">

                    Upload recorded footage for AI incident analysis

                </p>



                <div className="
                    mt-10
                    border-2
                    border-dashed
                    rounded-3xl
                    p-10
                    text-center
                ">


                    <Video
                        size={60}
                        className="mx-auto text-cyan-500"
                    />


                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFile}
                        className="mt-6"
                    />



                    {
                        file && (

                            <p className="mt-4 font-semibold">

                                {file.name}

                            </p>

                        )
                    }



                    <button

                        onClick={uploadVideo}

                        className="
                        mt-6
                        bg-cyan-500
                        text-white
                        px-8
                        py-3
                        rounded-xl
                        hover:bg-cyan-600
                        flex
                        gap-2
                        mx-auto
                        items-center
                        "

                    >

                        <UploadIcon size={18}/>

                        {
                            uploading
                            ?
                            "Processing..."
                            :
                            "Upload Clip"
                        }


                    </button>


                </div>




                {
                    result && (


                        <div className="
                            mt-8
                            grid
                            grid-cols-3
                            gap-5
                        ">


                            <ResultCard

                                icon={<CheckCircle/>}

                                title="Status"

                                value={result.status}

                            />


                            <ResultCard

                                icon={<Video/>}

                                title="Persons"

                                value={result.persons}

                            />


                            <ResultCard

                                icon={<AlertTriangle/>}

                                title="Incidents"

                                value={result.incidents}

                            />


                        </div>


                    )
                }



            </div>


        </div>

    );

}



function ResultCard({
    icon,
    title,
    value
}){


    return (

        <div className="
            rounded-2xl
            bg-gray-100
            p-5
        ">


            <div className="text-cyan-600">

                {icon}

            </div>


            <p className="text-gray-500 mt-3">

                {title}

            </p>


            <h2 className="text-xl font-bold">

                {value}

            </h2>


        </div>

    );

}