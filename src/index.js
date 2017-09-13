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
  speed: 500,
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
  function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  const play = () => {
    sleep(state.speed).then(() => {
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

function paint (cX, cY, offsetLeft, draw) {
  const row = Math.floor(cY / 10)
  const x = Math.floor((cX - offsetLeft) / 10 - 1)
  const index = x + (row * 100) + 1
  state.field[index] = draw ? true : !state.field[index]
  // TO DO!!
  webGLRenderer(transform(state.field))
}

function handlePaint (e) {
  paint(e.clientX, e.clientY, e.target.offsetLeft)
}

function handleDraw (e) {
  function stop () {
    e.target.removeEventListener('mousemove', draw)
  }
  function draw (e) {
    paint(e.clientX, e.clientY, e.target.offsetLeft, true)
  }
  e.target.addEventListener('mousemove', draw)
  e.target.addEventListener('mouseup', stop)
}

function SpeedDown (e) {
  if (state.speed < 1000) {
    state.speed += 50
    console.log(state.speed)
  } else {
    console.log(e.target.getAttribute('disabled'))
  }
}

function SpeedUp () {
  if (state.speed > 50) {
    state.speed -= 50
    console.log(state.speed)
  }
}

document.getElementById('random').addEventListener('click', handleRandom)
document.getElementById('next').addEventListener('click', handleNext)
document.getElementById('play-pause').addEventListener('click', handlePlay)
document.getElementById('speed-up').addEventListener('click', SpeedUp)
document.getElementById('speed-down').addEventListener('click', SpeedDown)
document.getElementById('clear').addEventListener('click', handleClear)
document.getElementById('field').addEventListener('click', handlePaint)
document.getElementById('field').addEventListener('mousedown', handleDraw)
