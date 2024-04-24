import React from 'react'

const WelcomeComponent = () => {
  return (
    <>
        <h1 className="mb-4 text-2xl font-bold text-center md:text-4xl lg:text-5xl">Welcome to the Attendance System</h1>
        <p className="mb-8 text-base text-center text-gray-200 md:text-lg lg:text-xl">Class student attendance with ease.</p>
       <div className='justify-center text-center '> 
            <button className="px-4 py-2 font-bold text-white rounded bg-slate-400 hover:bg-slate-700">
              <a href='/login'>Get Started</a>
            </button>
       </div>
    </>
    
  )
}

export default WelcomeComponent