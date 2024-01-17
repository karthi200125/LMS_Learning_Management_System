import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './Chapter.scss';
import Input from '../../MainPageComponents/Input/Input';
import Button from '../../MainPageComponents/Button/Button';
import { MdArrowRightAlt } from 'react-icons/md';
import handleRequest from '../../Utils/Handlerequest';
import { useSelector } from 'react-redux';

const Chapter = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const editId = location.state;

  const [video, setVideo] = useState('videoLink');
  const [chapter, setChapter] = useState({});
  const [getChapterId, setGetChapterId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    courseId: editId ? editId : params?.id,
    videoUrl: video,
  });

  useEffect(() => {
    setInputs({
      title: chapter?.title || '',
      description: chapter?.description || '',
      videoUrl: video,
      courseId: editId ? editId : params?.id,
    });
  }, [chapter, video, params?.id]);

  const token = localStorage.getItem('access_token');
  const { user } = useSelector((state) => state.auth);

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const requestData = {
    chapterId: editId,
    title: inputs.title,
    description: inputs.description,
    videoUrl: inputs.videoUrl,
  }

  const handleChapterCreate = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const apiEndpoint = editId ? '/chapter/update' : '/chapter/create';
      const successMsg = editId ? `Chapter ${inputs.title} has been updated` : `Chapter ${inputs.title} has been created`;
      const res = await handleRequest({
        url: apiEndpoint,
        token,
        data: editId ? requestData : inputs,
        method: editId ? 'PUT' : 'POST',
        userId: user?._id,
        successmsg: successMsg,
      });
      setGetChapterId(res?._id);
      navigate(`/teachermode/create/${params?.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleGetSingleChapter = async () => {
      try {
        const res = await handleRequest({
          url: '/chapter/getchapter',
          token,
          method: 'POST',
          data: { chapterId: editId },
          userId: user?._id,
        });
        setChapter(res);
      } catch (error) {
        console.error(error);
      }
    };
    handleGetSingleChapter();
  }, [token, getChapterId, params, user?._id]);

  return (
    <form className='chapter'>
      <div className='top'>
        <h1>Create your chapter</h1>
        <Button
          title={editId ? 'Edit Chapter' : 'Publish Chapter'}
          glow={false}
          icon={<MdArrowRightAlt size={25} />}
          onClick={handleChapterCreate}
          isLoading={isLoading}
        />
      </div>
      <div className='chpatercontent'>
        <Input name="title" value={inputs.title} onChange={handleChange} />
        <Input name='description' value={inputs.description} onChange={handleChange} />
      </div>
      <div className='videoncon'>{/* Add your video content here */}</div>
    </form>
  );
};

export default Chapter;
