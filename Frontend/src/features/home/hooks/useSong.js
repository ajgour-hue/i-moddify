import { useContext } from "react";
import { getAllSongs, getMoodSongs, getSong, uploadSong, updateSong, deleteSong } from "../services/song.api";
import { SongContext } from "../song.context";

export const useSong = ()=>{
    const context = useContext(SongContext);

    const {song, setSong, loading, setLoading, moodSongs, setMoodSongs, allSongs, setAllSongs, currentMood, setCurrentMood, uploadStatus, setUploadStatus, uploadMessage, setUploadMessage } = context;

    async function handleGetSong({mood}){
        setLoading(true);
        const data =await getSong({mood})
        setSong(data.song);
        setLoading(false);
    }

    async function handleGetMoodSongs({mood}){
        setLoading(true);
        const data = await getMoodSongs({mood})
        setMoodSongs(data.songs)
        setCurrentMood(mood)
        setLoading(false)
    }

    async function handleGetAllSongs(){
        setLoading(true)
        const data = await getAllSongs()
        setAllSongs(data.songs)
        setLoading(false)
    }

    async function handleUploadSong(formData) {
        setUploadStatus('uploading');
        setUploadMessage('Uploading your song in background...');
        
        try {
            await uploadSong(formData);
            setUploadStatus('success');
            setUploadMessage('✓ Song uploaded successfully!');
            await handleGetAllSongs();
            
            // Clear status after 5s
            setTimeout(() => {
                setUploadStatus('idle');
                setUploadMessage('');
            }, 5000);
            
        } catch (error) {
            console.error("Upload error:", error);
            setUploadStatus('error');
            setUploadMessage('❌ Failed to upload song.');
            
            // Clear error after 5s
            setTimeout(() => {
                setUploadStatus('idle');
                setUploadMessage('');
            }, 5000);
        }
    }

    async function handleUpdateSong(id, data) {
        setLoading(true);
        try {
            await updateSong(id, data);
            await handleGetAllSongs();
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteSong(id) {
        setLoading(true);
        try {
            await deleteSong(id);
            await handleGetAllSongs();
        } finally {
            setLoading(false);
        }
    }

    return (
        {
            handleGetSong, 
            song, setSong, 
            loading, 
            handleGetMoodSongs, 
            moodSongs, 
            allSongs, 
            handleGetAllSongs, 
            currentMood, 
            handleUploadSong, 
            handleUpdateSong, 
            handleDeleteSong,
            uploadStatus,
            uploadMessage
        }
    )
}