'use client'

import React from 'react'

// Define tetromino pieces with positions (row and col values)
// The standard Tetris tetromino colors used are as follows:
// I: cyan, J: blue, L: orange, O: yellow, T: purple, S: green, Z: red
const tetrominoes = [
  {
    type: 'I',
    positions: [
      { row: 19, col: 6 },
      { row: 18, col: 6 },
      { row: 17, col: 6 },
      { row: 16, col: 6 }

    ]

  },
  {
    type: 'J',
    positions: [
      { row: 19, col: 3 },
      { row: 19, col: 4 },
      { row: 19, col: 5 },
      { row: 18, col: 5 }
    ]

  },
  {
    type: 'L',
    positions: [
      { row: 19, col: 7 },
      { row: 19, col: 8 },
      { row: 19, col: 9 },
      { row: 18, col: 7 }
    ]

  },
  {
    type: 'O',
    positions: [
      { row: 19, col: 0 },
      { row: 19, col: 1 },
      { row: 18, col: 0 },
      { row: 18, col: 1 }




    ]
  },
  {
    type: 'T',
    positions: [
      { row: 16, col: 3 },
      { row: 16, col: 4 },
      { row: 16, col: 5 },
      { row: 15, col: 4 }
    ]
  },
  {
    type: 'S',
    positions: [
      { row: 18, col: 3 },
      { row: 18, col: 4 },
      { row: 17, col: 4 },
      { row: 17, col: 5 }

    ]
  },
  {
    type: 'Z',
    positions: [
      { row: 17, col: 7 },
      { row: 17, col: 8 },
      { row: 18, col: 8 },
      { row: 18, col: 9 }
    ]
  }
]

const cellSize = 30
const boardRows = 20
const boardCols = 10

const About = () => {
  // Mapping of tetromino type to Tailwind group-hover color class.
  const hoverColors: { [key: string]: string } = {
    I: 'group-hover:bg-cyan-500',
    J: 'group-hover:bg-blue-500',
    L: 'group-hover:bg-orange-500',
    O: 'group-hover:bg-yellow-500',
    T: 'group-hover:bg-purple-500',
    S: 'group-hover:bg-green-500',
    Z: 'group-hover:bg-red-500'
  }

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-5">
      {/* Board container with fixed dimensions */}
      <div className="relative border border-white" style={{ width: boardCols * cellSize, height: boardRows * cellSize }}>
        {/* Background layer: one continuous black rectangle */}
        <div className="absolute inset-0 bg-black"></div>

        {/* Tetromino overlay(s) */}
        {tetrominoes.map((tetromino, i) => {
          // Compute the bounding box of this tetromino.
          const rows = tetromino.positions.map(p => p.row)
          const cols = tetromino.positions.map(p => p.col)
          const minRow = Math.min(...rows)
          const maxRow = Math.max(...rows)
          const minCol = Math.min(...cols)
          const maxCol = Math.max(...cols)
          const width = (maxCol - minCol + 1) * cellSize
          const height = (maxRow - minRow + 1) * cellSize

          const hoverClass = hoverColors[tetromino.type]

          return (
            // The tetromino container is an absolutely positioned group.
            <div
              key={i}
              className="group absolute"
              style={{ top: minRow * cellSize, left: minCol * cellSize, width, height }}
            >
              {tetromino.positions.map((pos, j) => (
                <div
                  key={j}
                  className={`absolute bg-white transition-colors ${hoverClass}`}
                  style={{
                    top: (pos.row - minRow) * cellSize,
                    left: (pos.col - minCol) * cellSize,
                    width: cellSize,
                    height: cellSize
                  }}
                />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default About