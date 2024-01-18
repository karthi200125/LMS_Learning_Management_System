import React, { useEffect, useState } from 'react';
import { CiCirclePlus, CiSquarePlus } from 'react-icons/ci';
import { FaBarsProgress } from "react-icons/fa6";
import { MdArrowRightAlt, MdDelete, MdOutlineEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Button from '../../MainPageComponents/Button/Button';
import Input from '../../MainPageComponents/Input/Input';
import { createCourse } from '../../Redux/CourseSlice';
import useCustomFetch from '../../Utils/CustomFetch';
import handleRequest from '../../Utils/Handlerequest';
import { ImageUplaod } from '../../Utils/UploadImage';
import './Create.scss';
import noimage from '../../assets/noimage.png'

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const params = useParams();
  const [delopen, setdelopen] = useState(false);
  const [image, setImage] = useState('');
  const [course, setCourse] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const token = localStorage.getItem('access_token');

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    imageUrl: '',
    price: '',
    category: '',
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

  useEffect(() => {
    const handleGetSingleCourse = async () => {
      try {
        const res = await handleRequest({
          url: '/course/getcourse',
          token,
          method: 'POST',
          data: { courseId: params?.id },
          userId: user?._id,
        });
        setCourse(res);
      } catch (error) {
        console.error(error);
      }
    };
    handleGetSingleCourse();
  }, [params, user._id]);

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setisLoading(true);
      const res = await handleRequest({
        url: '/course/update',
        token,
        data: inputs,
        method: 'PUT',
        userId: user?._id,
        successmsg: 'Course updated',
      });
      dispatch(createCourse(res));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setisLoading(false);
    }
  };

  const { result, fetchData } = useCustomFetch({
    userId: user?._id,
    url: '/chapter/getall',
    id: params?.id,
  });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const options = [
    { id: 1, title: "category" },
    { id: 2, title: "engineering" },
    { id: 3, title: "technology" },
    { id: 4, title: "computerscience" },
    { id: 5, title: "accounting" },
    { id: 6, title: "film" },
    { id: 7, title: "music" },
  ];

  const imagesubmit = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
    const url = await ImageUplaod(file)
    setImageUrl(url)
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
            <input type="file" onChange={imagesubmit} id="uploadimage" />
            <label htmlFor="uploadimage" className="upload">
              <span>Select Image</span>
              <CiSquarePlus />
            </label>
            {inputs.imageUrl || imageUrl ? (
              <img src={inputs.imageUrl || imageUrl} alt={inputs.title} />
            ) : (
              <img className='noimage' src={noimage} alt={inputs.title} />
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
            <div className='chapterslists'>
              {result?.length > 0 ?
                result.map((cl) => (
                  <div key={cl.title} className='chapterslist'>
                    <div className='side'>
                      <FaBarsProgress size={25} />
                      <span>{cl.title}</span>
                    </div>
                    <div className='side'>
                      <p>{cl.title}</p>
                      <Link to={`/teachermode/chaptercreate/${params?.id}`} state={cl?._id}>
                        <MdOutlineEdit size={20} />
                      </Link>
                      <MdDelete size={25} className="del" onClick={() => setdelopen(true)} />
                    </div>
                  </div>
                ))
                :
                "Create New Chapters"
              }
            </div>
          </div>

          <div className="box">
            <Input name="price" value={inputs.price} onChange={handleChange} />
          </div>
          <div className="box">
            <select name="category" onChange={(e) => handleChange('category', e.target.value)} required>
              {options.map((option) => (
                <option className='selectoption' value={inputs.category} key={option.id}>{option.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
