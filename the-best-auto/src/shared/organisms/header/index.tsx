import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import CloseIcon from '@material-ui/icons/Close'
import { NavTabs } from 'shared/molecules'
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
