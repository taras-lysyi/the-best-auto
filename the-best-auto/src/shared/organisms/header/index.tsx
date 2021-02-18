import React from 'react'
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { NavLink, useParams } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Drawer from '@material-ui/core/Drawer'
import CloseIcon from '@material-ui/icons/Close'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },

    appBar: {
      background: `linear-gradient(45deg, ${theme.palette.primary.light} 20%, ${theme.palette.primary.dark} 40%)`,
    },

    grow: {
      flexGrow: 1,
    },
    menuButton: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
    logoLink: {
      textDecoration: 'none',
      width: '100%',
    },
    logo: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        justifyContent: 'center',
      },
    },
    title: {
      fontWeight: 'bold',
      color: 'white',
    },
    tabs: {
      width: '100%',
    },
    tab: {
      fontSize: theme.typography.h6.fontSize,
      padding: 25,
    },
  }),
)

export const Header = () => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  interface ParamTypes {
    page: string
  }
  let { page } = useParams<ParamTypes>()
  if (page === undefined) {
    page = ''
  }
  const routes = [
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
      path: 'blog',
      label: 'Блог',
    },
  ]
  let initialLocation = routes.findIndex(item => `${page}` === item.path)
  const [selectedTab, setSelectedTab] = React.useState(initialLocation)
  const handleChange = (event: React.ChangeEvent<{}> | React.MouseEvent, newValue: number) => {
    setSelectedTab(newValue)
    window.scrollTo(0, 0)
  }

  const [drawer, setDrawer] = React.useState(false)
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    setDrawer(open)
  }
  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            onClick={toggleDrawer(true)}
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'>
            <MenuIcon />
          </IconButton>
          <NavLink
            className={classes.logoLink}
            to='/'
            onClick={() => setSelectedTab(0)}
            style={{ textDecoration: 'none' }}>
            <Box display='flex' className={classes.logo}>
              <Typography className={classes.title} variant='h4' noWrap>
                THE
              </Typography>
              <Typography className={classes.title} variant='h4' noWrap>
                BEST
              </Typography>
              <Typography color='secondary' style={{ fontWeight: 'bold' }} noWrap variant='h4'>
                AUTO
              </Typography>
            </Box>
          </NavLink>

          <div className={classes.grow} />
          {matches && (
            <Toolbar>
              <Tabs
                className={classes.tabs}
                value={selectedTab}
                indicatorColor='secondary'
                textColor='inherit'
                onChange={handleChange}
                variant='fullWidth'>
                {routes.map(item => {
                  return (
                    <Tab
                      label={item.label}
                      key={item.label}
                      component={NavLink}
                      to={`/${item.path}`}
                      className={classes.tab}
                      disabled={page === item.path}
                    />
                  )
                })}
              </Tabs>
            </Toolbar>
          )}
        </Toolbar>
      </AppBar>
      {!matches && (
        <Drawer open={drawer} onClose={toggleDrawer(false)}>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
          <Tabs
            className={classes.tabs}
            orientation='vertical'
            value={selectedTab}
            indicatorColor='secondary'
            textColor='inherit'
            onChange={(event, newValue) => {
              handleChange(event, newValue)
              setDrawer(false)
            }}
            variant='fullWidth'>
            {routes.map(item => {
              return (
                <Tab
                  label={item.label}
                  key={item.label}
                  component={NavLink}
                  to={`/${item.path}`}
                  className={classes.tab}
                  disabled={page === item.path}
                />
              )
            })}
          </Tabs>
        </Drawer>
      )}
    </div>
  )
}
