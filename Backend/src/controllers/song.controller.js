const songModel = require('../models/song.model');
const id3 = require('node-id3');
const storageService = require('../services/storage.service')

async function uploadSong(req,res){

    const songBuffer = req.file.buffer;
    const {mood} = req.body;

    const tags = id3.read(req.file.buffer)

    
    
    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: "cohort/moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "cohort/moodify/posters"
        })
    ])


    const song = await songModel.create({
        title:tags.title,
        url:songFile.url,
        posterUrl:posterFile.url,
        mood,
        uploadedBy: req.user.id
    })

    res.status(201).json({
        message:"Song uploaded successfully",
        song
    })

}



async function getSong(req,res){
    const {mood} = req.query;

     const songs = await songModel.aggregate([
        {$match:{mood:mood}},
        {$sample:{size:1}}
     ]);

     const song = songs.length > 0?songs[0]:null;

     if(!song){
        return res.status(404).json({
            message:"No song found for the given mood"
        })
     }

     res.status(200).json({
        message:"Song fetched successfully",
        song
     })
}


async function getMoodSongs(req,res){
    const {mood} = req.query;

    const songs = await songModel.find({mood});

    res.status(200).json({
        message:"Songs fetched successfully",
        songs
    })
}



async function getAllSongs(req,res){
    const songs = await songModel.find();
    res.status(200).json({
        message:"All songs fetched successfully",
        songs
    })
}

async function updateSong(req, res) {
    const { id } = req.params;
    const { mood, title } = req.body;
    try {
        const songToCheck = await songModel.findById(id);
        if(!songToCheck) return res.status(404).json({ message: "Song not found" });

        if(songToCheck.uploadedBy.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "Unauthorized to edit this song" });
        }

        const song = await songModel.findByIdAndUpdate(id, { mood, title }, { new: true });
        res.status(200).json({ message: "Song updated successfully", song });
    } catch(error) {
        res.status(500).json({ message: "Server error" });
    }
}

async function deleteSong(req, res) {
    const { id } = req.params;
    try {
        const songToCheck = await songModel.findById(id);
        if(!songToCheck) return res.status(404).json({ message: "Song not found" });

        if(songToCheck.uploadedBy.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "Unauthorized to delete this song" });
        }

        const song = await songModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Song deleted successfully", song });
    } catch(error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    uploadSong,
    getSong,
    getMoodSongs,
    getAllSongs,
    updateSong,
    deleteSong
}