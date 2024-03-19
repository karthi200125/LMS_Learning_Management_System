import './User.scss'
import { useSelector } from 'react-redux'
import noProfile from '../../assets/noprofile.png'
import ProfileCard from '../ProfileCard/ProfileCard';
import { useState } from 'react';

const User = () => {
    const { user } = useSelector(state => state.auth);
    const [profileOpen, setProfileOpen] = useState(false)
                
    return (
        <div className='user'>
            <span>{user?.username}</span>
            <img src={user?.profileImg || noProfile} alt={user?.username} onClick={() => setProfileOpen(!profileOpen)} loading='lazy'/>
            {profileOpen &&
                <ProfileCard />
            }
        </div>
    )
}

export default User