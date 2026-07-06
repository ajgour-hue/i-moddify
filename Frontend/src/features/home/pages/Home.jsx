import React from "react";
import FaceExpression from "../../Expression/components/FaceExpression";
import Navbar from "../components/Navbar";
import MoodSelector from "../components/MoodSelector";
import { useSong } from "../hooks/useSong";
import AllSongs from "../components/AllSongs";
import MoodSongs from "../components/MoodSongs";
import "../style/home.scss";

const Home = () => {
  const { handleGetSong, handleGetMoodSongs } = useSong();

  function handleMoodDetected(mood) {
    handleGetSong({ mood });
    handleGetMoodSongs({ mood });
  }

  return (
    <div className="home">
      <div className="navbar-fixed-container">
        <Navbar />
      </div>

      <div className="home-body">
        {/* Left: Global Songs */}
        <div className="home-panel-left">
          <AllSongs />
        </div>

        {/* Center: Interactive AI & Manual Select */}
        <div className="home-panel-center">
          <div className="center-section ">
            <FaceExpression onClick={handleMoodDetected} />
          </div>
          <div className="center-section ">
            <MoodSelector onMoodSelect={handleMoodDetected} />
          </div>
        </div>

        {/* Right: Mood Recommendations */}
        <div className="home-panel-right">
          <MoodSongs />
        </div>
      </div>
    </div>
  );
};

export default Home;
