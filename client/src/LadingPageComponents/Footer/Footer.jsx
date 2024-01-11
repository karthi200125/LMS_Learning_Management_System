import './Footer.scss'
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className='footer'>
      <div className="lists">
        <ul>
          <h1>Coursera</h1>
          <li>About</li>
          <li>What we offer</li>
          <li>Leadership</li>
          <li>Careers</li>
          <li>Premium</li>
          <li>Social impacts</li>
        </ul>
        <ul>
          <h1>Community</h1>
          <li>Learners</li>
          <li>Partners</li>
          <li>Blog</li>
          <li>TechBlog</li>
          <li>Teaching center</li>
        </ul>
        <ul>
          <h1>More</h1>
          <li>Privacy</li>
          <li>Help</li>
          <li>Terms</li>
          <li>Contact</li>
        </ul>
      </div>

      <div className="copyright">
        <span>Copyright © 2024 SkillSphere, Inc. All rights reserved.</span>
        <div className='icons'>
          <FaFacebook size={25} />
          <FaLinkedin size={25} />
          <FaYoutube size={25} />
          <RiInstagramFill size={25} />
        </div>
      </div>
    </div>
  )
}

export default Footer;
