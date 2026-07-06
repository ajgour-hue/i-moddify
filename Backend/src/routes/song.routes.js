const express = require('express');
const upload = require('../middlewares/upload.middleware');
const authUser = require('../middlewares/auth.middleware');
const { uploadSong, getSong, getMoodSongs ,getAllSongs, updateSong, deleteSong} = require('../controllers/song.controller');
const router = express.Router();


router.post('/', authUser, upload.single('song'),uploadSong)

router.get('/',getSong);
router.get("/moodsongs",getMoodSongs);
router.get('/allsongs',getAllSongs)

router.put('/:id', authUser, updateSong)
router.delete('/:id', authUser, deleteSong)

module.exports =router;