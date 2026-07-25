import {
    User,
    Mail,
    Building,
    Send
} from "lucide-react";

import { useState } from "react";


export default function RequestDemo(){


    const [submitted,setSubmitted] = useState(false);



    function submitRequest(e){

        e.preventDefault();

        setSubmitted(true);

    }



    return (

        <div className="min-h-screen bg-[#EEF3FA] p-10">


            <div className="
                max-w-3xl
                mx-auto
                bg-white
                rounded-3xl
                shadow
                p-10
            ">


                <h1 className="text-4xl font-bold">

                    Request SentinelAI Demo

                </h1>


                <p className="text-gray-500 mt-2">

                    Schedule a live AI surveillance demonstration

                </p>



                {
                    submitted ?


                    <div className="
                        mt-10
                        rounded-xl
                        bg-green-100
                        p-6
                        text-green-700
                        font-semibold
                    ">

                        Demo request submitted successfully.

                    </div>


                    :


                    <form
                        onSubmit={submitRequest}
                        className="mt-8 space-y-5"
                    >


                        <Input
                            icon={<User/>}
                            placeholder="Full Name"
                        />


                        <Input
                            icon={<Mail/>}
                            placeholder="Email Address"
                        />


                        <Input
                            icon={<Building/>}
                            placeholder="Organization"
                        />



                        <button

                            className="
                            flex
                            items-center
                            gap-2
                            bg-cyan-500
                            text-white
                            px-6
                            py-3
                            rounded-xl
                            "

                        >

                            <Send size={18}/>

                            Request Demo

                        </button>



                    </form>


                }


            </div>


        </div>

    );

}



function Input({
    icon,
    placeholder
}){


    return (

        <div className="
            flex
            items-center
            gap-3
            border
            rounded-xl
            p-3
        ">


            {icon}


            <input

                placeholder={placeholder}

                className="
                outline-none
                w-full
                "

            />


        </div>

    );

}