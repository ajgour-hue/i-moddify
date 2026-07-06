import React from 'react'
import { useSong } from '../hooks/useSong'
import { PanelSkeleton } from '../../shared/components/Skeleton'
import 'remixicon/fonts/remixicon.css'
import '../style/songs.scss'

const moodMeta = {
  happy:     { icon: 'ri-emotion-happy-line',    label: 'Happy',     color: '#facc15', rgb: '250 204 21' },
  sad:       { icon: 'ri-emotion-sad-line',       label: 'Sad',       color: '#60a5fa', rgb: '96 165 250' },
  surprised: { icon: 'ri-emotion-normal-line',    label: 'Surprised', color: '#f472b6', rgb: '244 114 182' },
  neutral:   { icon: 'ri-emotion-line',           label: 'Neutral',   color: '#94a3b8', rgb: '148 163 184' },
}



const MoodSongs = () => {
  const { moodSongs, currentMood, loading, song, setSong } = useSong()

  const meta = moodMeta[currentMood] || null

  if (!currentMood) {
    return (
      <div className="songs-panel panel-idle">
        <i className="ri-scan-2-line" />
        <p>Scan your face to discover songs for your mood</p>
      </div>
    )
  }

  return (
    <div className="songs-panel">
      <div className="panel-header">
        <div
          className="mood-badge"
          style={{ '--mood-color': meta?.color, '--mood-color-rgb': meta?.rgb }}
        >
          {meta && <i className={meta.icon} />}
          <span>{meta?.label ?? currentMood} Vibes</span>
        </div>
        {moodSongs?.length > 0 && (
          <span className="header-count">{moodSongs.length} tracks</span>
        )}
      </div>

      {loading && !moodSongs?.length ? (
        <div className="panel-body">
            <PanelSkeleton count={7} />
        </div>
      ) : !moodSongs?.length ? (
        <div className="panel-empty">
          <i className="ri-music-2-line" />
          <p>No songs found for this mood</p>
        </div>
      ) : (
        <div className="panel-body">
          <div className="songs-list">
            {moodSongs.map((s) => (
              <div
                key={s._id}
                className={`song-item ${song?._id === s._id ? 'active' : ''}`}
                style={{ '--mood-color': meta?.color }}
                onClick={() => setSong(s)}
              >
                <div className="song-poster-wrap">
                  <img src={s.posterUrl} alt={s.title} className="song-poster" />
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

export default MoodSongs
