import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar,Footer } from './components'

const Layout = () => {
  return (
    <div className='tile-container'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout