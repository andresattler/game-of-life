import { install } from 'offline-plugin/runtime'

import './style.styl'

import createField from './create-field'
import next from './next'
import webGLRenderer from './web-gl-renderer'

if (process.env.NODE_ENV === 'production') {
  install()
}

const state = {
  play: false,
  field: [...Array(6000)].map(() => false),
  rowLength: 100,
  rowHeight: 60
}

function transform (pattern) {
  const v = []
  state.field = pattern.slice()
  let row = 0
  let x = 0
  let y = 0
  let i = 0
  const size = 10
  while (i < 6000) {
    x += size
    if (state.field[i]) {
      v.push(
        x, y, // left up
        x + size, y, // right up
        x, y + size, // left down
        // 2nd triangle
        x, y + size, // left down
        x + size, y + size, // right down
        x + size, y  // right up
      )
    }
    if (i === state.rowLength * (row + 1)) {
      row++
      y += size
      x = 0
    }
    i++
  }
  return v
}

const randomPattern = length => [...Array(length)].map(cell => Math.random() > 0.75)

function handleRandom () {
  webGLRenderer(transform(randomPattern(6000)))
}
const fieldModel = createField(state.rowLength, state.rowHeight)
function handleNext () {
  webGLRenderer(transform(next(fieldModel, state.field)))
}

function handlePlay (e) {
  state.play = !state.play
  function sleep (ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  const play = () => {
    sleep(100).then(() => {
      webGLRenderer(transform(next(fieldModel, state.field)))
      if (state.play) {
        play()
      }
    })
  }
  play()
  e.target.innerHTML = state.play ? 'Pause' : 'Play'
}
function pause () {
  state.play = false
  document.getElementById('play-pause').innerHTML = 'Play'
}
function handleClear () {
  state.play && pause()
  state.field = []
  webGLRenderer([])
}

function handlePaint (e) {
  const row = Math.floor(e.clientY / 10)
  console.log('row:', row)
  const x = Math.floor((e.clientX - e.target.offsetLeft) / 10 - 1)
  const index = x + (row * 100) + 1
  console.log(index)
  state.field[index] = !state.field[index]
  // TO DO!!
  webGLRenderer(transform(state.field))
}

document.getElementById('random').addEventListener('click', handleRandom)
document.getElementById('next').addEventListener('click', handleNext)
document.getElementById('play-pause').addEventListener('click', handlePlay)
document.getElementById('clear').addEventListener('click', handleClear)
document.getElementById('field').addEventListener('click', handlePaint)
