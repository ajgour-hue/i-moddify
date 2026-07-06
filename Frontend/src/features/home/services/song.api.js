import axios from 'axios';


const api = axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true
})


export async function getSong({mood}){
    const response = await api.get('/songs?mood='+mood)
    return response.data;
}

export async function getMoodSongs({mood}){
    const response = await api.get('/songs/moodsongs?mood='+mood)
    return response.data;
}

export async function getAllSongs(){
    const response = await api.get('/songs/allsongs')
    return response.data;
}

export async function uploadSong(formData){
    const response = await api.post('/songs', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data;
}

export async function updateSong(id, data){
    const response = await api.put(`/songs/${id}`, data)
    return response.data;
}

export async function deleteSong(id){
    const response = await api.delete(`/songs/${id}`)
    return response.data;
}