import LpHeading from '../LpHeading/LpHeading'
import './LandingPageHome.scss'
import Button from '../../MainPageComponents/Button/Button'
import { MdArrowRightAlt } from "react-icons/md";
import { useState } from 'react';
import RegisterModal from '../../MainPageComponents/Modal/RegisterModal/RegisterModal';
import LoginModal from '../../MainPageComponents/Modal/LoginModal/LoginModal';

const LandingPageHome = () => {

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };


  return (
    <div className='lphome'>
      <LpHeading />
      <p className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque placeat cum odit expedita </p>
      <div className='btm'>
        <Button title="Learn more" icon={<MdArrowRightAlt size={25} />} onClick={() => { openLoginModal(); closeRegisterModal(); }} />
        <Button title="Browse courses" classname='transparent' icon={<MdArrowRightAlt size={25} />} onClick={() => { openLoginModal(); closeRegisterModal(); }} />
        <RegisterModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} onLoginClick={openLoginModal} />
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} RegOpen={openRegisterModal} />
      </div>
      <div className="glow"></div>
    </div>
  )
}

export default LandingPageHome