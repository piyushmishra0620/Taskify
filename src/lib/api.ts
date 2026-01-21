import axios from "axios";

export const api = axios.create({
    baseURL:"/services",
    headers:{
        "Content-Type":"application/json"
    },
    withCredentials:true
});
