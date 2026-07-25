import {
    AlertTriangle,
    ArrowLeft
} from "lucide-react";

import {Link} from "react-router-dom";
import {useEffect,useState} from "react";

import {getAlerts} from "../../services/alertService";
import { formatDateTime } from "../../utils/dateUtils";

export default function Alerts(){

    const [alerts,setAlerts] = useState([]);
    const [loading,setLoading] = useState(true);


    useEffect(()=>{

        loadAlerts();

    },[]);



    async function loadAlerts(){

        try{

            const data = await getAlerts();

            setAlerts(data);

        }
        catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);

        }

    }


    if(loading){

        return(
            <div className="min-h-screen flex items-center justify-center text-3xl">
                Loading Alerts...
            </div>
        )

    }


    return(

<div className="min-h-screen bg-[#EEF3FA] p-10">


<Link
to="/"
className="
inline-flex
items-center
gap-2
mb-8
rounded-xl
bg-black
text-white
px-5
py-3
"
>

<ArrowLeft size={20}/>

Back Home

</Link>



<div className="
rounded-3xl
bg-white
shadow
p-8
">


<div className="flex items-center gap-3 mb-8">

<AlertTriangle
className="text-red-600"
size={35}
/>

<h1 className="text-4xl font-bold">

Alert Center

</h1>

</div>




<table className="w-full">


<thead>

<tr className="border-b text-left">

<th className="p-3">
ID
</th>


<th>
Type
</th>


<th>
Message
</th>


<th>
Status
</th>


<th>
Time
</th>


</tr>

</thead>



<tbody>


{
alerts.map(alert=>(


<tr
key={alert.id}
className="border-b"
>


<td className="p-3">

AL-{alert.id.slice(0,6)}

</td>


<td>

{alert.alert_type}

</td>


<td className="max-w-xl">

<div className="line-clamp-3">

{alert.message}

</div>

</td>



<td>

<span
className={`
px-3
py-1
rounded-full
text-sm
${
alert.status==="Pending"
?
"bg-yellow-100 text-yellow-700"
:
"bg-green-100 text-green-700"
}

`}
>

{alert.status}

</span>


</td>



<td>

{
new Date(
alert.created_at
).toLocaleString()
}

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