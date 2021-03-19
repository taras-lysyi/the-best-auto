import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { theme } from 'theme'
import { store } from 'configureStore'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import App from './App'

let user = JSON.parse(localStorage.getItem('user') as string) ? JSON.parse(localStorage.getItem('user') as string) : ''
axios.defaults.baseURL = 'https://the-best-auto.com:4206'
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = user.token
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Route path='/:page?'>
            <App />
          </Route>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
