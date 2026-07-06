import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import "./face.scss"

export default function FaceExpression({ onClick = () => {} }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("Ready");
    const [isProcessing, setIsProcessing] = useState(false);
    const [cameraOn, setCameraOn] = useState(true);

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    };

    const startCamera = async () => {
        await init({ landmarkerRef, videoRef, streamRef });
    };

    useEffect(() => {
        if (cameraOn) {
            startCamera();
        } else {
            stopCamera();
        }

        return () => {
            stopCamera();
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }
        };
    }, [cameraOn]);

    async function handleClick() {
        if (isProcessing || !cameraOn) return;

        setIsProcessing(true);
        const result = await detect({ landmarkerRef, videoRef, setExpression });
        
        if (result) {
            onClick(result);
        }
        setIsProcessing(false);
    }

    return (
        <div className="face-expression-container">
            <div className={`video-wrapper ${!cameraOn ? 'camera-off' : ''}`}>
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="video-feed"
                    style={{ visibility: cameraOn ? 'visible' : 'hidden' }}
                />
                {!cameraOn && (
                    <div className="camera-off-overlay">
                        <i className="ri-camera-off-line"></i>
                        <p>Camera is Off</p>
                    </div>
                )}
                {cameraOn && <div className="video-scan-line"></div>}
            </div>

            <div className="result-section">
                <div className="status-badge">
                    <span>{expression}</span>
                </div>
                
                <div className="expression-controls">
                    <button 
                        onClick={() => setCameraOn(!cameraOn)} 
                        className={`control-btn ${cameraOn ? 'active' : ''}`}
                        title={cameraOn ? "Turn Camera Off" : "Turn Camera On"}
                    >
                        <i className={cameraOn ? "ri-camera-line" : "ri-camera-off-line"}></i>
                    </button>

                    <button 
                        onClick={handleClick} 
                        disabled={isProcessing || !cameraOn}
                        className="detect-btn btn-glow"
                    >
                        {isProcessing ? <i className="ri-loader-4-line spin"></i> : <i className="ri-find-replace-line"></i>}
                        {isProcessing ? "Analyzing" : "Analyze Mood"}
                    </button>
                </div>
            </div>
        </div>
    );
}