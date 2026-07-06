const mongoose = require('mongoose');



function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to Database");        
    })
    .catch(err=>{
        console.log("Error coonecting to DB",err);
        
    })
}


module.exports = connectDB;