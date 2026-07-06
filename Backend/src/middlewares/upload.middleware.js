const multer = require('multer');


const storage = multer.memoryStorage();

const upload = multer({
    storage:storage,
    limit:{
        fileSize:1024*1024*10
    }
})


module.exports = upload;