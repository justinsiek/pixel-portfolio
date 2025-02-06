import React, { useState } from 'react'
import PixelText from '../PixelText'
import Image from 'next/image'
import ModalImage from '../ModalImage'

const ZotMeet = () => {
  const [selectedImage, setSelectedImage] = useState<{
    src: string
    alt: string
    caption: string
  } | null>(null)

  return (
    <div className="min-h-screen text-white px-4 py-8">
      <div className="flex flex-col">
        <PixelText text="ZOTMEET" scale={8} />
        <div className="mt-8 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Project Description */}
          <div className="text-left">
            <p className="font-pixel text-xl">
              ZotMeet is a modern meeting scheduling application built with Next.js and TypeScript that simplifies group availability coordination. Its clean, intuitive interface lets you effortlessly create meetings, set detailed time slots, and collect participant responses in real time.
            </p>

            <ul className="list-disc mt-6 space-y-4">
              <li>
                <strong>Streamlined Meeting Creation:</strong> Specify meeting names, time ranges, and multiple date options through an effortless creation flow. Input validation ensures a smooth transition as the system automatically redirects you to the availability view once your meeting is set up.
              </li>
              <li>
                <strong>Sophisticated Availability Selection:</strong> Enjoy a responsive grid that visualizes time slots across several dates. With drag-select functionality, real-time updates, and pagination for managing extensive date ranges, selecting availability has never been easier.
              </li>
              <li>
                <strong>Dynamic Group Coordination:</strong> Real-time aggregation of participant responses is presented with a color-coded heatmap highlighting overlapping availabilities, along with a detailed sidebar that shows the specifics for every time slot.
              </li>
            </ul>
          </div>

          {/* Right Column: Image Placeholders with Captions */}
          <div className="space-y-8">
            <figure>
              <div
                className="w-full h-64 flex items-center justify-center cursor-pointer"
                onClick={() =>
                  setSelectedImage({
                    src: '/ZotMeetDashA.jpg',
                    alt: 'Streamlined Meeting Creation Flow',
                    caption: 'Meeting Setup',
                  })
                }
              >
                <Image
                  src="/ZotMeetDashA.jpg"
                  alt="Streamlined Meeting Creation Flow"
                  width={500}
                  height={500}
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-2 text-center text-sm text-white">
                Meeting Setup
              </figcaption>
            </figure>

            <figure>
              <div
                className="w-full h-64 flex items-center justify-center cursor-pointer"
                onClick={() =>
                  setSelectedImage({
                    src: '/ZotMeetDashB.jpg',
                    alt: 'Dynamic Group Availability Visualization',
                    caption: 'Group Availability',
                  })
                }
              >
                <Image
                  src="/ZotMeetDashB.jpg"
                  alt="Dynamic Group Availability Visualization"
                  width={500}
                  height={500}
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-2 text-center text-sm text-white">
                Group Availability
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

export default ZotMeet