import React, { useState } from 'react'
import PixelText from '../PixelText'
import Image from 'next/image'
import ModalImage from '../ModalImage'

const JaimesAI = () => {
  const [selectedImage, setSelectedImage] = useState<{
    src: string
    alt: string
    caption: string
  } | null>(null)

  return (
    <div className="min-h-screen text-white px-4 py-8">
      <div className="flex flex-col">
        <PixelText text="JAIMES AI" scale={8} />
        <div className="mt-8 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Project Description */}
          <div className="text-left">
            <p className="font-pixel text-xl">
              Jaimes AI revolutionizes web accessibility by empowering visually impaired users to explore the web using voice commands. By converting page HTML into actionable components with a state-of-the-art large language model — Meta’s Llama 3.2 — Jaimes AI enables users to quickly read, write, and navigate seamlessly.
            </p>
            <ul className="list-disc mt-6 space-y-4">
              <li>
                <strong>Enhanced Accessibility:</strong> A smart Chrome extension feeds page HTML into an LLM powered by Meta’s Llama 3.2, identifying key components and allowing users to instantly jump between sections using voice.
              </li>
              <li>
                <strong>Voice-Driven Interaction:</strong> Leveraging Google Cloud's advanced speech-to-text and text-to-speech APIs alongside Meta’s cutting-edge Llama 3.2 model, user prompts are effortlessly translated into actionable commands.
              </li>
              <li>
                <strong>Robust Backend Integration:</strong> The extension communicates with a Flask API that utilizes Nosana’s GPU-powered LLM service on Cloudflare, now optimized through the high efficiency of Llama 3.2 — ensuring rapid, reliable command processing.
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
                    src: '/JaimesDash.jpg',
                    alt: 'Voice Command Demo',
                    caption: 'User Interface'
                  })
                }
              >
                <Image
                  src="/JaimesDash.jpg"
                  alt="User Interface"
                  width={500}
                  height={500}
                  className="object-contain"

                />
              </div>
              <figcaption className="mt-2 text-center text-sm text-white">
                User Interface
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

export default JaimesAI