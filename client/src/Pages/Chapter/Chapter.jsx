import React, { useEffect, useState } from 'react';
import { MdArrowRightAlt } from 'react-icons/md';
import ReactPlayer from 'react-player';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Button from '../../MainPageComponents/Button/Button';
import Input from '../../MainPageComponents/Input/Input';
import useCustomFetch from '../../Utils/CustomFetch';
import useHandleCrud from '../../Utils/HandleCrud';
import './Chapter.scss';

const Chapter = () => {
  const params = useParams();
  const location = useLocation();
  const editId = location.state;
  const [openUrl, setOpenUrl] = useState(false);
  const [free, setFree] = useState(false);
  const [videoUrl, setVideoUrl] = useState('https://youtu.be/qKoajPPWpmo?si=xBDmig11lCqWAhMr');
  const [inputUrl, setInputUrl] = useState('');

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    isFree: false,
    courseId: editId ? editId : params?.id,
    videoUrl: videoUrl,
  });

  // get chapter
  const { result, Refetch } = useCustomFetch({
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

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  
  const Editinputs = { 
    title: inputs?.title, 
    chapterId: result?._id, 
    description: inputs?.description, 
    isFree: inputs?.isFree, 
    videoUrl: inputs?.videoUrl }
  // chpater create and update data pass
  const { isLoading, fetchData } = useHandleCrud(
    editId ? '/chapter/update' : '/chapter/create',
    editId ? 'PUT' : 'POST',
    editId ? Editinputs : inputs,
    editId ? `Chapter ${inputs.title} has been updated` : `Chapter ${inputs.title} has been created`,
    '',
    `/teachermode/create/${params?.id}`
  );

  // chapter create 
  const handleChapterCreate = async (e) => {
    e.preventDefault();
    if (!inputs.title || !inputs.description || !inputs.videoUrl) {
      toast.error("All fields are required. Please fill out all the fields.");
    }
    await fetchData()
  };

  // uolaod video url
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
