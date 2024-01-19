import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { IoLockClosedOutline } from 'react-icons/io5';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import Button from '../../MainPageComponents/Button/Button';
import useCustomFetch from '../../Utils/CustomFetch';
import './Course.scss';

const Course = () => {
  const params = useParams();
  const url = new URL(window.location.href);
  const chapterId = url.searchParams.get('chapterId');

  const { result: courseData } = useCustomFetch({
    url: '/course/getcourse',
    id: params.id,
  });

  const { result } = useCustomFetch({
    url: '/chapter/getchapter',
    id: chapterId ? chapterId : courseData?.chapters[0],
  });

  // console.log(courseData?.chapters[0])

  return (
    <div className="chapter">
      <div className="video">
        {result?.isFree === false ? (
          <div className="videolock">
            <IoLockClosedOutline size={25} />
            <span>This Chapter is locked</span>
          </div>
        ) : (
          <ReactPlayer
            url={result?.videoUrl}
            height="500px"
            width="1000px"
            controls={true}
            light={true}
            playing={true}
          />
        )}
      </div>
      <div className="content">
        <div className="top">
          <h1>{result?.title}</h1>
          <Button title={`Enroll for ₹ ${courseData?.price} RS`} glow={false} />
        </div>
        <p>{result?.description}</p>
      </div>
      {result?.isFree === false && (
        <div className="banner">
          <FiAlertTriangle size={20} />
          <p>You need to purchase this course to watch this chapter</p>
        </div>
      )}
    </div>
  );
};

export default Course;
