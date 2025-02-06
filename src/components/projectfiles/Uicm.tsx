import React, { useState } from 'react'
import PixelText from '../PixelText'
import Image from 'next/image'
import ModalImage from '../ModalImage'

const Uicm = () => {
  // Using a state object to store modal image details
  const [modalImage, setModalImage] = useState<{ src: string; alt: string; caption: string } | null>(null)

  return (
    <div className="min-h-screen text-white px-4 py-8">
      <div className="flex flex-col">
        <PixelText text="UICM" scale={8} />
        <div className="mt-8 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Project Description */}
          <div className="text-left">
            <p className="font-pixel text-xl">
              UICM (UI Component Manager) is a full-stack platform for sharing and managing reusable UI components.
              Developed with Next.js, TypeScript, and Express, UICM empowers users to publish, discover, and download community-built components,
              accelerating development by leveraging proven UI building blocks.
            </p>

            <ul className="list-disc mt-6 space-y-4">
              <li>
                <strong>Scalable Monorepo Structure:</strong> Architected the platform using Turborepo to streamline workflows across web and API services,
                leveraging shared TypeScript configurations and automated build processes for efficient development.
              </li>
              <li>
                <strong>Community-Driven UI Sharing:</strong> Built an intuitive system for developers to share and import UI components,
                featuring an easy-to-use CLI tool alongside a modern web interface that simplifies component discovery and management.
              </li>
              <li>
                <strong>Quality-Driven Development:</strong> Utilized automated linting, formatting, and integration testing along with strict GitHub branch rules.
                Regular sprint meetings and comprehensive planning sessions ensured our team maintained a clear vision and robust API design.
              </li>
            </ul>
          </div>

          {/* Right Column: Image Placeholders with Captions using ModalImage */}
          <div className="space-y-8">
            {/* System Architecture Diagram */}
            <figure>
              <div
                className="w-full h-64 flex items-center justify-center cursor-pointer"
                onClick={() =>
                  setModalImage({
                    src: "/UICMDashA.jpg",
                    alt: "System Architecture Diagram",
                    caption: "Admin Dashboard"
                  })
                }
              >
                <Image src="/UICMDashA.jpg" alt="System Architecture Diagram" width={500} height={500} />
              </div>
              <figcaption className="mt-2 text-center text-sm text-white">Admin Dashboard</figcaption>
            </figure>

            {/* Analytics Dashboard Screenshot */}
            <figure>
              <div
                className="w-full h-64 flex items-center justify-center cursor-pointer"
                onClick={() =>
                  setModalImage({
                    src: "/UICMDashB.jpg",
                    alt: "Analytics Dashboard Screenshot",
                    caption: "Loan Dashboard"
                  })
                }
              >
                <Image src="/UICMDashB.jpg" alt="Analytics Dashboard Screenshot" width={500} height={500} />
              </div>
              <figcaption className="mt-2 text-center text-sm text-white">Loan Dashboard</figcaption>
            </figure>
          </div>
        </div>
      </div>

      {modalImage && (
        <ModalImage
          src={modalImage.src}
          alt={modalImage.alt}
          caption={modalImage.caption}
          onClose={() => setModalImage(null)}
        />
      )}
    </div>
  )
}

export default Uicm