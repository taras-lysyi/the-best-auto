import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useTheme, makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
import Fab from '@material-ui/core/Fab'
interface Props {
  filter: JSX.Element
  settingButton: JSX.Element
  cards: JSX.Element[]
  checkButton: JSX.Element
  categoryItems: JSX.Element[]
  closeIcon: JSX.Element
  filterTitle: JSX.Element
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fixedBottomRightMobile: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: 1500,
    },
  }),
)

export const CatalogTemplate = ({
  filter,
  settingButton,
  cards,
  checkButton,
  categoryItems,
  closeIcon,
  filterTitle,
}: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const [scrollYPosition, setScroll] = React.useState(0)
  window.onscroll = () => setScroll(window.scrollY)

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
    <>
      {!matches && (
        <Box display='flex' mb={2} width={1} justifyContent='flex-end'>
          <Fab onClick={toggleDrawer(true)}>{settingButton}</Fab>
        </Box>
      )}
      {!matches && !drawer && scrollYPosition > 100 && (
        <Box className={classes.fixedBottomRightMobile}>
          <Fab onClick={toggleDrawer(true)}>{settingButton}</Fab>
        </Box>
      )}
      {!matches && (
        <Drawer anchor='right' open={drawer} onClose={toggleDrawer(false)}>
          <IconButton onClick={() => setDrawer(false)}>{closeIcon}</IconButton>
          <Box textAlign='center'>{filterTitle}</Box>
          <Paper>
            <Box padding={1}>{categoryItems}</Box>
            <Box padding={1}>{filter}</Box>
          </Paper>
        </Drawer>
      )}
      {!matches && drawer && (
        <Box className={classes.fixedBottomRightMobile}>
          <Fab color='secondary'>{checkButton}</Fab>
        </Box>
      )}

      <Grid container spacing={2}>
        {matches && (
          <Grid item md={3}>
            <Paper>
              <Box padding={1}>
                {categoryItems.map(item => {
                  return <Box my={1}>{item}</Box>
                })}
              </Box>
            </Paper>
            <Paper>
              <Box padding={1}>{filter}</Box>
            </Paper>
          </Grid>
        )}
        <Grid item xs={12} md={9}>
          <Paper>
            <Grid container spacing={1} justify='center'>
              {cards.map(item => {
                return (
                  <Grid item xs={10} sm={4} md={3}>
                    {item}
                  </Grid>
                )
              })}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
