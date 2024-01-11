import React from 'react'
import LandingPageNavbar from '../../LadingPageComponents/LandingPageNavbar/LandingPageNavbar'
import LandingPageHome from '../../LadingPageComponents/LandingPageHome/LandingPageHome'
import CollabCompanies from '../../LadingPageComponents/CollabCompanies/CollabCompanies'
import CourseCards from '../../LadingPageComponents/CourseCards/CourseCards'
import Reviews from '../../LadingPageComponents/Reviews/Reviews'
import Footer from '../../LadingPageComponents/Footer/Footer'
import './LandingPage.scss'
import Future from '../../LadingPageComponents/Future/Future'

const LandingPage = () => {
  return (
    <div className='landingpage'>
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