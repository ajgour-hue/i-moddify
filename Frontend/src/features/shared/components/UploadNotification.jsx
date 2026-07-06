import React from 'react';
import { useSong } from '../../home/hooks/useSong';
import 'remixicon/fonts/remixicon.css';
import './notification.scss';

const UploadNotification = () => {
    const { uploadStatus, uploadMessage } = useSong();

    if (uploadStatus === 'idle') return null;

    return (
        <div className={`upload-notification ${uploadStatus}`}>
            <div className="notification-content">
                {uploadStatus === 'uploading' && (
                    <div className="notification-spinner"></div>
                )}
                {uploadStatus === 'success' && <i className="ri-checkbox-circle-fill"></i>}
                {uploadStatus === 'error' && <i className="ri-error-warning-fill"></i>}
                <span className="message">{uploadMessage}</span>
            </div>
            {uploadStatus === 'uploading' && <div className="progress-bar-container">
                                                <div className="progress-bar-fill"></div>
                                             </div>}
        </div>
    );
};

export default UploadNotification;
