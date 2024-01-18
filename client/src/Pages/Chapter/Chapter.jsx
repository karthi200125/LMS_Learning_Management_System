import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './Chapter.scss';
import Input from '../../MainPageComponents/Input/Input';
import Button from '../../MainPageComponents/Button/Button';
import { MdArrowRightAlt } from 'react-icons/md';
import handleRequest from '../../Utils/Handlerequest';
import { useSelector } from 'react-redux';
import useCustomFetch from '../../Utils/CustomFetch';

const Chapter = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const editId = location.state;

  const [video, setVideo] = useState('videoLink');
  const [chapter, setChapter] = useState({});
  const [getChapterId, setGetChapterId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [free, setfree] = useState(false);

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    isFree: free,
    courseId: editId ? editId : params?.id,
    videoUrl: video,
  });

  const { result } = useCustomFetch({
    url: '/chapter/getchapter',
    id: editId
  })

  useEffect(() => {
    setInputs({
      title: result?.title || '',
      description: result?.description || '',
      isFree: '',
      videoUrl: video,
      courseId: editId ? editId : params?.id,
    });
  }, [result, video, params?.id]);

  const token = localStorage.getItem('access_token');
  const { user } = useSelector((state) => state.auth);

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const requestData = {
    chapterId: editId,
    title: inputs.title,
    isFree: free,
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

  return (
    <form className='chapter'>
      <div className='top'>
        <h1>{editId ? "Edit your chapter" : "Create your chapter"}</h1>
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
      <div className='videoncon'>
        <select className="chapterselect" onChange={(e) => setfree(e.target.value)} name='isFree'>
          <option value={false}>select chapter free or not</option>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
        <div className="videouplaod">
          video uplaod
        </div>
      </div>
    </form>
  );
};

export default Chapter;
