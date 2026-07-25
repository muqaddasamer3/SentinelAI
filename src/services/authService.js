import axios from "axios";

const API_URL = "http://127.0.0.1:8000/auth";


export async function loginUser(credentials) {

    const response = await axios.post(
        `${API_URL}/login`,
        credentials
    );

    const token = response.data.access_token;

    localStorage.setItem(
        "token",
        token
    );

    return response.data;
}



export async function registerUser(userData) {

    const response = await axios.post(
        `${API_URL}/register`,
        userData
    );

    return response.data;
}



export function logoutUser(){

    localStorage.removeItem(
        "token"
    );

}



export function getToken(){

    return localStorage.getItem(
        "token"
    );

}