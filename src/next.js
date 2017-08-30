
const next = field => field.map(cell => {
  const isAlive = (alive, neighbors) => {
    const livingNeighbors = neighbors.reduce((sum, toCheck) =>
        field[toCheck].alive ? sum + 1 : sum, 0)
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
  return {
    id: cell.id,
    alive: isAlive(cell.alive, cell.neighbors),
    neighbors: cell.neighbors
  }
})

export default next
