import React from 'react'
import Navbar from '../component/layout/Navbar/Navbar'
import Hero from '../component/hero/Hero'
import Philosophy from '../component/philosophy/Philosophy'
import { Feature } from 'framer-motion'
import FeaturedProjects from '../component/featuredProjects/FeaturedProjects'
import DesignProcess from '../component/CompanyTimeline/DesignProcess'
import { Server } from 'lucide-react'
import Services from '../component/services/Services'
import Collections from '../component/collections/Collections'
import WhyChoose from '../component/WhyChoose/WhyChoose'
import Testimonials from '../component/testimonials/Testimonials'
import CTA from '../component/cta/CTA'
import Footer from '../component/layout/Footer/Footer'
import AIChat from '../component/AIChat'


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
        <Collections/> 
        <WhyChoose/>
        <Testimonials/>
        <CTA/>
      </main>
      <Footer/>
      <AIChat/>
    </>
  )
}

export default Home
