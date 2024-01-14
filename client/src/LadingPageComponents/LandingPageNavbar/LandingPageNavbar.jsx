import React, { useState } from 'react';
import { MdArrowRightAlt } from 'react-icons/md';
import Button from '../../MainPageComponents/Button/Button';
import './LadingPageNavbar.scss';
import RegisterModal from '../../MainPageComponents/Modal/RegisterModal/RegisterModal';
import LoginModal from '../../MainPageComponents/Modal/LoginModal/LoginModal';
import Logo from '../../MainPageComponents/Logo/Logo';

const LandingPageNavbar = () => {
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
    <div className='lpnavbar'>
      <Logo />

      <ul className='mid'>
        <li>Courses</li>
        <li>Pricing</li>
        <li>Resources</li>
        <li>Solutions</li>
        <li>Contact</li>
      </ul>

      <div className='right'>
        <Button title='Join for free' icon={<MdArrowRightAlt size={20} />} onClick={openRegisterModal} />
        <Button title='Login' classname='transparent' onClick={() => { openLoginModal(); closeRegisterModal(); }} />
        <RegisterModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} onLoginClick={openLoginModal} />
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} RegOpen={openRegisterModal} />
      </div>
    </div>
  );
};

export default LandingPageNavbar;
