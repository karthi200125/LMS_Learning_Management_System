import React, { useEffect, useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { MdArrowRightAlt , MdOutlineEdit} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Button from '../../MainPageComponents/Button/Button';
import Input from '../../MainPageComponents/Input/Input';
import { createCourse } from '../../Redux/CourseSlice';
import useCustomFetch from '../../Utils/CustomFetch';
import handleRequest from '../../Utils/Handlerequest';
import './Create.scss';
import { FaBarsProgress } from "react-icons/fa6";

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const { newcourse } = location.state || {};
  const params = useParams();

  const [image, setImage] = useState(
    'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600'
  );

  const [course, setCourse] = useState({});

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    imageUrl: image,
    price: '',
    category: '',
    courseId: '',
  });

  useEffect(() => {
    setInputs({
      title: course.title || '',
      description: course.description || '',
      imageUrl: image,
      price: course.price || '',
      category: course.category || '',
      courseId: course._id || '',
    });
  }, [course, image]);


  const token = localStorage.getItem('access_token');

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
        console.log(error);
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
    }
  };

  const { result, error, fetchData } = useCustomFetch({ userId: user?._id, url: '/chapter/getall', data: { courseId: params?.id } });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(result)

  return (
    <form className="create">
      <div className="top">
        <h1>Course Setup</h1>
        <Button
          title="Publish"
          glow={false}
          classname="transparent"
          color="black"
          icon={<MdArrowRightAlt size={25} />}
          onClick={onSubmit}
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
            <img src={image} alt="Java Image" />
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
              {result?.lenght < 0 ? "" :
                result?.map((cl) => (
                  <div key={cl.title} className='chapterslist'>
                    <div className='side'>
                      <FaBarsProgress size={25} />
                      <span>{cl.title}</span>
                    </div>
                    <div className='side'>
                      <p>{cl.title}</p>
                      <MdOutlineEdit size={20} />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="box">
            <Input name="price" value={inputs.price} onChange={handleChange} />
          </div>
          <div className="box">
            <select name="category" onChange={(e) => handleChange('category', e.target.value)} required>
              <option value="category">Category</option>
              <option value="engineering">Engineering</option>
              <option value="technology">Technology</option>
              <option value="music">Music</option>
              <option value="film">Film</option>
              <option value="computerScience">Computer Science</option>
              <option value="accounting">Accounting</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Create;
