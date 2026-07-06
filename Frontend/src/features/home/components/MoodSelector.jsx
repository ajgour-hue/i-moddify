import React from 'react';
import { useSong } from '../hooks/useSong';
import '../style/mood-selector.scss';

const AVAILABLE_MOODS = [
    { id: 'happy', label: 'Happy', icon: 'ri-emotion-happy-line', color: 'var(--mood-happy)' },
    { id: 'sad', label: 'Sad', icon: 'ri-emotion-sad-line', color: 'var(--mood-sad)' },
    { id: 'surprised', label: 'Surprised', icon: 'ri-emotion-normal-line', color: 'var(--mood-surprised)' },
    { id: 'neutral', label: 'Neutral', icon: 'ri-emotion-line', color: 'var(--mood-neutral)' },
];

const MoodSelector = ({ onMoodSelect }) => {
    const { currentMood } = useSong();

    return (
        <div className="mood-selector">
            <h3 className="mood-selector-title">Or select manually</h3>
            <div className="mood-selector-grid">
                {AVAILABLE_MOODS.map(mood => (
                    <button
                        key={mood.id}
                        className={`mood-selector-btn ${currentMood === mood.id ? 'active' : ''}`}
                        onClick={() => onMoodSelect(mood.id)}
                        style={{ '--mood-color': mood.color }}
                    >
                        <i className={mood.icon}></i>
                        <span>{mood.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MoodSelector;