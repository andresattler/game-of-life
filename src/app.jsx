import React from 'react'
import { FaRandom, FaPlay, FaPause, FaStepForward, FaTrash, FaDashboard, FaPlusCircle, FaMinusCircle } from 'react-icons/lib/fa'

import createField from './create-field'
import next from './next'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      field: createField(100, 60),
      play: false,
      speed: 500,
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
  componentDidMount () {
    let resizeTimeout
    window.addEventListener('resize', (e) => {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null
          this.setState({
            width: window.innerWidth,
            height: window.innerHeight
          })
        }, 66)
      }
    })
    const fieldElement = document.getElementById('field') || false
    function sleep (ms = 0) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
    const play = async () => {
      await sleep(this.state.speed)
      if (this.state.play === true) {
        this.setState({ field: next(this.state.field) })
      }
      play()
    }
    if (fieldElement) {
      play()
      const handleMouseup = () => {
        fieldElement.removeEventListener('mousemove', paint)
        fieldElement.removeEventListener('mouseup', handleMouseup)
      }
      const paint = (e) => {
        if (e.target.getAttribute('data-id')) {
          const nextField = [...this.state.field]
          nextField[e.target.getAttribute('data-id')].alive = true
          this.setState({
            field: nextField
          })
        }
      }
      fieldElement.addEventListener('click', paint)
      fieldElement.addEventListener('mousedown', () => {
        fieldElement.addEventListener('mousemove', paint)
        fieldElement.addEventListener('mouseup', handleMouseup)
      })
    }
  }
  render () {
    return (
      <div>
        <div id='field'
          style={{
            width: Math.sqrt(this.state.width * this.state.height * 0.7) / Math.sqrt(6000) * 100
          }}
          >
          {this.state.field.map(cell =>
            <div
              className={`cell${cell.alive ? ' active' : ''}`}
              key={cell.id}
              data-id={cell.id}
              style={{
                width: Math.sqrt(this.state.width * this.state.height * 0.7) / Math.sqrt(6000),
                height: Math.sqrt(this.state.width * this.state.height * 0.7) / Math.sqrt(6000)
              }}
               />)}
        </div>
        <div className='menu'>
          <div className='speed-dropdown'>
            <button><FaDashboard /></button>
            <div className='speed-menu'>
              <button disabled={this.state.speed >= 1000} onClick={() => { this.state.speed < 1000 && this.setState({ speed: this.state.speed + 100 }) }}><FaMinusCircle /></button>
              <button disabled={this.state.speed <= 100}onClick={() => { this.state.speed > 100 && this.setState({ speed: this.state.speed - 100 }) }}><FaPlusCircle /></button>
            </div>
          </div>
          <button onClick={() => {
            this.setState({
              field: this.state.field.map(cell => {
                const newCell = Object.assign({}, cell)
                newCell.alive = Math.random() > 0.75
                return newCell
              })
            })
          }}><FaRandom /></button>
          <button className='play-pause-btn' onClick={() => { this.setState({ play: !this.state.play }) }}>{this.state.play ? <FaPause /> : <FaPlay />}</button>
          <button disabled={this.state.play} onClick={() => { this.setState({ field: next(this.state.field) }) }}><FaStepForward /></button>
          <button onClick={() => { this.setState({ field: createField(100, 60), play: false }) }}><FaTrash /></button>
        </div>
      </div>
    )
  }
}

export default App
