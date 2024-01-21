import { BsBrowserSafari } from "react-icons/bs";
import { IoBarChart } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import useCustomFetch from '../../Utils/CustomFetch';
import SidebarItem from '../SidebarItem/SidebarItem';
import './Sidebar.scss';

const SideBar = () => {

  const location = useLocation()
  const pathname = location.pathname
  const { user } = useSelector(state => state.auth)
  const params = useParams()

  const { result } = useCustomFetch({
    userId: user?._id,
    url: '/chapter/getall',
    id: params.id,
  });
  
  return (
    <div className='sidebar'>
      {pathname !== `/course/${params.id}` &&
        <>
          <SidebarItem title="Dashboard" icon={<MdOutlineSpaceDashboard />} link={`/dashboard/${user?._id}`} />
          <SidebarItem title="Browse" icon={<BsBrowserSafari />} link="/" />
        </>
      }
      {pathname === "/teachermode" &&
        <SidebarItem title="Courses" icon={<IoBarChart />} link="/teachermode" />
      }


      {/* chapters */}
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
  )
}

export default SideBar