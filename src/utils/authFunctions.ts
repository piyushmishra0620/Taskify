import {api} from "@/lib/api";

export async function signup(body:{username:string,email:string,password:string}){
    try{
        const response = await api.post("/auth/signup",body);
        return {data:response.data,status:response.status};
    }catch(err:any){
        return {error:(err.response?.data.error || err.request?.message || err.message)}
    }
}

export async function login(body:{email:string,password:string}){
    try{
        const response = await api.post("/auth/login",body);
        return {data:response.data,status:response.status};
    }catch(err:any){
        return {error:(err.response?.data.error || err.request?.message || err.message)}
    }
}

export async function getUser(){
    try{
        const response = await api.get("/auth/getUser");
    }catch(err:any){

    }
}


export async function logout(){
    try{
        const response = await api.get("/auth/logout");
        return response;
    }catch(err:any){
        return {error:(err.request?.message || err.message)}
    }
}
