const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    posterUrl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    mood:{
        type:String,
        enum:{
            values:["happy","sad","surprised","neutral"],
            message:"Enum this is"
        },
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
})


const songModel = mongoose.model('songs',songSchema);

module.exports = songModel;