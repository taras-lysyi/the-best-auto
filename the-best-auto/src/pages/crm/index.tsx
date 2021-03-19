import { useState, useMemo, useCallback } from 'react'
import { Route, Switch, useLocation, NavLink, Redirect } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Dashboard } from 'features/crm/features/dashboard'
import { Add } from 'features/crm/features/catalog/features/add'
import { Edit } from 'features/crm/features/catalog/features/edit'
import { Menu } from 'features/crm/features/menu'

export const CrmPage = ({ isAuthorized }: any) => {
  const { pathname } = useLocation()
  const routes = useMemo(() => {
    return [
      {
        path: '/crm/dashboard',
        label: 'Dashboard',
      },
      {
        path: '/crm/menu/list',
        label: 'Меню',
      },
      {
        path: '/crm/catalog/list',
        label: 'Каталог',
      },
      {
        path: '/crm/catalog/add',
        label: 'Додати авто',
      },
    ]
  }, [])
  let initialLocation = useMemo(() => {
    return routes.findIndex(item => `${pathname}` === item.path)
  }, [pathname, routes])

  const [selectedTab, setSelectedTab] = useState(initialLocation)
  const tabHandler = useCallback((event: React.ChangeEvent<{}> | React.MouseEvent, newValue: number) => {
    setSelectedTab(newValue)
    window.scrollTo(0, 0)
  }, [])
  const tabs = useMemo(() => {
    return routes.map(item => {
      return (
        <Tab
          label={item.label}
          key={item.label}
          component={NavLink}
          to={`${item.path}`}
          disabled={pathname === item.path}
        />
      )
    })
  }, [routes, pathname])

  return (
    <>
      {isAuthorized ? (
        <>
          <Box mb={2}>
            <Tabs
              value={selectedTab}
              indicatorColor='primary'
              textColor='inherit'
              onChange={tabHandler}
              variant='fullWidth'>
              {tabs}
            </Tabs>
          </Box>

          <Switch>
            <Route path='/crm/dashboard'>
              <Dashboard />
            </Route>
            <Route path='/crm/menu/list'>
              <Menu />
            </Route>
            <Route path='/crm/catalog/list'>
              <div>каталог</div>
            </Route>
            <Route path='/crm/catalog/add'>
              <Add />
            </Route>
            <Route path='/crm/catalog/edit/:productId'>
              <Edit />
            </Route>
          </Switch>
        </>
      ) : (
        <Redirect to='/auth/signin' />
      )}
    </>
  )
}
