import SidebarItem from '../SidebarItem/SidebarItem'
import './Sidebar.scss'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsBrowserSafari } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import { IoBarChart } from "react-icons/io5";
import { PiPlayCircle } from "react-icons/pi";
import { GoLock } from "react-icons/go";
import { useSelector } from 'react-redux'

const SideBar = () => {

  const location = useLocation()
  const pathname = location.pathname
  const coursePage = pathname.split(1)[0]
  const { user } = useSelector(state => state.auth)


  const locakedTopics = [
    { topic: "first", id: 1 },
    { topic: "second", id: 2 },
    { topic: "third", id: 3 },
  ]

  return (
    <div className='sidebar'>
      {coursePage !== '/course/' &&
        <>
          <SidebarItem title="Dashboard" icon={<MdOutlineSpaceDashboard />} link={`/dashboard/${user?._id}`} />
          <SidebarItem title="Browse" icon={<BsBrowserSafari />} link="/" />
        </>
      }
      {pathname === "/teachermode" &&
        <SidebarItem title="Courses" icon={<IoBarChart />} link="/teachermode" />
      }
      {coursePage === '/course/' &&
        <SidebarItem title="Introduction" icon={<PiPlayCircle />} link="/course/1" />
      }

      {coursePage === '/course/' &&
        <>
          {locakedTopics.map((topic) => (
            <SidebarItem title={topic.topic} icon={<GoLock />} link={`/course/${topic.id}`} key={topic.id} />
          ))}
        </>
      }

    </div>
  )
}

export default SideBar