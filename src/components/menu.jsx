import React from 'react'
import { FaRandom, FaPlay, FaPause, FaStepForward, FaTrash, FaDashboard, FaPlusCircle, FaMinusCircle } from 'react-icons/lib/fa'

const Menu = (props) =>
  <div className='menu'>
    <div className='speed-dropdown'>
      <button><FaDashboard /></button>
      <div className='speed-menu'>
        <button disabled={props.speed >= 1000} onClick={() => { props.changeSpeed(100) }}><FaMinusCircle /></button>
        <button disabled={props.speed <= 100} onClick={() => { props.changeSpeed(-100) }}><FaPlusCircle /></button>
      </div>
    </div>
    <button onClick={props.random}><FaRandom /></button>
    <button className='play-pause-btn' onClick={props.playPause}>{props.play ? <FaPause /> : <FaPlay />}</button>
    <button disabled={props.play} onClick={props.next}><FaStepForward /></button>
    <button onClick={props.clearField}><FaTrash /></button>
  </div>

export default Menu
