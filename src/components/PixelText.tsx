import PIXEL_FONT from "./PixelFont"

const PixelText = ({ text, scale = 2, color = "#FFF" }: { text: string; scale?: number; color?: string }) => {
  const LETTER_SPACING = 1
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

export default PixelText