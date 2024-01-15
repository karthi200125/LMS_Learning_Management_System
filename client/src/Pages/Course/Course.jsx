import React from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';
import test from '../../assets/test.mp4';
import './Course.scss';
import Button from '../../MainPageComponents/Button/Button'
import { FiAlertTriangle } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";



const Course = () => {
  const location = useLocation();
  const data = location.state;
  let banner = false
  console.log(data)


  return (
    <div className='chapter'>
      <div className="video">
        <ReactPlayer url={test} height="500px" width="max-content" controls={true} light={true} playing={true} />
        {/* <div className='videolock'>
          <IoLockClosedOutline size={25} />
          <span>This Chapter locked</span>
        </div> */}
      </div>
      <div className="content">
        <div className="top">
          <h1>Intriduction</h1>
          <Button title="Enroll for 100rs" glow={false} />
        </div>
        <p>desciption</p>
      </div>
      {banner === true &&
        <div className="banner">
          <FiAlertTriangle size={20} />
          <p>You need to purchase this course watch this chapter</p>
        </div>
      }
    </div>
  );
};

export default Course;
