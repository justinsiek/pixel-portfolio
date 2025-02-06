import React from 'react'
import PixelText from '../PixelText'

const Apprazer = () => {
  return (
    <div className='w-full h-full bg-gray-900'>
      <PixelText text="APPRAZER" scale={8} />
      <p className="font-pixel text-white font-medium text-xl mt-8">
        Additional text using Pixelify Sans
      </p>
    </div>
  )
}


export default Apprazer