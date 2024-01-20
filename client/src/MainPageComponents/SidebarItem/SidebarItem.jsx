import { GoLock } from 'react-icons/go'
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { PiPlayCircle } from 'react-icons/pi'
import { Link, useLocation } from 'react-router-dom'
import './SidebarItem.scss'

const SidebarItem = ({ icon, title, link, id, isFree, chapterComplete }) => {

    const location = useLocation()
    const pathname = location.pathname
    const coursePage = pathname.split('/')[1] === "course"
    const url = new URL(window.location.href);
    const chapterId = url.searchParams.get("chapterId");

    return (
        <>
            {chapterComplete ?
                <Link to={`${link}`} className={`sidebaritem ${chapterComplete ? "complete" : ""}`} >
                    <div className='itemicon'>{coursePage ? isFree === true ? chapterComplete ? <IoMdCheckmarkCircleOutline className="completespan" /> : <PiPlayCircle /> : <GoLock /> : icon}</div>
                    {chapterComplete ? <span className='completespan'>{title}</span> : <span>{title}</span>}
                </Link>
                :
                <Link to={`${link}`} className={`sidebaritem ${pathname === link || chapterId === id ? chapterComplete ? "complete" : "active" : ""}`} >
                    <div className='itemicon'>{coursePage ? isFree === true ? <PiPlayCircle /> : <GoLock /> : icon}</div>
                    <span>{title}</span>
                </Link>
            }
        </>
    )
}

export default SidebarItem