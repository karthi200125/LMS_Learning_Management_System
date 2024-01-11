import React from 'react'
import './LadingPageNavbar.scss'
import Button from '../../MainPageComponents/Button/Button'
import { MdArrowRightAlt } from "react-icons/md";

const LandingPageNavbar = () => {
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
        <Button title="Login" classname="transparent" />
      </div>
    </div>
  )
}

export default LandingPageNavbar