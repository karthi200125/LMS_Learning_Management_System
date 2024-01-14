import './ProfileCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import ProfileItem from './ProfileItem/ProfileItem';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { logout } from '../../Redux/AuthSlice'

const ProfileCard = () => {

    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        toast.success("Logout successfully")
        navigate('/landingpage')
        dispatch(logout())
    }

    return (
        <div className='profilecard'>
            <h1>{user?.username}</h1>
            <ProfileItem title="Home" onclick={() => navigate('/')} />
            <ProfileItem title="Dashboard" onclick={() => navigate('/dashboard/123')} />
            <ProfileItem title="Logout" onclick={handleLogout} />
        </div>
    )
}

export default ProfileCard