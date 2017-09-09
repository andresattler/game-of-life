import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { install } from 'offline-plugin/runtime'
import './style.styl'
import App from './app'
import Perf from 'react-dom/lib/ReactPerf'

if (process.env.NODE_ENV !== 'production') {
  window.Perf = Perf
}

if (process.env.NODE_ENV === 'production') {
  install()
}

const rootEl = document.getElementById('app')

render(<App />, rootEl)
