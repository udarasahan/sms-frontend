import React from 'react'

const Background = ({children}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-600">
      <div className='overflow-y-auto overscroll-none'>{children}</div>
    </div>
  )
}

export default Background