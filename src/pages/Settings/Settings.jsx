import {
    User,
    Camera,
    Cpu,
    Shield,
    Save,
    LogOut
} from "lucide-react";

import { useState } from "react";


export default function Settings(){


    const [settings,setSettings] = useState({

        username:"Administrator",

        email:"admin@sentinelai.com",

        detection:true,

        notifications:true,

        confidence:75

    });



    function updateSetting(key,value){

        setSettings({

            ...settings,

            [key]:value

        });

    }



    function saveSettings(){

        alert("Settings Saved");

    }



    return (

        <div className="min-h-screen bg-[#EEF3FA] p-10">


            <div className="
                max-w-5xl
                mx-auto
                bg-white
                rounded-3xl
                shadow
                p-10
            ">


                <h1 className="text-4xl font-bold">

                    System Settings

                </h1>


                <p className="text-gray-500 mt-2">

                    Configure SentinelAI system preferences

                </p>




                {/* Profile */}


                <Section
                    icon={<User/>}
                    title="User Profile"
                >


                    <Input

                        label="Username"

                        value={settings.username}

                    />


                    <Input

                        label="Email"

                        value={settings.email}

                    />


                </Section>





                {/* AI Settings */}


                <Section

                    icon={<Cpu/>}

                    title="AI Detection Settings"

                >


                    <div className="flex justify-between items-center">


                        <span>

                            Enable Person Detection

                        </span>


                        <input

                            type="checkbox"

                            checked={settings.detection}

                            onChange={(e)=>
                                updateSetting(
                                    "detection",
                                    e.target.checked
                                )
                            }

                        />


                    </div>




                    <div className="mt-5">


                        <label>

                            Detection Confidence

                        </label>


                        <input

                            type="range"

                            min="0"

                            max="100"

                            value={settings.confidence}

                            onChange={(e)=>
                                updateSetting(
                                    "confidence",
                                    e.target.value
                                )
                            }

                            className="w-full"

                        />


                        <p>

                            {settings.confidence}%

                        </p>


                    </div>



                </Section>







                {/* Camera Settings */}


                <Section

                    icon={<Camera/>}

                    title="Camera Configuration"

                >


                    <div className="
                        rounded-xl
                        bg-gray-100
                        p-5
                    ">


                        Camera 01

                        <p className="text-gray-500">

                            Main Entrance

                        </p>


                        <p className="text-green-600">

                            Online

                        </p>


                    </div>


                </Section>







                {/* Security */}


                <Section

                    icon={<Shield/>}

                    title="Security"

                >


                    <div className="flex justify-between">


                        <span>

                            Enable Notifications

                        </span>


                        <input

                            type="checkbox"

                            checked={settings.notifications}

                            onChange={(e)=>
                                updateSetting(
                                    "notifications",
                                    e.target.checked
                                )
                            }

                        />


                    </div>



                </Section>







                <div className="flex gap-4 mt-10">


                    <button

                        onClick={saveSettings}

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

                        <Save size={18}/>

                        Save Settings

                    </button>




                    <button

                        className="
                        flex
                        items-center
                        gap-2
                        bg-red-500
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        "

                    >

                        <LogOut size={18}/>

                        Logout

                    </button>


                </div>



            </div>


        </div>

    );

}





function Section({
    icon,
    title,
    children
}){


    return (

        <div className="
            mt-8
            border
            rounded-2xl
            p-6
        ">


            <h2 className="
                flex
                items-center
                gap-3
                text-xl
                font-bold
            ">


                {icon}

                {title}


            </h2>



            <div className="mt-5">

                {children}

            </div>



        </div>

    );

}





function Input({
    label,
    value
}){


    return (

        <div className="mb-4">


            <label className="text-gray-500">

                {label}

            </label>


            <input

                value={value}

                readOnly

                className="
                mt-2
                w-full
                border
                rounded-xl
                p-3
                "

            />


        </div>

    );

}