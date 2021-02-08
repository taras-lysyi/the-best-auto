import React from 'react'
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Link } from 'react-router-dom'
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

  const [value, setValue] = React.useState(2)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
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
          <Link className={classes.logoLink} to='/' style={{ textDecoration: 'none' }}>
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
          </Link>

          <div className={classes.grow} />
          {matches && (
            <Toolbar>
              <Tabs
                className={classes.tabs}
                value={value}
                indicatorColor='secondary'
                textColor='inherit'
                onChange={handleChange}
                variant='fullWidth'>
                <Tab label='Головна' component={Link} to='/' className={classes.tab} />
                <Tab label='Каталог' component={Link} to='/catalog' className={classes.tab} />
                <Tab label='Контакти' component={Link} to='/contacts' className={classes.tab} />
                <Tab label='Блог' component={Link} to='/blog' className={classes.tab} />
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
            value={value}
            indicatorColor='secondary'
            textColor='inherit'
            onChange={(event, newValue) => {
              handleChange(event, newValue)
              setDrawer(false)
            }}
            variant='fullWidth'>
            <Tab label='Головна' component={Link} to='/' className={classes.tab} />
            <Tab label='Каталог' component={Link} to='/catalog' className={classes.tab} />
            <Tab label='Контакти' component={Link} to='/contacts' className={classes.tab} />
            <Tab label='Блог' component={Link} to='/blog' className={classes.tab} />
          </Tabs>
        </Drawer>
      )}
    </div>
  )
}
