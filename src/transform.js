// transforms state to vertices
function transform (state) {
  const v = []
  let row = 0
  let x = 0
  let y = 0
  const size = state.size
  for (let i = 0; i < state.nrOfCells; i += 1) {
    if (state.pattern[i]) {
      v.push(
        // 1st polygon
        x, y, // left up
        x + size, y, // right up
        x, y + size, // left down
        // 2nd polygon
        x, y + size, // left down
        x + size, y + size, // right down
        x + size, y  // right up
      )
    }
    x += size
    if (i === state.width * (row + 1) - 1) {
      // switching to the next row
      row++
      y += size
      x = 0
    }
  }
  return v
}

export default transform
