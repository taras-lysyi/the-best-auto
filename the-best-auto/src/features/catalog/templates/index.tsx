import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
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
  categories: JSX.Element
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
  categories,
  closeIcon,
  filterTitle,
}: Props) => {
  const classes = useStyles()
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
      <Box display={{ md: 'none' }}>
        <Drawer anchor='right' open={drawer} onClose={toggleDrawer(false)}>
          <IconButton onClick={() => setDrawer(false)}>{closeIcon}</IconButton>
          <Paper>
            <Box padding={1}>{categories}</Box>
            <Box textAlign='center'>{filterTitle}</Box>
            <Box padding={1}>{filter}</Box>
          </Paper>
        </Drawer>
        {drawer && (
          <Box className={classes.fixedBottomRightMobile}>
            <Fab color='secondary'>{checkButton}</Fab>
          </Box>
        )}
        <Box display='flex' mb={2} width={1} justifyContent='flex-end'>
          <Fab color='secondary' onClick={toggleDrawer(true)}>
            {settingButton}
          </Fab>
        </Box>
        {scrollYPosition > 100 && !drawer ? (
          <Box className={classes.fixedBottomRightMobile}>
            <Fab color='secondary' onClick={toggleDrawer(true)}>
              {settingButton}
            </Fab>
          </Box>
        ) : null}
      </Box>

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
