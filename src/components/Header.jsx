import React from 'react'
import logo from '../assets/images/logo.png'

const Header = () => {
  return (
    <header className="fixed flex top-0 left-0 right-0 bg-gray-800 text-white p-4">
        <div className=' w-10 h-10 mr-10 border rounded-full justify-center text-center text-black'><img className=' rounded-full' src={logo} alt='logo'/></div>
        <h1 className="text-3xl font-semibold">Attendance System</h1>
    </header>
  )
}

export default Header