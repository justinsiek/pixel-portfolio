"use client"

import { useEffect, useRef, useState } from "react"
import PIXEL_FONT from "@/components/PixelFont"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

const COLOR = "#FFFFFF"
const HIT_COLOR = "#555555"
const BACKGROUND_COLOR = "#000000"
const BALL_COLOR = "#FFFFFF"
const PADDLE_COLOR = "#FFFFFF"
const LETTER_SPACING = 1
const WORD_SPACING = 3
const SCORE_COLOR = "#FFFFFF"



interface Pixel {
  x: number
  y: number
  size: number
  hit: boolean
}

interface Ball {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
}

interface Paddle {
  x: number
  y: number
  width: number
  height: number
  targetY: number
  isVertical: boolean
  isStatic?: boolean
}

const PixelText = ({ text, scale = 2, color = "#FFF" }: { text: string; scale?: number; color?: string }) => {
  const chars = text.split('')
  const charWidths = chars.map(char => PIXEL_FONT[char as keyof typeof PIXEL_FONT]?.[0]?.length ?? 0)
  const totalWidth = charWidths.reduce((sum, width, index) => sum + width * scale + (index > 0 ? LETTER_SPACING * scale : 0), 0)
  const height = 5 * scale // 5 rows in the font

  return (
    <div className="relative" style={{ width: totalWidth, height }}>
      {chars.map((char, charIndex) => {
        const pixelMap = PIXEL_FONT[char as keyof typeof PIXEL_FONT]
        if (!pixelMap) return null
        
        const charWidth = charWidths[charIndex]
        let xOffset = charIndex > 0 ? LETTER_SPACING * scale : 0
        xOffset += chars.slice(0, charIndex).reduce((sum, _, i) => sum + charWidths[i] * scale + LETTER_SPACING * scale, 0)

        return pixelMap.map((row, i) =>
          row.map((filled, j) => 
            filled ? (
              <div
                key={`${char}-${charIndex}-${i}-${j}`}
                className="absolute"
                style={{
                  backgroundColor: color,
                  width: scale,
                  height: scale,
                  left: xOffset + j * scale,
                  top: i * scale,
                }}
              />
            ) : null
          )
        )
      })}
    </div>
  )
}

