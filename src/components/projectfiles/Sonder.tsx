import React, { useState } from 'react'
import PixelText from '../PixelText'
import Image from 'next/image'
import ModalImage from '../ModalImage'

const Sonder = () => {
  const [selectedImage, setSelectedImage] = useState<{
    src: string
    alt: string
    caption: string
  } | null>(null)

  return (
    <div className="min-h-screen text-white px-4 py-8">
      <div className="flex flex-col">
        <PixelText text="SONDER" scale={8} />
        <div className="mt-8 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Project Description */}
          <div className="text-left">
            <p className="font-pixel text-xl">
              Sonder is a groundbreaking decentralized Web3 social media platform that revolutionizes online interactions. By integrating MetaMask for secure, wallet-based authentication, it fuses the benefits of blockchain technology with traditional social networking to provide enhanced privacy and control.
            </p>

            <ul className="list-disc mt-6 space-y-4">
              <li>
                <strong>Web3 Social Media Platform:</strong> At its core, Sonder harnesses Web3 technology and MetaMask integration to offer a decentralized authentication process. This empowers users with secure identity management and a new level of privacy in social media interactions.
              </li>
              <li>
                <strong>Pinterest-Style Content Discovery:</strong> Discover content through a visually engaging, Pinterest-inspired masonry grid. With dynamically sized cards arranged in a 5-column layout, the infinite-scroll interface adapts seamlessly to all screen sizes, ensuring that every piece of content gets the visual attention it deserves.
              </li>
              <li>
                <strong>Streamlined Content Creation:</strong> Post with ease using an intuitive multi-step content creation workflow. From media uploads and text inputs to a final confirmation step, the process is both user-friendly and efficient—powered by Firebase for reliable storage and retrieval of your content.
              </li>
            </ul>
          </div>

          {/* Right Column: Image Placeholders with Captions */}
          <div className="space-y-8">
            {/* User Interface Dashboard */}
            <figure>
              <div
                className="w-full h-64 flex items-center justify-center cursor-pointer"
                onClick={() =>
                  setSelectedImage({
                    src: '/SonderDashA.jpg',
                    alt: 'User Dashboard with MetaMask Integration',
                    caption: 'Hero Page',
                  })
                }
              >
                <Image
                  src="/SonderDashA.jpg"
                  alt="User Dashboard with MetaMask Integration"
                  width={500}
                  height={500}
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-2 text-center text-sm text-white">
                Hero Page
              </figcaption>
            </figure>


            {/* Content Discovery Feed */}
            <figure>
              <div
                className="w-full h-64 flex items-center justify-center cursor-pointer"
                onClick={() =>
                  setSelectedImage({
                    src: '/SonderDashB.jpg',
                    alt: 'Pinterest-Style Content Feed',
                    caption: 'Content Feed',
                  })
                }
              >
                <Image
                  src="/SonderDashB.jpg"
                  alt="Pinterest-Style Content Feed"
                  width={500}
                  height={500}
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-2 text-center text-sm text-white">
                Content Feed
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {selectedImage && (
        <ModalImage
          src={selectedImage.src}
          alt={selectedImage.alt}
          caption={selectedImage.caption}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  )
}

export default Sonder