import './SidebarItem.scss'
import { Link } from 'react-router-dom'

const SidebarItem = ({ icon, title, link }) => {
    return (
        <Link to={`${link}`} className='sidebaritem'>
            <div className='itemicon'>{icon}</div>
            <span>{title}</span>
        </Link>
    )
}

export default SidebarItem