import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000/api/",
    withCredentials:true
})


export async function register({email,username,password}){
    const response = await api.post('/auth/register',{
        email,username,password
    })

    return response.data;
}

export async function login({email,username,password}){
    const response = await api.post('/auth/login',{
        email,username,password
    })
    return response.data;
}


export async function getMe(){
    const response = await api.get('/auth/get-me');
    return response.data;
}

export async function logout(){
    const response = await api.get('/auth/logout');
    return response.data;
}

