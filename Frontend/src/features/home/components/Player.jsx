import React, { useRef, useState, useEffect } from 'react';
import { useSong } from '../hooks/useSong';
import 'remixicon/fonts/remixicon.css';
import '../style/player.scss';

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2]

const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
}

const Player = () => {
    const { song, setSong, allSongs, moodSongs, currentMood } = useSong()

    const audioRef = useRef(null)
    const progressRef = useRef(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [speed, setSpeed] = useState(1)
    const [volume, setVolume] = useState(1)
    const [showSpeed, setShowSpeed] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    // Auto-play logic
    useEffect(() => {
        const audio = audioRef.current;
        const currentSongData = Array.isArray(song) ? song[0] : song;
        if (!audio || !currentSongData?.url) return;

        const handleAutoplay = async () => {
            try {
                audio.pause();
                audio.currentTime = 0;
                audio.src = currentSongData.url;
                audio.load();
                await audio.play();
                setIsPlaying(true);
            } catch (err) {
                console.warn("Playback interrupted or blocked:", err);
                setIsPlaying(false);
            }
        };

        handleAutoplay();

        return () => {
            audio.pause();
            audio.src = "";
        };
    }, [Array.isArray(song) ? song[0]?.url : song?.url]);

    const currentSongData = Array.isArray(song) ? song[0] : song;

    const togglePlay = () => {
        const audio = audioRef.current
        if (!audio || !currentSongData) return
        if (isPlaying) {
            audio.pause()
            setIsPlaying(false)
        } else {
            audio.play().then(() => setIsPlaying(true)).catch(e => console.warn(e))
        }
    }

    const playlistToUse = (currentMood && moodSongs && moodSongs.length > 0) ? moodSongs : allSongs;

    const getNextSong = () => {
        if (!currentSongData || !playlistToUse || playlistToUse.length === 0) return null;
        const currentIndex = playlistToUse.findIndex(s => s._id === currentSongData._id);
        if (currentIndex === -1) return playlistToUse[0];
        const nextIndex = (currentIndex + 1) % playlistToUse.length;
        return playlistToUse[nextIndex];
    }

    const getPrevSong = () => {
        if (!currentSongData || !playlistToUse || playlistToUse.length === 0) return null;
        const currentIndex = playlistToUse.findIndex(s => s._id === currentSongData._id);
        if (currentIndex === -1) return playlistToUse[0];
        const prevIndex = (currentIndex - 1 + playlistToUse.length) % playlistToUse.length;
        return playlistToUse[prevIndex];
    }

    const playNext = () => {
        const nextSong = getNextSong();
        if (nextSong) {
            setSong(nextSong);
        }
    }

    const playPrev = () => {
        const prevSong = getPrevSong();
        if (prevSong) {
            setSong(prevSong);
        }
    }

    const handleTimeUpdate = () => audioRef.current && setCurrentTime(audioRef.current.currentTime)
    const handleLoadedMetadata = () => audioRef.current && setDuration(audioRef.current.duration)

    const handleProgressClick = (e) => {
        if (!currentSongData) return;
        const bar = progressRef.current
        const rect = bar.getBoundingClientRect()
        const ratio = (e.clientX - rect.left) / rect.width
        const newTime = ratio * duration
        audioRef.current.currentTime = newTime
        setCurrentTime(newTime)
    }

    const handleSpeedChange = (s) => {
        setSpeed(s)
        audioRef.current.playbackRate = s
        setShowSpeed(false)
    }

    const handleVolume = (e) => {
        const val = parseFloat(e.target.value)
        setVolume(val)
        if (audioRef.current) {
            audioRef.current.volume = val
            setIsMuted(val === 0)
        }
    }

    const toggleMute = () => {
        const audio = audioRef.current
        if (!audio) return;
        if (isMuted) {
            audio.volume = volume || 0.5
            setIsMuted(false)
        } else {
            audio.volume = 0
            setIsMuted(true)
        }
    }

    const handleSongEnd = () => {
        playNext();
    }

    const progress = duration ? (currentTime / duration) * 100 : 0

    return (
        <div className="player">
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleSongEnd}
            />

            {/* Poster + Info */}
            <div className="player-info">
                <div className={`player-poster-wrapper ${!currentSongData ? 'empty skeleton-poster-bg' : ''}`}>
                    {currentSongData ? (
                        <img className="player-poster" src={currentSongData.posterUrl} alt={currentSongData.title} />
                    ) : (
                        <div className="player-poster-placeholder">
                            <i className="ri-music-2-line"></i>
                        </div>
                    )}
                    {isPlaying && currentSongData && <div className="playing-indicator"></div>}
                </div>
                <div className={`player-meta ${!currentSongData ? 'skeleton' : ''}`}>
                    <p className="player-title">{currentSongData ? currentSongData.title : 'No song selected'}</p>
                    <span className="player-mood">{currentSongData ? currentSongData.mood : '---'}</span>
                </div>
            </div>

            {/* Progress bar */}
            <div className="player-progress-wrap">
                <span className="player-time">{formatTime(currentTime)}</span>
                <div className="player-progress" ref={progressRef} onClick={handleProgressClick}>
                    <div className="player-progress-fill" style={{ width: `${progress}%` }} />
                    <div className="player-progress-thumb" style={{ left: `${progress}%` }} />
                </div>
                <span className="player-time">{formatTime(duration)}</span>
            </div>

            {/* Controls */}
            <div className="player-controls">
                
                {/* Speed picker */}
                <div className="player-speed-wrap">
                    <button className="player-btn player-btn--speed" onClick={() => setShowSpeed(!showSpeed)}>
                        {speed}×
                    </button>
                    {showSpeed && (
                        <div className="player-speed-menu">
                            {SPEED_OPTIONS.map((s) => (
                                <button
                                    key={s}
                                    className={`player-speed-option ${s === speed ? 'active' : ''}`}
                                    onClick={() => handleSpeedChange(s)}
                                >
                                    {s}×
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Backwards track */}
                <button className="player-btn player-btn--skip" onClick={playPrev} title="Previous Song">
                    <i className="ri-skip-back-fill"></i>
                </button>

                {/* Play / Pause */}
                <button className="player-btn player-btn--play" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
                    <i className={isPlaying ? "ri-pause-fill" : "ri-play-fill"}></i>
                </button>

                {/* Forwards track */}
                <button className="player-btn player-btn--skip" onClick={playNext} title="Next Song">
                    <i className="ri-skip-forward-fill"></i>
                </button>

                {/* Volume */}
                <div className="player-volume">
                    <button className="player-btn player-btn--vol" onClick={toggleMute} title="Mute">
                        <i className={isMuted || volume === 0 ? "ri-volume-mute-fill" : "ri-volume-up-fill"}></i>
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolume}
                        className="player-volume-slider"
                    />
                </div>
            </div>
        </div>
    )
}

export default Player