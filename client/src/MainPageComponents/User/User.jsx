import './User.scss'
import { useSelector } from 'react-redux'
import noProfile from '../../assets/noprofile.png'

const User = () => {
    const { user } = useSelector(state => state.auth);
    return (
        <div className='user'>
            <span>{user?.username}</span>
            <img src={user?.profileImg || noProfile} alt={user?.username} />
        </div>
    )
}

export default User