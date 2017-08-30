import React from 'react'

import createField from './create-field'
import next from './next'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      field: createField(10, 10),
      play: false
    }
  }
  componentDidMount () {
    function sleep (ms = 0) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
    const play = async () => {
      await sleep(500)
      if (this.state.play === true) {
        this.setState({ field: next(this.state.field) })
      }
      play()
    }
    play()
  }
  render () {
    return (
      <div>
        <div id='field'>
          {this.state.field.map(cell =>
            <div
              className={`cell${cell.alive ? ' active' : ''}`}
              key={cell.id}
              onClick={() => {
                this.state.field[cell.id].alive = !this.state.field[cell.id].alive
                this.forceUpdate()
              }} />)}
        </div>
        <button onClick={() => { this.setState({ play: false }) }}>Pause</button>
        <button onClick={() => { this.setState({ play: true }) }}>Play</button>
        <button onClick={() => { this.setState({ field: next(this.state.field) }) }}>Next</button>
        <button onClick={() => { this.setState({ field: createField(10, 10) }) }}>Clear</button>
      </div>
    )
  }
}

export default App
