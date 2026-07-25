import api from "../api/api";

export const getIncidents = async () => {
    const response = await api.get("/incidents/");
    return response.data;
};