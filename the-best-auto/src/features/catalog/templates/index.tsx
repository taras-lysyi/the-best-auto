import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useTheme, makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

type Props = {
  filter: JSX.Element
  mobileDrawer: JSX.Element
  settingButton: JSX.Element
  cards: JSX.Element[]
  drawer: boolean
  checkButton: JSX.Element
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

export const CatalogTemplate = ({ filter, mobileDrawer, settingButton, cards, drawer, checkButton }: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const [scrollYPosition, setScroll] = React.useState(0)
  window.onscroll = () => setScroll(window.scrollY)
  return (
    <>
      {!matches && (
        <Box display='flex' mb={2} width={1} justifyContent='flex-end'>
          {settingButton}
        </Box>
      )}
      <Grid container spacing={2}>
        {matches && (
          <Grid item md={3}>
            {filter}
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
      {!matches && mobileDrawer}
      {!matches && drawer && <Box className={classes.fixedBottomRightMobile}>{checkButton}</Box>}
      {!matches && !drawer && scrollYPosition > 100 && (
        <Box className={classes.fixedBottomRightMobile}>{settingButton}</Box>
      )}
    </>
  )
}
