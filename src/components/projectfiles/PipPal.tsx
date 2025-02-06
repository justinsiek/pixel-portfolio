import React, { useState } from 'react'
import PixelText from '../PixelText'
import Image from 'next/image'
import ModalImage from '../ModalImage'

const PipPal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen text-white px-4 py-8">
      <div className="flex flex-col">
        <PixelText text="PIPPAL" scale={8} />
        <div className="mt-8 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Project Description */}
          <div className="text-left">
            <p className="font-pixel text-xl">
              PipPal is a cutting-edge real-time stock analysis platform designed to empower traders with instantaneous market insights. Operating on 120-minute market windows, the system implements multi-factor pattern validation by leveraging R-squared computations alongside dynamic symmetry analysis to pinpoint trading opportunities with precision.
            </p>
            <ul className="list-disc mt-6 space-y-4">
              <li>
                <strong>Responsive Frontend:</strong> Engineered a dynamic interface using Next.js and TypeScript, enhanced with D3.js to render sophisticated technical indicators and overlay patterns with 60-second real-time updates.
              </li>
              <li>
                <strong>Serverless Backend Architecture:</strong> Architected a scalable backend with AWS Lambda and API Gateway. Pattern recognition algorithms written in Python compute key technical indicators—such as VWAP, RSI, and Bollinger Bands—to facilitate in-depth market analysis.
              </li>
              <li>
                <strong>Optimized Performance:</strong> Streamlined AWS Lambda through efficient data caching and selective computation techniques, ensuring reliable real-time market data integration via yfinance.
              </li>
            </ul>
          </div>

          {/* Right Column: Image with Caption */}
          <div className="space-y-8">
            <figure>
              <div 
                className="w-full flex items-center justify-center cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <Image
                  src="/PippalDash.jpg"
                  alt="System Architecture Diagram"
                  width={700}
                  height={700}
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-2 text-center text-sm text-white">
                Web Page
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
      
      {isModalOpen && (
        <ModalImage
          src="/PippalDash.jpg"
          alt="Expanded System Architecture Diagram"
          caption="Web Page"
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default PipPal