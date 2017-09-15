import { install } from 'offline-plugin/runtime'

import './style.styl'

import createField from './create-field'
import next from './next'
import webGLRenderer from './web-gl-renderer'

if (process.env.NODE_ENV === 'production') {
  install()
}

const fieldEl = document.getElementById('field')

const state = {
  play: false,
  speed: 500,
  field: [...Array(6000)].map(() => false),
  rowWidth: 100,
  rowHeight: 60,
  nrOfCells: 6000
}

function updateFieldDimensions () {
  fieldEl.width = window.innerWidth
  fieldEl.height = window.innerHeight * 0.9
  state.size = fieldEl.width / state.rowHeight
}

updateFieldDimensions()
newFieldDimensions()

function transform (pattern) {
  const v = []
  state.field = pattern.slice()
  let row = 0
  let x = 0
  let y = 0
  let i = 0
  const size = fieldEl.width / state.rowWidth
  while (i < state.nrOfCells) {
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
    if (i === state.rowWidth * (row + 1)) {
      row++
      y += size
      x = 0
    }
    i++
  }
  return v
}

const randomPattern = length => [...Array(length)].map(cell => Math.random() > 0.75)

function newFieldDimensions () {
  state.size = Math.sqrt((window.innerWidth * (window.innerHeight * 0.9)) / state.nrOfCells)
  state.rowWidth = Math.floor(window.innerWidth / state.size)
  state.rowHeight = state.nrOfCells / state.rowWidth
}

function handleRezise () {
  let resizeTimeout
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null
      updateFieldDimensions()
    })
  }
}

function handleRandom () {
  newFieldDimensions()
  webGLRenderer(transform(randomPattern(state.nrOfCells)))
}
const fieldModel = () => createField(state.rowWidth, state.rowHeight)
function handleNext () {
  webGLRenderer(transform(next(fieldModel(), state.field)))
}

function handlePlay (e) {
  state.play = !state.play
  function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  const play = () => {
    sleep(state.speed).then(() => {
      webGLRenderer(transform(next(fieldModel(), state.field)))
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
  newFieldDimensions()
  state.play && pause()
  state.field = []
  webGLRenderer([])
}

function paint (cX, cY, draw) {
  const size = fieldEl.width / state.rowWidth
  const row = Math.floor(cY / size)
  const x = Math.floor(cX / size - 1)
  const index = x + (row * state.rowWidth) + 1
  state.field[index] = draw ? true : !state.field[index]
  // TO DO!!
  webGLRenderer(transform(state.field))
}

function handlePaint (e) {
  paint(e.clientX, e.clientY)
}

function handleDraw (e) {
  function stop () {
    e.target.removeEventListener('mousemove', draw)
  }
  function draw (e) {
    paint(e.clientX, e.clientY, true)
  }
  e.target.addEventListener('touchmove', (e) => draw(e.changedTouches[0]))
  e.target.addEventListener('mousemove', draw)
  e.target.addEventListener('touchend', (e) => stop(e.changedTouches[0]))
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

window.addEventListener('resize', handleRezise)
document.getElementById('random').addEventListener('click', handleRandom)
document.getElementById('next').addEventListener('click', handleNext)
document.getElementById('play-pause').addEventListener('click', handlePlay)
document.getElementById('speed-up').addEventListener('click', SpeedUp)
document.getElementById('speed-down').addEventListener('click', SpeedDown)
document.getElementById('clear').addEventListener('click', handleClear)
document.getElementById('field').addEventListener('click', handlePaint)
document.getElementById('field').addEventListener('touchstart', (e) => { handleDraw(e.changedTouches[0]) })
document.getElementById('field').addEventListener('mousedown', handleDraw)
