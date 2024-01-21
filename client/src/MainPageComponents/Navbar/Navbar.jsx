import React from 'react';
import './Navbar.scss';
import Search from '../Search/Search';
import User from '../User/User';
import Button from '../../MainPageComponents/Button/Button';
import { MdArrowRightAlt } from 'react-icons/md';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const coursePage = pathname.split(1)[0];
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useSelector(state => state.auth);

  return (
    <div className='navbar'>
      <Logo />
      {coursePage !== '/course/' && <Search />}
      <div className='navright'>
        {pathname === '/teachermode' ||
          pathname === `/teachermode/create/${params.id}` ||
          pathname === `/teachermode/chaptercreate/${params.id}` ? (
          <Button
            title='Exit'
            icon={<MdArrowRightAlt size={25} />}
            glow={false}
            classname='transparent'
            onClick={() => navigate('/')}
            color='black'
          />
        )
          :
          <Button title='Teacher Mode' glow={false} icon={<MdArrowRightAlt size={25} />} classname='btn' onClick={() => navigate('/teachermode')} />
        }

        <User />
      </div>
    </div>
  );
};

export default Navbar;
