import { CiCirclePlus } from "react-icons/ci";
import { MdModeEdit } from "react-icons/md";
import { RiArrowUpDownLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../MainPageComponents/Button/Button';
import Search from '../../MainPageComponents/Search/Search';
import './TeacherMode.scss';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import useCustomFetch from "../../Utils/CustomFetch";
import Modal from "../../MainPageComponents/Modal/Modal";
import Input from "../../MainPageComponents/Input/Input";
import { MdArrowRightAlt } from "react-icons/md";
import handleRequest from "../../Utils/Handlerequest";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import { deleteCourse } from "../../Redux/CourseSlice";

const TeacherMode = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [isModalOpen, setisModalOpen] = useState(false)
  const [isLoading, setisLoading] = useState(false)
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

  const { result, error, fetchData } = useCustomFetch({ userId: user?._id, url: '/course/getallcourses', data: { userId: user?._id } });

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleTitleCreate = async (e) => {
    e.preventDefault()
    try {
      settitleCreateLoad(true)
      const newcourse = await handleRequest({ url: '/course/create', token, data: inputs, method: "POST", userId: user?._id, successmsg: "Course title created" });
      navigate(`/teachermode/create/${newcourse?._id}`, { state: { newcourse } })
    } catch (error) {
      console.log(error)
    } finally {
      settitleCreateLoad(false)
    }
  }

  const getDelid = (id) => {
    setisDelModalOpen(true)
    setDelId(id)
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteCourse = async () => {
    try {
      setisLoading(true)
      await handleRequest({ url: '/course/delete', token, data: { courseId: delId, userId: user?._id }, method: "DELETE", userId: user?._id, successmsg: "course deleted successfully" })
      setisDelModalOpen(false)
      dispatch(deleteCourse({ courseId: delId }))
      fetchData()
    } catch (error) {
      toast.error(error?.response?.data?.message)
    } finally {
      setisLoading(false)
    }
  }

  const deletebodycontent = (
    <div className="deletemodal">
      <Button title="Delete Course" glow={false} icon={<MdArrowRightAlt size={25} />} onClick={handleDeleteCourse} bg="red" isLoading={isLoading} />
    </div>
  )

  const bodyconetnt = (
    <form className="newcoursetitle">
      <Input name="title" onChange={handleChange} />
      <Input name="price" onChange={handleChange} />
      <Button title="create new course" glow={false} icon={<MdArrowRightAlt size={25} />} onClick={handleTitleCreate} isLoading={titleCreateLoad} />
    </form>
  )

  return (
    <div className='teacher'>
      <div className="top">
        <Search />
        <Button title="New Course" glow={false} icon={<CiCirclePlus size={25} />} onClick={() => setisModalOpen(true)} />
        <Modal title="New Course Title" isOpen={isModalOpen} onClose={() => setisModalOpen(false)} bodyContent={bodyconetnt} />
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
            {result?.length < 0 ? <span className="emptycourses">create new courses</span> :
              result?.map((list) => (
                <tr>
                  <td>{list.title}</td>
                  <td>₹ {list.price}</td>
                  <td className='status'>
                    <div className='statusdiv'>
                      {list.isPublished === true ? "published" : "unpublished"}
                    </div>
                  </td>
                  <td >
                    <Link className='editicon' to={`/teachermode/create`}>
                      <MdModeEdit size={25} />
                    </Link>
                  </td>
                  <td>
                    <MdDelete size={25} className="del" onClick={() => getDelid(list._id)} />
                    <Modal title="Are you sure you wanna delete" isOpen={isDelModalOpen} onClose={() => setisDelModalOpen(false)} bodyContent={deletebodycontent} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default TeacherMode