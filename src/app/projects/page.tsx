'use client'

import React, { useState, useRef } from 'react'
import Apprazer from '@/components/projectfiles/Apprazer'
import ZotMeet from '@/components/projectfiles/ZotMeet'
import CodeBattles from '@/components/projectfiles/CodeBattles'
import Jaimes from '@/components/projectfiles/Jaimes'
import Sonder from '@/components/projectfiles/Sonder'
import PipPal from '@/components/projectfiles/PipPal'
import Uicm from '@/components/projectfiles/Uicm'


// Define tetromino pieces with positions (row and col values)
// The standard Tetris tetromino colors used are as follows:
// I: cyan, J: blue, L: orange, O: yellow, T: purple, S: green, Z: red
const tetrominoes = [
  {
    id: 1,
    type: 'I',
    positions: [
      { row: 19, col: 6 },
      { row: 18, col: 6 },
      { row: 17, col: 6 },
      { row: 16, col: 6 }
    ],
    project: <ZotMeet />
  },
  {
    id: 2,
    type: 'J',
    positions: [
      { row: 19, col: 3 },
      { row: 19, col: 4 },
      { row: 19, col: 5 },
      { row: 18, col: 5 }
    ],
    project: <Jaimes />
  },

  {
    id: 3,
    type: 'L',
    positions: [
      { row: 19, col: 7 },
      { row: 19, col: 8 },
      { row: 19, col: 9 },
      { row: 18, col: 7 }
    ],
    project: <Sonder />
  },
  {
    id: 4,
    type: 'O',
    positions: [
      { row: 19, col: 0 },
      { row: 19, col: 1 },
      { row: 18, col: 0 },
      { row: 18, col: 1 }
    ],
    project: <Apprazer />
  },
  {
    id: 5,

    type: 'T',
    positions: [
      { row: 16, col: 3 },
      { row: 16, col: 4 },
      { row: 16, col: 5 },
      { row: 15, col: 4 }
    ],
    project: <PipPal />
  },
  {
    id: 6,

    type: 'S',
    positions: [
      { row: 18, col: 3 },
      { row: 18, col: 4 },
      { row: 17, col: 4 },
      { row: 17, col: 5 }
    ],
    project: <Uicm />
  },
  {
    id: 7,
    type: 'Z',
    positions: [
      { row: 17, col: 7 },
      { row: 17, col: 8 },
      { row: 18, col: 8 },
      { row: 18, col: 9 }
    ],
    project: <CodeBattles />
  }
]

const cellSize = 30
const boardRows = 20
const boardCols = 10

const Projects = () => {
  // State that holds which tetrominoes have been clicked (using their ids)
  const [activatedTetrominoes, setActivatedTetrominoes] = useState<number[]>([])
  // State to track which tetromino is selected (to trigger the board slide and project view)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Colors for hover and for a permanently "lit-up" tetromino.
  const hoverColors: { [key: string]: string } = {
    I: 'group-hover:bg-cyan-400',
    J: 'group-hover:bg-blue-400',
    L: 'group-hover:bg-orange-400',
    O: 'group-hover:bg-yellow-400',
    T: 'group-hover:bg-purple-400',
    S: 'group-hover:bg-green-400',
    Z: 'group-hover:bg-red-400'
  }

  const activeColors: { [key: string]: string } = {
    I: 'bg-cyan-400',
    J: 'bg-blue-400',
    L: 'bg-orange-400',
    O: 'bg-yellow-400',
    T: 'bg-purple-400',
    S: 'bg-green-400',
    Z: 'bg-red-400'
  }

  const handleTetrominoClick = (id: number) => {
    // Mark the tetromino as activated if it hasn't been already
    if (!activatedTetrominoes.includes(id)) {
      setActivatedTetrominoes(prev => [...prev, id])
    }
    // Track the selected tetromino for view transition
    setSelectedProject(id)
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0
    }
  }

  return (
    <div
      ref={containerRef}
      className="bg-black min-h-screen flex items-center p-5 overflow-x-hidden transition-all duration-500"
    >
      {/* Board container */}
      <div
        className={`flex-shrink-0 transition-all duration-500 ${
          selectedProject ? 'w-1/3 ml-0' : 'w-full mx-auto scale-100'
        }`}
      >
        <div
          className="relative border border-white mx-auto"
          style={{ width: boardCols * cellSize, height: boardRows * cellSize }}
        >
          {tetrominoes.map((tetromino, i) => {
            // Compute the bounding box for the tetromino
            const rows = tetromino.positions.map(p => p.row)
            const cols = tetromino.positions.map(p => p.col)
            const minRow = Math.min(...rows)
            const maxRow = Math.max(...rows)
            const minCol = Math.min(...cols)
            const maxCol = Math.max(...cols)
            const width = (maxCol - minCol + 1) * cellSize
            const height = (maxRow - minRow + 1) * cellSize

            // Create a lookup for the cells in this tetromino.
            const cellSet = new Set(tetromino.positions.map(p => `${p.row},${p.col}`))
            // Check if this tetromino has been clicked/activated.
            const isActivated = activatedTetrominoes.includes(tetromino.id)

            return (
              <div
                key={i}
                className="group absolute cursor-pointer"
                onClick={() => handleTetrominoClick(tetromino.id)}
                style={{ top: minRow * cellSize, left: minCol * cellSize, width, height }}
              >
                {tetromino.positions.map((pos, j) => {
                  return (
                    <div
                      key={j}
                      className={`absolute transition-colors ${
                        isActivated
                          ? activeColors[tetromino.type]
                          : `bg-white ${hoverColors[tetromino.type]}`
                      }`}
                      style={{
                        top: (pos.row - minRow) * cellSize,
                        left: (pos.col - minCol) * cellSize,
                        width: cellSize,
                        height: cellSize
                      }}
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      {/* Project Details Panel */}
      {selectedProject && (
        <div className="flex-1 w-2/3 text-white p-8 animate-fade-in ml-5">
          {tetrominoes.find(t => t.id === selectedProject)?.project}
        </div>
      )}
    </div>
  )
}

export default Projects