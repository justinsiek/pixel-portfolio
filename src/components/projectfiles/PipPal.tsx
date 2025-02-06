import React, { useState } from 'react'
import PixelText from '../PixelText'
import Image from 'next/image'

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
              Apprazer is an AI-powered mortgage approval system built by a team of 4 at IrvineHacks.
              Awarded First American's Best Use Of AI In Real Estate, it streamlines the mortgage approval
              process by extracting and analyzing financial data in real-time to predict loan eligibility.
            </p>
            <ul className="list-disc mt-6 space-y-4">
              <li>
                <strong>Intelligent Document Processing:</strong> Engineered a system using PyMuPDF and OpenCV for targeted OCR extraction,
                implementing a coordinate-based ROI method that processes specific form fields with Tesseract OCR.
                This significantly reduces processing time by scanning only 4% of each page while maintaining 98% accuracy.
              </li>
              <li>
                <strong>Loan Decisioning Engine:</strong> Developed a production-grade engine with a scikit-learn Random Forest model 
                trained on over 6 million records, featuring automated feature engineering and one-hot encoding pipelines.
                The engine serves real-time predictions through Flask REST endpoints, achieving sub-100ms response times.
              </li>
              <li>
                <strong>Analytics Dashboard:</strong> Created a real-time dashboard with Next.js and TailwindCSS,
                featuring dynamic SVG-based visualizations and data polling every 5 seconds.
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
                Web Page (Click to Expand)
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* Modal for expanded image with caption */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <figure className="flex flex-col items-center max-w-full">
            <div className="w-full">
              <Image
                src="/PippalDash.jpg"
                alt="Expanded System Architecture Diagram"
                width={1200}
                height={1200}
                className="object-contain"
              />
            </div>
            <figcaption className="mt-2 text-center text-sm text-white">
              Web Page
            </figcaption>
          </figure>
        </div>

      )}
    </div>
  )
}

export default PipPal