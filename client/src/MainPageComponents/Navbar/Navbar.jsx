import './Navbar.scss'
import Search from '../Search/Search'
import User from '../User/User'
import Button from '../../MainPageComponents/Button/Button'
import { MdArrowRightAlt } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Logo from '../Logo/Logo'

const Navbar = () => {

  const navigate = useNavigate()

  return (
    <div className='navbar'>
      <Logo />
      <Search />
      <div className='navright'>
        <Button title="Teacher Mode" glow={false} icon={<MdArrowRightAlt szie={25} />} classname="btn" onClick={() => navigate('/teachermode')} />
        <User />
      </div>
    </div>
  )
}

export default Navbar