import api from "../api/api";


export async function getTrackingLogs() {

    const response = await api.get("/tracking-logs/");

    return response.data;

}