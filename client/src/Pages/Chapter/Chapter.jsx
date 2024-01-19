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
import { CiCirclePlus } from 'react-icons/ci';
import { ImageUplaod } from '../../Utils/UploadImage';

const Chapter = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const editId = location.state;

  // https://player.vimeo.com/external/320304435.sd.mp4?s=5bf3fe3cad5891fd216a8dc26af46b3a7f4f4215&profile_id=164&oauth2_token_id=57447761
  const [video, setVideo] = useState('');
  const [chapter, setChapter] = useState({});
  const [getChapterId, setGetChapterId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [free, setfree] = useState(false);
  const [videoUrl, setvideoUrl] = useState('');

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    isFree: false,
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
      isFree: free,
      videoUrl: video,
      courseId: editId ? editId : params?.id,
    });
  }, [result, video, params?.id, free]);

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
    if (!inputs.title || !inputs.description || !inputs.videoUrl) {
      toast.error("All fields are required. Please fill out all the fields.");
      // setIsLoading(false)
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
      setGetChapterId(res?._id);
      navigate(`/teachermode/create/${params?.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const videoSubmit = async (e) => {
  //   const file = e.target.files[0];    
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => setVideo(e.target.result);
  //     const url = await ImageUplaod(file, mediaType)
  //     setvideoUrl(url);
  //   }
  // };

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
          <div className="top">
            <h1>chapter Video</h1>
            <input type="file" style={{ display: 'none' }} id="lableidvideo" onChange={videoSubmit} />
            <label htmlFor="lableidvideo">
              <span>Uplaod video</span>
              <CiCirclePlus />
            </label>
          </div>
          <div className="videos">
            <ReactPlayer url={inputs.videoUrl} height="100%" width="100%" controls={true} light={true} playing={true} className="vidoeplayer" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Chapter;
