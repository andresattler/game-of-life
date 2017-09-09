import React from 'react'

import Field from './components/field'
import Menu from './components/menu'

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
    console.log(this.emptyField)
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
    play()
  }
  render () {
    return (
      <div>
        <Field field={this.state.field}
          updateCell={(id) => {
            const nextField = this.state.field.slice()
            nextField[id].alive = true
            this.setState({
              field: nextField
            })
          }}
        />
        <Menu
          play={this.state.play}
          speed={this.state.speed}
          changeSpeed={(n) => { this.state.speed >= 1000 && this.state.speed <= 100 && this.setState({ speed: this.state.speed + n }) }}
          clearField={() => { this.setState({ field: createField(100, 60) }) }}
          next={() => { this.setState({ field: next(this.state.field) }) }}
          playPause={() => { this.setState({ play: !this.state.play }) }}
          random={() => {
            this.setState({ field:
              this.state.field.map(cell => {
                const newCell = Object.assign({}, cell)
                newCell.alive = Math.random() > 0.75
                return newCell
              })
            })
          }} />
      </div>
    )
  }
}

export default App
