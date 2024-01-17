import SidebarItem from '../SidebarItem/SidebarItem'
import './Sidebar.scss'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsBrowserSafari } from "react-icons/bs";
import { useLocation, useParams } from 'react-router-dom';
import { IoBarChart } from "react-icons/io5";
import { PiPlayCircle } from "react-icons/pi";
import { GoLock } from "react-icons/go";
import { useSelector } from 'react-redux'
import useCustomFetch from '../../Utils/CustomFetch';
import { useEffect, useState } from 'react';
import { AxiosRequest } from '../../Utils/AxiosRequest';

const SideBar = () => {

  const location = useLocation()
  const pathname = location.pathname
  const { user } = useSelector(state => state.auth)
  const params = useParams()
  const [result, setresult] = useState([[]])


  const locakedTopics = [
    { topic: "first", id: 1 },
    { topic: "second", id: 2 },
    { topic: "third", id: 3 },
  ]

  useEffect(() => {
    const getChapters = async () => {
      try {
        const res = await AxiosRequest.post('/chapter/getall', { courseId: params.id })
        setresult(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getChapters()
  }, [params, user])



  return (
    <div className='sidebar'>
      {pathname !== `/course/${params.id}` &&
        <>
          <SidebarItem title="Dashboard" icon={<MdOutlineSpaceDashboard />} link={`/dashboard/${user?._id}`} />
          <SidebarItem title="Browse" icon={<BsBrowserSafari />} link="/" />
        </>
      }
      {pathname === "/teachermode" &&
        <SidebarItem title="Courses" icon={<IoBarChart />} link="/teachermode" />
      }


      {/* chapters */}
      {pathname === `/course/${params.id}` &&
        <>
          {result?.map((chapter) => (
            <SidebarItem title={chapter.title} icon={<GoLock />} link={`/course/${params.id}?chapterId:${chapter._id}`} key={chapter.title} />
          ))}
        </>
      }

    </div>
  )
}

export default SideBar