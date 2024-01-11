import LpHeading from '../LpHeading/LpHeading'
import './LandingPageHome.scss'
import Button from '../../MainPageComponents/Button/Button'
import { MdArrowRightAlt } from "react-icons/md";

const LandingPageHome = () => {
  return (
    <div className='lphome'>
      <LpHeading />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque placeat cum odit expedita </p>
      <p>Cumque placeat cum odit expedita </p>
      <div className='btm'>
        <Button title="Learn more" icon={<MdArrowRightAlt size={25} />} />
        <Button title="Browse courses" classname='transparent' icon={<MdArrowRightAlt size={25} />} />
      </div>
      <div className="glow"></div>
    </div>
  )
}

export default LandingPageHome