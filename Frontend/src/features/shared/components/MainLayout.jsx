import React from 'react';
import { Outlet } from 'react-router';
import Player from '../../home/components/Player';
import UploadNotification from './UploadNotification';

const MainLayout = () => {
    return (
        <div className="main-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="main-content" style={{ flex: 1, paddingBottom: '90px' }}>
                <Outlet />
            </div>
            <Player />
            <UploadNotification />
        </div>
    );
};

export default MainLayout;
