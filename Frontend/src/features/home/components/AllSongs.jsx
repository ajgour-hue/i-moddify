import React, { useEffect } from 'react'
import { useSong } from '../hooks/useSong'
import { PanelSkeleton } from '../../shared/components/Skeleton'
import 'remixicon/fonts/remixicon.css'
import '../style/songs.scss'

const AllSongs = () => {
  const { allSongs, handleGetAllSongs, loading, song, setSong } = useSong()

  useEffect(() => {
    handleGetAllSongs()
  }, [])

 

  return (
    <div className="songs-panel">
      <div className="panel-header">
        <h2>All <span>Songs</span></h2>
        {allSongs?.length > 0 && (
          <span className="header-count">{allSongs.length} tracks</span>
        )}
      </div>

      {loading && !allSongs?.length ? (
        <div className="panel-body">
            <PanelSkeleton count={7} />
        </div>
      ) : !allSongs?.length ? (
        <div className="panel-empty">
          <i className="ri-music-2-line" />
          <p>No songs found</p>
        </div>
      ) : (
        <div className="panel-body">
          <div className="songs-list">
            {allSongs.map((s) => (
              <div
                key={s._id}
                className={`song-item ${song?._id === s._id ? 'active' : ''}`}
                onClick={() => setSong(s)}
              >
                <div className="song-poster-wrap">
                  <img
                    src={s.posterUrl}
                    alt={s.title}
                    className="song-poster"
                  />
                  <div className="song-overlay">
                    <i className={song?._id === s._id ? 'ri-pause-fill' : 'ri-play-fill'} />
                  </div>
                  <span className="playing-dot" />
                  <div className="playing-bars">
                    <span /><span /><span /><span />
                  </div>
                </div>
                <div className="song-info">
                  <p className="song-title">{s.title}</p>
                  <span className={`song-mood mood-${s.mood}`}>
                    {s.mood}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AllSongs
