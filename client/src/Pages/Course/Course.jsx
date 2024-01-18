import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useLocation, useParams } from 'react-router-dom';
import test from '../../assets/test.mp4';
import './Course.scss';
import Button from '../../MainPageComponents/Button/Button'
import { FiAlertTriangle } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
import useCustomFetch from '../../Utils/CustomFetch';

const Course = () => {
  const location = useLocation();
  const data = location.state;
  const params = useParams()
  const chpaterIdfromQuery = location.pathname

  const url = new URL(window.location.href);
  const chapterId = url.searchParams.get("chapterId");

  const { result, fetchData } = useCustomFetch({
    url: '/chapter/getchapter',
    id: chapterId ? chapterId : data.chapters[0],
  });

  console.log(result)

  return (
    <div className='chapter'>
      <div className="video">
        {result?.isFree === false ?
          <div className='videolock'>
            <IoLockClosedOutline size={25} />
            <span>This Chapter locked</span>
          </div>
          :
          <ReactPlayer url={test} height="500px" width="1000px" controls={true} light={true} playing={true} />
        }
      </div>
      <div className="content">
        <div className="top">
          <h1>{result?.title}</h1>
          <Button title="Enroll for 100rs" glow={false} />
        </div>
        <p>{result?.description}</p>
      </div>
      {result?.isFree === false &&
        <div className="banner">
          <FiAlertTriangle size={20} />
          <p>You need to purchase this course watch this chapter</p>
        </div>
      }
    </div>
  );
};

export default Course;
