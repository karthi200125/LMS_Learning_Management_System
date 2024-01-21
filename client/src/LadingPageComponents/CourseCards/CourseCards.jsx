import { MdArrowRightAlt } from "react-icons/md";
import Button from '../../MainPageComponents/Button/Button';
import useCustomFetch from '../../Utils/CustomFetch';
import Card from '../../MainPageComponents/Card/Card';
import './CourseCards.scss';
import LoginModal from "../../MainPageComponents/Modal/LoginModal/LoginModal";
import { useState } from "react";
import RegisterModal from "../../MainPageComponents/Modal/RegisterModal/RegisterModal";

const CourseCards = () => {
  const { result } = useCustomFetch({
    url: `/course/getallcourses`,
  });
  
  const limitedCourses = result?.slice(0, 6);

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
    <div className="cards">
      <h1 className="cardtitle">See what you can learn with us</h1>
      <div className='lpcards'>
        {limitedCourses?.map((card) => (
          <Card key={card.id} card={card} color="white" bs="0 0 30px #9813aa" border="1px solid #9813aa"/>
        ))}
      </div>
      <Button title="All" icon={<MdArrowRightAlt size={25} />} onClick={() => { openLoginModal(); closeRegisterModal(); }} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} onLoginClick={openLoginModal} />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} RegOpen={openRegisterModal} />
    </div>
  );
}

export default CourseCards;
