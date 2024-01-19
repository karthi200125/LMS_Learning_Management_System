import { PiPlayCircle } from 'react-icons/pi'
import './SidebarItem.scss'
import { Link, useLocation } from 'react-router-dom'
import { GoLock } from 'react-icons/go'

const SidebarItem = ({ icon, title, link, id, isFree }) => {

    const location = useLocation()
    const pathname = location.pathname
    const coursePage = pathname.split('/')[1] === "course"
    const url = new URL(window.location.href);
    const chapterId = url.searchParams.get("chapterId");

    return (
        <Link to={`${link}`} className={`sidebaritem ${pathname === link || chapterId === id ? "active" : ""}`} >
            <div className='itemicon'>{coursePage ? isFree === true ? <PiPlayCircle /> : <GoLock /> : icon}</div>
            <span>{title}</span>
        </Link>
    )
}

export default SidebarItem