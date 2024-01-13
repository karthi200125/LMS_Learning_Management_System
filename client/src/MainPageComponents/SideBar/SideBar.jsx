import SidebarItem from '../SidebarItem/SidebarItem'
import './Sidebar.scss'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsBrowserSafari } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import { IoBarChart } from "react-icons/io5";

const SideBar = () => {

  const location = useLocation()
  const pathname = location.pathname
  
  return (
    <div className='sidebar'>
      <SidebarItem title="Dashboard" icon={<MdOutlineSpaceDashboard />} link="/dashboard/123" />
      <SidebarItem title="Browse" icon={<BsBrowserSafari />} link="/" />
      {pathname === "/teachermode" &&
        <SidebarItem title="Courses" icon={<IoBarChart />} link="/teachermode" />
      }
    </div>
  )
}

export default SideBar