import { theme } from './theme'
import { useMemo, useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header, Footer } from './shared/organisms'
import { Pages } from 'pages'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { useMediaQuery } from '@material-ui/core'
function App() {
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const usePage = () => {
    let { page } = useParams<{ page: string }>()
    return page ? page : ''
  }
  let page = usePage()
  const routes = useMemo(() => {
    return [
      {
        path: '',
        label: 'Головна',
      },
      {
        path: 'catalog',
        label: 'Каталог',
      },
      {
        path: 'contacts',
        label: 'Контакти',
      },
    ]
  }, [])

  let initialLocation = useMemo(() => {
    return routes.findIndex(item => `${page}` === item.path)
  }, [page, routes])

  const [selectedTab, setSelectedTab] = useState(initialLocation)
  const handleChange = useCallback((event: React.ChangeEvent<{}> | React.MouseEvent, newValue: number) => {
    setSelectedTab(newValue)
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header selectedTab={selectedTab} tabHandleChange={handleChange} />
        <div style={{ flexGrow: 1 }}>
          <Container>
            <Box marginTop={matches ? 15 : 10}>
              <Pages />
            </Box>
          </Container>
        </div>
        <Footer selectedTab={selectedTab} tabHandleChange={handleChange} />
      </div>
    </>
  )
}

export default App
