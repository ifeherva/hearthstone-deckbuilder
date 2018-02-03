import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { injectGlobal } from 'styled-components'
import reset from 'styled-reset'
import App from './pages/App'

const baseStyles = () => injectGlobal`
  ${reset}
  html {
    font-family: 'Open Sans', 'sans-serif';
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    height: 100%;
    min-height: 100%;
  }
  body,
  #app {
    width: 100%;
    height: 100%;
    min-height: 100%;
  }
`

const render = () => {
  baseStyles()
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('app')
  )
}

render()

// Hot Module Replacement
if (module.hot) {
  module.hot.accept()
}
