import SidebarItem from '../SidebarItem/SidebarItem'
import './Sidebar.scss'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsBrowserSafari } from "react-icons/bs";

const SideBar = () => {
  return (
    <div className='sidebar'>
      <SidebarItem title="Dashboard" icon={<MdOutlineSpaceDashboard />} />
      <SidebarItem title="Browse" icon={<BsBrowserSafari />} />
    </div>
  )
}

export default SideBar