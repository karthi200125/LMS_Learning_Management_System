import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './Chapter.scss';
import Input from '../../MainPageComponents/Input/Input';
import Button from '../../MainPageComponents/Button/Button';
import { MdArrowRightAlt } from 'react-icons/md';
import handleRequest from '../../Utils/Handlerequest';
import { useSelector } from 'react-redux';

const Profile = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [video, setVideo] = useState('videoLink'); // Corrected the state name
  const [chapter, setChapter] = useState({});
  const [getChapterId, setGetChapterId] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    courseId: params?.id,
    videoUrl: video,
  });

  useEffect(() => {
    setInputs({
      title: chapter.title || '',
      description: chapter.description || '',
      videoUrl: video,
      courseId: params?.id,
    });
  }, [chapter, video, params]);

  const token = localStorage.getItem('access_token');
  const { user } = useSelector((state) => state.auth);

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleChapterCreate = async (e) => {
    e.preventDefault();
    try {
      setisLoading(true)
      const res = await handleRequest({
        url: '/chapter/create',
        token,
        data: inputs,
        method: 'POST',
        userId: user?._id,
        successmsg: `Chapter ${inputs.title} has been created`,
      });
      setGetChapterId(res?._id);
      navigate(`/teachermode/create/${params?.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false)
    }
  };

  useEffect(() => {
    const handleGetSingleChapter = async () => {
      try {
        const res = await handleRequest({
          url: '/chapter/getchapter',
          token,
          method: 'POST',
          data: { chapterId: getChapterId },
          userId: user?._id,
        });
        setChapter(res);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetSingleChapter();
  }, [token, getChapterId, params, user?._id]);


  return (
    <form className='chapter'>
      <div className='top'>
        <h1>Create your chapter</h1>
        <Button title='Publish Chapter' glow={false} icon={<MdArrowRightAlt size={25} />} onClick={handleChapterCreate} isLoading={isLoading}/>
      </div>
      <div className='chpatercontent'>
        <Input name="title" value={inputs.title} onChange={handleChange} />
        <Input name='description' value={inputs.description} onChange={handleChange} />
      </div>

      <div className='videoncon'>{/* Add your video content here */}</div>
    </form>
  );
};

export default Profile;
