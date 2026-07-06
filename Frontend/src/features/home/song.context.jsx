import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({children})=>{

    const [song, setSong] = useState('')
    const [moodSongs, setMoodSongs] = useState([])
    const [allSongs, setAllSongs] = useState([])
    const [currentMood, setCurrentMood] = useState("")

    const [loading, setLoading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState('idle') // idle, uploading, success, error
    const [uploadMessage, setUploadMessage] = useState('')


    return (
      <SongContext.Provider value={{ 
        song, setSong, 
        loading, setLoading, 
        moodSongs, setMoodSongs, 
        allSongs, setAllSongs, 
        currentMood, setCurrentMood,
        uploadStatus, setUploadStatus,
        uploadMessage, setUploadMessage
      }}>
        {children}
      </SongContext.Provider>
    )


}