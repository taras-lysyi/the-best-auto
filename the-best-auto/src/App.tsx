import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './theme'
import { Header, Footer } from './shared/organisms'
import { Pages } from 'pages'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { useMediaQuery } from '@material-ui/core'
function App() {
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Header />
        <Container>
          <Box marginTop={matches ? 15 : 10}>
            <Pages />
          </Box>
        </Container>
        {/* <Footer /> */}
      </ThemeProvider>
    </>
  )
}

export default App
