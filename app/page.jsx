import FeaturedProperties from '@/components/FeaturedProperties'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import HomeProperties from '@/components/HomeProperties'
import InfoBoxes from '@/components/InfoBoxes'
import connectDB from '@/config/database'
import React from 'react'

const page = () => {
  
  return (
    <>
    <Hero />
    <InfoBoxes />
    <FeaturedProperties />
    <HomeProperties />
    <Footer />
    </>
  )
}

export default page