import './Navbar.scss'
import Search from '../Search/Search'
import User from '../User/User'
import Button from '../../MainPageComponents/Button/Button'
import { MdArrowRightAlt } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '../Logo/Logo'
import { useSelector } from 'react-redux'

const Navbar = () => {

  const location = useLocation()
  const pathname = location.pathname
  const coursePage = pathname.split(1)[0]
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)

  return (
    <div className='navbar'>
      <Logo />
      {coursePage !== '/course/' &&
        <Search />
      }
      <div className='navright'>
        {pathname === "/teachermode" || pathname === "/teachermode/create" ?
          <Button title="Exit" icon={<MdArrowRightAlt szie={25} />} glow={false} classname="transparent" onClick={() => navigate('/')} color="black" />
          :
          <>
            {coursePage !== '/course/' &&
              <Button title="Teacher Mode" glow={false} icon={<MdArrowRightAlt szie={25} />} classname="btn" onClick={() => navigate(user?.role === "student" ? '/teachermode' : "")} />
            }
          </>
        }
        <User />
      </div>
    </div>
  )
}

export default Navbar