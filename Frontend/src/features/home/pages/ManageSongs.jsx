import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSong } from '../hooks/useSong';
import { useAuth } from '../../auth/hooks/useAuth';
import { PanelSkeleton } from '../../shared/components/Skeleton';
import '../style/manage-songs.scss';

const ManageSongs = () => {
  const { allSongs, loading, handleGetAllSongs, handleUploadSong, handleUpdateSong, handleDeleteSong, uploadStatus, uploadMessage } = useSong();
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [mood, setMood] = useState('happy');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editMood, setEditMood] = useState('happy');

  const navigate = useNavigate();

  useEffect(() => {
    handleGetAllSongs();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('song', file);
      formData.append('mood', mood);
      await handleUploadSong(formData);
      setFile(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this song?")) return;
    try {
      await handleDeleteSong(id);
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (song) => {
    setEditingId(song._id);
    setEditTitle(song.title);
    setEditMood(song.mood);
  };

  const handleUpdate = async (id) => {
    try {
      await handleUpdateSong(id, { title: editTitle, mood: editMood });
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="manage-songs-container">
      <div className="manage-songs">
        <div className="manage-header">
          <button className="back-btn" onClick={() => navigate('/')}>
            <i className="ri-arrow-left-line"></i> Back to Player
          </button>
          <h2>Manage Songs</h2>
        </div>

        <div className="upload-section card">
          <h3>Upload New Song (Product)</h3>
          <form onSubmit={handleUpload}>
            <label className="file-upload-label">
              <span>{file ? file.name : 'Choose Audio File'}</span>
              <input type="file" required accept=".mp3" onChange={(e) => setFile(e.target.files[0])} />
            </label>
            <div className="custom-select-wrapper">
                <select value={mood} onChange={(e) => setMood(e.target.value)} className="custom-select">
                <option value="happy">Happy</option>
                <option value="sad">Sad</option>
                <option value="surprised">Surprised</option>
                <option value="neutral">Neutral</option>
                </select>
                <span className="select-arrow"><i className="ri-arrow-down-s-line"></i></span>
            </div>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>

        <div className="songs-list-section card">
          <h3>All Songs</h3>
          {loading && !allSongs?.length ? (
            <PanelSkeleton count={4} />
          ) : !loading && allSongs?.length === 0 ? (
            <p className="no-songs">No songs found.</p>
          ) : (
            <ul>
                {allSongs?.map((song) => {
                const isOwner = user && (song.uploadedBy === user._id || song.uploadedBy === user.id);

                return (
                  <li key={song._id} className="song-item">
                    <img src={song.posterUrl} alt={song.title} />
                    
                    {editingId === song._id && isOwner ? (
                      <div className="edit-form">
                        <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="custom-input" />
                        <div className="custom-select-wrapper">
                          <select value={editMood} onChange={(e) => setEditMood(e.target.value)} className="custom-select">
                            <option value="happy">Happy</option>
                            <option value="sad">Sad</option>
                            <option value="surprised">Surprised</option>
                            <option value="neutral">Neutral</option>
                          </select>
                          <span className="select-arrow"><i className="ri-arrow-down-s-line"></i></span>
                        </div>
                        <button onClick={() => handleUpdate(song._id)} className="btn-success">Save</button>
                        <button onClick={() => setEditingId(null)} className="btn-secondary">Cancel</button>
                      </div>
                    ) : (
                      <div className="song-info">
                        <p className="title">{song.title}</p>
                        <p className={`song-mood mood-${song.mood}`}>{song.mood}</p>
                      </div>
                    )}

                    {editingId !== song._id && isOwner && (
                      <div className="actions">
                        <button className="btn-icon" onClick={() => startEdit(song)} title="Edit">
                          <i className="ri-edit-line"></i>
                        </button>
                        <button className="btn-icon btn-danger" onClick={() => handleDelete(song._id)} title="Delete">
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageSongs;
