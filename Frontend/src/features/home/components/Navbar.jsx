import React, { useContext } from 'react';
import { AuthContext } from '../../auth/auth.context';
import { useSong } from '../hooks/useSong';
import { useNavigate } from 'react-router';
import { logout } from '../../auth/services/auth.api';
import '../style/navbar.scss';

const Navbar = () => {
    const { user, setUser } = useContext(AuthContext) || {};
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(error);
        }
        if (setUser) setUser(null);
        // Clear tokens if any
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleUploadClick = () => {
        navigate('/manage-songs'); // Use a generic manage-songs page for CRUD operations
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <i className="ri-music-fill"></i>
                <span>Moodify</span>
            </div>

            <div className="navbar-actions">
                <button className="navbar-btn upload-btn" onClick={handleUploadClick}>
                    <i className="ri-upload-2-line"></i>
                    <span>Manage Songs</span>
                </button>

                {user && (
                    <div className="navbar-profile">
                        <div className="navbar-user-info">
                            <span className="navbar-username">{user.username || 'User'}</span>
                            <span className="navbar-email">{user.email || 'user@example.com'}</span>
                        </div>
                        <div className="navbar-avatar">
                            <i className="ri-user-smile-line"></i>
                        </div>
                    </div>
                )}

                <button className="navbar-btn logout-btn" onClick={handleLogout} title="Logout">
                    <i className="ri-logout-box-r-line"></i>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;