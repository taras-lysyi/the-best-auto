import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { NavTabs } from 'shared/molecules'
import logo from 'shared/assets/logo.png'
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
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
    logo: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
      },
    },
    logoImg: {
      width: '170px',
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

interface Props {
  selectedTab: number
  tabHandleChange: (event: React.ChangeEvent<{}> | React.MouseEvent, newValue: number) => void
  isAuthorized: any
}

const Header = ({ selectedTab, tabHandleChange, isAuthorized }: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  const [drawer, setDrawer] = React.useState(false)
  const toggleDrawer = useCallback(
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setDrawer(open)
    },
    [],
  )
  const usePage = () => {
    let { page } = useParams<{ page: string }>()
    return page ? page : ''
  }
  let page = usePage()
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
          <Box className={classes.logo}>
            <img alt='logo' className={classes.logoImg} src={logo} />
          </Box>
          <div className={classes.grow} />
          {matches && (
            <Toolbar>
              <NavTabs
                isAuthorized={isAuthorized}
                selectedTab={selectedTab}
                tabHandleChange={tabHandleChange}
                drawerHandler={toggleDrawer}
                page={page}
                matches={matches}
              />
            </Toolbar>
          )}
        </Toolbar>
      </AppBar>
      {!matches && (
        <Drawer open={drawer} onClose={toggleDrawer(false)}>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
          <NavTabs
            isAuthorized={isAuthorized}
            selectedTab={selectedTab}
            tabHandleChange={tabHandleChange}
            drawerHandler={toggleDrawer}
            page={page}
            matches={matches}
          />
        </Drawer>
      )}
    </div>
  )
}

export default Header
