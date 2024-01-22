import { useState } from 'react';
import './MobileNav.scss'
import { RiMenu3Line } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import SidebarItem from '../../SidebarItem/SidebarItem';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useCustomFetch from '../../../Utils/CustomFetch';

const MobileNav = () => {
    const [Open, setOpen] = useState(false)

    const location = useLocation()
    const pathname = location.pathname
    const { user } = useSelector(state => state.auth)
    const params = useParams()

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
    
    return (
        <div className='mobilenav'>
            <RiMenu3Line onClick={() => setOpen(!Open)} size={25} />
            <div className={`content ${Open ? "open" : "close"}`}>
                {Open &&
                    <IoCloseSharp className="mbclose" onClick={() => setOpen(false)} size={20} />
                }
                <div className="side">
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