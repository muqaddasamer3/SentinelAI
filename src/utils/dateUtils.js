export function formatDateTime(dateString) {


    if (!dateString) {

        return {
            date: "N/A",
            time: "N/A"
        };

    }



    const date = new Date(dateString);



    return {


        date: date.toLocaleDateString("en-GB", {

            day: "2-digit",

            month: "short",

            year: "numeric",

        }),



        time: date.toLocaleTimeString("en-GB", {

            hour: "2-digit",

            minute: "2-digit",

            second: "2-digit",

        }),


    };


}