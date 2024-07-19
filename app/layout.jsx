import React from 'react'
import "@/assets/styles/globals.css"
import Navbar from '@/components/Navbar'


export const metadata= {
  title:'In The Market',
  description:'Luxury shopping experience',
  keywords:'cars, houses, luxury'
}

const layout = ({children}) => {
  return (

    <html lang="en">
    <body>
        <Navbar />
        <main>{children}</main>
    </body>
    </html>
  )
}

export default layout