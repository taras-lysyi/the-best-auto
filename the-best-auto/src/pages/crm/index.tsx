import { useState, useMemo, useCallback } from 'react'
import { Route, Switch, useLocation, NavLink } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
      },
    },
  }),
)
export const CrmPage = () => {
  const classes = useStyles()
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
        label: 'Добавити авто',
      },
    ]
  }, [])
  let initialLocation = useMemo(() => {
    return routes.findIndex(item => `${pathname}` === item.path)
  }, [pathname, routes])

  const [selectedTab, setSelectedTab] = useState(initialLocation)
  const handleChange = useCallback((event: React.ChangeEvent<{}> | React.MouseEvent, newValue: number) => {
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
          onChange={handleChange}
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
          <Box textAlign='center'>
            <Typography variant='h4'>Редагування головного меню</Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <Typography variant='h5'>Категория</Typography>
            <AddIcon className={classes.icon} />
            <ArrowDownwardIcon className={classes.icon} />
            <ArrowUpwardIcon className={classes.icon} />
            <EditIcon className={classes.icon} />
          </Box>
          <Box display='flex' alignItems='center'>
            <Typography variant='h5'>Категория</Typography>
            <AddIcon className={classes.icon} />
            <ArrowDownwardIcon className={classes.icon} />
            <ArrowUpwardIcon className={classes.icon} />
            <EditIcon className={classes.icon} />
          </Box>
          <Box mt={2}>
            <Button variant='contained' size='large' color='secondary'>
              Додати категорiю
            </Button>
          </Box>
        </Route>
        <Route path='/crm/catalog/list'>
          <div>каталог</div>
        </Route>
        <Route path='/crm/catalog/add'>
          <div>добавити авто</div>
        </Route>
      </Switch>
    </>
  )
}
