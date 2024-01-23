import { useState } from 'react';
import './MobileNav.scss'
import { RiMenu3Line } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import SidebarItem from '../../SidebarItem/SidebarItem';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useCustomFetch from '../../../Utils/CustomFetch';
import ProfileItem from '../../ProfileCard/ProfileItem/ProfileItem';
import User from '../../User/User'

const MobileNav = () => {
    const [Open, setOpen] = useState(false)

    const location = useLocation()
    const pathname = location.pathname
    const { user } = useSelector(state => state.auth)
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        toast.success("Logout successfully")
        navigate('/landingpage')
        dispatch(logout())
        localStorage.removeItem('course')
        localStorage.removeItem('access_token')
        localStorage.removeItem('courses')
    }


    const { result } = useCustomFetch({
        userId: user?._id,
        url: '/chapter/getall',
        id: params.id,
    });

    const { result: getcourse } = useCustomFetch({
        userId: user?._id,
        url: '/course/getcourse',
        id: params.id,
    });

    console.log(user)

    return (
        <div className='mobilenav'>
            <RiMenu3Line onClick={() => setOpen(!Open)} size={25} />
            <div className={`content ${Open ? "open" : "close"}`}>
                {Open &&
                    <IoCloseSharp className="mbclose" onClick={() => setOpen(false)} size={20} />
                }
                <div className="side">
                    {pathname !== `/course/${params.id}` &&
                        <div className="homecon">
                            <img src={user?.profileImg} alt="user" />
                            <h1>{user?.username}</h1>
                            <p>{user?.role}</p>
                            <div className='homeitems'>
                                <ProfileItem title="Home" onclick={() => navigate('/')} />
                                <ProfileItem title="Dashboard" onclick={() => navigate(`/dashboard/${user?._id}`)} />
                                <ProfileItem title="Logout" onclick={handleLogout} />
                            </div>
                        </div>

                    }

                    {/* sidebar course items */}
                    <h1 className='ct'>{getcourse?.title}</h1>
                    {pathname === `/course/${params.id}` &&
                        <>
                            {result?.map((chapter) => (
                                <SidebarItem
                                    title={chapter.title}
                                    link={`/course/${params.id}?chapterId=${chapter._id}`}
                                    key={chapter._id}
                                    isFree={chapter.isFree}
                                    id={chapter._id}
                                    chapterComplete={user?.ChapterCompleted?.includes(chapter?._id)} />
                            ))}
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default MobileNav