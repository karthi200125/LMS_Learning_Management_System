import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Course.scss';
import test from '../../assets/test.mp4';
import { FaPlay, FaPause, FaVolumeHigh } from "react-icons/fa6";
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";
import { MdFullscreen } from "react-icons/md";


const Course = () => {
  const location = useLocation();
  const data = location.state;

  const videoRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [play, setPlay] = useState(false);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setPlay(true)
    } else {
      video.pause();
      setPlay(false)
    }
  };

  const handleForward = () => {
    const video = videoRef.current;
    video.currentTime += 10;
  };

  const handleBackward = () => {
    const video = videoRef.current;
    video.currentTime -= 10;
  };

  const handleFullScreen = () => {
    const video = videoRef.current;
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      video.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
  };

  return (
    <div className={`course ${isFullScreen ? 'fullscreen' : ''}`}>
      <video src={test} className='video' ref={videoRef} volume={volume} />

      <div className="controls">
        <div className="side">
          <button onClick={handlePlayPause}>{play ? <FaPause className="videoicon"/> : <FaPlay className="videoicon"/>}</button>
          <button onClick={handleBackward}><TbRewindBackward10 className="videoicon"/></button>
          <button onClick={handleForward}><TbRewindForward10 className="videoicon"/></button>
          <div className='volume'>
            <FaVolumeHigh />
            <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} />
          </div>
        </div>
        <div className="side">
          <button onClick={handleFullScreen}><MdFullscreen className="videoicon"/></button>
        </div>
      </div>

    </div>
  );
};

export default Course;
