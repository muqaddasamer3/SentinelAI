import api from "../api/api";

export async function getPersons() {
    const response = await api.get("/persons/");
    return response.data;
}