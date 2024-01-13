import './ProfileCard.scss';
import { useSelector } from 'react-redux';
import ProfileItem from './ProfileItem/ProfileItem';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProfileCard = () => {

    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()

    const handleLogout = () => {
        toast.success("Logout successfully")
        navigate('/landingpage')
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