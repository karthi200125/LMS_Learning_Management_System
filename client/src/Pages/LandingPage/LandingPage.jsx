import React from 'react'
import CollabCompanies from '../../LadingPageComponents/CollabCompanies/CollabCompanies'
import CourseCards from '../../LadingPageComponents/CourseCards/CourseCards'
import Footer from '../../LadingPageComponents/Footer/Footer'
import Future from '../../LadingPageComponents/Future/Future'
import LandingPageHome from '../../LadingPageComponents/LandingPageHome/LandingPageHome'
import LandingPageNavbar from '../../LadingPageComponents/LandingPageNavbar/LandingPageNavbar'
import Reviews from '../../LadingPageComponents/Reviews/Reviews'
import './LandingPage.scss'

const LandingPage = () => {
    
  return (
    <div className='landingpage' >
      <LandingPageNavbar />
      <LandingPageHome />
      <CollabCompanies />
      <CourseCards />
      <Reviews />
      <Future />
      <Footer />
    </div>
  )
}

export default LandingPage