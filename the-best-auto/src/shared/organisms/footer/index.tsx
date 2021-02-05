import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    background: `${theme.palette.primary.main}`,
    boxShadow: `0px -2px 19px 0px ${theme.palette.secondary.main}`,
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
}))

export const Footer = () => {
  const classes = useStyles()

  return (
    <Paper square className={classes.paper}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant='h5' noWrap>
          Material-UI
        </Typography>
      </Toolbar>
    </Paper>
  )
}
