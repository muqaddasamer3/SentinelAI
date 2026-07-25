import api from "../api/api";

export const getCameras = async () => {
    const response = await api.get("/cameras/");
    return response.data;
};