import React from 'react'
import './LadingPageNavbar.scss'
import Button from '../../MainPageComponents/Button/Button'
import { MdArrowRightAlt } from "react-icons/md";

const LandingPageNavbar = () => {
  return (
    <div className='lpnavbar'>
      <div className="log">LMS</div>

      <ul className="mid">
        <li>Products</li>
        <li>Goverment</li>
        <li>Solutions</li>
        <li>Conatct</li>
        <li>Pricing</li>
        <li>Resources</li>
      </ul>

      <div className="right">
        <Button title="Demo" />
        <Button title="Login" />
      </div>
    </div>
  )
}

export default LandingPageNavbar