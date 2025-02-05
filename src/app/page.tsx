"use client"

import { useEffect, useRef, useState } from "react"
import PIXEL_FONT from "@/components/PixelFont"

const COLOR = "#FFFFFF"
const HIT_COLOR = "#333333"
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

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const ballRef = useRef<Ball>({ x: 0, y: 0, dx: 0, dy: 0, radius: 0 })
  const paddlesRef = useRef<Paddle[]>([])
  const scaleRef = useRef(1)
  const [score, setScore] = useState(0)
  const scoreRef = useRef(0)

  useEffect(() => {
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
      const LARGE_PIXEL_SIZE = 6 * scale
      const SMALL_PIXEL_SIZE = 4 * scale
      const BALL_SPEED = 6 * scale

      pixelsRef.current = []
      const words = ["JUSTIN SIEK", "SOFTWARE DEVELOPER"]

      const calculateWordWidth = (word: string, pixelSize: number) => {
        return (
          word.split("").reduce((width, letter) => {
            const letterWidth = PIXEL_FONT[letter as keyof typeof PIXEL_FONT]?.[0]?.length ?? 0
            return width + letterWidth * pixelSize + LETTER_SPACING * pixelSize
          }, 0) -
          LETTER_SPACING * pixelSize
        )
      }

      const totalWidthLarge = calculateWordWidth(words[0], LARGE_PIXEL_SIZE)
      const totalWidthSmall = words[1].split(" ").reduce((width, word, index) => {
        return width + calculateWordWidth(word, SMALL_PIXEL_SIZE) + (index > 0 ? WORD_SPACING * SMALL_PIXEL_SIZE : 0)
      }, 0)
      const totalWidth = Math.max(totalWidthLarge, totalWidthSmall)
      const scaleFactor = (canvas.width * 0.8) / totalWidth

      const adjustedLargePixelSize = LARGE_PIXEL_SIZE * scaleFactor
      const adjustedSmallPixelSize = SMALL_PIXEL_SIZE * scaleFactor

      const largeTextHeight = 5 * adjustedLargePixelSize
      const smallTextHeight = 5 * adjustedSmallPixelSize
      const spaceBetweenLines = 5 * adjustedLargePixelSize
      const totalTextHeight = largeTextHeight + spaceBetweenLines + smallTextHeight

      let startY = (canvas.height - totalTextHeight) * 0.4
      const initialTextY = startY

      words.forEach((word, wordIndex) => {
        const pixelSize = wordIndex === 0 ? adjustedLargePixelSize : adjustedSmallPixelSize
        const totalWidth =
          wordIndex === 0
            ? calculateWordWidth(word, adjustedLargePixelSize)
            : words[1].split(" ").reduce((width, w, index) => {
                return (
                  width +
                  calculateWordWidth(w, adjustedSmallPixelSize) +
                  (index > 0 ? WORD_SPACING * adjustedSmallPixelSize : 0)
                )
              }, 0)

        let startX = (canvas.width - totalWidth) / 2

        if (wordIndex === 1) {
          word.split(" ").forEach((subWord) => {
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
            startX += WORD_SPACING * adjustedSmallPixelSize
          })
        } else {
          word.split("").forEach((letter) => {
            if (letter === " ") {
              startX += LETTER_SPACING * pixelSize * 2 
              return
            }
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
        }
        startY += wordIndex === 0 ? largeTextHeight + spaceBetweenLines : 0
      })

      // Initialize ball position near the top right corner
      const ballStartX = canvas.width * 0.85
      const ballStartY = canvas.height * 0.1

      ballRef.current = {
        x: ballStartX,
        y: ballStartY,
        dx: -BALL_SPEED,
        dy: BALL_SPEED,
        radius: adjustedLargePixelSize / 2,
      }

      // Add centered static bar under text
      const barPadding = 20 * scale
      const barWidth = 200 * scale
      const barY = initialTextY + totalTextHeight + barPadding
      const barHeight = adjustedLargePixelSize * 2.25

      const paddleWidth = adjustedLargePixelSize
      const paddleLength = 7 * adjustedLargePixelSize

      paddlesRef.current = [
        {
          x: 0,
          y: canvas.height / 2 - paddleLength / 2,
          width: paddleWidth,
          height: paddleLength,
          targetY: canvas.height / 2 - paddleLength / 2,
          isVertical: true,
        },
        {
          x: canvas.width - paddleWidth,
          y: canvas.height / 2 - paddleLength / 2,
          width: paddleWidth,
          height: paddleLength,
          targetY: canvas.height / 2 - paddleLength / 2,
          isVertical: true,
        },
        {
          x: canvas.width / 2 - paddleLength / 2,
          y: 0,
          width: paddleLength,
          height: paddleWidth,
          targetY: canvas.width / 2 - paddleLength / 2,
          isVertical: false,
        },
        {
          x: canvas.width / 2 - paddleLength / 2,
          y: canvas.height - paddleWidth,
          width: paddleLength,
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
      let startX = canvas.width - 10 * scale - (scoreText.length * (5 + LETTER_SPACING) * numeralSize)
      const startY = 10 * scale

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

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    gameLoop()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      aria-label="Prompting Is All You Need: Fullscreen Pong game with pixel text"
    />
  )
}

export default Hero

