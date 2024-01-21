import React, { useCallback, useEffect, useState } from 'react';
import { CiCirclePlus, CiSquarePlus } from 'react-icons/ci';
import { FaBarsProgress } from 'react-icons/fa6';
import { MdArrowRightAlt, MdDelete, MdOutlineEdit } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Button from '../../MainPageComponents/Button/Button';
import Input from '../../MainPageComponents/Input/Input';
import { createCourse } from '../../Redux/CourseSlice';
import useCustomFetch from '../../Utils/CustomFetch';
import useHandleCrud from '../../Utils/HandleCrud';
import { ImageUplaod } from '../../Utils/UploadImage';
import noimage from '../../assets/noimage.png';
import './Create.scss';

const Create = () => {
  const { user } = useSelector((state) => state.auth);
  const params = useParams();
  const [delId, setDelId] = useState('');
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // fetch course data
  const { result: course } = useCustomFetch({
    url: '/course/getcourse',
    id: params.id,
  });

  const defaultCategory = course?.category || '';
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    imageUrl: '',
    price: '',
    category: defaultCategory,
    courseId: '',
  });

  useEffect(() => {
    setInputs({
      title: course.title || '',
      description: course.description || '',
      imageUrl: course.imageUrl || imageUrl,
      price: course.price || '',
      category: course.category || '',
      courseId: course._id || '',
    });
  }, [course, imageUrl]);

  const handleChange = useCallback((name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  }, [setInputs]);

  // course update data pass
  const { isLoading, fetchData } = useHandleCrud(
    '/course/update',
    'PUT',
    inputs,
    'Course updated',
    createCourse
  );

  // Course update
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.title || !inputs.description || !inputs.imageUrl || !inputs.price || !inputs.category) {
      toast.error('Please fill in all the required fields');
      return;
    }
    else {
      await fetchData();
    }
  };

  // get all chapters
  const { result: chapters, Refetch } = useCustomFetch({
    userId: user?._id,
    url: '/chapter/getall',
    id: params?.id,
  });


  // Image submit 
  const imagesubmit = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
    const url = await ImageUplaod(file);
    setImageUrl(url);
  };

  // select options
  const options = [
    { id: 1, title: 'category' },
    { id: 2, title: 'engineering' },
    { id: 3, title: 'technology' },
    { id: 4, title: 'computerscience' },
    { id: 5, title: 'accounting' },
    { id: 6, title: 'film' },
    { id: 7, title: 'music' },
  ];

  // delete chapter data  pass
  const { fetchData: deleteFetchData } = useHandleCrud(
    '/chapter/delete',
    'DELETE',
    { chapterId: delId },
    'Chapter has been deleted'
  );

  // delete chapter
  const deleteChapter = async (chapterId) => {
    setDelId(chapterId);
    await deleteFetchData();
    Refetch()
  };

  return (
    <div className="create">
      <div className="top">
        <h1>Course Setup</h1>
        <Button
          title="Publish"
          glow={false}
          className="transparent"
          color="white"
          icon={<MdArrowRightAlt size={25} />}
          onClick={onSubmit}
          isLoading={isLoading}
        />
      </div>

      <div className="new">
        <div className="left">
          <div className="box">
            <Input name="title" value={inputs.title} onChange={handleChange} />
          </div>
          <div className="box">
            <Input name="description" value={inputs.description} onChange={handleChange} />
          </div>
          <div className="box courseimage">
            <input type="file" accept="image/*" onChange={imagesubmit} id="uploadimage" />
            <div className="top">
              <h1>Thumbnail Image</h1>
              <label htmlFor="uploadimage" className="upload">
                <span>Select Image</span>
                <CiSquarePlus />
              </label>
            </div>
            {inputs.imageUrl || imageUrl ? (
              <img src={inputs.imageUrl || imageUrl} alt={inputs.title} loading="lazy" />
            ) : (
              <img className="noimage" src={noimage} alt={inputs.title} loading="lazy" />
            )}
          </div>
        </div>

        <div className="right">
          <div className="box chapters">
            <div className="top">
              <span>Course Chapters</span>
              <Link to={`/teachermode/chaptercreate/${params?.id}`} className="addchapter">
                <span>Create new chapter</span>
                <CiCirclePlus size={25} />
              </Link>
            </div>
            <div className="chapterslists">
              {chapters?.length > 0 ? (
                chapters.map((cl) => (
                  <div key={cl._id} className="chapterslist">
                    <div className="side">
                      <FaBarsProgress size={25} />
                      <span>{cl?.title}</span>
                    </div>
                    <div className="side">
                      <p>{cl?.isPublished === true ? 'publish' : 'published'}</p>
                      <Link to={`/teachermode/chaptercreate/${params?.id}`} state={cl?._id}>
                        <MdOutlineEdit size={20} />
                      </Link>
                      <MdDelete size={25} className="del" onClick={() => deleteChapter(cl._id)} />
                    </div>
                  </div>
                ))
              ) : (
                <p>Create New Chapters</p>
              )}
            </div>
          </div>

          <div className="box">
            <Input name="price" value={inputs.price} onChange={handleChange} />
          </div>
          <div className="box">
            <select value={inputs.category} onChange={(e) => handleChange('category', e.target.value)}>
              <option value="">Select category...</option>
              {options.map((option) => (
                <option key={option.id} value={option.title}>
                  {option.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
