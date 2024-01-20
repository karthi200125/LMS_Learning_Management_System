import React, { useEffect, useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { IoLockClosedOutline } from 'react-icons/io5';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import Button from '../../MainPageComponents/Button/Button';
import useCustomFetch from '../../Utils/CustomFetch';
import './Course.scss';
import handleRequest from '../../Utils/Handlerequest';
import { useDispatch, useSelector } from 'react-redux';
import { ChapterCompleted } from '../../Redux/AuthSlice';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';


const Course = () => {
  const params = useParams();
  const url = new URL(window.location.href);
  const chapterId = url.searchParams.get('chapterId');
  const token = localStorage.getItem('access_token')
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const { result: courseData } = useCustomFetch({
    url: '/course/getcourse',
    id: params.id,
  });

  const [firstChapter, setFirstChapter] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (courseData?.chapters && courseData?.chapters.length > 0) {
      setFirstChapter(courseData?.chapters[0]);
    }
  }, [courseData]);

  const { result } = useCustomFetch({
    url: '/chapter/getchapter',
    id: chapterId ? chapterId : firstChapter,
  });


  const markasComplete = async () => {
    try {
      setLoading(true)
      const res = await handleRequest({
        url: '/user/update',
        token,
        data: { userId: user?._id, chapterId: chapterId ? chapterId : firstChapter },
        method: 'PUT',
        userId: user?._id,
      })
      dispatch(ChapterCompleted(res))
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
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
            isLoading={loading}
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
