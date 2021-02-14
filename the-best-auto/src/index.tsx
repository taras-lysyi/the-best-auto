import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'configureStore'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import App from './App'

axios.defaults.baseURL = 'https://the-best-auto.com:4206'
axios.defaults.headers['Content-Type'] = 'application/json'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
