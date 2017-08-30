/* eslint-env jest */
import createField from './create-field.js'

test('test field 5', () => {
  expect(createField(4, 4)[5].neighbors).toEqual([4, 0, 1, 2, 6, 10, 9, 8])
})

test('test field 7', () => {
  expect(createField(4, 4)[7].neighbors).toEqual([6, 2, 3, 0, 4, 8, 11, 10])
})

test('test field 11', () => {
  expect(createField(4, 4)[11].neighbors).toEqual([10, 6, 7, 4, 8, 12, 15, 14])
})

test('test field 0', () => {
  expect(createField(4, 4)[0].neighbors).toEqual([3, 15, 12, 13, 1, 5, 4, 7])
})

test('test field 15', () => {
  expect(createField(4, 4)[15].neighbors).toEqual([14, 10, 11, 8, 12, 0, 3, 2])
})

test('test field 2', () => {
  expect(createField(4, 4)[2].neighbors).toEqual([1, 13, 14, 15, 3, 7, 6, 5])
})

test('test field 12', () => {
  expect(createField(4, 4)[12].neighbors).toEqual([15, 11, 8, 9, 13, 1, 0, 3])
})

test('test field 3', () => {
  expect(createField(4, 4)[3].neighbors).toEqual([2, 14, 15, 12, 0, 7, 6])
})

test('test field 14', () => {
  expect(createField(4, 4)[14].neighbors).toEqual([13, 9, 10, 11, 15, 3, 2, 1])
})

test('test field 13', () => {
  expect(createField(4, 4)[13].neighbors).toEqual([12, 8, 9, 10, 14, 2, 1, 0])
})

test('test field 4', () => {
  expect(createField(4, 4)[4].neighbors).toEqual([7, 3, 0, 1, 5, 9, 8, 11])
})
test('test field 1', () => {
  expect(createField(4, 4)[1].neighbors).toEqual([0, 12, 13, 14, 2, 6, 5, 4])
})
