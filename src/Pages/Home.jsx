import React from 'react'
import Navbar from '../component/layout/Navbar/Navbar'
import Hero from '../component/hero/Hero'
import Philosophy from '../component/philosophy/Philosophy'
import { Feature } from 'framer-motion'
import FeaturedProjects from '../component/featuredProjects/FeaturedProjects'
import DesignProcess from '../component/CompanyTimeline/DesignProcess'
import { Server } from 'lucide-react'
import Services from '../component/services/Services'


const Home = () => {
  return (
    <>
      <Navbar/>
      <main>
       <Hero/>
       <Philosophy/>
       <FeaturedProjects/>
       <DesignProcess/>
       <Services/>
      </main>
    </>
  )
}

export default Home
