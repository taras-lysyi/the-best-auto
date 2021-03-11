import { useState, useMemo, useCallback } from 'react'
import { Route, Switch, useLocation, NavLink } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Add } from 'features/crm/features/add'
import { Menu } from 'features/crm/features/menu'
export const CrmPage = () => {
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
          <Box textAlign='center'>
            <Typography variant='h4'>Особистi данi</Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <Box mr={2}>
              <Typography variant='h5'>Name</Typography>
            </Box>
            <Button size='large' variant='contained' color='primary'>
              Вихiд
            </Button>
          </Box>
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
      </Switch>
    </>
  )
}
