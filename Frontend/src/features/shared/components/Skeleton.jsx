import React from 'react';
import '../styles/skeleton.scss';

export const SongCardSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-poster"></div>
      <div className="skeleton-info">
        <div className="skeleton-title"></div>
        <div className="skeleton-mood"></div>
      </div>
    </div>
  );
};

export const PanelSkeleton = ({ count = 5 }) => {
  return (
    <div className="skeleton-panel-list">
      {Array.from({ length: count }).map((_, index) => (
        <SongCardSkeleton key={index} />
      ))}
    </div>
  );
};
