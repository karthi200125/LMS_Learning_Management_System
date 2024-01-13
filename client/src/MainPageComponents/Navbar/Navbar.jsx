import './Navbar.scss'
import Search from '../Search/Search'
import User from '../User/User'
import Button from '../../MainPageComponents/Button/Button'
import { MdArrowRightAlt } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '../Logo/Logo'

const Navbar = () => {

  const location = useLocation()
  const pathname = location.pathname
  const navigate = useNavigate()

  console.log('pathanme', pathname)

  return (
    <div className='navbar'>
      <Logo />
      <Search />
      <div className='navright'>
        {pathname === "/teachermode" || pathname === "/teachermode/create" ?
          <Button title="Exit" icon={<MdArrowRightAlt szie={25} />} glow={false} classname="transparent" onClick={() => navigate('/')} color="black" />
          :
          <Button title="Teacher Mode" glow={false} icon={<MdArrowRightAlt szie={25} />} classname="btn" onClick={() => navigate('/teachermode')} />
        }
        <User />
      </div>
    </div>
  )
}

export default Navbar