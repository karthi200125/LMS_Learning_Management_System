import React, { useState } from 'react';
import { MdArrowRightAlt } from "react-icons/md";
import Button from '../../MainPageComponents/Button/Button';
import './LadingPageNavbar.scss';
import RegisterModal from '../../MainPageComponents/Modal/RegisterModal/RegisterModal';
import LoginModal from '../../MainPageComponents/Modal/LoginModal/LoginModal';

const LandingPageNavbar = () => {

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='lpnavbar'>
      <div className="logo">SkillSphere</div>

      <ul className="mid">
        <li>Courses</li>
        <li>Pricing</li>
        <li>Resources</li>
        <li>Solutions</li>
        <li>Contact</li>
      </ul>

      <div className="right">
        <Button title="Join for free" icon={<MdArrowRightAlt size={20} />} />
        <Button title="Login" classname="transparent" onClick={openModal} />
        {/* <RegisterModal isOpen={isModalOpen} onClose={closeModal} /> */}
        <LoginModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  )
}

export default LandingPageNavbar