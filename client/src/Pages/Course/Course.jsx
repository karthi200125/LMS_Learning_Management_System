import React, { useEffect, useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { IoLockClosedOutline } from 'react-icons/io5';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../../MainPageComponents/Button/Button';
import { ChapterCompleted } from '../../Redux/AuthSlice';
import useCustomFetch from '../../Utils/CustomFetch';
import useHandleCrud from '../../Utils/HandleCrud';
import './Course.scss';


const Course = () => {
  const params = useParams();
  const url = new URL(window.location.href);
  const chapterId = url.searchParams.get('chapterId');
  const { user } = useSelector(state => state.auth)

  // get course 
  const { result: courseData } = useCustomFetch({
    url: '/course/getcourse',
    id: params.id,
  });

  const [firstChapter, setFirstChapter] = useState(null);

  useEffect(() => {
    if (courseData?.chapters && courseData?.chapters.length > 0) {
      setFirstChapter(courseData?.chapters[0]);
    }
  }, [courseData ]);

  const { result, Refetch } = useCustomFetch({
    url: '/chapter/getchapter',
    id: chapterId ? chapterId : firstChapter,
  });

  // user update
  const { isLoading, fetchData } = useHandleCrud(
    '/user/update',
    'PUT',
    { userId: user?._id, chapterId: chapterId ? chapterId : firstChapter },
    "Chpater has been completed",
    ChapterCompleted,
  );

  // mark as complete  
  const markasComplete = async () => {
    await fetchData();
    Refetch();
  };

  const chapterComplete = user?.ChapterCompleted?.includes(chapterId ? chapterId : firstChapter)
  const free = result?.isFree === true;

  return (
    <div className="chapter">
      {!free &&
        <div className="banner">
          <FiAlertTriangle size={20} />
          <p>You need to purchase this course to watch this chapter</p>
        </div>
      }
      <div className="video">
        {!free ? (
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
          <Button
            title={free ? chapterComplete ? "chapter completed" : "mark as Complete" : `Enroll for ₹ ${courseData?.price} RS`}
            glow={false}
            onClick={free && !chapterComplete ? markasComplete : undefined}
            isLoading={isLoading}
            classname={chapterComplete && 'transparent'}
            bg={chapterComplete && '#4FBF26'}
          />
        </div>
        <p>{result?.description}</p>
      </div>
    </div>
  );
};

export default Course;
