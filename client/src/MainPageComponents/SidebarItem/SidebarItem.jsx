import './SidebarItem.scss'
import { Link, useLocation } from 'react-router-dom'

const SidebarItem = ({ icon, title, link }) => {

    const location = useLocation()
    const pathname = location.pathname
    
    return (
        <Link to={`${link}`} className={`sidebaritem ${pathname === link ? "active" : ""}`} >
            <div className='itemicon'>{icon}</div>
            <span>{title}</span>
        </Link>
    )
}

export default SidebarItem