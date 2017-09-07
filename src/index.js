import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import * as OfflinePlugigRuntime from 'offline-plugin/runtime'
import './style.styl'
import App from './app'

OfflinePlugigRuntime.install()

const rootEl = document.getElementById('app')

const wrapApp = AppComponent =>
  <AppContainer>
    <AppComponent />
  </AppContainer>

render(wrapApp(App), rootEl)

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default
    render(wrapApp(NextApp), rootEl)
  })
}
