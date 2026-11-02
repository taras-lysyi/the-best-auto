import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
      color: theme.palette.secondary.main,
      width: '100%',
      padding: 50,
      cursor: 'pointer',
      [theme.breakpoints.down('md')]: {
        background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
        color: theme.palette.secondary.main,
      },
      '&:hover': {
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.primary.main,
        background: 'none',
      },
    },
  }),
)

type Props = {
  icon: React.ReactNode
  text: string
}

export const ServicesCard = ({ icon, text }: Props) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const clasess = useStyles()
  return (
    <Paper className={clasess.paper} variant='outlined'>
      <Box>
        <Box data-aos='zoom-out' data-aos-duration='800' fontSize={35}>
          {icon}
        </Box>
        <Typography data-aos='zoom-in' data-aos-duration='800' color='inherit' variant={matches ? 'h5' : 'h4'}>
          {text}
        </Typography>
      </Box>
    </Paper>
  )
}
