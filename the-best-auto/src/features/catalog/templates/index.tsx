import { useState } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useTheme from '@material-ui/core/styles/useTheme'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Drawer from 'rc-drawer'
import './rc-drawer.css'
import Typography from '@material-ui/core/Typography'
import { LoadingStatusT } from 'shared/types'
import { SkeletonLoader } from 'shared/molecules'
interface Props {
  filter: JSX.Element
  cards: JSX.Element[]
  categories: JSX.Element
  closeIcon: JSX.Element
  filterTitle: JSX.Element
  catalogDataStatus: LoadingStatusT
}

export const CatalogTemplate = ({ filter, cards, categories, closeIcon, filterTitle, catalogDataStatus }: Props) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const [drawer, setDrawer] = useState(false)
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    setDrawer(!open)
  }
  return (
    <>
      {matches && (
        <Drawer
          open={drawer}
          placement='right'
          wrapperClassName='drawerWrapper'
          onHandleClick={toggleDrawer(drawer)}
          onClose={toggleDrawer(drawer)}>
          <Box p={2}>
            <Box textAlign='center'>
              <IconButton onClick={() => setDrawer(false)}>{closeIcon}</IconButton>
            </Box>
            <Box padding={1}>{categories}</Box>
            <Box textAlign='center'>{filterTitle}</Box>
            <Box padding={1}>{filter}</Box>
          </Box>
        </Drawer>
      )}
      <Grid container spacing={2}>
        <Grid component={Box} display={{ xs: 'none', md: 'block' }} item md={3}>
          <Paper>
            <Box padding={1}>{categories}</Box>
          </Paper>
          <Paper>
            <Box padding={1}>{filter}</Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper>
            <Grid container spacing={1} justify='center'>
              {catalogDataStatus === 'loading' ? (
                <SkeletonLoader />
              ) : catalogDataStatus === 'success' && cards.length === 0 ? (
                <Box textAlign='center'>
                  <Typography variant='h5'>Авто за данним запитом не знайдено</Typography>
                </Box>
              ) : catalogDataStatus === 'success' && cards.length !== 0 ? (
                cards.map(item => {
                  return (
                    <Grid item xs={10} sm={4} md={3}>
                      {item}
                    </Grid>
                  )
                })
              ) : null}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
