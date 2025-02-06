import { motion, AnimatePresence } from "framer-motion"
import PixelText from "./PixelText"


interface LoadingAnimationProps {
  loadingText: string
  progress: number
}

const LoadingAnimation = ({ loadingText, progress }: LoadingAnimationProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black flex items-center justify-center"
      >
        <div className="text-center flex flex-col items-center gap-8">
          <motion.div
            key={loadingText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <PixelText text={loadingText} scale={4} color="#FFF" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <PixelText text={`${progress}%`} scale={4} color="#FFF" />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default LoadingAnimation
