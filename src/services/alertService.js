import api from "../api/api";


export async function getAlerts(){

    const response = await api.get("/alerts/");

    return response.data;

}


export async function createAlert(data){

    const response = await api.post(
        "/alerts/",
        data
    );

    return response.data;

}


export async function updateAlert(id,data){

    const response = await api.put(
        `/alerts/${id}`,
        data
    );

    return response.data;

}


export async function deleteAlert(id){

    const response = await api.delete(
        `/alerts/${id}`
    );

    return response.data;

}