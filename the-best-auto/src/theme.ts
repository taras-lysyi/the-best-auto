import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import orange from '@material-ui/core/colors/orange'
import grey from '@material-ui/core/colors/grey'

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    primary?: PaletteColorOptions
    secondary?: PaletteColorOptions
  }
}

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: orange[800],
    },
  },
})
