/* global fetch */
import { install } from 'offline-plugin/runtime'

import './style.styl'

import createField from './create-field'
import next from './next'
import transform from './transform'
import webGLRenderer from './web-gl-renderer'

// install service-worker
if (process.env.NODE_ENV === 'production') {
  install()
}

// global vars
const state = {
  play: false,
  speed: 250,
  pattern: Array.from(new Array(500 * 230), () => false),
  width: 500,
  height: 230,
  nrOfCells: 500 * 230
}

const fieldEl = document.getElementById('field')
const playPauseIcon = document.getElementById('play-pause-icon')
const fieldModel = () => createField(state.width, state.height)

function updateFieldDimensions () {
  fieldEl.width = window.innerWidth
  fieldEl.height = window.innerHeight * 0.9
  state.size = fieldEl.width / state.width
}

function newFieldDimensions () {
  state.size = Math.sqrt((window.innerWidth * (window.innerHeight * 0.9)) / state.nrOfCells)
  state.width = Math.floor(window.innerWidth / state.size)
  state.height = state.nrOfCells / state.width
}

function render (nextPattern = state.pattern) {
  state.pattern = nextPattern.slice()
  webGLRenderer(transform(state))
}

function paint (cX, cY, draw) {
  const nextPattern = state.pattern.slice()
  const size = fieldEl.width / state.width
  const row = Math.floor(cY / state.size)
  const x = Math.floor(cX / size - 1)
  const index = x + (row * state.width) + 1
  nextPattern[index] = draw ? true : !nextPattern[index]
  render(nextPattern)
}

// initialize app
fetch('./patterns/index.json')
.then(data => data.json())
.then(({fileInf}) => {
  const nameListEl = document.getElementById('name-list')
  fileInf.forEach((pattern) => {
    const div = document.createElement('div')
    div.innerHTML = pattern.name
    div.className = 'name'
    div.dataset.filename = pattern.filename
    nameListEl.appendChild(div)
  })
})

updateFieldDimensions()
newFieldDimensions()
render()

function pause () {
  state.play = false
  playPauseIcon.classList.toggle('fa-play')
  playPauseIcon.classList.toggle('fa-pause')
}

// event handlers
function handleRezise () {
  let resizeTimeout
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null
      updateFieldDimensions()
      render()
    })
  }
}

function SpeedDown (e) {
  if (state.speed < 1000) {
    state.speed += 50
  } else {
    // To do disable button
  }
}

function SpeedUp () {
  if (state.speed > 50) {
    state.speed -= 50
  }
}

function handleRandom () {
  newFieldDimensions()
  const randomPattern = length => Array.from(new Array(length), () => Math.random() > 0.75)
  render(randomPattern(state.nrOfCells))
}

function handlePlay (e) {
  state.play = !state.play
  playPauseIcon.classList.toggle('fa-play')
  playPauseIcon.classList.toggle('fa-pause')
  function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  const play = () => {
    sleep(state.speed).then(() => {
      render(next(fieldModel(), state.pattern))
      if (state.play) {
        play()
      }
    })
  }
  play()
}

function handleNext () {
  console.log(fieldModel())
  render(next(fieldModel(), state.pattern))
}

function handleClear () {
  newFieldDimensions()
  state.play && pause()
  render(Array.from(new Array(state.nrOfCells), () => false))
}

function handleAdd (e) {
  const filename = e.target.dataset.filename
  if (filename) {
    fetch(`./patterns/${filename}.json`)
    .then(data => data.json())
    .then((json) => {
      const middle = Array.from(new Array(json.data.y * state.width), () => false)
      const startY = 10
      const startX = 10
      let n = 0
      for (let i = 0; i < json.data.y; i++) {
        for (let j = 0; j < json.data.x; j++) {
          middle[j + startX + i * state.width] = json.pattern[n]
          n++
        }
      }
      const nextState = [
        ...Array.from(new Array(startY * state.width), () => false),
        ...middle,
        ...Array.from(new Array(state.nrOfCells - middle.length - (startY * state.width)), () => false)
      ]
      render(nextState)
      toggleAddModal()
    })
  }
}

function toggleAddModal () {
  document.getElementById('modal-add').classList.toggle('visible')
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

window.addEventListener('resize', handleRezise)

document.getElementById('speed-up').addEventListener('click', SpeedUp)
document.getElementById('speed-down').addEventListener('click', SpeedDown)
document.getElementById('random').addEventListener('click', handleRandom)
document.getElementById('play-pause').addEventListener('click', handlePlay)
document.getElementById('next').addEventListener('click', handleNext)
document.getElementById('clear').addEventListener('click', handleClear)
document.getElementById('add-modal-btn').addEventListener('click', toggleAddModal)

document.getElementById('name-list').addEventListener('click', handleAdd)
document.getElementById('modal-add').addEventListener('click', (e) => {
  e.target === e.currentTarget && toggleAddModal()
})
document.getElementById('modal-add').addEventListener('touchstart', (e) => {
  e.target === e.currentTarget && toggleAddModal()
})
document.getElementById('field').addEventListener('click', handlePaint)
document.getElementById('field').addEventListener('touchstart', (e) => { handleDraw(e.changedTouches[0]) })
document.getElementById('field').addEventListener('mousedown', handleDraw)
