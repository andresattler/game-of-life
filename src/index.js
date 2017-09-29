import { install } from 'offline-plugin/runtime'

import './style.styl'

import createField from './create-field'
import next from './next'
import webGLRenderer from './web-gl-renderer'

if (process.env.NODE_ENV === 'production') {
  install()
}

fetch('./public/patterns/index.json')
.then(data => data.json())
.then((json) => {
  const nameListEl = document.getElementById('name-list')
  json.forEach((pattern) => {
    const div = document.createElement('div')
    div.innerHTML = pattern.name
    div.className = 'name'
    div.dataset.filename = pattern.filename
    nameListEl.appendChild(div)
  })
})

const state = {
  play: false,
  speed: 500,
  field: Array.from(new Array(54000), () => false),
  width: 300,
  height: 180,
  nrOfCells: 54000
}

const fieldEl = document.getElementById('field')
const fieldModel = () => createField(state.width, state.height)

function updateFieldDimensions () {
  fieldEl.width = window.innerWidth
  fieldEl.height = window.innerHeight * 0.9
  state.size = fieldEl.width / state.height
}

updateFieldDimensions()
newFieldDimensions()

function transform (pattern) {
  const v = []
  state.field = pattern.slice()
  let row = 0
  let x = 0
  let y = 0
  const size = state.size
  for (let i = 0; i < state.nrOfCells; i += 1) {
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
    if (i === state.width * (row + 1) - 1) {
      row++
      y += size
      x = 0
    }
  }
  return v
}

const randomPattern = length => [...Array(length)].map(cell => Math.random() > 0.75)

function newFieldDimensions () {
  state.size = Math.sqrt((window.innerWidth * (window.innerHeight * 0.9)) / state.nrOfCells)
  state.width = Math.floor(window.innerWidth / state.size)
  state.height = state.nrOfCells / state.width
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
function handleNext () {
  webGLRenderer(transform(next(fieldModel(), state.field)))
}
function handlePlay (e) {
  state.play = !state.play
  e.target.children[0].classList.toggle('fa-play')
  e.target.children[0].classList.toggle('fa-pause')
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
}
function pause () {
  state.play = false
  document.getElementById('play-pause').innerHTML = 'Play'
}
function handleClear () {
  newFieldDimensions()
  state.play && pause()
  state.field = [...Array(state.nrOfCells)].map(() => false)
  webGLRenderer([])
}

function paint (cX, cY, draw) {
  const size = fieldEl.width / state.width
  const row = Math.floor(cY / size)
  const x = Math.floor(cX / size - 1)
  const index = x + (row * state.width) + 1
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
  } else {
    // To do disable button
  }
}

function SpeedUp () {
  if (state.speed > 50) {
    state.speed -= 50
  }
}

function handleAdd (e) {
  const filename = e.target.dataset.filename
  if (filename) {
    fetch(`./public/patterns/${filename}.json`)
    .then(data => data.json())
    .then(json => {
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
        ...Array.from(new Array(startY * state.width), () => false)
      ]
      webGLRenderer(transform(nextState))
      toggleAddModal()
    })
  }
}

function toggleAddModal () {
  document.getElementById('modal-add').classList.toggle('visible')
}

window.addEventListener('resize', handleRezise)
document.getElementById('name-list').addEventListener('click', handleAdd)
document.getElementById('add-modal-btn').addEventListener('click', toggleAddModal)
document.getElementById('modal-add').addEventListener('click', (e) => {
  e.target === e.currentTarget && toggleAddModal()
}
)
document.getElementById('random').addEventListener('click', handleRandom)
document.getElementById('next').addEventListener('click', handleNext)
document.getElementById('play-pause').addEventListener('click', handlePlay)
document.getElementById('speed-up').addEventListener('click', SpeedUp)
document.getElementById('speed-down').addEventListener('click', SpeedDown)
document.getElementById('clear').addEventListener('click', handleClear)
document.getElementById('field').addEventListener('click', handlePaint)
document.getElementById('field').addEventListener('touchstart', (e) => { handleDraw(e.changedTouches[0]) })
document.getElementById('field').addEventListener('mousedown', handleDraw)
