import React from 'react'

class Cell extends React.PureComponent {
  render () {
    return <div
      onClick={() => { this.props.updateCell(this.props.id) }}
      className={`cell${this.props.alive ? ' active' : ''}`}
      key={this.props.id}
      data-id={this.props.id}
       />
  }
}

export default Cell
