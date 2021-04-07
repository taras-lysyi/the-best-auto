import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import instagram from 'shared/assets/instagram64.png'
import youtube from 'shared/assets/youtube64.png'
import Button from '@material-ui/core/Button'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
    redirect: {
      display: 'flex',
      justifyContent: 'center',
    },
    instagramPaper: {
      background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
      padding: theme.spacing(1),
    },
    instagramInner: {
      padding: theme.spacing(2),
      background: theme.palette.primary.main,
      textAlign: 'center',
    },
    instagramButton: {
      background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
      color: 'white',
      '&:hover': {
        background: '#fff',
        color: '#cc2366',
      },
    },
    youtubePaper: {
      background: 'linear-gradient(45deg, #fafafa 0%, #212121 25%, #ff0000 100%)',
      padding: theme.spacing(1),
      textAlign: 'center',
    },
    youtubeInner: {
      padding: theme.spacing(2),
      background: theme.palette.primary.main,
    },
    youtubeButton: {
      background: 'linear-gradient(45deg, #212121 0%, #ff0000 100%)',
      color: 'white',
      '&:hover': {
        color: '#ff0000',
        background: '#fff',
      },
    },
  }),
)

export const Social = () => {
  const clasess = useStyles()
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <a className={clasess.link} target='_blank' rel='noreferrer' href='https://www.instagram.com/the.bestauto/'>
          <Paper data-aos='fade-right' data-aos-duration='1000' className={clasess.instagramPaper} variant='outlined'>
            <Box className={clasess.instagramInner}>
              <img alt='' src={instagram} />
              <Box className={clasess.redirect}>
                <Button size='large' className={clasess.instagramButton} endIcon={<ExitToAppIcon />}>
                  <Typography variant='h6'>ПЕРЕЙТИ</Typography>
                </Button>
              </Box>
            </Box>
          </Paper>
        </a>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <a
          className={clasess.link}
          target='_blank'
          rel='noreferrer'
          href='https://www.youtube.com/channel/UCmqZmHm0ZXpW3TVjyyLEJ9w'>
          <Paper data-aos='fade-left' data-aos-duration='1000' className={clasess.youtubePaper} variant='outlined'>
            <Box className={clasess.youtubeInner}>
              <img alt='' src={youtube} />
              <Box className={clasess.redirect}>
                <Box className={clasess.redirect}>
                  <Button size='large' className={clasess.youtubeButton} endIcon={<ExitToAppIcon />}>
                    <Typography variant='h6'>ПЕРЕЙТИ</Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </a>
      </Grid>
    </Grid>
  )
}
