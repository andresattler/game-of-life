/* eslint-env jest */

import readRLE from './rle-reader'

test('decode glider.rle', () => {
  expect(readRLE('glider.rle')).toEqual({
    info: {
      name: 'Glider',
      creator: 'Richard K. Guy',
      comments: [
        'The smallest, most common, and first discovered spaceship. Diagonal, has period 4 and speed c/4.',
        'www.conwaylife.com/wiki/index.php?title=Glider'
      ]
    },
    data: {
      x: 3,
      y: 3,
      rule: 'B3/S23'
    },
    pattern: [
      false, true, false,
      false, false, true,
      true, true, true
    ]
  }
  )
})
