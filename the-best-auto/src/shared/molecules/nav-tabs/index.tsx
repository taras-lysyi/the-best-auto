import React, { memo, useMemo } from 'react'
import { useAppDispatch } from 'configureStore'
import { resetUserData } from 'features/auth/slice'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      width: '100%',
    },
    linkReset: {
      textDecoration: 'none',
      color: 'inherit',
    },
    tab: {
      fontSize: theme.typography.h6.fontSize,
      padding: 25,
    },
  }),
)

interface Props {
  drawerHandler: ((open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void) | (() => undefined)
  page: string
  matches: boolean
  selectedTab: number
  tabHandleChange: (event: React.ChangeEvent<{}> | React.MouseEvent, newValue: number) => void
  isAuthorized: any
}

export const NavTabs = memo(({ drawerHandler, page, matches, selectedTab, tabHandleChange, isAuthorized }: Props) => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
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

  const authRoutes = useMemo(() => {
    return [
      {
        path: 'crm/catalog/add',
        label: 'Додати авто',
      },
      // {
      //   path: 'crm/menu/list',
      //   label: 'Меню',
      // },
    ]
  }, [])
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const signOut = () => {
    dispatch(resetUserData())
    localStorage.removeItem('user')
    window.location.href = '/auth/signin'
  }
  const tabs = useMemo(() => {
    return routes.map(item => {
      return (
        <Tab
          label={item.label}
          key={item.label}
          component={NavLink}
          to={`/${item.path}`}
          onClick={drawerHandler(false)}
          className={classes.tab}
          disabled={page === item.path}
        />
      )
    })
  }, [classes.tab, page, routes, drawerHandler])
  return (
    <>
      <Tabs
        className={classes.tabs}
        value={selectedTab}
        indicatorColor='secondary'
        textColor='inherit'
        onChange={tabHandleChange}
        variant='fullWidth'
        orientation={!matches ? 'vertical' : undefined}>
        {tabs}
      </Tabs>
      {isAuthorized && (
        <>
          <IconButton color='secondary' onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            {authRoutes.map(route => {
              return (
                <NavLink className={classes.linkReset} to={`/${route.path}`}>
                  <MenuItem onClick={handleClose}>{route.label}</MenuItem>
                </NavLink>
              )
            })}
            <MenuItem onClick={signOut}>
              <Button fullWidth endIcon={<ExitToAppIcon />}>
                Вихiд
              </Button>
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  )
})
