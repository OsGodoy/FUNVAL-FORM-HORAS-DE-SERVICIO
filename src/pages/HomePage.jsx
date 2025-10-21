import React from 'react'
import Cards from '../components/shared/Cards'
import HeaderHome from '../components/Home-components/header-home-s'
import Footer from '../components/Home-components/footer-home'
import Courses from '../components/Home-components/courses'

export default function HomePage() {
  return (
    <>
      <HeaderHome />
      <Courses />
      <Footer />
    </>
  )
}
