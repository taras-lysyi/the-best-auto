import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Grid'
import { Instagram, Youtube } from 'features/social-media/molecules'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    socialGrid: {
      alignItems: 'center',
      background: `linear-gradient(45deg, ${theme.palette.primary.dark} 60%, ${theme.palette.primary.main} 90%)`,
    },
  }),
)

export const Social = () => {
  const clasess = useStyles()
  return (
    <Grid container className={clasess.socialGrid}>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <Box>
          <Instagram />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <Box>
          <Youtube />
        </Box>
      </Grid>
    </Grid>
  )
}
