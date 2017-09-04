const getNeighbors = (i, x, y) => {
  const total = x * y - 1
  // top corner left
  if (i === 0) {
    return [
      x - 1,
      total,
      total - x + 1,
      total - x + 2,
      1,
      x + 1,
      x,
      x * 2 - 1
    ]
  }
  // top corner right
  if (i === x - 1) {
    return [
      x - 2,
      total - 1,
      total,
      total - x + 1,
      0,
      i + x,
      i + x - 1
    ]
  }
  // botom corner left
  if (i === total - x + 1) {
    return [
      total,
      total - x,
      i - x,
      i - x + 1, // right-up
      i + 1, // right
      1,
      0,
      x - 1
    ]
  }
  // botom corner right
  if (i === total) {
    return [
      i - 1, // left
      i - x - 1, // left-up
      i - x, // up
      total - x * 2 + 1,
      total - x + 1,
      0,
      x - 1,
      x - 2
    ]
  }
  // top edge
  if (i < x) {
    return [
      i - 1, // left
      total - (x - 1 - i) - 1, // left-up
      total - (x - 1 - i), // up
      total - (x - 1 - i) + 1, // right-up
      i + 1, // right
      i + x + 1, // down-right
      i + x, // down
      i + x - 1 // down-left
    ]
  }
  // botom edge
  if (i > total - x) {
    return [
      i - 1, // left
      i - x - 1, // left-up
      i - x, // up
      i - x + 1, // right-up
      i + 1, // right
      x - 1 - (total - i) + 1,
      x - 1 - (total - i),
      x - 1 - (total - i) - 1
    ]
  }
  // right edge
  if ((i + 1) % x === 0) {
    return [
      i - 1, // left
      i - x - 1, // left-up
      i - x, // up
      i - ((x * 2) - 1), // right-up
      i + 1 - x, // right
      i + 1, // down-right
      i + x, // down
      i + x - 1 // down-left
    ]
  }
  // left edge
  if (i % x === 0) {
    return [
      i + x - 1, // left
      i - 1, // left-up
      i - x, // up
      i - x + 1, // right-up
      i + 1, // right
      i + x + 1, // down-right
      i + x, // down
      i + 2 * x - 1 // down-left
    ]
  }
  return [
    i - 1, // left
    i - x - 1, // left-up
    i - x, // up
    i - x + 1, // right-up
    i + 1, // right
    i + x + 1, // down-right
    i + x, // down
    i + x - 1 // down-left
  ]
}

const createField = (x, y) =>
  [...Array(x * y).keys()]
    .map((val, i) =>
      ({
        id: i,
        alive: false,
        neighbors: getNeighbors(i, x, y)
      }))

export default createField
