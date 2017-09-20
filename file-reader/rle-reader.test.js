/* eslint-env jest */

import readRLE from './rle-reader'

test('decode glider.rle', () => {
  expect(readRLE('glider.rle')).toEqual({
    name: 'glider',
    headerData: {
      x: 3,
      y: 3
    },
    pattern: [
      false, true, false,
      false, false, true,
      true, true, true
    ]
  }
  )
})
