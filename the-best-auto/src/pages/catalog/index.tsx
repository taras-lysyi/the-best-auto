import React from 'react'
import { Route } from 'react-router'
import { useTheme, makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { CatalogOnRoad } from './onroad'
import { CatalogAvailable } from './available'
import { CatalogAuction } from './auction'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { FilterCard } from 'features/catalog/molecules'
import { FilterItems } from 'features/catalog/organisms'
import TuneIcon from '@material-ui/icons/Tune'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import CheckIcon from '@material-ui/icons/Check'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
)

export const CatalogPage = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const classes = useStyles()
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
  let scrollYPosition = 0
  window.onscroll = () => {
    scrollYPosition = window.scrollY
  }
  return (
    <>
      <Grid container spacing={2}>
        {matches && (
          <Grid item md={3}>
            <Paper>
              <Box padding={1}>
                <FilterItems />
              </Box>
            </Paper>
          </Grid>
        )}
        {!matches && (
          <Drawer anchor='right' open={drawer} onClose={toggleDrawer(false)}>
            <IconButton onClick={() => setDrawer(false)}>
              <CloseIcon />
            </IconButton>
            <Box textAlign='center'>
              <Typography variant='h6'>Фільтри</Typography>
            </Box>
            <Paper>
              <Box padding={1}>
                <FilterItems />
              </Box>
            </Paper>
            <Fab className={classes.fab} color='secondary'>
              <CheckIcon />
            </Fab>
          </Drawer>
        )}

        {!matches && (
          <Box display='flex' width={1} justifyContent='flex-end'>
            <IconButton onClick={toggleDrawer(true)}>
              <TuneIcon />
            </IconButton>
          </Box>
        )}
        <Grid item xs={12} md={9}>
          <Paper>
            <Grid container spacing={1} justify='center'>
              <Grid item xs={10} sm={4} md={3}>
                <FilterCard
                  src='https://the-best-auto.com/assets/catalog/990/6.jpg'
                  runCount={40}
                  price={9400}
                  year={2015}
                  newPrice={9000}
                />
              </Grid>
              <Grid item xs={10} sm={4} md={3}>
                <FilterCard
                  src='https://the-best-auto.com/assets/catalog/990/6.jpg'
                  runCount={40}
                  price={9400}
                  year={2015}
                />
              </Grid>
              <Grid item xs={10} sm={4} md={3}>
                <FilterCard
                  src='https://the-best-auto.com/assets/catalog/990/6.jpg'
                  runCount={40}
                  price={9400}
                  year={2015}
                />
              </Grid>
              <Grid item xs={10} sm={4} md={3}>
                <FilterCard
                  src='https://the-best-auto.com/assets/catalog/990/6.jpg'
                  runCount={40}
                  price={9400}
                  year={2015}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {scrollYPosition > 50 && (
        <Fab className={classes.fab} onClick={toggleDrawer(true)}>
          <TuneIcon />
          hee
        </Fab>
      )}
      <Route path='/catalog/onroad'>
        <CatalogOnRoad />
      </Route>
      <Route path='/catalog/available'>
        <CatalogAvailable />
      </Route>
      <Route path='/catalog/auction'>
        <CatalogAuction />
      </Route>
    </>
  )
}
