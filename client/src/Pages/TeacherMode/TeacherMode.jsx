import React, { useCallback, useMemo, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdArrowRightAlt, MdDelete, MdModeEdit } from "react-icons/md";
import { RiArrowUpDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import Button from '../../MainPageComponents/Button/Button';
import Input from "../../MainPageComponents/Input/Input";
import Modal from "../../MainPageComponents/Modal/Modal";
import Skeleton from "../../MainPageComponents/Skeleton/Skeleton";
import { deleteCourse } from "../../Redux/CourseSlice";
import { AxiosRequest } from "../../Utils/AxiosRequest";
import useCustomFetch from "../../Utils/CustomFetch";
import useHandleCrud from "../../Utils/HandleCrud";
import './TeacherMode.scss';

const TeacherMode = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [titleCreateLoad, settitleCreateLoad] = useState(false);
  const [isDelModalOpen, setisDelModalOpen] = useState(false);
  const [delId, setDelId] = useState('');
  const [inputs, setInputs] = useState({
    userId: user?._id,
    title: '',
    price: ''
  });

  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();

  const { result, error, isLoading, Refetch } = useCustomFetch({
    url: '/course/getallcourses',
    id: user?._id
  });

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };


  // course Title create 
  const handleTitleCreate = useCallback(async (e) => {
    e.preventDefault();
    try {
      settitleCreateLoad(true);
      const res = await AxiosRequest.post('/course/create', inputs);
      toast.success("course title created sucessfully")
      const newcourse = res.data
      navigate(`/teachermode/create/${newcourse?._id}`, { state: { newcourse } });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      settitleCreateLoad(false);
    }
  }, [inputs, user?._id, navigate, settitleCreateLoad]);

  // Get Delete course Id
  const getDelid = useCallback((id) => {
    setisDelModalOpen(true);
    setDelId(id);
  }, [setisDelModalOpen, setDelId]);

  // Delete Course Data Pass
  const { isLoading: deleteLoading, fetchData: deleteData } = useHandleCrud(
    '/course/delete',
    'DELETE',
    { userId: user?._id, courseId: delId },
    'course deleted successfully',
    deleteCourse({ courseId: delId })
  );

  // Handle Delete Course
  const handleDeleteCourse = useCallback(async () => {
    await deleteData();
    Refetch();
    setisDelModalOpen(false)
  }, [delId, setisDelModalOpen, dispatch, Refetch]);

  //Delete course modal BodyContent 
  const deleteBodyContent = useMemo(() => (
    <div className="deletemodal">
      <Button
        title="Delete Course"
        glow={false}
        icon={<MdArrowRightAlt size={25} />}
        onClick={handleDeleteCourse}
        bg="red"
        isLoading={deleteLoading}
      />
    </div>
  ), [handleDeleteCourse, deleteLoading]);

  // Ceate new course title bodyconetent
  const bodyContent = useMemo(() => (
    <form className="newcoursetitle">
      <Input name="title" onChange={handleChange} />
      <Input name="price" onChange={handleChange} />
      <Button title="Create New Course" glow={false} icon={<MdArrowRightAlt size={25} />} onClick={handleTitleCreate} isLoading={titleCreateLoad} />
    </form>
  ), [handleChange, handleTitleCreate, titleCreateLoad]);

  return (
    <div className='teacher'>
      <div className="top">
        <Button
          title="New Course"
          glow={false}
          icon={<CiCirclePlus size={25} />}
          onClick={() => setisModalOpen(true)}
        />
        <Modal
          title="New Course Title"
          isOpen={isModalOpen}
          onClose={() => setisModalOpen(false)}
          bodyContent={bodyContent}
        />
      </div>

      <div className="lists">
        <table className='table'>
          <thead>
            <tr>
              <th>Title <RiArrowUpDownLine /></th>
              <th>Price <RiArrowUpDownLine /></th>
              <th>Status <RiArrowUpDownLine /></th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {result?.length <= 0 ? (
              <tr>
                <td colSpan="5">
                  <span className="emptycourses">Create new courses</span>
                </td>
              </tr>
            ) : (
              isLoading ? (
                <tr>
                  <td colSpan="5">
                    <Skeleton count={result?.length} height={30} />
                  </td>
                </tr>
              ) : (
                result?.map((list) => (
                  <tr key={list._id}>
                    <td>{list.title}</td>
                    <td>₹ {list.price}</td>
                    <td className='status'>
                      <div className='statusdiv'>
                        {list.isPublished === true ? "published" : "unpublished"}
                      </div>
                    </td>
                    <td>
                      <Link className='editicon' to={`/teachermode/create/${list?._id}`}>
                        <MdModeEdit size={25} />
                      </Link>
                    </td>
                    <td>
                      <MdDelete size={25} className="del" onClick={() => getDelid(list._id)} />
                      <Modal
                        title="Are you sure you wanna delete"
                        isOpen={isDelModalOpen}
                        onClose={() => setisDelModalOpen(false)}
                        bodyContent={deleteBodyContent}
                      />
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeacherMode;
