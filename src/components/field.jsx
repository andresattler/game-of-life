import React from 'react'

import Cell from './cell'

class Field extends React.Component {
  paint (e) {
    const fieldElement = e.target.parentElement
    let lastId = -1
    const moveHandler = (e) => {
      const currentId = e.target.getAttribute('data-id')
      console.log(lastId !== currentId)
      if (lastId !== currentId) {
        this.props.updateCell(currentId)
        lastId = currentId
      }
    }
    const removeHandlers = (e) => {
      fieldElement.removeEventListener('mousemove', moveHandler)
      fieldElement.removeEventListener('mouseup', removeHandlers)
    }
    fieldElement.addEventListener('mousemove', moveHandler)
    fieldElement.addEventListener('mouseup', removeHandlers)
  }
  render () {
    return <div
      onMouseDown={(e) => { this.paint(e) }}
      className='field'>
      {this.props.field.map(cell => <Cell key={cell.id} id={cell.id} alive={cell.alive} updateCell={this.props.updateCell} />)}
    </div>
  }
}

export default Field
