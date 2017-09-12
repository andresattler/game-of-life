
const next = (field, state) => {
  const pattern = []
  for (let i = 0; i < field.length; i++) {
    const isAlive = (alive, neighbors) => {
      const livingNeighbors = neighbors.reduce((sum, toCheck) =>
          state[toCheck] ? sum + 1 : sum, 0)
      if (alive && livingNeighbors < 2) {
        return false
      }
      if (alive && livingNeighbors >= 2 && livingNeighbors <= 3) {
        return true
      }
      if (!alive && livingNeighbors === 3) {
        return true
      }
      return false
    }
    pattern.push(isAlive(state[i], field[i].neighbors))
  }
  return pattern
}

export default next
