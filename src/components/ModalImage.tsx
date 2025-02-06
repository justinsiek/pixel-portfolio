import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface ModalImageProps {
  src: string
  alt: string
  caption: string
  onClose: () => void
}

const ModalImage: React.FC<ModalImageProps> = ({ src, alt, caption, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        layoutId="pipPalImage"
        className="bg-black p-2"
        onClick={e => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={1200}
          quality={100}
          className="object-contain"
        />
        <div className="mt-2 text-center text-white text-sm">
          {caption} (Click to Close)
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ModalImage 