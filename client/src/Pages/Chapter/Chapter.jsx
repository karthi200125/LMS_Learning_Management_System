import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './Chapter.scss';
import Input from '../../MainPageComponents/Input/Input';
import Button from '../../MainPageComponents/Button/Button';
import { MdArrowRightAlt } from 'react-icons/md';
import handleRequest from '../../Utils/Handlerequest';
import { useSelector } from 'react-redux';
import useCustomFetch from '../../Utils/CustomFetch';
import { toast } from 'sonner';
import ReactPlayer from 'react-player';

const Chapter = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const editId = location.state;
  const [openUrl, setOpenUrl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [free, setFree] = useState(false);
  const [videoUrl, setVideoUrl] = useState('https://youtu.be/gizihSJ63o4?si=uQcYK_JY-dPg0Vz5');
  const [inputUrl, setInputUrl] = useState('');

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    isFree: false,
    courseId: editId ? editId : params?.id,
    videoUrl: videoUrl,
  });

  const { result } = useCustomFetch({
    url: '/chapter/getchapter',
    id: editId
  });

  useEffect(() => {
    setInputs({
      title: result?.title || '',
      description: result?.description || '',
      isFree: free,
      videoUrl: videoUrl,
      courseId: editId ? editId : params?.id,
    });
  }, [result, params?.id, free, videoUrl, editId]);

  const token = localStorage.getItem('access_token');
  const { user } = useSelector((state) => state.auth);

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleChapterCreate = async (e) => {
    e.preventDefault();
    if (!inputs.title || !inputs.description || !inputs.videoUrl) {
      toast.error("All fields are required. Please fill out all the fields.");      
    }

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
      setVideoUrl(res?.videoUrl);
      navigate(`/teachermode/create/${params?.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadUrl = (e) => {
    e.preventDefault();
    setVideoUrl(inputUrl);
    setOpenUrl(false);
  };

  return (
    <div className='chapter'>
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
        <select className="chapterselect" onChange={(e) => setFree(e.target.value)} name='isFree'>
          <option value={false}>select chapter free or not</option>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
        <div className="videouplaod">
          <div className="top">
            <h1>chapter Video</h1>
            <div className="uploadurl">
              {!openUrl ? (
                <span onClick={() => setOpenUrl(true)}>Upload Video Url</span>
              ) : (
                <form className='inputvideourl' onSubmit={handleUploadUrl}>
                  <input
                    type="text"
                    placeholder='Put Url Here'
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                  />
                  <Button title="Upload" type="submit" />
                </form>
              )}
            </div>
          </div>
          <div className="videos">
            {videoUrl && (
              <ReactPlayer
                url={inputs.videoUrl || videoUrl}
                height="100%"
                width="100%"
                controls={true}
                light={true}
                playing={true}
                className="vidoeplayer"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapter;