export function Hero() {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const ballRef = useRef<Ball>({ x: 0, y: 0, dx: 0, dy: 0, radius: 0 })
  const paddlesRef = useRef<Paddle[]>([])
  const scaleRef = useRef(1)
  const [score, setScore] = useState(0)
  const scoreRef = useRef(0)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("LOADING...")

  useEffect(() => {
    const loadInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadInterval)
          setTimeout(() => {
            setLoadingText("DONE!")
            setTimeout(() => setLoading(false), 1000)
          }, 500)
          return 100
        }
        return prev + 1
      })
    }, 30)

    return () => clearInterval(loadInterval)
  }, [])

  useEffect(() => {
    if (loading) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      scaleRef.current = Math.min(canvas.width / 1000, canvas.height / 1000)
      initializeGame()
    }

    const initializeGame = () => {
      setScore(0)
      scoreRef.current = 0
      const scale = scaleRef.current
      
      // Original sizes
      const NAME_PIXEL_SIZE = 11 * scale
      const OTHER_PIXEL_SIZE = 6 * scale  
      const BALL_SPEED = 6 * scale

      pixelsRef.current = []
      const wordGroups = [
        "z",
        "SOFTWARE DEVELOPER",
        "UI/UX DESIGNER",
        "SLEEP ENTHUSIAST"
      ]


      const calculateWordWidth = (word: string, pixelSize: number) => {
        return (
          word.split("").reduce((width, letter) => {
            const letterWidth = PIXEL_FONT[letter as keyof typeof PIXEL_FONT]?.[0]?.length ?? 0
            return width + letterWidth * pixelSize + LETTER_SPACING * pixelSize
          }, 0) -
          LETTER_SPACING * pixelSize
        )
      }

      // Calculate scale factor only for non-name text
      const otherLines = wordGroups.slice(1)
      const otherLineWidths = otherLines.map(line => 
        line.split(" ").reduce((width, word) => 
          width + calculateWordWidth(word, OTHER_PIXEL_SIZE), 0
        )
      )
      
      const maxOtherWidth = Math.max(...otherLineWidths)
      const availableWidth = canvas.width * 0.9
      const otherScaleFactor = Math.min(1, availableWidth / maxOtherWidth)

      // Apply scaling only to non-name text
      const adjustedNameSize = NAME_PIXEL_SIZE
      const adjustedOtherSize = OTHER_PIXEL_SIZE * otherScaleFactor

      const lineWidths = wordGroups.map((line, index) => {
        const pixelSize = index === 0 ? adjustedNameSize : adjustedOtherSize
        return line.split(" ").reduce((width, word, wordIndex) => {
          return width + calculateWordWidth(word, pixelSize) + (wordIndex > 0 ? WORD_SPACING * pixelSize : 0)
        }, 0)
      })
      const totalWidth = Math.max(...lineWidths)
      const scaleFactor = (canvas.width * 0.8) / totalWidth

      const adjustedLargePixelSize = adjustedNameSize * scaleFactor
      const adjustedSmallPixelSize = adjustedOtherSize * scaleFactor

      const largeTextHeight = 5 * adjustedLargePixelSize
      const smallTextHeight = 5 * adjustedSmallPixelSize
      const nameSpaceBetweenLines = 4 * adjustedLargePixelSize
      const otherSpaceBetweenLines = 1.5 * adjustedLargePixelSize
      const totalTextHeight = largeTextHeight + (wordGroups.length - 1) * (smallTextHeight + nameSpaceBetweenLines)

      let startY = (canvas.height - totalTextHeight) * 0.4
      const initialTextY = startY

      wordGroups.forEach((word, wordIndex) => {
        const pixelSize = wordIndex === 0 ? adjustedNameSize : adjustedOtherSize
        const words = word.split(" ")
        const lineWidth = words.reduce((width, w, index) => {
          return width + calculateWordWidth(w, pixelSize) + (index > 0 ? WORD_SPACING * pixelSize : 0)
        }, 0)

        let startX = (canvas.width - lineWidth) / 2

        words.forEach((subWord) => {
          subWord.split("").forEach((letter) => {
            const pixelMap = PIXEL_FONT[letter as keyof typeof PIXEL_FONT]
            if (!pixelMap) return

            for (let i = 0; i < pixelMap.length; i++) {
              for (let j = 0; j < pixelMap[i].length; j++) {
                if (pixelMap[i][j]) {
                  const x = startX + j * pixelSize
                  const y = startY + i * pixelSize
                  pixelsRef.current.push({ x, y, size: pixelSize, hit: false })
                }
              }
            }
            startX += (pixelMap[0].length + LETTER_SPACING) * pixelSize
          })
          startX += WORD_SPACING * pixelSize
        })
        
        startY += wordIndex === 0 ? 
          largeTextHeight + nameSpaceBetweenLines : 
          smallTextHeight + otherSpaceBetweenLines
      })

      // Initialize ball position near the top right corner
      const ballStartX = canvas.width * 0.8
      const ballStartY = canvas.height * 0.1

      ballRef.current = {
        x: ballStartX,
        y: ballStartY,
        dx: -BALL_SPEED,
        dy: BALL_SPEED,
        radius: adjustedLargePixelSize / 2.5,
      }

      // Add centered static bar under text
      const barPadding = 20 * scale
      const barWidth = 200 * scale
      const barY = (initialTextY + totalTextHeight + barPadding) * 0.8
      const barHeight = adjustedLargePixelSize * 2.25

      const paddleWidth = adjustedLargePixelSize
      const paddleLength = 7 * adjustedLargePixelSize

      paddlesRef.current = [
        
  
        {
          x: canvas.width / 2 - paddleLength / 2,
          y: canvas.height - 3.5 * paddleWidth,
          width: paddleLength * 1.5,
          height: paddleWidth,
          targetY: canvas.width / 2 - paddleLength / 2,
          isVertical: false,
        },
        {
          x: canvas.width/2 - 2*barWidth - barWidth/2,
          y: barY + canvas.height/10,
          width: barWidth,
          height: barHeight,
          targetY: barY,
          isVertical: false,
          isStatic: true
        },
        {
          x: canvas.width/2 - barWidth/2,
          y: barY + canvas.height/10,
          width: barWidth,
          height: barHeight,
          targetY: barY,
          isVertical: false,
          isStatic: true
        },
        {
          x: canvas.width/2 + barWidth + barWidth/2,
          y: barY + canvas.height/10,
          width: barWidth,
          height: barHeight,
          targetY: barY,
          isVertical: false,
          isStatic: true
        },
      ]
    }

    const updateGame = () => {
      const ball = ballRef.current
      const paddles = paddlesRef.current

      ball.x += ball.dx
      ball.y += ball.dy

      if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy
      }
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx
      }

      paddles.forEach((paddle) => {
        if (paddle.isVertical) {
          if (
            ball.x - ball.radius < paddle.x + paddle.width &&
            ball.x + ball.radius > paddle.x &&
            ball.y > paddle.y &&
            ball.y < paddle.y + paddle.height
          ) {
            ball.dx = -ball.dx
          }
        } else {
          if (
            ball.y - ball.radius < paddle.y + paddle.height &&
            ball.y + ball.radius > paddle.y &&
            ball.x > paddle.x &&
            ball.x < paddle.x + paddle.width
          ) {
            // Calculate penetration depths
            const penetrationLeft = ball.x + ball.radius - paddle.x
            const penetrationRight = paddle.x + paddle.width - (ball.x - ball.radius)
            const penetrationTop = ball.y + ball.radius - paddle.y
            const penetrationBottom = paddle.y + paddle.height - (ball.y - ball.radius)
            
            // Find smallest penetration
            const minPenetration = Math.min(
              penetrationLeft,
              penetrationRight,
              penetrationTop,
              penetrationBottom
            )

            // Resolve collision based on smallest penetration
            if (minPenetration === penetrationLeft || minPenetration === penetrationRight) {
              ball.dx = -ball.dx
              ball.x += ball.dx * 2 // Move outside paddle
            } else {
              ball.dy = -ball.dy
              ball.y += ball.dy * 2 // Move outside paddle
            }
          }
        }
      })

      paddles.forEach((paddle) => {
        if (paddle.isStatic) return // Keep static check for movement only
        
        if (paddle.isVertical) {
          paddle.targetY = ball.y - paddle.height / 2
          paddle.targetY = Math.max(0, Math.min(canvas.height - paddle.height, paddle.targetY))
          paddle.y += (paddle.targetY - paddle.y) * 0.1
        } else {
          paddle.targetY = ball.x - paddle.width / 2
          paddle.targetY = Math.max(0, Math.min(canvas.width - paddle.width, paddle.targetY))
          paddle.x += (paddle.targetY - paddle.x) * 0.1
        }
      })

      pixelsRef.current.forEach((pixel) => {
        if (
          !pixel.hit &&
          ball.x + ball.radius > pixel.x &&
          ball.x - ball.radius < pixel.x + pixel.size &&
          ball.y + ball.radius > pixel.y &&
          ball.y - ball.radius < pixel.y + pixel.size
        ) {
          pixel.hit = true
          scoreRef.current += 1
          setScore(scoreRef.current)
          const centerX = pixel.x + pixel.size / 2
          const centerY = pixel.y + pixel.size / 2
          if (Math.abs(ball.x - centerX) > Math.abs(ball.y - centerY)) {
            ball.dx = -ball.dx
          } else {
            ball.dy = -ball.dy
          }
        }
      })
    }

    const drawGame = () => {
      if (!ctx) return

      ctx.fillStyle = BACKGROUND_COLOR
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      pixelsRef.current.forEach((pixel) => {
        ctx.fillStyle = pixel.hit ? HIT_COLOR : COLOR
        ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
      })

      ctx.fillStyle = BALL_COLOR
      ctx.beginPath()
      ctx.arc(ballRef.current.x, ballRef.current.y, ballRef.current.radius, 0, Math.PI * 2)
      ctx.fill()

      // Draw paddles
      ctx.fillStyle = PADDLE_COLOR
      paddlesRef.current.forEach((paddle) => {
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
      })

      // Add text to static paddles
      const staticPaddles = paddlesRef.current.filter(p => p.isStatic)
      const paddleTexts = ["ABOUT", "PROJECTS", "CONTACT"]
      staticPaddles.forEach((paddle, index) => {
        const text = paddleTexts[index]
        const scale = scaleRef.current
        const pixelSize = 3 * scale  // Match score text size
        const letterSpacing = LETTER_SPACING * pixelSize

        // Calculate total text width
        let totalWidth = text.split('').reduce((width, letter) => {
          const letterWidth = PIXEL_FONT[letter as keyof typeof PIXEL_FONT]?.[0]?.length ?? 0
          return width + letterWidth * pixelSize + letterSpacing
        }, -letterSpacing)

        // Center text in paddle
        let startX = paddle.x + (paddle.width - totalWidth) / 2
        const startY = paddle.y + (paddle.height - 5 * pixelSize) / 2  // 5 rows in font

        // Draw each letter
        ctx.fillStyle = BACKGROUND_COLOR
        text.split('').forEach(letter => {
          const pixelMap = PIXEL_FONT[letter as keyof typeof PIXEL_FONT]
          if (!pixelMap) return

          for (let i = 0; i < pixelMap.length; i++) {
            for (let j = 0; j < pixelMap[i].length; j++) {
              if (pixelMap[i][j]) {
                ctx.fillRect(
                  startX + j * pixelSize,
                  startY + i * pixelSize,
                  pixelSize,
                  pixelSize
                )
              }
            }
          }
          startX += (pixelMap[0].length + LETTER_SPACING) * pixelSize
        })
      })

      // Draw score with pixel numerals
      const scoreText = `SCORE:${scoreRef.current}`
      const scale = scaleRef.current
      const numeralSize = 3 * scale
      let startX = canvas.width - 30 * scale - (scoreText.length * (5 + LETTER_SPACING) * numeralSize)
      const startY = 30 * scale

      scoreText.split('').forEach((char) => {
        const pixelMap = PIXEL_FONT[char as keyof typeof PIXEL_FONT] || []
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 5; j++) {
            if (pixelMap[i]?.[j]) {
              ctx.fillStyle = SCORE_COLOR
              ctx.fillRect(
                startX + j * numeralSize,
                startY + i * numeralSize,
                numeralSize,
                numeralSize
              )
            }
          }
        }
        startX += (5 + LETTER_SPACING) * numeralSize
      })
    }

    const gameLoop = () => {
      updateGame()
      drawGame()
      requestAnimationFrame(gameLoop)
    }

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const mouseX = (e.clientX - rect.left) * scaleX
      const mouseY = (e.clientY - rect.top) * scaleY

      const staticPaddles = paddlesRef.current.filter(p => p.isStatic)
      const paths = ['/about', '/projects', '/contact']
      
      staticPaddles.forEach((paddle, index) => {
        if (mouseX >= paddle.x && mouseX <= paddle.x + paddle.width &&
            mouseY >= paddle.y && mouseY <= paddle.y + paddle.height) {
          router.push(paths[index])
        }
      })
    }

    // Add hover state tracking
    let isHovering = false

    const handleHover = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const mouseX = (e.clientX - rect.left) * scaleX
      const mouseY = (e.clientY - rect.top) * scaleY

      const isOverButton = paddlesRef.current.some(paddle => 
        paddle.isStatic &&
        mouseX >= paddle.x && 
        mouseX <= paddle.x + paddle.width &&
        mouseY >= paddle.y && 
        mouseY <= paddle.y + paddle.height
      )


      canvas.style.cursor = isOverButton ? 'pointer' : 'default'
    }

    canvas.addEventListener('click', handleClick)
    canvas.addEventListener('mousemove', handleHover)

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    gameLoop()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener('click', handleClick)
      canvas.removeEventListener('mousemove', handleHover) // Cleanup hover listener
    }
  }, [loading, router])

  return (
    <>
      <AnimatePresence>
        {loading && (
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
        )}
      </AnimatePresence>

      {!loading && (
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full h-full"
          aria-label="Prompting Is All You Need: Fullscreen Pong game with pixel text"
        />
      )}
    </>
  )
}

export default Hero

