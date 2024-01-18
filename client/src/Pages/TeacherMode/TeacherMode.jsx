import { useState } from "react";
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
import useCustomFetch from "../../Utils/CustomFetch";
import handleRequest from "../../Utils/Handlerequest";
import './TeacherMode.scss';

const TeacherMode = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [isModalOpen, setisModalOpen] = useState(false)
  const [titleCreateLoad, settitleCreateLoad] = useState(false)
  const [isDelModalOpen, setisDelModalOpen] = useState(false)
  const [inputs, setInputs] = useState({
    userId: user?._id,
    title: '',
    price: ''
  });
  const [delId, setDelId] = useState('')

  const token = localStorage.getItem('access_token');
  const navigate = useNavigate()

  const { result, error, isLoading, fetchData } = useCustomFetch({
    url: '/course/getallcourses',
    id: user?._id
  });

  // useEffect(() => {
  //   fetchData()
  // }, [fetchData])


  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleTitleCreate = async (e) => {
    e.preventDefault()
    try {
      settitleCreateLoad(true)
      const newcourse = await handleRequest({
        url: '/course/create',
        token,
        data: inputs,
        method: "POST",
        userId: user?._id,
        successmsg: "Course title created"
      });
      navigate(`/teachermode/create/${newcourse?._id}`, { state: { newcourse } })
    } catch (error) {
      console.error(error);
    } finally {
      settitleCreateLoad(false)
    }
  }

  const getDelid = (id) => {
    setisDelModalOpen(true)
    setDelId(id)
  }

  const handleDeleteCourse = async () => {
    try {
      setisDelModalOpen(true);
      const res = await handleRequest({
        url: '/course/delete',
        token,
        data: { courseId: delId, userId: user?._id },
        method: "DELETE",
        userId: user?._id,
        successmsg: "course deleted successfully"
      });
      dispatch(deleteCourse({ courseId: delId }));
      toast.success(res?.message || 'Course deleted successfully');
      fetchData();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete course');
    } finally {
      setisDelModalOpen(false);
    }
  }


  const deletebodycontent = (
    <div className="deletemodal">
      <Button
        title="Delete Course"
        glow={false}
        icon={<MdArrowRightAlt size={25} />}
        onClick={handleDeleteCourse}
        bg="red"
        isLoading={isLoading}
      />
    </div>
  )

  const bodyconetnt = (
    <form className="newcoursetitle">
      <Input name="title" onChange={handleChange} />
      <Input name="price" onChange={handleChange} />
      <Button
        title="create new course"
        glow={false}
        icon={<MdArrowRightAlt size={25} />}
        onClick={handleTitleCreate}
        isLoading={titleCreateLoad}
      />
    </form>
  )

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
          bodyContent={bodyconetnt}
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
                        bodyContent={deletebodycontent}
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
  )
}

export default TeacherMode;
