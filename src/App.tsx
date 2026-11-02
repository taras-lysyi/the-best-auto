import { useMemo, useCallback, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from 'configureStore'
import { Pages } from 'pages/index'
import { selectIsAuthorized } from 'features/auth/selectors'
import { userVerify } from 'features/auth/slice'
import { theme } from './theme'
import { Header, Footer } from './shared/organisms'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { useMediaQuery } from '@material-ui/core'

function App() {
  const dispatch = useAppDispatch()
  const isAuthorized = useTypedSelector(state => selectIsAuthorized(state))
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const usePage = () => {
    let { page } = useParams<{ page: string }>()
    return page ? page : ''
  }
  let page = usePage()
  const tabRoutes = useMemo(() => {
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
      {
        path: 'crm',
        label: 'Crm',
      },
    ]
  }, [])

  let initialLocation = useMemo(() => {
    return tabRoutes.findIndex(item => `${page}` === item.path)
  }, [page, tabRoutes])

  const [selectedTab, setSelectedTab] = useState(initialLocation)
  const handleChange = useCallback((event: React.ChangeEvent<{}> | React.MouseEvent, newValue: number) => {
    setSelectedTab(newValue)
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    if (isAuthorized === null) {
      dispatch(userVerify())
    }
  }, [isAuthorized, dispatch])

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header isAuthorized={isAuthorized} selectedTab={selectedTab} tabHandleChange={handleChange} />
        <div style={{ flexGrow: 1 }}>
          <Container>
            <Box marginTop={matches ? 15 : 10}>
              {isAuthorized !== null && (
                <>
                  <Pages isAuthorized={isAuthorized} />
                </>
              )}
            </Box>
          </Container>
        </div>
        <Footer isAuthorized={isAuthorized} selectedTab={selectedTab} tabHandleChange={handleChange} />
      </div>
    </>
  )
}

export default App
