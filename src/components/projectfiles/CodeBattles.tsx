import React, { useState } from 'react'
import PixelText from '../PixelText'
import Image from 'next/image'
import ModalImage from '../ModalImage'

const CodeBattles = () => {
  const [selectedImage, setSelectedImage] = useState<{
    src: string
    alt: string
    caption: string
  } | null>(null)

  return (
    <div className="min-h-screen text-white px-4 py-8">
      <div className="flex flex-col">
        <PixelText text="CODE BATTLES" scale={8} />
        <div className="mt-8 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Project Description */}
          <div className="text-left">
            <p className="font-pixel text-xl">
              CodeBattles is a cutting-edge competitive programming platform built with Next.js that brings real-time coding battles to life. Its modern, responsive interface empowers programmers of all levels to engage in fast-paced, time-constrained coding competitions, where every solved problem helps boost your rating and ranking.
            </p>
            <ul className="list-disc mt-6 space-y-4">
              <li>
                <strong>Real-Time Battle System:</strong> Leveraging WebSocket connections, CodeBattles pairs users for head-to-head competitions. Live progress tracking and instant test case validation create an electrifying environment where every keystroke counts and your rating is dynamically adjusted based on the outcome.
              </li>
              <li>
                <strong>Interactive Coding Environment:</strong> Enjoy a feature-rich code editor complete with detailed problem descriptions, example test cases, and immediate feedback. This seamless setup ensures that you can write, submit, and fine-tune your solutions in real time.
              </li>
              <li>
                <strong>Flexible Matchmaking & Social Battles:</strong> Whether you're eager for a randomized challenge against similarly-skilled opponents or want to directly challenge a friend, CodeBattles offers agile invitation and matchmaking options for both casual and rated battles.
              </li>
            </ul>
          </div>

          {/* Right Column: Image Placeholders with Captions */}
          <div className="space-y-8">
            {/* System Architecture Diagram */}
            <figure>
              <div
                className="w-full h-64 flex items-center justify-center cursor-pointer"
                onClick={() =>
                  setSelectedImage({
                    src: '/CodeBattlesDashA.jpg',
                    alt: 'System Architecture Diagram',
                    caption: 'Admin Dashboard',
                  })
                }
              >
                <Image
                  src="/CodeBattlesDashA.jpg"
                  alt="System Architecture Diagram"
                  width={500}
                  height={500}
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-2 text-center text-sm text-white">
                Admin Dashboard
              </figcaption>
            </figure>

            {/* Battle Interface Screenshot */}
            <figure>
              <div
                className="w-full h-64 flex items-center justify-center cursor-pointer"
                onClick={() =>
                  setSelectedImage({
                    src: '/CodeBattlesDashB.jpg',
                    alt: 'Battle Interface Screenshot',
                    caption: 'Battle Interface',
                  })
                }
              >
                <Image
                  src="/CodeBattlesDashB.jpg"
                  alt="Battle Interface Screenshot"
                  width={500}
                  height={500}
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-2 text-center text-sm text-white">
                Battle Interface
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

export default CodeBattles